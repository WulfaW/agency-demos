'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Save } from 'lucide-react';

type VehicleCategory = {
  id: string;
  name: string;
  base_price_eur: number;
};

export default function PricingManager() {
  const [categories, setCategories] = useState<VehicleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('vehicle_categories').select('*').order('base_price_eur');
      if (data) setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, [supabase]);

  const handlePriceChange = (id: string, newPrice: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, base_price_eur: Number(newPrice) } : c));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const cat of categories) {
      await supabase.from('vehicle_categories').update({ base_price_eur: cat.base_price_eur }).eq('id', cat.id);
    }
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-[#E5D3B3]" /></div>;
  }

  return (
    <div className="bg-[#111] border border-white/[0.08] rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-serif text-white mb-2">Vitrin Fiyatları</h2>
      <p className="text-sm text-zinc-500 mb-6">Sitede Araç Filomuz sayfasında müşteriye gösterilen Başlangıç fiyatlarıdır.</p>

      <div className="space-y-4 mb-8">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="font-medium text-white">{cat.name}</div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">€</span>
              <input
                type="number"
                value={cat.base_price_eur}
                onChange={(e) => handlePriceChange(cat.id, e.target.value)}
                className="w-24 bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#E5D3B3]/50 text-right"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-xl bg-[#E5D3B3] hover:bg-white text-black font-bold tracking-widest uppercase text-xs transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {success ? 'Kaydedildi!' : 'Fiyatları Kaydet'}
      </button>
    </div>
  );
}
