-- "Kim admin" kontrolu tek yerde: ilerde degisirse politikalar tek tek duzeltilmez
create or replace function is_admin() returns boolean
language sql stable as $$ select auth.role() = 'authenticated' $$;

alter table drivers     enable row level security;
alter table vehicles    enable row level security;
alter table assignments enable row level security;

-- anon icin hicbir politika yok: RLS acikken politikasiz rol hicbir satira erisemez.
-- Bu, Supabase panelinde e-posta ile kayit olmanin KAPALI olmasina dayanir.
create policy admin_all_drivers on drivers for all
  to authenticated using (is_admin()) with check (is_admin());

create policy admin_all_vehicles on vehicles for all
  to authenticated using (is_admin()) with check (is_admin());

create policy admin_all_assignments on assignments for all
  to authenticated using (is_admin()) with check (is_admin());
