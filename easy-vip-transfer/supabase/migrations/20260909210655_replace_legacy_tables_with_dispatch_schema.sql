-- Eski tablolar: sınırsız anon insert politikaları da bunlarla birlikte düşer
drop table if exists vip_bookings cascade;
drop table if exists vip_vehicles cascade;
drop table if exists vip_locations cascade;

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
  name       text not null,
  plate      text,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create type assignment_status as enum ('planned','done','cancelled');
create type payment_status    as enum ('unpaid','partial','paid');

create table assignments (
  id             uuid primary key default gen_random_uuid(),
  driver_id      uuid references drivers(id),
  vehicle_id     uuid references vehicles(id),
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

-- Cakisma UYARISI icin: sorguyu hizlandirir, engellemez.
-- Kasitli olarak EXCLUDE kisiti YOK -- VIP transferde dolu bir sofore/araca
-- ikinci is yazmak gecerli bir durum (tasserona paslanir), sistem sadece uyarir.
create index assignments_driver_during_idx  on assignments using gist (driver_id, during);
create index assignments_vehicle_during_idx on assignments using gist (vehicle_id, during);
create index assignments_during_idx         on assignments using gist (during);
