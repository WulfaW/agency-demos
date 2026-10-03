'use client';

import React, { useState, useEffect } from 'react';
import { CalendarDays, Users, Car, LogOut, Globe, Loader2, Shield, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ResourceManager from '@/components/admin/ResourceManager';
import AssignmentForm from '@/components/admin/AssignmentForm';
import ScheduleGrid from '@/components/admin/ScheduleGrid';
import PricingManager from '@/components/admin/PricingManager';

type Tab = 'gorevler' | 'surucular' | 'araclar' | 'fiyatlar';

const navItems = [
  { id: 'gorevler', label: 'GÃ¶revler', icon: CalendarDays, desc: 'Transfer takvimi' },
  { id: 'surucular', label: 'SÃ¼rÃ¼cÃ¼ler', icon: Users, desc: 'Aktif ÅŸofÃ¶rler' },
  { id: 'araclar', label: 'AraÃ§lar', icon: Car, desc: 'Mercedes filo' },
    { id: 'fiyatlar', label: 'Fiyatlar', icon: Shield, desc: 'Vitrin fiyatları' },
] as const;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('gorevler');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/giris');
      } else {
        setIsLoading(false);
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/giris');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#E5D3B3]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200 font-sans">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.025]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* â”€â”€ Desktop Sidebar (md+) â”€â”€ */}
      <aside className="hidden md:flex w-64 border-r border-white/[0.06] bg-[#060606] flex-col fixed h-full z-20">
        <div className="px-6 py-8 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#E5D3B3]" />
            </div>
            <span className="text-white font-serif text-lg tracking-wide">Easy VIP</span>
          </div>
          <p className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase pl-[38px]">Operations Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-white/[0.06] border border-white/[0.08] text-white'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-[#E5D3B3]/15' : 'bg-white/[0.03] group-hover:bg-white/[0.05]'}`}>
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-[#E5D3B3]' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-medium ${isActive ? 'text-white' : ''}`}>{item.label}</p>
                  <p className="text-[10px] text-zinc-600 tracking-wide">{item.desc}</p>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
          <button onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-all group">
            <div className="w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-white/[0.05] transition-colors">
              <Globe className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
            </div>
            <span>Siteye DÃ¶n</span>
          </button>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-red-500/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all group">
            <div className="w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
              <LogOut className="w-4 h-4 text-red-600 group-hover:text-red-400" />
            </div>
            <span>Ã‡Ä±kÄ±ÅŸ Yap</span>
          </button>
        </div>
      </aside>

      {/* â”€â”€ Mobile Top Bar â”€â”€ */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#060606]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-[#E5D3B3]" />
          </div>
          <span className="text-white font-serif tracking-wide">Easy VIP</span>
          <span className="text-[10px] text-zinc-600 tracking-[0.15em] uppercase ml-1">Â· Panel</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => router.push('/')} className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-all">
            <Globe className="w-4 h-4" />
          </button>
          <button onClick={handleLogout} className="p-2 rounded-xl text-red-500/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* â”€â”€ Main Content â”€â”€ */}
      <main className="md:ml-64 min-h-screen pt-16 md:pt-0 pb-24 md:pb-0">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">

          {activeTab === 'gorevler' && (
            <div className="space-y-6 md:space-y-8">
              <div className="border-b border-white/[0.06] pb-4 md:pb-6 mb-2">
                <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">GÃ¶revler</h1>
                <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] mt-1">Transfer PlanlamasÄ± & Takvim</p>
              </div>
              <AssignmentForm onSaved={() => setRefreshKey((k) => k + 1)} />
              <ScheduleGrid refreshKey={refreshKey} />
            </div>
          )}

          {activeTab === 'surucular' && (
            <div>
              <div className="border-b border-white/[0.06] pb-4 md:pb-6 mb-6">
                <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">SÃ¼rÃ¼cÃ¼ler</h1>
                <div className="h-1 w-8 rounded-full bg-[#E5D3B3] mt-3" />
              </div>
              <ResourceManager table="drivers" title="SÃ¼rÃ¼cÃ¼ler" singularLabel="SÃ¼rÃ¼cÃ¼" secondLabel="Telefon" secondField="phone" />
            </div>
          )}

          {activeTab === 'araclar' && (
            <div>
              <div className="border-b border-white/[0.06] pb-4 md:pb-6 mb-6">
                <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">AraÃ§lar</h1>
                <div className="h-1 w-8 rounded-full bg-[#E5D3B3] mt-3" />
              </div>
              <ResourceManager table="vehicles" title="AraÃ§lar" singularLabel="AraÃ§" secondLabel="Plaka" secondField="plate" />
            </div>
          )}

          {activeTab === 'fiyatlar' && (
            <div>
              <div className="border-b border-white/[0.06] pb-4 md:pb-6 mb-6">
                <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">Fiyatlar</h1>
                <div className="h-1 w-8 rounded-full bg-[#E5D3B3] mt-3" />
              </div>
              <PricingManager />
            </div>
          )}
        </div>
      </main>

      {/* â”€â”€ Mobile Bottom Tab Bar â”€â”€ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#060606]/95 backdrop-blur-xl border-t border-white/[0.06] flex">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all ${
                isActive ? 'text-[#E5D3B3]' : 'text-zinc-600 active:text-zinc-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] tracking-wide font-medium">{item.label}</span>
              {isActive && <div className="absolute bottom-0 w-8 h-[2px] bg-[#E5D3B3] rounded-full" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}


