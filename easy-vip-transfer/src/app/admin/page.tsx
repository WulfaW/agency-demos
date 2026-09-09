'use client';

import React, { useState, useEffect } from 'react';
import {
  Car, MapPin, Sparkles, Plus, LogOut, LayoutDashboard, CalendarDays
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LOCATIONS, VEHICLES } from '@/data/transferData';

export default function AdminDashboard() {
  // Tabs
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'fleet'>('dashboard');

  // Data States
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  // Loading & Saving states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: bData } = await supabase.from('vip_bookings').select('*').order('created_at', { ascending: false });
      if (bData) setBookings(bData);

      const { data: vData } = await supabase.from('vip_vehicles').select('*');
      if (vData && vData.length > 0) setVehicles(vData);
      else setVehicles(VEHICLES);

      const { data: lData } = await supabase.from('vip_locations').select('*');
      if (lData && lData.length > 0) setLocations(lData);
      else setLocations(LOCATIONS);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/giris');
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await supabase.from('vip_bookings').update({ status }).eq('id', id);
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const saveFleetData = async () => {
    setIsSaving(true);
    for (const v of vehicles) {
      await supabase.from('vip_vehicles').upsert({
        id: v.id, name: v.name, model: v.model, capacity: v.capacity,
        luggage: v.luggage, base_price_eur: v.basePriceEur || v.base_price_eur,
        multiplier: v.multiplier, image_url: v.image || v.image_url, is_active: true
      });
    }
    setIsSaving(false);
    alert('Araç fiyatları kaydedildi!');
  };

  if (isLoading) return <div className="min-h-screen bg-[#030303] text-[#E5D3B3] flex justify-center items-center">Yükleniyor...</div>;

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const totalRevenue = bookings.reduce((acc, curr) => acc + (Number(curr.estimated_price) || 0), 0);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200 font-sans flex">
      <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.03] mix-blend-difference" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      <aside className="w-64 border-r border-white/5 bg-[#080808] p-6 flex flex-col relative z-20">
        <div className="mb-12">
          <h2 className="text-xl font-serif text-white tracking-wide flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#E5D3B3]" /> Easy VIP</h2>
        </div>
        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Özet Paneli', icon: LayoutDashboard },
            { id: 'bookings', label: 'Rezervasyonlar', icon: CalendarDays, badge: pendingBookings },
            { id: 'fleet', label: 'Filo & Fiyatlar', icon: Car },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm ${activeTab === item.id ? 'bg-white/10 text-white font-medium border border-white/5' : 'text-zinc-400 hover:bg-white/[0.02]'}`}>
              <div className="flex items-center gap-3"><item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-[#E5D3B3]' : 'opacity-60'}`} /> {item.label}</div>
              {item.badge !== undefined && item.badge > 0 && <span className="bg-[#E5D3B3] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-white/5 mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-400/10"><LogOut className="w-4 h-4" /> Çıkış Yap</button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 h-screen overflow-y-auto relative z-10">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in">
            <header className="mb-10"><h1 className="text-3xl font-serif text-white">Hoş Geldiniz</h1></header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]"><p className="text-xs uppercase text-zinc-500 mb-2">Toplam Talep</p><p className="text-4xl text-white">{totalBookings}</p></div>
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]"><p className="text-xs uppercase text-zinc-500 mb-2">Bekleyen Onay</p><p className="text-4xl text-[#E5D3B3]">{pendingBookings}</p></div>
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]"><p className="text-xs uppercase text-zinc-500 mb-2">Tahmini Ciro</p><p className="text-4xl text-emerald-400">€{totalRevenue}</p></div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-8 animate-in fade-in pb-20">
            <header className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-serif text-white">Rezervasyonlar</h1>
              <button 
                onClick={() => {
                  const name = prompt('Müşteri Adı:');
                  if (!name) return;
                  const phone = prompt('Telefon Numarası (WhatsApp):');
                  if (!phone) return;
                  const routeFrom = prompt('Nereden:');
                  const routeTo = prompt('Nereye:');
                  const date = prompt('Tarih & Saat:');
                  const vehicle = prompt('Araç (Vito / Sprinter / Maybach):');
                  const price = prompt('Fiyat (€):');
                  
                  const newBooking = {
                    name, phone, route_from: routeFrom, route_to: routeTo,
                    travel_date: date, vehicle, estimated_price: price,
                    status: 'confirmed'
                  };
                  
                  supabase.from('vip_bookings').insert(newBooking).then(() => {
                    alert('Rezervasyon Eklendi!');
                    fetchData();
                  });
                }}
                className="bg-[#E5D3B3] text-black px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-white transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Manuel Ekle
              </button>
            </header>
            
            <div className="space-y-4">
              {bookings.map(b => (
                <div key={b.id} className="flex justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                  <div>
                    <p className="text-white text-lg font-medium">{b.name} <span className="text-[#E5D3B3] text-sm ml-2">{b.phone}</span></p>
                    <p className="text-zinc-400 mt-1 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> {b.route_from} ➔ {b.route_to}
                    </p>
                    <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5" /> {b.travel_date} <span className="mx-2">|</span> <Car className="w-3.5 h-3.5" /> {b.vehicle}
                    </p>
                  </div>
                  <div className="text-right flex flex-col justify-between items-end">
                    <span className="text-xl text-white font-serif tracking-wide">€{b.estimated_price}</span>
                    {b.status === 'pending' ? (
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => updateBookingStatus(b.id, 'confirmed')} className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-medium transition-colors">Onayla</button>
                        <button onClick={() => updateBookingStatus(b.id, 'cancelled')} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-medium transition-colors">İptal</button>
                      </div>
                    ) : (
                      <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider mt-4 ${b.status==='confirmed'?'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20':'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {b.status === 'confirmed' ? 'Onaylandı' : 'İptal Edildi'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {bookings.length === 0 && (
                <div className="text-center py-20 text-zinc-500">Henüz rezervasyon bulunmuyor.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'fleet' && (
          <div className="space-y-8 animate-in fade-in">
            <header className="flex justify-between mb-10">
              <h1 className="text-3xl font-serif text-white">Filo & Fiyat Yönetimi</h1>
              <button onClick={saveFleetData} className="bg-[#E5D3B3] text-black px-6 py-3 rounded-xl font-bold">{isSaving ? 'Kaydediliyor...' : 'Kaydet'}</button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((v) => (
                <div key={v.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-black border border-white/5"><img src={v.image || v.image_url} className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <h3 className="text-white">{v.name}</h3>
                    <input type="number" value={v.basePriceEur || v.base_price_eur || 0} onChange={(e) => setVehicles(vehicles.map(vx => vx.id === v.id ? { ...vx, basePriceEur: Number(e.target.value), base_price_eur: Number(e.target.value) } : vx))} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
