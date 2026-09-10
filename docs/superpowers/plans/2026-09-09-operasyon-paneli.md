# Operasyon Paneli (Dispatch) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Easy VIP Transfer'ın sürücü/araç/görev atamalarını defterden çıkarıp, çakışmaları uyaran ve ücret takibi tutan bir admin paneline taşımak.

**Architecture:** Üç tablo (`drivers`, `vehicles`, `assignments`) Supabase'de tutulur. Admin Supabase Auth ile siteden giriş yapar, `/admin` middleware ile korunur. Çakışma veritabanı kısıtıyla **engellenmez**; kayıt öncesi sorgulanır ve kullanıcıya tik onaylı uyarı gösterilir. Sitedeki müşteri formu bu sisteme hiç bağlanmaz — o yalnızca WhatsApp mesajı üretir.

**Tech Stack:** Next.js 16.3.4 (App Router, Turbopack), React 19.2.8, TypeScript (strict), Tailwind v4, `@supabase/ssr` 0.12.6, `@supabase/supabase-js` 2.115, framer-motion 13, lucide-react 1.41, vitest (yeni)

**Spec:** `docs/superpowers/specs/2026-09-09-operasyon-paneli-design.md`

## Global Constraints

- Proje kökü: `easy-vip-transfer/`. Tüm yollar buna göredir.
- Arayüz metinleri **Türkçe**. Mevcut lüks tema korunur: arka plan `#030303`, vurgu `#E5D3B3`, kartlar `bg-white/[0.02] border-white/[0.05] rounded-3xl`.
- **Her Supabase çağrısında `error` kontrol edilir** ve hata kullanıcıya gösterilir. Bu kod tabanında üç kez "hata yutup başarı mesajı gösterme" hatası yapıldı; tekrarlanmayacak.
- Zaman alanları `timestamptz`. Kullanıcı yerel saat (Europe/Istanbul) girer, `toISOString()` ile gönderilir.
- Görev süresi bir **aralıktır** (`tstzrange`); aynı gün içinde de olabilir, birden çok güne de yayılabilir.
- Çakışma **hiçbir zaman kaydı engellemez**. Yalnızca uyarır.
- `vip_bookings`, `vip_vehicles`, `vip_locations`, `vip_settings` tabloları bu panelde **kullanılmaz**. Yeni tablolar bunların yerine geçer.
- Sitedeki filo vitrini `src/data/transferData.ts`'ten beslenmeye devam eder. `vehicles` tablosu yalnızca paneldedir; panele eklenen araç sitede görünmez.
- SQL adımlarını Claude çalıştıramaz (bu Supabase projesine MCP erişimi yok). SQL'ler Supabase Dashboard → SQL Editor'de elle çalıştırılır.

---

### Task 1: Veritabanı şeması

**Files:**
- Create: `easy-vip-transfer/supabase/migrations/001_dispatch_schema.sql`

**Interfaces:**
- Consumes: yok (ilk görev)
- Produces: `drivers(id uuid, name text, phone text, is_active bool, created_at timestamptz)`, `vehicles(id uuid, name text, plate text, is_active bool, created_at timestamptz)`, `assignments(id uuid, driver_id uuid?, vehicle_id uuid?, during tstzrange, customer_name text, customer_phone text, route_from text, route_to text, price_agreed numeric?, price_paid numeric, status assignment_status, payment payment_status, notes text, created_at timestamptz)`

- [ ] **Step 1: Migration dosyasını oluştur**

```sql
-- 001_dispatch_schema.sql
create extension if not exists btree_gist;

create table drivers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create table vehicles (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  plate      text,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create type assignment_status as enum ('planned','done','cancelled');
create type payment_status    as enum ('unpaid','partial','paid');

create table assignments (
  id             uuid primary key default gen_random_uuid(),
  driver_id      uuid references drivers(id),
  vehicle_id     uuid references vehicles(id),
  during         tstzrange not null,
  customer_name  text not null,
  customer_phone text,
  route_from     text,
  route_to       text,
  price_agreed   numeric(10,2),
  price_paid     numeric(10,2) not null default 0,
  status         assignment_status not null default 'planned',
  payment        payment_status    not null default 'unpaid',
  notes          text,
  created_at     timestamptz not null default now()
);

create index assignments_driver_during_idx  on assignments using gist (driver_id, during);
create index assignments_vehicle_during_idx on assignments using gist (vehicle_id, during);
create index assignments_during_idx         on assignments using gist (during);
```

- [ ] **Step 2: Supabase SQL Editor'de çalıştır**

Dashboard → SQL Editor → yeni sorgu → yukarıdaki dosyanın içeriğini yapıştır → Run.
Beklenen: `Success. No rows returned`.

- [ ] **Step 3: Şemayı doğrula**

```sql
select table_name from information_schema.tables
where table_schema='public' and table_name in ('drivers','vehicles','assignments')
order by table_name;
```

Beklenen: üç satır — `assignments`, `drivers`, `vehicles`.

- [ ] **Step 4: Aralık davranışını doğrula**

