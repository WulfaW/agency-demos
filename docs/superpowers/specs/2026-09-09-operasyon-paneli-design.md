# Easy VIP Transfer — Operasyon Paneli (Dispatch) Tasarımı

Tarih: 2026-09-09
Durum: Tasarım onaylandı, implementasyon bekliyor
Backend sorumlusu: Alper

## 1. Problem

Sürücü ve araç ataması şu an defterde tutuluyor. Panel bunu devralacak: kim, hangi araçla, ne zaman, kaça. Ayrıca aynı sürücünün veya aracın aynı saate iki kez yazıldığını **fark ettirecek**.

Örnek: Ahmet + Mercedes, 27 Aralık 10:00–15:00 girili. Ahmet'i aynı saatlerde başka bir araca yazmak isteyen kullanıcı uyarı görecek — ama isterse yine de kaydedebilecek.

## 2. Sektör kuralı: engelleme, uyar

Taksi veya otobüs firmalarında dolu saati kapatmak doğrudur; araç fiziksel olarak yoktur. **VIP transferde değildir.**

Kendi Vito'nuz doluyken gelen kârlı işi reddetmek yerine, partner/taşeron firmadan o saate boş araç bulunur ve iş paslanır. Araç hiç bulunamazsa müşteriye WhatsApp'tan dönülür ve saat kaydırılarak satış kurtarılmaya çalışılır.

Partner aracı ayrı bir kavram olarak modellenmiyor: taşerondan araç alındığında o araç panelden filoya eklenir ve normal bir araç gibi kullanılır. Araç ve sürücü ekleme/çıkarma tamamen bu panelden yapıldığı için müsaitlik de böyle sağlanır.

Bu yüzden:

- **Sistem hiçbir kaydı reddetmez.** Çakışma uyarı olarak gösterilir, kullanıcı onaylayıp devam edebilir.
- **Sitede müsaitlik gösterilmez.** Hiçbir araç "dolu" görünmez, her talep alınır. (Mevcut tasarımla zaten uyumlu: form yalnızca WhatsApp mesajı üretiyor, müsaitlik sorgusu yok.)
- Çakışma bir hata değil, **bilgidir**: "kendi aracım dolu, bunu partnere vereceğim" demektir.

## 3. Kapsam dışı (alınmış kararlar)

- **Sitedeki form panele bağlanmayacak.** VIP transferde her talep birebir konuşuluyor; form yalnızca WhatsApp mesaj taslağı üretiyor.
- **Canlı destek (Crisp)** ayrı iş, ekipte.
- **Mobil uyum** siteye son hali verildikten sonra.
- **Yorum toplama ve moderasyonu** bu panelin üstüne sonradan binecek, ayrı tasarım turu.

## 4. Veri modeli

```sql
create table drivers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create table vehicles (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,          -- "Mercedes Vito VIP"
  plate      text,                   -- "48 ABC 123"
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create type assignment_status as enum ('planned','done','cancelled');
create type payment_status    as enum ('unpaid','partial','paid');

create table assignments (
  id             uuid primary key default gen_random_uuid(),
  driver_id      uuid references drivers(id),    -- sonradan atanabilir
  vehicle_id     uuid references vehicles(id),   -- sonradan atanabilir
  during         tstzrange not null,
  customer_name  text not null,
  customer_phone text,
  route_from     text,
  route_to       text,
  price_agreed   numeric(10,2),                  -- müşteriden alınacak
  price_paid     numeric(10,2) not null default 0,
  status         assignment_status not null default 'planned',
  payment        payment_status    not null default 'unpaid',
  notes          text,
  created_at     timestamptz not null default now()
);
```

Notlar:

- `driver_id` ve `vehicle_id` **zorunlu değil**; iş önce alınıp atama sonradan yapılabilir.
- `during` bir zaman **aralığı**; aynı gün içinde de olabilir, birden fazla güne de yayılabilir. Şehirlerarası işler için ek bir şey gerekmiyor.
- Taşeron araçları filoya normal araç olarak eklenir. Bu tablo yalnızca panele aittir — sitedeki filo vitrini `transferData.ts`'ten besleniyor, yani panele eklenen partner aracı sitede **görünmez**.
- Silme yerine `is_active = false`: işten ayrılan sürücünün geçmiş görevleri bozulmasın.

### Saat dilimi

`timestamptz` kullanılıyor, admin yerel saat (Europe/Istanbul) giriyor. Dönüşüm giriş anında yapılmalı; naif `timestamp` kullanılırsa yaz saati geçişlerinde saat hesabı bozulur.

## 5. Çakışma uyarısı

Veritabanı kısıtı **kullanılmıyor**. Çakışma yasak olmadığı için kilitlenecek bir şey yok; kayıt sırasında sorgu yeterli.

Kaydetmeden önce, seçilen sürücü ve araç için çakışan görevler sorgulanır:

```sql
select id, customer_name, during, vehicle_id, driver_id
from assignments
where status <> 'cancelled'
  and during && $1
  and (driver_id = $2 or vehicle_id = $3);
```

Sonuç varsa kullanıcıya gösterilir ve onay istenir:

> ⚠ **Ahmet** 27 Aralık 10:00–15:00 arasında **Mercedes** ile dolu (müşteri: Yılmaz).
>
> ☐ Çakışmayı biliyorum
>
> [ Geri Al ]  [ Devam Et ]

İki seçenek var:

- **Geri Al** — kayıt yapılmaz, forma dönülür. Sürücü/araç/saat değiştirilebilir.
- **Devam Et** — kayıt yapılır. Kutucuk işaretlenene kadar bu buton pasif kalır.

