-- Dogrulama adimi (no-op): btree_gist tasindiktan sonra YENI bir gist indeksi
-- hala kurulabiliyor mu? Kurulur, dogrulanir, silinir. Semada iz birakmaz.
create index tmp_gist_check on assignments using gist (driver_id, during);
drop index tmp_gist_check;