```sql
select
  tstzrange('2026-12-27 10:00+03','2026-12-27 15:00+03') &&
  tstzrange('2026-12-27 15:00+03','2026-12-27 18:00+03') as bitisik_cakisir,
  tstzrange('2026-12-27 10:00+03','2026-12-27 15:00+03') &&
  tstzrange('2026-12-27 12:00+03','2026-12-27 14:00+03') as icice_cakisir;
```

Beklenen: `bitisik_cakisir = false`, `icice_cakisir = true`.
Bu, arka arkaya işlerin uyarı üretmeyeceğini kanıtlar.

- [ ] **Step 5: Commit**

```bash
git add easy-vip-transfer/supabase/migrations/001_dispatch_schema.sql
git commit -m "feat(db): add drivers, vehicles and assignments schema"
```

---

### Task 2: RLS ve admin yetkisi

**Files:**
- Create: `easy-vip-transfer/supabase/migrations/002_rls.sql`

**Interfaces:**
- Consumes: Task 1'in üç tablosu
- Produces: `is_admin() returns boolean` SQL fonksiyonu; üç tabloda `authenticated` rolüne tam yetki, `anon`'a hiç yetki yok

- [ ] **Step 1: Migration dosyasını oluştur**

```sql
-- 002_rls.sql
create or replace function is_admin() returns boolean
language sql stable as $$ select auth.role() = 'authenticated' $$;

alter table drivers     enable row level security;
alter table vehicles    enable row level security;
alter table assignments enable row level security;

create policy admin_all_drivers on drivers for all
  to authenticated using (is_admin()) with check (is_admin());

create policy admin_all_vehicles on vehicles for all
  to authenticated using (is_admin()) with check (is_admin());

create policy admin_all_assignments on assignments for all
  to authenticated using (is_admin()) with check (is_admin());
```

`anon` için politika yazılmıyor: RLS açıkken politikası olmayan rol hiçbir satıra erişemez.

- [ ] **Step 2: SQL Editor'de çalıştır**

Beklenen: `Success. No rows returned`.

- [ ] **Step 3: Supabase'de kayıt olmayı kapat**

Dashboard → Authentication → Providers → Email → **"Enable Sign Ups" kapat** → Save.

Doğrula:

```bash
curl -s "https://tmvsvogghqeadzujdbfa.supabase.co/auth/v1/settings" \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" | grep disable_signup
```

Beklenen: `"disable_signup": true`.
Bu kritik: açık kalırsa herkes anon key ile hesap açıp admin yetkisi kazanır.

- [ ] **Step 4: Admin kullanıcısını oluştur**

Dashboard → Authentication → Users → Add user → e-posta + şifre → **Auto Confirm User** işaretli → Create.

- [ ] **Step 5: Anon erişiminin kapalı olduğunu doğrula**

```bash
curl -s "https://tmvsvogghqeadzujdbfa.supabase.co/rest/v1/assignments?select=*" \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY"
```

Beklenen: `[]` (satır yok). Ardından insert denemesi:

```bash
curl -s -X POST "https://tmvsvogghqeadzujdbfa.supabase.co/rest/v1/drivers" \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" -d '{"name":"anon-test"}'
```

Beklenen: `42501 new row violates row-level security policy`.

- [ ] **Step 6: Commit**

```bash
git add easy-vip-transfer/supabase/migrations/002_rls.sql
git commit -m "feat(db): enable RLS with is_admin() gate"
```

---

### Task 3: Oturum altyapısı ve /admin koruması

**Files:**
- Modify: `easy-vip-transfer/src/lib/supabase/client.ts`
- Create: `easy-vip-transfer/src/lib/supabase/middleware.ts`
- Create: `easy-vip-transfer/src/middleware.ts`

**Interfaces:**
- Consumes: Task 2'nin auth kurulumu
- Produces: `createClient()` (tarayıcı, mevcut), `updateSession(request: NextRequest): Promise<NextResponse>`; `/admin/*` oturumsuz erişimde `/admin/giris`'e yönlenir

- [ ] **Step 1: Oturum yenileyiciyi yaz**

`src/lib/supabase/middleware.ts`:

```ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/admin/giris';

  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/giris';
    return NextResponse.redirect(url);
  }

  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return response;
}
```

- [ ] **Step 2: Middleware'i bağla**

`src/middleware.ts`:

```ts
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

- [ ] **Step 3: Korumayı doğrula**

Run: `npm run dev`, ardından gizli sekmede `http://localhost:3000/admin`
Beklenen: `/admin/giris`'e yönlenir.

- [ ] **Step 4: Commit**

```bash
git add easy-vip-transfer/src/lib/supabase/middleware.ts easy-vip-transfer/src/middleware.ts
git commit -m "feat(admin): protect /admin with Supabase session middleware"
```

---

### Task 4: Giriş ekranı ve sahte auth'un kaldırılması

**Files:**
- Create: `easy-vip-transfer/src/app/admin/giris/page.tsx`
- Modify: `easy-vip-transfer/src/app/admin/page.tsx` (giriş bloğu, `handleLogin`, `handleLogout`, `updatePassword`, Ayarlar sekmesi)
- Modify: `easy-vip-transfer/src/components/Navbar.tsx` (localStorage koşullu admin butonu)

