-- Rezervasyon formu yalnizca WhatsApp mesaji uretir; veritabanina yazmaz.
-- Gorevler admin panelinden elle girilir (assignments tablosu).
-- Bu tabloya yazan tek sey formdu; onu okuyan Musteriler ve Bildirimler
-- sekmeleri de kaldirildi. Tablo bos (0 satir) olarak dusuruldu.
-- Beraberinde sinirsiz anon insert politikasi (anon_insert_only) da kapanir.
drop table if exists reservations;
