-- Ayni surucu veya ayni arac, cakisan saatlerde iki ise yazilamaz.
-- Onceki karar "engelleme, uyar" idi (tasserona paslamak icin). Tasseron artik
-- panelden ayri bir arac olarak eklendigi icin ayni kaynaga cakisan is yazmak
-- hic gecerli bir durum degil: bir surucu ayni anda iki arac suremez, bir arac
-- ayni anda iki yerde olamaz.
--
-- Uygulama tarafinda "once sor, sonra kaydet" iki eszamanli kayitta delinir;
-- bu kisit delinmez.
--   * iptal edilen isler kurala girmez (yer acar)
--   * atanmamis (NULL) surucu/arac hicbir isle cakismaz
--   * [) sinirlar: 10:00-15:00 ile 15:00-18:00 cakismaz
alter table assignments
  add constraint driver_no_overlap
    exclude using gist (driver_id with =, during with &&)
    where (status <> 'cancelled'),
  add constraint vehicle_no_overlap
    exclude using gist (vehicle_id with =, during with &&)
    where (status <> 'cancelled');

-- Kisitlar kendi (kismi) gist indekslerini olusturur; uygulama sorgulari zaten
-- iptalleri disarida biraktigi icin bu tam indeksler artik fazla.
drop index if exists assignments_driver_during_idx;
drop index if exists assignments_vehicle_during_idx;
