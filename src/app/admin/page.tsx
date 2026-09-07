'use client';

import React, { useState, useEffect } from 'react';
import { 
  Car, 
  MapPin, 
  Euro, 
  Save, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Check, 
  ExternalLink,
  Lock,
  LogOut
} from 'lucide-react';
import { LOCATIONS, VEHICLES, CONTACT_INFO, LocationOption, VehicleOption } from '@/data/transferData';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  // States for Editable Data
  const [vehicles, setVehicles] = useState<VehicleOption[]>(VEHICLES);
  const [locations, setLocations] = useState<LocationOption[]>(LOCATIONS);
  const [contact, setContact] = useState(CONTACT_INFO);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'vehicles' | 'routes' | 'contact'>('vehicles');

  // Load from LocalStorage if available
  useEffect(() => {
    const savedVehicles = localStorage.getItem('easyvip_vehicles');
    const savedLocations = localStorage.getItem('easyvip_locations');
    const savedContact = localStorage.getItem('easyvip_contact');
    const sessionAuth = sessionStorage.getItem('easyvip_admin_auth');

    if (sessionAuth === 'true') setIsAuthenticated(true);
    if (savedVehicles) {
      try { setVehicles(JSON.parse(savedVehicles)); } catch(e) {}
    }
    if (savedLocations) {
      try { setLocations(JSON.parse(savedLocations)); } catch(e) {}
    }
    if (savedContact) {
      try { setContact(JSON.parse(savedContact)); } catch(e) {}
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'vip2026' || passcode === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('easyvip_admin_auth', 'true');
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('easyvip_admin_auth');
  };

  const handleSaveAll = () => {
    localStorage.setItem('easyvip_vehicles', JSON.stringify(vehicles));
    localStorage.setItem('easyvip_locations', JSON.stringify(locations));
    localStorage.setItem('easyvip_contact', JSON.stringify(contact));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const updateVehiclePrice = (id: string, newPrice: number) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, basePriceEur: newPrice } : v));
  };

  const updateVehicleTagline = (id: string, tagline: string) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, tagline } : v));
  };

  const updateLocationDistance = (id: string, km: number, min: number) => {
    setLocations(locations.map(l => l.id === id ? { ...l, baseDistanceKm: km, baseMinutes: min } : l));
  };

  // 1. PIN Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#030303] flex items-center justify-center p-4 relative text-zinc-100">
        <div className="w-full max-w-md backdrop-blur-2xl bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.9)] relative">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-[#E5D3B3]" />
            </div>
            <h1 className="text-2xl font-serif text-white tracking-wide">Easy VIP Yönetim Paneli</h1>
            <p className="text-xs font-sans text-zinc-500 tracking-widest uppercase mt-1">Fiyat & Rota Kontrol Merkezi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-sans tracking-widest text-zinc-400 uppercase block mb-2">
                Yönetici Şifresi
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Şifreyi giriniz (vip2026)"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5D3B3]/40 transition-colors"
                autoFocus
              />
              {passError && (
                <p className="text-xs text-rose-400 mt-2">Hatalı şifre. Lütfen tekrar deneyin.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#E5D3B3] hover:bg-white text-black font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(229,211,179,0.15)]"
            >
              Panele Giriş Yap
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300">
              <ArrowLeft className="w-3 h-3" /> Web Sitesine Geri Dön
            </a>
          </div>

        </div>
      </main>
    );
  }

  // 2. Admin Control Dashboard
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 pb-20">
      
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-[#050505] sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif font-semibold text-lg tracking-widest text-white">EASY VIP</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#E5D3B3]/10 border border-[#E5D3B3]/30 text-[#E5D3B3]">
              Yönetim Konsolu
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5D3B3] hover:bg-white text-black font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-md"
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'Kaydedildi!' : 'Değişiklikleri Kaydet'}</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-sans text-zinc-300 transition-colors"
            >
              <span>Siteyi Gör</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 border border-white/10 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-all ${
              activeTab === 'vehicles' ? 'bg-[#E5D3B3] text-black font-bold' : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" /> Araç & Fiyat Yönetimi
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-all ${
              activeTab === 'routes' ? 'bg-[#E5D3B3] text-black font-bold' : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" /> Rotalar & Mesafeler
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-all ${
              activeTab === 'contact' ? 'bg-[#E5D3B3] text-black font-bold' : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Şirket & İletişim Bilgileri
          </button>
        </div>

        {/* Tab 1: Vehicles & Pricing */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif text-white">Araç Filosu Fiyatlandırması</h2>
              <p className="text-xs text-zinc-500 font-sans tracking-wider uppercase mt-0.5">
                Her bir araç için taban başlangıç Euro (€) fiyatlarını ve açıklama metinlerini düzenleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vehicles.map((car) => (
                <div key={car.id} className="backdrop-blur-xl bg-[#0a0a0a]/90 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="h-40 rounded-xl overflow-hidden relative border border-white/5">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#E5D3B3]">
                      {car.capacity}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#E5D3B3] uppercase">{car.model}</span>
                    <h3 className="font-serif text-lg text-white font-medium">{car.name}</h3>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                      Başlangıç Fiyatı (€)
                    </label>
                    <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2">
                      <Euro className="w-4 h-4 text-[#E5D3B3]" />
                      <input
                        type="number"
                        value={car.basePriceEur}
                        onChange={(e) => updateVehiclePrice(car.id, Number(e.target.value))}
                        className="w-full bg-transparent text-white font-mono font-bold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                      Açıklama / Slogan
                    </label>
                    <textarea
                      value={car.tagline}
                      onChange={(e) => updateVehicleTagline(car.id, e.target.value)}
                      rows={2}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs text-zinc-300 focus:outline-none focus:border-white/20 resize-none font-light"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Routes & Distances */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif text-white">Bodrum Destinasyonları ve Mesafeler</h2>
              <p className="text-xs text-zinc-500 font-sans tracking-wider uppercase mt-0.5">
                Milas-Bodrum Havalimanı (BJV) kalkışlı kilometre ve ortalama sürüş sürelerini ayarlayın.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-[#0a0a0a]/90 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] border-b border-white/10 text-zinc-400 font-mono tracking-widest uppercase">
                  <tr>
                    <th className="p-4">Destinasyon Adı</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Mesafe (KM)</th>
                    <th className="p-4">Sürüş (Dakika)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-light text-zinc-300">
                  {locations.map((loc) => (
                    <tr key={loc.id} className="hover:bg-white/[0.01]">
                      <td className="p-4 font-serif text-white text-sm">{loc.name}</td>
                      <td className="p-4 font-mono text-[10px] uppercase text-[#E5D3B3]">{loc.category}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={loc.baseDistanceKm}
                          onChange={(e) => updateLocationDistance(loc.id, Number(e.target.value), loc.baseMinutes)}
                          className="w-20 bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={loc.baseMinutes}
                          onChange={(e) => updateLocationDistance(loc.id, loc.baseDistanceKm, Number(e.target.value))}
                          className="w-20 bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Company & Contact */}
        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-serif text-white">Şirket ve WhatsApp İletişim Bilgileri</h2>
              <p className="text-xs text-zinc-500 font-sans tracking-wider uppercase mt-0.5">
                Rezervasyonların yönlendirildiği telefon numarasını ve TÜRSAB resmi bilgilerini güncelleyin.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-[#0a0a0a]/90 border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                  WhatsApp & Çağrı Numarası (Uluslararası Format)
                </label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                  TÜRSAB Belge Numarası & Unvan
                </label>
                <input
                  type="text"
                  value={contact.tursabNo}
                  onChange={(e) => setContact({ ...contact, tursabNo: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                  Resmi Şirket Ticari Unvanı
                </label>
                <input
                  type="text"
                  value={contact.companyLegal}
                  onChange={(e) => setContact({ ...contact, companyLegal: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                  Adres
                </label>
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
