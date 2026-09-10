-- search_path sabitlenmezse fonksiyon, cagiran rolun search_path'ine gore
-- farkli nesneleri cozebilir. Supabase guvenlik denetcisi bunu uyari olarak veriyor.
create or replace function is_admin() returns boolean
language sql stable
set search_path = ''
as $$ select auth.role() = 'authenticated' $$;
