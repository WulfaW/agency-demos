'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PaymentsPanel() {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState('');
  const supabase = createClient();

  const load = async () => {
    const { data, error } = await supabase
      .from('assignments')
      .select('id,customer_name,price_agreed,price_paid,payment,status')
      .neq('status', 'cancelled')
      .order('created_at', { ascending: false });
    if (error) { setError(error.message); return; }
    setRows(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const savePaid = async (id: string, paid: number) => {
    const row = rows.find((r) => r.id === id);
    const agreed = Number(row?.price_agreed ?? 0);
    const payment = paid <= 0 ? 'unpaid' : paid >= agreed ? 'paid' : 'partial';

    const { error } = await supabase.from('assignments').update({ price_paid: paid, payment }).eq('id', id);
    if (error) { setError(error.message); return; }
    load();
  };

  const openTotal = rows.reduce((acc, r) => acc + Math.max(0, Number(r.price_agreed ?? 0) - Number(r.price_paid ?? 0)), 0);

  return (
    <div className="space-y-8">
      <header className="mb-6"><h1 className="text-3xl font-serif text-white">Ücretler</h1></header>

      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] max-w-sm">
        <p className="text-xs uppercase text-zinc-500 mb-2">Toplam Alacak</p>
        <p className="text-4xl text-[#E5D3B3]">€{openTotal.toFixed(2)}</p>
      </div>

      <div className="space-y-3">
        {rows.map((r) => {
          const owed = Math.max(0, Number(r.price_agreed ?? 0) - Number(r.price_paid ?? 0));
          return (
            <div key={r.id} className="flex justify-between items-center p-5 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <div>
                <p className="text-white">{r.customer_name}</p>
                <p className="text-zinc-500 text-sm">
                  Anlaşılan €{r.price_agreed ?? 0} · Kalan <span className={owed > 0 ? 'text-amber-400' : 'text-emerald-400'}>€{owed.toFixed(2)}</span>
                </p>
              </div>
              <input
                type="number"
                defaultValue={r.price_paid ?? 0}
                onBlur={(e) => savePaid(r.id, Number(e.target.value))}
                className="w-32 bg-black border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
              />
            </div>
          );
        })}
        {rows.length === 0 && <p className="text-zinc-500 text-sm">Kayıt yok.</p>}
      </div>
    </div>
  );
}
