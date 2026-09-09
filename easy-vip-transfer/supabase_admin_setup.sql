
-- Admin Tablolari ve Izinler Kurulumu
CREATE TABLE IF NOT EXISTS public.vip_settings (
    id SERIAL PRIMARY KEY,
    admin_password TEXT NOT NULL DEFAULT 'vip2026',
    contact_email TEXT,
    contact_phone TEXT
);

INSERT INTO public.vip_settings (id, admin_password) VALUES (1, 'vip2026') ON CONFLICT (id) DO NOTHING;

-- Araçlar ve Lokasyonlar için RLS (Güvenlik) Kalkanlarını kapatarak Admin panelinden yönetime izin ver:
ALTER TABLE public.vip_bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_vehicles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_locations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_settings DISABLE ROW LEVEL SECURITY;

