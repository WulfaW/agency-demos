'use client';

import React, { useState, useEffect } from 'react';
import { User, Phone, ExternalLink, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Customer = {
  id: string;
  name: string;
  phone: string;
  totalTrips: number;
  lastTrip: string;
  notes: string;
  status: 'VIP' | 'Regular' | 'New';
};

export default function CustomersPanel() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('reservations').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        const formatted = data.map((d: any) => ({
          id: d.id,
          name: d.name,
          phone: d.phone,
          totalTrips: 1, // Currently just counts this reservation
          lastTrip: d.transfer_date,
          notes: d.extras !== 'None' ? d.extras : '',
          status: 'New'
        }));
        setCustomers(formatted as Customer[]);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-serif text-white flex items-center gap-3">
            Müşteriler <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">Supabase CRM Canlı</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">Supabase veritabanından çekilen müşteri ve seyahat bilgileri.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-colors gap-4">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#E5D3B3]" />
              </div>
              <div>
                <h3 className="text-white font-medium flex items-center gap-2">
                  {c.name} 
                  {c.status === 'VIP' && <Star className="w-3.5 h-3.5 text-[#E5D3B3] fill-[#E5D3B3]" />}
                </h3>
                <p className="text-zinc-400 text-sm flex items-center gap-2 mt-1">
                  <Phone className="w-3.5 h-3.5" /> {c.phone}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 text-sm">
              <div className="text-center hidden md:block">
                <div className="text-white font-medium">{c.totalTrips}</div>
                <div className="text-zinc-500 text-xs">Seyahat</div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-white font-medium">{c.lastTrip}</div>
                <div className="text-zinc-500 text-xs">Son Rzv.</div>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm transition-colors flex items-center gap-2" onClick={() => alert('Notion bağlantısı bekleniyor...')}>
                Notion'da Aç <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