Amaç engellemek değil, yanlışlıkla geçilmesini önlemek: kullanıcı çakışmayı gördüğünü açıkça beyan eder.

Aralıklar `[)` sınırlı: 10:00–15:00 ile 15:00–18:00 çakışmaz, arka arkaya iş uyarı üretmez.

Sorgu için iki GiST indeksi:

```sql
create extension if not exists btree_gist;
create index on assignments using gist (driver_id, during);
create index on assignments using gist (vehicle_id, during);
```

## 6. Ücret takibi

Ayrı tablo gerekmiyor, `assignments` üzerinden çıkıyor:

- **Alacak** = `price_agreed - price_paid`
- **Açık hesaplar** = `price_agreed > price_paid and status <> 'cancelled'`
- **Dönem cirosu** = tamamlanmış görevlerin `price_paid` toplamı

## 7. Yetkilendirme

Supabase Auth. Admin siteden giriş yapar, Supabase panelini hiç açmaz.

**Kurulum (bir kerelik):** Supabase'de admin kullanıcısı oluşturulur ve **e-posta ile kayıt olma kapatılır**. Bu ayar şu an açık (`disable_signup: false`) — açık kaldığı sürece herkes anon key ile hesap açıp yetki kazanabilir.

"Kim admin" kontrolü tek yerde toplanıyor ki ilerde müşteri üyeliği eklenirse politikalar tek tek düzeltilmesin:

```sql
create or replace function is_admin() returns boolean
language sql stable as $$ select auth.role() = 'authenticated' $$;
```

Üç tabloda da RLS açık, anon'a hiçbir izin yok:

```sql
alter table drivers     enable row level security;
alter table vehicles    enable row level security;
alter table assignments enable row level security;

create policy admin_all on assignments for all
  to authenticated using (is_admin()) with check (is_admin());
-- drivers ve vehicles için aynısı
```

`/admin` middleware ile korunacak; oturum yoksa giriş ekranına yönlendirilir.

### Kaldırılacak

- `passcode === 'admin'` arka kapısı
- `'vip2026'` sabit şifresi
- `localStorage.easyvip_admin_auth` ile giriş
- Çalışmayan "Şifreyi Güncelle" bölümü (`vip_settings` tablosu veritabanında yok)

Şifre sıfırlama Supabase'in kendi akışına bırakılıyor.

## 8. Panel ekranları

| Ekran | İçerik |
|---|---|
| Sürücüler | Liste, ekle/düzenle, pasife al |
| Araçlar | Liste, ekle/düzenle, pasife al |
| Görevler | Gün/hafta görünümü, görev ekle/düzenle, çakışma uyarısı |
| Ücretler | Açık hesaplar, alacak toplamı |

Görev formu: sürücü, araç, **başlangıç tarih+saati**, **bitiş tarih+saati**, müşteri adı ve telefonu, güzergâh, anlaşılan ücret, not.

Başlangıç ve bitiş ayrı birer tarih-saat alanı (tek tarih + iki saat değil). Böylece aynı gün içindeki transfer de, gece devreden ya da birkaç gün süren şehirlerarası iş de (İzmir, Marmaris, Göcek) aynı formla girilir. Gün görünümü çok günlük işleri kapsadıkları her günde gösterir.

Çakışan görevler listede rozetle işaretlenir — engellenmez, görünür olur.

`prompt()` zinciri kullanılmayacak; tarih/saat girişi gerçek form alanlarıyla yapılacak.

## 9. Hata görünürlüğü — tekrar eden kusur

Bu kod tabanında aynı hata üç kez tekrarlandı: Supabase çağrısının dönüşü kontrol edilmeden başarı mesajı gösteriliyor.

1. "Şifre güncellendi!" — `vip_settings` tablosu yok, upsert başarısız
2. `/api/book` — RLS insert'i reddediyor, hata `try/catch` içinde yutuluyor
3. "Rezervasyon Eklendi!" (`f153346`) — aynı RLS reddi, `.then()` içinde koşulsuz `alert`

Kural: **her Supabase çağrısında `error` kontrol edilecek**, hata varsa kullanıcıya gösterilecek.

## 10. Doğrulama

Uyarı mantığı işin can alıcı yeri. Altı senaryo:

1. Ahmet + Mercedes, 10:00–15:00 → kaydedilir, uyarı yok
2. Ahmet + Audi, 12:00–14:00 → **uyarı** (sürücü dolu); kutucuk işaretlenmeden *Devam Et* pasif, işaretlenince kaydedilir
3. Mehmet + Mercedes, 12:00–14:00 → **uyarı** (araç dolu); aynı şekilde
4. Uyarıda *Geri Al* seçilir → kayıt oluşmaz, forma dönülür
5. Ahmet + Audi, 15:00–18:00 → uyarı yok (bitişik aralık, çakışma değil)
6. 1 numaralı kayıt `cancelled` yapılır, 2 tekrar denenir → uyarı gösterilmez

Hiçbir senaryoda kayıt engellenmez. Test edilen şey uyarının doğru anda çıkması ve yanlış anda çıkmaması.

## 11. Kapsam dışı bırakılanlar

Karara bağlandı, yapılmayacak:

- **Sürücü hakedişi takibi yok.** Sistem basit tutuluyor; yalnızca müşteriden tahsilat tutuluyor.
- **Taşeron maliyeti kaydedilmiyor.** Kullanıcılar taşeron aracını filoya ekleyip çıkararak kendileri yönetiyor.
