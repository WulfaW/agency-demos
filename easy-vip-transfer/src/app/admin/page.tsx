'use client';

import React, { useState, useEffect } from 'react';
import { Car, Users, Sparkles, LogOut, CalendarDays, Globe, MessageCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ResourceManager from '@/components/admin/ResourceManager';
import AssignmentForm from '@/components/admin/AssignmentForm';
import AssignmentList from '@/components/admin/AssignmentList';
import CustomersPanel from '@/components/admin/CustomersPanel';
import WhatsAppPanel from '@/components/admin/WhatsAppPanel';

type Tab = 'gorevler' | 'surucular' | 'araclar' | 'musteriler' | 'whatsapp';

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
    return <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white"><Loader2 className="w-8 h-8 animate-spin text-[#E5D3B3]" /></div>;
  }

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
            { id: 'musteriler',label: 'Müşteriler', icon: Sparkles },
            { id: 'whatsapp',  label: 'Bildirimler', icon: MessageCircle },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as Tab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${activeTab === item.id ? 'bg-white/10 text-white font-medium border border-white/5' : 'text-zinc-400 hover:bg-white/[0.02]'}`}>
              <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-[#E5D3B3]' : 'opacity-60'}`} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-white/5 mt-auto flex flex-col gap-2">
          <button onClick={() => router.push('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-400 hover:bg-white/[0.02] hover:text-white transition-colors">
            <Globe className="w-4 h-4 opacity-60" /> Siteye Dön
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-colors">
            <LogOut className="w-4 h-4" /> Çıkış Yap
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 h-screen overflow-y-auto relative z-10">

        {activeTab === 'gorevler' && (
          <div className="space-y-8">
            <header className="mb-6"><h1 className="text-3xl font-serif text-white">Görevler</h1></header>
            <AssignmentForm onSaved={() => setRefreshKey((k) => k + 1)} />
            <AssignmentList refreshKey={refreshKey} />
          </div>
        )}

        {activeTab === 'surucular' && (
          <ResourceManager table="drivers" title="Sürücüler" secondLabel="Telefon" secondField="phone" />
        )}

        {activeTab === 'araclar' && (
          <ResourceManager table="vehicles" title="Araçlar" secondLabel="Plaka" secondField="plate" />
        )}

        {activeTab === 'musteriler' && <CustomersPanel />}

        {activeTab === 'whatsapp' && <WhatsAppPanel />}

      </main>
    </div>
  );
}
