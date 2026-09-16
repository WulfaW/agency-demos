-- ============================================================
-- Migration: reservations tablosu ve RLS politikalari
-- 2026-09-16
-- ============================================================

-- 1. Tabloyu olustur (yoksa)
create table if not exists reservations (
  id             uuid primary key default gen_random_uuid(),
  name           text,
  phone          text,
  from_location  text,
  to_location    text,
  transfer_date  text,
  passengers     text,
  vehicle        text,
  extras         text,
  status         text not null default 'New',
  notes          text,
  created_at     timestamptz not null default now()
);

-- 2. RLS'i etkinlestir
alter table reservations enable row level security;

-- 3. ANON: Sadece INSERT (musteri formu)
create policy anon_insert_only on reservations
  for insert
  to anon
  with check (true);

-- 4. AUTHENTICATED (admin): Tam erisim
create policy admin_full_access on reservations
  for all
  to authenticated
  using (true)
  with check (true);
