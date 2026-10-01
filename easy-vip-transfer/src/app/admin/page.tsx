'use client';

import React, { useState, useEffect } from 'react';
import { CalendarDays, Users, Car, LogOut, Globe, Loader2, Shield, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ResourceManager from '@/components/admin/ResourceManager';
import AssignmentForm from '@/components/admin/AssignmentForm';
import ScheduleGrid from '@/components/admin/ScheduleGrid';
import { DemoToast } from '@/components/admin/DemoToast';

type Tab = 'gorevler' | 'surucular' | 'araclar';

const navItems = [
  { id: 'gorevler', label: 'Görevler', icon: CalendarDays, desc: 'Transfer takvimi' },
  { id: 'surucular', label: 'Sürücüler', icon: Users, desc: 'Aktif şoförler' },
  { id: 'araclar', label: 'Araçlar', icon: Car, desc: 'Mercedes filo' },
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
    <div className="min-h-screen bg-[#030303] text-zinc-200 font-sans flex">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.025]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-64 right-0 h-px bg-gradient-to-r from-[#E5D3B3]/20 via-transparent to-transparent z-[99]" />

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/[0.06] bg-[#060606] flex flex-col fixed h-full z-20">
        {/* Brand */}
        <div className="px-6 py-8 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#E5D3B3]" />
            </div>
            <span className="text-white font-serif text-lg tracking-wide">Easy VIP</span>
          </div>
          <p className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase pl-[38px]">Operations Panel</p>
        </div>

        {/* Nav */}
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

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
          <button onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-all group">
            <div className="w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-white/[0.05] transition-colors">
              <Globe className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
            </div>
            <span>Siteye Dön</span>
          </button>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-red-500/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all group">
            <div className="w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
              <LogOut className="w-4 h-4 text-red-600 group-hover:text-red-400" />
            </div>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 h-screen overflow-y-auto relative z-10">
        <div className="p-8 md:p-12 max-w-6xl">
          {activeTab === 'gorevler' && (
            <div className="space-y-8">
              <div className="border-b border-white/[0.06] pb-6 mb-8">
                <h1 className="text-3xl font-serif text-white tracking-wide">Görevler</h1>
                <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] mt-1">Transfer Planlaması & Takvim</p>
              </div>
              <AssignmentForm onSaved={() => setRefreshKey((k) => k + 1)} />
              <ScheduleGrid refreshKey={refreshKey} />
            </div>
          )}

          {activeTab === 'surucular' && (
            <div>
              <div className="border-b border-white/[0.06] pb-6 mb-8">
                <div className="h-1 w-8 rounded-full bg-[#E5D3B3] mb-4" />
              </div>
          <ResourceManager table="drivers" title="Sürücüler" singularLabel="Sürücü" secondLabel="Telefon" secondField="phone" />
            </div>
          )}

          {activeTab === 'araclar' && (
            <div>
              <div className="border-b border-white/[0.06] pb-6 mb-8">
                <div className="h-1 w-8 rounded-full bg-[#E5D3B3] mb-4" />
              </div>
          <ResourceManager table="vehicles" title="Araçlar" singularLabel="Araç" secondLabel="Plaka" secondField="plate" />
            </div>
          )}
        </div>
      </main>
      <DemoToast />
    </div>
  );
}
