-- Uzantilarin public semada durmasi Supabase guvenlik denetciminin uyardigi bir durum.
create schema if not exists extensions;
alter extension btree_gist set schema extensions;
