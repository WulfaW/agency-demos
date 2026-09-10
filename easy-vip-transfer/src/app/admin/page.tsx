'use client';

import React, { useState } from 'react';
import { Car, Users, Banknote, Sparkles, LogOut, CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ResourceManager from '@/components/admin/ResourceManager';
import AssignmentForm from '@/components/admin/AssignmentForm';

type Tab = 'gorevler' | 'surucular' | 'araclar' | 'ucretler';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('gorevler');
  const [refreshKey, setRefreshKey] = useState(0);

  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/giris');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200 font-sans flex">
      <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.03] mix-blend-difference" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      <aside className="w-64 border-r border-white/5 bg-[#080808] p-6 flex flex-col relative z-20">
        <div className="mb-12">
          <h2 className="text-xl font-serif text-white tracking-wide flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#E5D3B3]" /> Easy VIP</h2>
        </div>
        <nav className="flex-1 space-y-2">
          {[
            { id: 'gorevler',  label: 'Görevler',  icon: CalendarDays },
            { id: 'surucular', label: 'Sürücüler', icon: Users },
            { id: 'araclar',   label: 'Araçlar',   icon: Car },
            { id: 'ucretler',  label: 'Ücretler',  icon: Banknote },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as Tab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${activeTab === item.id ? 'bg-white/10 text-white font-medium border border-white/5' : 'text-zinc-400 hover:bg-white/[0.02]'}`}>
              <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-[#E5D3B3]' : 'opacity-60'}`} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-white/5 mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-400/10"><LogOut className="w-4 h-4" /> Çıkış Yap</button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 h-screen overflow-y-auto relative z-10">

        {activeTab === 'gorevler' && (
          <div className="space-y-8">
            <header className="mb-6"><h1 className="text-3xl font-serif text-white">Görevler</h1></header>
            <AssignmentForm onSaved={() => setRefreshKey((k) => k + 1)} />
          </div>
        )}

        {activeTab === 'surucular' && (
          <ResourceManager table="drivers" title="Sürücüler" secondLabel="Telefon" secondField="phone" />
        )}

        {activeTab === 'araclar' && (
          <ResourceManager table="vehicles" title="Araçlar" secondLabel="Plaka" secondField="plate" />
        )}

        {activeTab === 'ucretler' && (
          <div className="space-y-8">
            <header className="mb-6"><h1 className="text-3xl font-serif text-white">Ücretler</h1></header>
            <p className="text-zinc-500 text-sm">Yakında.</p>
          </div>
        )}

      </main>
    </div>
  );
}
