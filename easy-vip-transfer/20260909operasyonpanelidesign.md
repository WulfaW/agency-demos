# Easy VIP Transfer — Operasyon Paneli (Dispatch) Tasarımı

Tarih: 2026-09-09
Durum: Tasarım onaylandı, implementasyon bekliyor
Backend sorumlusu: Alper

## 1. Problem

Sürücü ve araç ataması şu an defterde tutuluyor. Defterin çözemediği tek şey **çakışma**: aynı sürücünün aynı saatte iki araca, ya da aynı aracın aynı saatte iki işe verilmesi. Bu panel o kontrolü otomatik yapacak, ayrıca anlaşılan/tahsil edilen ücret takibini tutacak.

Örnek (müşteri senaryosu): Ahmet + Mercedes, 27 Aralık 10:00–15:00 girildikten sonra, Ahmet'i aynı saatlerde başka bir araca vermek de, Mercedes'i başka bir işe vermek de reddedilmeli.

## 2. Kapsam dışı (alınmış kararlar)

Bunlar ayrı ayrı karara bağlandı, bu spec'e dahil değil:

- **Sitedeki rezervasyon formu panele bağlanmayacak.** VIP transferde her talep birebir konuşuluyor; form yalnızca WhatsApp mesaj taslağı üretiyor. Veritabanına yazmıyor.
- **Canlı destek (Crisp)** ayrı iş, ekipte.
- **Mobil uyum** siteye son hali verildikten sonra ele alınacak.
- **Yorum toplama ve moderasyonu** bu panelin üstüne sonradan binecek, ayrı tasarım turu.

## 3. Veri modeli

Üç tablo. Sürücüler ve araçlar panelden elle giriliyor.

```sql
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
  name       text not null,          -- "Mercedes Vito VIP"
  plate      text,                   -- "48 ABC 123"
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create type assignment_status as enum ('planned','done','cancelled');
create type payment_status    as enum ('unpaid','partial','paid');

create table assignments (
  id             uuid primary key default gen_random_uuid(),
  driver_id      uuid not null references drivers(id),
  vehicle_id     uuid not null references vehicles(id),
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
```

Silme yerine `is_active = false`: işten ayrılan sürücünün geçmiş görevleri bozulmasın.

## 4. Çakışma kuralı — tasarımın çekirdeği

Yazılım tarafında "önce sor, sonra kaydet" yaklaşımı yarış durumuna açık: iki kayıt aynı anda gelirse ikisi de "boş" cevabı alır ve ikisi de yazılır. Nadir, ama olduğunda kimse fark etmez.

PostgreSQL bunu kendisi garanti edebiliyor:

```sql
alter table assignments
  add constraint driver_no_overlap
    exclude using gist (driver_id with =, during with &&)
    where (status <> 'cancelled'),
  add constraint vehicle_no_overlap
    exclude using gist (vehicle_id with =, during with &&)
    where (status <> 'cancelled');
```

Sonuçlar:

- Uygulama tarafında çakışma kontrolü kodu **yazılmıyor**.
- Eşzamanlı istek sayısı fark etmiyor; ikinci kayıt veritabanı seviyesinde reddediliyor.
- `cancelled` görevler kuralın dışında — iptal edilen iş yeri boşaltıyor.
- `tstzrange` varsayılan olarak `[)` sınırlı: 10:00–15:00 ile 15:00–18:00 **çakışmıyor**. Arka arkaya iş verilebiliyor, ki istenen bu.

### Saat dilimi

`timestamptz` kullanılıyor, admin yerel saat (Europe/Istanbul) giriyor. Dönüşüm giriş anında yapılmalı; naif `timestamp` kullanılırsa yaz saati geçişlerinde çakışma hesabı bozulur.

### Hata mesajı

Kural ihlali `23P01` (exclusion_violation) koduyla dönüyor. Ham hata kullanıcıya gösterilmemeli. Yakalanıp çakışan kayıt sorgulanacak ve şöyle gösterilecek:

> Ahmet 27 Aralık 10:00–15:00 arasında Mercedes ile dolu.