**Interfaces:**
- Consumes: Task 3'ün middleware koruması
- Produces: `/admin/giris` sayfası; `signOut()` çağrısı `/admin/giris`'e yönlendirir

- [ ] **Step 1: Giriş sayfasını yaz**

`src/app/admin/giris/page.tsx`:

```tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('E-posta veya şifre hatalı.');
      setBusy(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#030303] flex items-center justify-center p-4 text-zinc-100">
      <div className="w-full max-w-md backdrop-blur-3xl bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E5D3B3]/20 to-transparent border border-[#E5D3B3]/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-[#E5D3B3]" />
          </div>
          <h1 className="text-3xl font-serif text-white tracking-wide mb-2">Yönetim Paneli</h1>
          <p className="text-[10px] text-zinc-500 tracking-[0.25em] uppercase">Yetkisiz Erişim Yasaktır</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta"
            required
            autoFocus
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#E5D3B3]/50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            required
            className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#E5D3B3]/50"
          />

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#E5D3B3] hover:bg-white text-black font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-2xl transition-all disabled:opacity-50"
          >
            {busy ? 'Kontrol ediliyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Eski auth kodunu sil**

`src/app/admin/page.tsx` içinden tamamen kaldırılacaklar:

- `isAuthenticated`, `passcode`, `passError`, `isLoggingIn`, `adminPassword` state'leri
- `handleLogin` fonksiyonu (`passcode === 'admin'` arka kapısı ve `'vip2026'` fallback'i dahil)
- `updatePassword` fonksiyonu ve **Ayarlar** sekmesinin tamamı (`vip_settings` tablosu veritabanında yok)
- `if (!isAuthenticated) return (...)` ile başlayan giriş formu bloğu
- `localStorage.getItem/setItem/removeItem('easyvip_admin_auth')` çağrılarının hepsi
- `useEffect` içindeki `sessionAuth` kontrolü — yerine doğrudan `fetchData()` çağrılır

`handleLogout` yerine:

```tsx
const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push('/admin/giris');
};
```

- [ ] **Step 3: Navbar'daki admin butonunu kaldır**

`src/components/Navbar.tsx` içinde `localStorage.getItem('easyvip_admin_auth')` okuyan `useEffect` ve buna bağlı `<a href="/admin">` bloğu silinir. Gerçek oturum tarayıcıdan okunamaz; admin `/admin` adresine doğrudan gider.

- [ ] **Step 4: Girişi uçtan uca dene**

Run: `npm run dev`
1. `/admin` → `/admin/giris`'e yönlenir
2. Yanlış şifre → "E-posta veya şifre hatalı."
3. Doğru bilgiler → `/admin` açılır
4. Çıkış Yap → `/admin/giris`'e döner
5. `admin` ve `vip2026` artık hiçbir yerde kabul edilmiyor

- [ ] **Step 5: Commit**

```bash
git add easy-vip-transfer/src/app/admin easy-vip-transfer/src/components/Navbar.tsx
git commit -m "feat(admin): replace fake client-side auth with Supabase Auth"
```

---

### Task 5: Çakışma tespiti (saf mantık + test)

**Files:**
- Create: `easy-vip-transfer/src/lib/overlap.ts`
- Create: `easy-vip-transfer/src/lib/overlap.test.ts`
- Modify: `easy-vip-transfer/package.json`

**Interfaces:**
- Consumes: Task 1'in `assignments` şeması
- Produces:
  - `type Busy = { id: string; customerName: string; start: string; end: string; driverId: string | null; vehicleId: string | null }`
  - `overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean`
  - `describeConflicts(busy: Busy[], driverName: string | null, vehicleName: string | null): string[]`

- [ ] **Step 1: vitest'i kur**

```bash
cd easy-vip-transfer && npm install -D vitest
```

`package.json` içindeki `scripts` bölümüne ekle:

```json
"test": "vitest run"
```

- [ ] **Step 2: Başarısız testi yaz**

`src/lib/overlap.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { overlaps, describeConflicts, type Busy } from './overlap';

describe('overlaps', () => {
  it('ic ice gecen araliklar cakisir', () => {
    expect(overlaps(
      '2026-12-27T10:00:00+03:00', '2026-12-27T15:00:00+03:00',
      '2026-12-27T12:00:00+03:00', '2026-12-27T14:00:00+03:00'
    )).toBe(true);
  });

  it('bitisik araliklar cakismaz', () => {
    expect(overlaps(
      '2026-12-27T10:00:00+03:00', '2026-12-27T15:00:00+03:00',
      '2026-12-27T15:00:00+03:00', '2026-12-27T18:00:00+03:00'
    )).toBe(false);
  });

  it('cok gunluk is ayni gunu kapsayan isle cakisir', () => {
    expect(overlaps(
      '2026-12-27T08:00:00+03:00', '2026-12-29T20:00:00+03:00',
      '2026-12-28T10:00:00+03:00', '2026-12-28T12:00:00+03:00'
    )).toBe(true);
  });
});

