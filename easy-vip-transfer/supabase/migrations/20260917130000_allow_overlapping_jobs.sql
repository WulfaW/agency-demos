-- Cakisan isler yeniden serbest: ayni surucuye veya araca ust uste is yazilabilir.
-- Karar: kullanici isterse cakisan isi eklemeli; sistem kaydi durdurmaz.
-- Cakisma yine de gorunur kalir: takvim tablosunda ust uste binen bloklar
-- amber renkte alt alta dizilir, formda da kaydi durdurmayan bir not cikar.
alter table assignments
  drop constraint if exists driver_no_overlap,
  drop constraint if exists vehicle_no_overlap;

-- Kisitlarla birlikte onlarin gist indeksleri de gitti. Formdaki cakisma sorgusu
-- (surucu/arac + zaman araligi) icin tam indeksleri geri koy.
create index if not exists assignments_driver_during_idx  on assignments using gist (driver_id, during);
create index if not exists assignments_vehicle_during_idx on assignments using gist (vehicle_id, during);