Hangi kısıtın ihlal edildiği (`driver_no_overlap` / `vehicle_no_overlap`) mesajın sürücü mü araç mı olduğunu söyler.

## 5. Ücret takibi

Ayrı tablo gerekmiyor, `assignments` üzerinden çıkıyor:

- Alacak = `price_agreed - price_paid`
- Açık hesaplar = `price_agreed > price_paid and status <> 'cancelled'`
- Dönem cirosu = tamamlanmış görevlerin `price_paid` toplamı

`payment` alanı (`unpaid` / `partial` / `paid`) listede rozet olarak gösterilecek.

## 6. Yetkilendirme

Supabase Auth. Admin siteden giriş yapar, Supabase panelini hiç açmaz.

**Kurulum (bir kerelik):** Supabase'de admin kullanıcısı oluşturulur ve **e-posta ile kayıt olma kapatılır**. Bu ayar şu an açık (`disable_signup: false`) — açık kaldığı sürece herkes anon key ile hesap açıp yetki kazanabilir.

"Kim admin" kontrolü tek bir yerde toplanıyor ki ilerde müşteri üyeliği eklenirse beş politika tek tek düzeltilmesin:

```sql
create or replace function is_admin() returns boolean
language sql stable as $$ select auth.role() = 'authenticated' $$;
```

Her üç tabloda RLS açık, anon'a hiçbir izin yok:

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

## 7. Panel ekranları

| Ekran | İçerik |
|---|---|
| Sürücüler | Liste, ekle/düzenle, pasife al |
| Araçlar | Liste, ekle/düzenle, pasife al |
| Görevler | Gün/hafta görünümü, görev ekle/düzenle, çakışma uyarısı |
| Ücretler | Açık hesaplar, alacak toplamı |

Görev ekleme formu: sürücü (aktif olanlar), araç (aktif olanlar), tarih + başlangıç/bitiş saati, müşteri adı ve telefonu, güzergâh, anlaşılan ücret, not.

`prompt()` zinciri kullanılmayacak — tarih/saat girişi ve doğrulama gerçek form alanlarıyla yapılacak.

## 8. Hata görünürlüğü — tekrar eden kusur

Bu kod tabanında aynı hata üç kez tekrarlandı: Supabase çağrısının dönüş değeri kontrol edilmeden başarı mesajı gösteriliyor.

1. "Şifre güncellendi!" — `vip_settings` tablosu yok, upsert başarısız
2. `/api/book` — RLS insert'i reddediyor, hata `try/catch` içinde yutuluyor
3. "Rezervasyon Eklendi!" (`f153346`) — aynı RLS reddi, `.then()` içinde koşulsuz `alert`

Kural: **her Supabase çağrısında `error` kontrol edilecek**, hata varsa kullanıcıya gösterilecek. Bu paneldeki her yazma işlemi için geçerli.

## 9. Doğrulama

Çakışma kuralı işin can alıcı yeri, tek bir SQL kontrolüyle doğrulanacak:

1. Ahmet + Mercedes, 10:00–15:00 → kaydedilir
2. Ahmet + Audi, 12:00–14:00 → **reddedilmeli** (sürücü dolu)
3. Mehmet + Mercedes, 12:00–14:00 → **reddedilmeli** (araç dolu)
4. Ahmet + Audi, 15:00–18:00 → kaydedilir (bitişik, çakışmıyor)
5. 1 numaralı kayıt `cancelled` yapılır, 2 tekrar denenir → kaydedilir

Bu beş adım geçiyorsa kural doğru kurulmuş demektir.

## 10. Açık sorular

- **Sürücü/araç ataması sonradan yapılabilmeli mi?** Şu an ikisi de zorunlu. Atanmamış görev tutulacaksa alanlar nullable olur; boş değerler çakışma kuralına takılmaz, davranış doğru kalır.
- **Çok günlük işler** (İzmir/Marmaris gibi şehirlerarası) olacak mı? `tstzrange` destekliyor, ek iş gerekmiyor.
- **Sürücü hakedişi** takip edilecek mi, yoksa sadece müşteriden tahsilat mı? Şu an ikincisi varsayıldı.
