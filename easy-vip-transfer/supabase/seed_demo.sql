-- ============================================================
-- EASY VIP TRANSFER - Demo Seed Data
-- Supabase SQL Editor'de çalıştır
-- ============================================================

-- 1. Sürücüler
INSERT INTO drivers (name, phone, is_active) VALUES
  ('Mehmet Yılmaz', '+90 532 111 22 33', true),
  ('Ahmet Kaya',    '+90 533 444 55 66', true),
  ('Can Demir',     '+90 535 777 88 99', true)
ON CONFLICT DO NOTHING;

-- 2. Araçlar
INSERT INTO vehicles (name, plate, is_active) VALUES
  ('Mercedes Maybach S680',  '48 MVP 001', true),
  ('Mercedes Vito VIP',      '48 VIP 002', true),
  ('Mercedes Sprinter VIP',  '48 VIP 003', true)
ON CONFLICT DO NOTHING;

-- 3. Demo Transfer Görevleri (bugün için)
-- Sürücü ve araç ID'lerini yukarıdaki kayıtlardan alır
WITH
  d1 AS (SELECT id FROM drivers WHERE name = 'Mehmet Yılmaz' LIMIT 1),
  d2 AS (SELECT id FROM drivers WHERE name = 'Ahmet Kaya'    LIMIT 1),
  v1 AS (SELECT id FROM vehicles WHERE name = 'Mercedes Maybach S680' LIMIT 1),
  v2 AS (SELECT id FROM vehicles WHERE name = 'Mercedes Vito VIP'    LIMIT 1)
INSERT INTO assignments
  (driver_id, vehicle_id, during, customer_name, customer_phone, route_from, route_to, price_agreed, status, notes)
VALUES
  (
    (SELECT id FROM d1),
    (SELECT id FROM v1),
    tstzrange(
      (CURRENT_DATE + interval '08:00')::timestamptz AT TIME ZONE 'Europe/Istanbul',
      (CURRENT_DATE + interval '09:30')::timestamptz AT TIME ZONE 'Europe/Istanbul'
    ),
    'Ivan Petrov',
    '+7 900 123 45 67',
    'Milas-Bodrum Havalimanı (BJV)',
    'Yalıkavak Marina, Bodrum',
    280,
    'planned',
    'Business class, sessiz yolculuk tercihi'
  ),
  (
    (SELECT id FROM d2),
    (SELECT id FROM v2),
    tstzrange(
      (CURRENT_DATE + interval '14:00')::timestamptz AT TIME ZONE 'Europe/Istanbul',
      (CURRENT_DATE + interval '15:00')::timestamptz AT TIME ZONE 'Europe/Istanbul'
    ),
    'Sarah Johnson',
    '+44 7700 900 123',
    'The Bodrum EDITION Hotel',
    'Milas-Bodrum Havalimanı (BJV)',
    220,
    'planned',
    'Uçuş TK2134 - 16:20 kalkış'
  ),
  (
    (SELECT id FROM d1),
    (SELECT id FROM v1),
    tstzrange(
      (CURRENT_DATE + interval '17:30')::timestamptz AT TIME ZONE 'Europe/Istanbul',
      (CURRENT_DATE + interval '19:00')::timestamptz AT TIME ZONE 'Europe/Istanbul'
    ),
    'Müller Familie',
    '+49 151 234 567 89',
    'Milas-Bodrum Havalimanı (BJV)',
    'Amanruya Otel, Bodrum',
    350,
    'planned',
    '4 kişi, 6 valiz'
  );

SELECT 'Seed data başarıyla eklendi! ✓' AS result;
