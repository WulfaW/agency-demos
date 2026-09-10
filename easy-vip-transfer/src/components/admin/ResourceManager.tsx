'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Row = { id: string; name: string; phone?: string | null; plate?: string | null; is_active: boolean };

export default function ResourceManager({
  table, title, secondLabel, secondField,
}: {
  table: 'drivers' | 'vehicles';
  title: string;
  secondLabel: string;
  secondField: 'phone' | 'plate';
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState('');
  const [second, setSecond] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  const load = async () => {
    const { data, error } = await supabase.from(table).select('*').order('name');
    if (error) { setError(error.message); return; }
    setRows(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name.trim()) { setError('Ad zorunlu.'); return; }
    setBusy(true); setError('');
    const { error } = await supabase.from(table).insert({ name: name.trim(), [secondField]: second.trim() || null });
    setBusy(false);
    if (error) { setError(error.message); return; }
    setName(''); setSecond(''); load();
  };

  const toggleActive = async (row: Row) => {
    const { error } = await supabase.from(table).update({ is_active: !row.is_active }).eq('id', row.id);
    if (error) { setError(error.message); return; }
    load();
  };

  return (
    <div className="space-y-8">
      <header className="mb-6"><h1 className="text-3xl font-serif text-white">{title}</h1></header>

      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad"
          className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white" />
        <input value={second} onChange={(e) => setSecond(e.target.value)} placeholder={secondLabel}
          className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white" />
        <button onClick={add} disabled={busy}
          className="bg-[#E5D3B3] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50">
          <Plus className="w-4 h-4" /> Ekle
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="flex justify-between items-center p-5 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
            <div>
              <p className={r.is_active ? 'text-white' : 'text-zinc-600 line-through'}>{r.name}</p>
              <p className="text-zinc-500 text-sm">{r[secondField] ?? '—'}</p>
            </div>
            <button onClick={() => toggleActive(r)}
              className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white text-xs flex items-center gap-2">
              <Trash2 className="w-3.5 h-3.5" /> {r.is_active ? 'Pasife Al' : 'Aktif Et'}
            </button>
          </div>
        ))}
        {rows.length === 0 && <p className="text-zinc-500 text-sm">Henüz kayıt yok.</p>}
      </div>
    </div>
  );
}