describe('describeConflicts', () => {
  const busy: Busy[] = [{
    id: 'a1',
    customerName: 'Yılmaz',
    start: '2026-12-27T10:00:00+03:00',
    end: '2026-12-27T15:00:00+03:00',
    driverId: 'd1',
    vehicleId: 'v1',
  }];

  it('surucu doluysa surucu adiyla mesaj uretir', () => {
    const msgs = describeConflicts(busy, 'Ahmet', null);
    expect(msgs).toHaveLength(1);
    expect(msgs[0]).toContain('Ahmet');
    expect(msgs[0]).toContain('Yılmaz');
  });

  it('cakisma yoksa bos dizi doner', () => {
    expect(describeConflicts([], 'Ahmet', 'Mercedes')).toEqual([]);
  });
});
```

- [ ] **Step 3: Testin başarısız olduğunu gör**

Run: `npm test`
Beklenen: FAIL — `Cannot find module './overlap'`

- [ ] **Step 4: Uygulamayı yaz**

`src/lib/overlap.ts`:

```ts
export type Busy = {
  id: string;
  customerName: string;
  start: string;
  end: string;
  driverId: string | null;
  vehicleId: string | null;
};

/** [start, end) yarı açık aralık — bitişik işler çakışmaz. */
export function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
}

const fmt = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  timeZone: 'Europe/Istanbul',
});

export function describeConflicts(
  busy: Busy[],
  driverName: string | null,
  vehicleName: string | null
): string[] {
  return busy.map((b) => {
    const who = b.driverId && driverName ? driverName : vehicleName ?? 'Kayıt';
    return `${who} ${fmt.format(new Date(b.start))} – ${fmt.format(new Date(b.end))} arasında dolu (müşteri: ${b.customerName}).`;
  });
}
```

- [ ] **Step 5: Testlerin geçtiğini gör**

Run: `npm test`
Beklenen: 5 test PASS

- [ ] **Step 6: Commit**

```bash
git add easy-vip-transfer/src/lib/overlap.ts easy-vip-transfer/src/lib/overlap.test.ts easy-vip-transfer/package.json easy-vip-transfer/package-lock.json
git commit -m "feat(admin): add overlap detection with tests"
```

---

### Task 6: Sürücüler ve Araçlar ekranları

**Files:**
- Create: `easy-vip-transfer/src/components/admin/ResourceManager.tsx`
- Modify: `easy-vip-transfer/src/app/admin/page.tsx` (sekmeler)

**Interfaces:**
- Consumes: Task 2'nin RLS politikaları
- Produces: `<ResourceManager table="drivers" | "vehicles" title={string} secondLabel={string} secondField="phone" | "plate" />`

İki ekran aynı şekilde: ad + ikinci alan + aktiflik. Tek bileşen, iki kullanım.

- [ ] **Step 1: Bileşeni yaz**

`src/components/admin/ResourceManager.tsx`:

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Row = { id: string; name: string; phone?: string | null; plate?: string | null; is_active: boolean };

export default function ResourceManager({
  table, title, secondLabel, secondField,
}: {
  table: 'drivers' | 'vehicles';
  title: string;
  secondLabel: string;
  secondField: 'phone' | 'plate';
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState('');
  const [second, setSecond] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  const load = async () => {
    const { data, error } = await supabase.from(table).select('*').order('name');
    if (error) { setError(error.message); return; }
    setRows(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name.trim()) { setError('Ad zorunlu.'); return; }
    setBusy(true); setError('');
    const { error } = await supabase.from(table).insert({ name: name.trim(), [secondField]: second.trim() || null });
    setBusy(false);
    if (error) { setError(error.message); return; }
    setName(''); setSecond(''); load();
  };

  const toggleActive = async (row: Row) => {
    const { error } = await supabase.from(table).update({ is_active: !row.is_active }).eq('id', row.id);
    if (error) { setError(error.message); return; }
    load();
  };

  return (
    <div className="space-y-8">
      <header className="mb-6"><h1 className="text-3xl font-serif text-white">{title}</h1></header>

      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad"
          className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white" />
        <input value={second} onChange={(e) => setSecond(e.target.value)} placeholder={secondLabel}
          className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white" />
        <button onClick={add} disabled={busy}
          className="bg-[#E5D3B3] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50">
          <Plus className="w-4 h-4" /> Ekle
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="flex justify-between items-center p-5 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
            <div>
              <p className={r.is_active ? 'text-white' : 'text-zinc-600 line-through'}>{r.name}</p>
              <p className="text-zinc-500 text-sm">{r[secondField] ?? '—'}</p>
            </div>
            <button onClick={() => toggleActive(r)}
              className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white text-xs flex items-center gap-2">
              <Trash2 className="w-3.5 h-3.5" /> {r.is_active ? 'Pasife Al' : 'Aktif Et'}
            </button>
          </div>
        ))}
        {rows.length === 0 && <p className="text-zinc-500 text-sm">Henüz kayıt yok.</p>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Sekmelere bağla**

`src/app/admin/page.tsx` içindeki sekme listesini şununla değiştir:

```tsx
{ id: 'gorevler',  label: 'Görevler',  icon: CalendarDays },
{ id: 'surucular', label: 'Sürücüler', icon: Users },
{ id: 'araclar',   label: 'Araçlar',   icon: Car },
{ id: 'ucretler',  label: 'Ücretler',  icon: Banknote },
```

Ve içerik bloklarına ekle:

```tsx
{activeTab === 'surucular' && (
  <ResourceManager table="drivers" title="Sürücüler" secondLabel="Telefon" secondField="phone" />
)}
{activeTab === 'araclar' && (
  <ResourceManager table="vehicles" title="Araçlar" secondLabel="Plaka" secondField="plate" />
)}
```

Eski `bookings`, `fleet`, `settings` sekmeleri ve `vip_bookings` / `vip_vehicles` / `vip_locations` sorguları kaldırılır.

- [ ] **Step 3: Elle doğrula**

Giriş yap → Sürücüler → 5 sürücü ekle (Ahmet, Mehmet, Okan, Alper, Berk) → Araçlar → 5 araç ekle (Mercedes, Renault, Skoda, Audi, BMW).
Beklenen: hepsi listeleniyor, "Pasife Al" üstünü çiziyor, sayfa yenilenince kalıcı.

- [ ] **Step 4: Commit**

```bash
git add easy-vip-transfer/src/components/admin easy-vip-transfer/src/app/admin/page.tsx
git commit -m "feat(admin): add drivers and vehicles management"
```

---

### Task 7: Görev formu ve çakışma uyarısı

**Files:**
- Create: `easy-vip-transfer/src/components/admin/AssignmentForm.tsx`
- Modify: `easy-vip-transfer/src/app/admin/page.tsx`

**Interfaces:**
- Consumes: `overlaps`, `describeConflicts`, `Busy` (Task 5); `drivers` / `vehicles` tabloları (Task 6)
- Produces: `<AssignmentForm onSaved={() => void} />`

- [ ] **Step 1: Formu yaz**

`src/components/admin/AssignmentForm.tsx`:

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { describeConflicts, type Busy } from '@/lib/overlap';

type Option = { id: string; name: string };

export default function AssignmentForm({ onSaved }: { onSaved: () => void }) {
  const [drivers, setDrivers] = useState<Option[]>([]);
  const [vehicles, setVehicles] = useState<Option[]>([]);
  const [form, setForm] = useState({
    driverId: '', vehicleId: '', start: '', end: '',
    customerName: '', customerPhone: '', routeFrom: '', routeTo: '',
    priceAgreed: '', notes: '',
  });
  const [conflicts, setConflicts] = useState<string[]>([]);
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const [d, v] = await Promise.all([
        supabase.from('drivers').select('id,name').eq('is_active', true).order('name'),
        supabase.from('vehicles').select('id,name').eq('is_active', true).order('name'),
      ]);
      if (d.error) { setError(d.error.message); return; }
      if (v.error) { setError(v.error.message); return; }
      setDrivers(d.data ?? []);
      setVehicles(v.data ?? []);
    })();
  }, []);

  const set = (k: keyof typeof form, val: string) => {
    setForm((f) => ({ ...f, [k]: val }));
    setConflicts([]);
    setAcknowledged(false);
  };

  const validate = (): string | null => {
    if (!form.customerName.trim()) return 'Müşteri adı zorunlu.';
    if (!form.start || !form.end) return 'Başlangıç ve bitiş zamanı zorunlu.';
    if (new Date(form.end) <= new Date(form.start)) return 'Bitiş, başlangıçtan sonra olmalı.';
    return null;
  };

  /** Çakışan görevleri sorgular. Boş dizi = çakışma yok. */
  const findConflicts = async (): Promise<string[] | null> => {
    if (!form.driverId && !form.vehicleId) return [];

    const range = `[${new Date(form.start).toISOString()},${new Date(form.end).toISOString()})`;
    let q = supabase
      .from('assignments')
      .select('id,customer_name,during,driver_id,vehicle_id')
      .neq('status', 'cancelled')
      .overlaps('during', range);

    const ors: string[] = [];
    if (form.driverId) ors.push(`driver_id.eq.${form.driverId}`);
    if (form.vehicleId) ors.push(`vehicle_id.eq.${form.vehicleId}`);
    q = q.or(ors.join(','));

    const { data, error } = await q;
    if (error) { setError(error.message); return null; }

    const busy: Busy[] = (data ?? []).map((r: any) => {
      const [start, end] = String(r.during).replace(/^[[(]|[)\]]$/g, '').split(',');
      return {
        id: r.id,
        customerName: r.customer_name,
        start: start.replace(/"/g, ''),
        end: end.replace(/"/g, ''),
        driverId: r.driver_id,
        vehicleId: r.vehicle_id,
      };
    });

    return describeConflicts(
      busy,
      drivers.find((d) => d.id === form.driverId)?.name ?? null,
      vehicles.find((v) => v.id === form.vehicleId)?.name ?? null
    );
  };

  const save = async () => {
    const { error } = await supabase.from('assignments').insert({
      driver_id: form.driverId || null,
      vehicle_id: form.vehicleId || null,
      during: `[${new Date(form.start).toISOString()},${new Date(form.end).toISOString()})`,
      customer_name: form.customerName.trim(),
      customer_phone: form.customerPhone.trim() || null,
      route_from: form.routeFrom.trim() || null,
      route_to: form.routeTo.trim() || null,
      price_agreed: form.priceAgreed ? Number(form.priceAgreed) : null,
      notes: form.notes.trim() || null,
    });

    setBusy(false);
    if (error) { setError(error.message); return; }

    setForm({ driverId: '', vehicleId: '', start: '', end: '', customerName: '',
      customerPhone: '', routeFrom: '', routeTo: '', priceAgreed: '', notes: '' });
    setConflicts([]);
    setAcknowledged(false);
    onSaved();
  };

  const handleSubmit = async () => {
    const v = validate();
    if (v) { setError(v); return; }

    setBusy(true); setError('');
    const found = await findConflicts();
    if (found === null) { setBusy(false); return; }

    if (found.length > 0) {
      setConflicts(found);
      setBusy(false);
      return;
    }
    await save();
  };

  const input = 'w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm';

  return (
    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] space-y-4">
      <h2 className="text-xl font-serif text-white">Yeni Görev</h2>

      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select value={form.driverId} onChange={(e) => set('driverId', e.target.value)} className={input}>
          <option value="">Sürücü seçin (opsiyonel)</option>
          {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select value={form.vehicleId} onChange={(e) => set('vehicleId', e.target.value)} className={input}>
          <option value="">Araç seçin (opsiyonel)</option>
          {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>

        <label className="text-[10px] uppercase tracking-widest text-zinc-500">Başlangıç
          <input type="datetime-local" value={form.start} onChange={(e) => set('start', e.target.value)} className={`${input} mt-1 [color-scheme:dark]`} />
        </label>
        <label className="text-[10px] uppercase tracking-widest text-zinc-500">Bitiş
          <input type="datetime-local" value={form.end} onChange={(e) => set('end', e.target.value)} className={`${input} mt-1 [color-scheme:dark]`} />
        </label>

        <input value={form.customerName} onChange={(e) => set('customerName', e.target.value)} placeholder="Müşteri adı" className={input} />
        <input value={form.customerPhone} onChange={(e) => set('customerPhone', e.target.value)} placeholder="Telefon" className={input} />
        <input value={form.routeFrom} onChange={(e) => set('routeFrom', e.target.value)} placeholder="Nereden" className={input} />
        <input value={form.routeTo} onChange={(e) => set('routeTo', e.target.value)} placeholder="Nereye" className={input} />
        <input type="number" value={form.priceAgreed} onChange={(e) => set('priceAgreed', e.target.value)} placeholder="Anlaşılan ücret (€)" className={input} />
        <input value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Not" className={input} />
      </div>

      {conflicts.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5 space-y-4">
          {conflicts.map((c, i) => (
            <p key={i} className="text-amber-200 text-sm">⚠ {c}</p>
          ))}

          <label className="flex items-center gap-3 text-amber-100 text-sm cursor-pointer">
            <input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} className="w-4 h-4 accent-[#E5D3B3]" />
            Çakışmayı biliyorum
          </label>

          <div className="flex gap-3">
            <button
              onClick={() => { setConflicts([]); setAcknowledged(false); }}
              className="px-6 py-3 rounded-xl bg-white/5 text-zinc-300 text-sm hover:bg-white/10"
            >
              Geri Al
            </button>
            <button
              onClick={() => { setBusy(true); save(); }}
              disabled={!acknowledged || busy}
              className="px-6 py-3 rounded-xl bg-[#E5D3B3] text-black font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Devam Et
            </button>
          </div>
        </div>
      )}

      {conflicts.length === 0 && (
        <button onClick={handleSubmit} disabled={busy}
          className="bg-[#E5D3B3] text-black px-8 py-3 rounded-xl font-bold disabled:opacity-50">
          {busy ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Spec'teki altı senaryoyu elle doğrula**

Giriş yap → Görevler:

1. Ahmet + Mercedes, 27 Aralık 10:00 → 15:00 → uyarı yok, kaydedilir
2. Ahmet + Audi, 27 Aralık 12:00 → 14:00 → uyarı çıkar, *Devam Et* pasif; kutucuk işaretlenince aktif olur, kaydedilir
3. Mehmet + Mercedes, 27 Aralık 12:00 → 14:00 → araç için uyarı çıkar, aynı şekilde kaydedilir
4. Uyarıda *Geri Al* → uyarı kapanır, kayıt oluşmaz, form korunur
5. Ahmet + Audi, 27 Aralık 15:00 → 18:00 → uyarı yok (bitişik)
6. 1 numaralı kaydı `cancelled` yap, 2'yi tekrar dene → uyarı yok

Çok günlük iş kontrolü: Ahmet + BMW, 27 Aralık 08:00 → 29 Aralık 20:00 kaydedilir; ardından Ahmet + Skoda, 28 Aralık 10:00 → 12:00 denenir → **uyarı çıkmalı**.

- [ ] **Step 3: Commit**

```bash
git add easy-vip-transfer/src/components/admin/AssignmentForm.tsx easy-vip-transfer/src/app/admin/page.tsx
git commit -m "feat(admin): add assignment form with non-blocking conflict warning"
```

---

### Task 8: Görev listesi ve durum yönetimi

**Files:**
- Create: `easy-vip-transfer/src/components/admin/AssignmentList.tsx`
- Modify: `easy-vip-transfer/src/app/admin/page.tsx`

**Interfaces:**
- Consumes: `assignments` tablosu; `overlaps()` (Task 5); `AssignmentForm`'un `onSaved` geri çağrısı
- Produces: `<AssignmentList refreshKey={number} />`

- [ ] **Step 1: Listeyi yaz**

`src/components/admin/AssignmentList.tsx`:

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, CalendarDays, AlertTriangle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { overlaps } from '@/lib/overlap';

const fmt = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul',
});

const parseRange = (during: string) => {
  const [s, e] = String(during).replace(/^[[(]|[)\]]$/g, '').split(',');
  return { start: s.replace(/"/g, ''), end: e.replace(/"/g, '') };
};

export default function AssignmentList({ refreshKey }: { refreshKey: number }) {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState('');
  const supabase = createClient();

  const load = async () => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, drivers(name), vehicles(name)')
      .order('created_at', { ascending: false });
    if (error) { setError(error.message); return; }
    setRows(data ?? []);
  };

  useEffect(() => { load(); }, [refreshKey]);

  /** Bir görev, iptal olmayan başka bir görevle aynı sürücü veya aracı paylaşıyorsa çakışmalıdır. */
  const isConflicting = (row: any) => {
    if (row.status === 'cancelled') return false;
    const a = parseRange(row.during);
    return rows.some((other) => {
      if (other.id === row.id || other.status === 'cancelled') return false;
      const sharesDriver = row.driver_id && other.driver_id === row.driver_id;
      const sharesVehicle = row.vehicle_id && other.vehicle_id === row.vehicle_id;
      if (!sharesDriver && !sharesVehicle) return false;
      const b = parseRange(other.during);
      return overlaps(a.start, a.end, b.start, b.end);
    });
  };

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('assignments').update({ status }).eq('id', id);
    if (error) { setError(error.message); return; }
    load();
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      {rows.map((r) => {
        const { start, end } = parseRange(r.during);
        return (
          <div key={r.id} className="flex justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
            <div>
              <p className="text-white text-lg flex items-center gap-2">
                {r.customer_name}
                {r.customer_phone && <span className="text-[#E5D3B3] text-sm">{r.customer_phone}</span>}
                {isConflicting(r) && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] uppercase tracking-widest">
                    <AlertTriangle className="w-3 h-3" /> Çakışma
                  </span>
                )}
              </p>
              <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {r.route_from ?? '—'} ➔ {r.route_to ?? '—'}
              </p>
              <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" /> {fmt.format(new Date(start))} – {fmt.format(new Date(end))}
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                {r.drivers?.name ?? 'Sürücü atanmadı'} · {r.vehicles?.name ?? 'Araç atanmadı'}
              </p>
            </div>
            <div className="text-right flex flex-col justify-between items-end">
              <span className="text-xl text-white font-serif">{r.price_agreed ? `€${r.price_agreed}` : '—'}</span>
              {r.status === 'planned' ? (
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setStatus(r.id, 'done')} className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs">Tamamlandı</button>
                  <button onClick={() => setStatus(r.id, 'cancelled')} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-xs">İptal</button>
                </div>
              ) : (
                <span className={`px-4 py-2 rounded-xl text-xs mt-4 ${r.status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {r.status === 'done' ? 'Tamamlandı' : 'İptal'}
                </span>
              )}
            </div>
          </div>
        );
      })}
      {rows.length === 0 && <p className="text-zinc-500 text-sm">Henüz görev yok.</p>}
    </div>
  );
}
```

- [ ] **Step 2: Görevler sekmesine bağla**

`src/app/admin/page.tsx` içinde:

```tsx
const [refreshKey, setRefreshKey] = useState(0);
...
{activeTab === 'gorevler' && (
  <div className="space-y-8">
    <AssignmentForm onSaved={() => setRefreshKey((k) => k + 1)} />
    <AssignmentList refreshKey={refreshKey} />
  </div>
)}
```

- [ ] **Step 3: Doğrula**

Görev ekle → listede anında görünür. "İptal" → durum değişir ve Task 7'deki 6. senaryoda artık uyarı üretmez.

Rozet kontrolü: Task 7'de bilerek kaydettiğin çakışan iki görevin **ikisinde de** turuncu "Çakışma" rozeti görünmeli. Birini iptal et → rozet ikisinden de kalkar.

- [ ] **Step 4: Commit**

```bash
git add easy-vip-transfer/src/components/admin/AssignmentList.tsx easy-vip-transfer/src/app/admin/page.tsx
git commit -m "feat(admin): add assignment list with status actions"
```

---

### Task 9: Ücretler ekranı

**Files:**
- Create: `easy-vip-transfer/src/components/admin/PaymentsPanel.tsx`
- Modify: `easy-vip-transfer/src/app/admin/page.tsx`

**Interfaces:**
- Consumes: `assignments` tablosu (`price_agreed`, `price_paid`, `payment`, `status`)
- Produces: `<PaymentsPanel />`

- [ ] **Step 1: Bileşeni yaz**

`src/components/admin/PaymentsPanel.tsx`:

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PaymentsPanel() {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState('');
  const supabase = createClient();

  const load = async () => {
    const { data, error } = await supabase
      .from('assignments')
      .select('id,customer_name,price_agreed,price_paid,payment,status')
      .neq('status', 'cancelled')
      .order('created_at', { ascending: false });
    if (error) { setError(error.message); return; }
    setRows(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const savePaid = async (id: string, paid: number) => {
    const row = rows.find((r) => r.id === id);
    const agreed = Number(row?.price_agreed ?? 0);
    const payment = paid <= 0 ? 'unpaid' : paid >= agreed ? 'paid' : 'partial';

    const { error } = await supabase.from('assignments').update({ price_paid: paid, payment }).eq('id', id);
    if (error) { setError(error.message); return; }
    load();
  };

  const openTotal = rows.reduce((acc, r) => acc + Math.max(0, Number(r.price_agreed ?? 0) - Number(r.price_paid ?? 0)), 0);

  return (
    <div className="space-y-8">
      <header className="mb-6"><h1 className="text-3xl font-serif text-white">Ücretler</h1></header>

      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] max-w-sm">
        <p className="text-xs uppercase text-zinc-500 mb-2">Toplam Alacak</p>
        <p className="text-4xl text-[#E5D3B3]">€{openTotal.toFixed(2)}</p>
      </div>

      <div className="space-y-3">
        {rows.map((r) => {
          const owed = Math.max(0, Number(r.price_agreed ?? 0) - Number(r.price_paid ?? 0));
          return (
            <div key={r.id} className="flex justify-between items-center p-5 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <div>
                <p className="text-white">{r.customer_name}</p>
                <p className="text-zinc-500 text-sm">
                  Anlaşılan €{r.price_agreed ?? 0} · Kalan <span className={owed > 0 ? 'text-amber-400' : 'text-emerald-400'}>€{owed.toFixed(2)}</span>
                </p>
              </div>
              <input
                type="number"
                defaultValue={r.price_paid ?? 0}
                onBlur={(e) => savePaid(r.id, Number(e.target.value))}
                className="w-32 bg-black border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
              />
            </div>
          );
        })}
        {rows.length === 0 && <p className="text-zinc-500 text-sm">Kayıt yok.</p>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Sekmeye bağla**

```tsx
{activeTab === 'ucretler' && <PaymentsPanel />}
```

- [ ] **Step 3: Doğrula**

Anlaşılan ücreti €100 olan bir göreve €40 gir → "Kalan €60", rozet `partial`. €100 gir → "Kalan €0", rozet `paid`. Toplam alacak buna göre güncellenir.

- [ ] **Step 4: Commit**

```bash
git add easy-vip-transfer/src/components/admin/PaymentsPanel.tsx easy-vip-transfer/src/app/admin/page.tsx
git commit -m "feat(admin): add payment tracking panel"
```

---

### Task 10: Eski kodun temizliği ve derleme doğrulaması

**Files:**
- Delete: `easy-vip-transfer/src/app/api/book/route.ts`
- Delete: `easy-vip-transfer/src/lib/supabase/server.ts`
- Modify: `easy-vip-transfer/package.json`

**Interfaces:**
- Consumes: Task 4–9'un tamamlanmış olması
- Produces: yok (temizlik)

- [ ] **Step 1: Ölü kodu sil**

```bash
cd easy-vip-transfer
rm src/app/api/book/route.ts
rm src/lib/supabase/server.ts
npm uninstall resend
```

`src/lib/supabase/server.ts` yalnızca silinen rota tarafından kullanılıyordu; oturum işini Task 3'teki `src/lib/supabase/middleware.ts` yapıyor.

- [ ] **Step 2: Kalan referansları ara**

```bash
grep -rn "vip_bookings\|vip_settings\|vip_vehicles\|vip_locations\|easyvip_admin_auth\|RESEND\|api/book" src/
```

Beklenen: çıktı yok. Varsa ilgili dosyadan temizle.

- [ ] **Step 3: `.env` dosyasını sadeleştir**

`RESEND_API_KEY` satırı kaldırılır. Kalanlar: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`.

- [ ] **Step 4: Testler ve derleme**

```bash
npm test && npm run build
```

Beklenen: testler PASS, build `Compiled successfully` ve `✓ Generating static pages`. Rota listesinde `/api/book` **görünmemeli**, `/admin` ve `/admin/giris` görünmeli.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove booking API, Resend and legacy admin tables"
```
