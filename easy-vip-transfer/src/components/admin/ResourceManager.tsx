'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, RotateCcw, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Row = { id: string; name: string; phone?: string | null; plate?: string | null; is_active: boolean };

export default function ResourceManager({
  table, title, singularLabel, secondLabel, secondField,
}: {
  table: 'drivers' | 'vehicles';
  title: string;
  singularLabel: string;
  secondLabel: string;
  secondField: 'phone' | 'plate';
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState('');
  const [second, setSecond] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pasifleriGoster, setPasifleriGoster] = useState(false);
  const supabase = createClient();

  const MOCK_DRIVERS = [
    { id: 'mock-1', name: 'Mehmet Yılmaz', phone: '+90 532 111 22 33', plate: null, is_active: true },
    { id: 'mock-2', name: 'Ahmet Kaya', phone: '+90 533 444 55 66', plate: null, is_active: true },
  ];
  const MOCK_VEHICLES = [
    { id: 'mock-a', name: 'Mercedes Maybach S680', plate: '48 ABC 123', phone: null, is_active: true },
    { id: 'mock-b', name: 'Mercedes Vito VIP', plate: '48 DEF 456', phone: null, is_active: true },
  ];

  const load = async () => {
    const { data, error } = await supabase.from(table).select('*').order('name');
    if (error || !data || data.length === 0) {
      setRows(table === 'drivers' ? MOCK_DRIVERS : MOCK_VEHICLES);
      return;
    }
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

  const pasifSayisi = rows.filter((r) => !r.is_active).length;
  const gorunen = pasifleriGoster ? rows : rows.filter((r) => r.is_active);

  const inp = 'flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E5D3B3]/40 focus:bg-white/[0.05] transition-all duration-200';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-wide">{title}</h1>
          <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] mt-1">{rows.filter(r => r.is_active).length} Aktif Kayıt</p>
        </div>
        {pasifSayisi > 0 && (
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-2 hover:bg-white/[0.06] transition-colors">
            <input
              type="checkbox"
              checked={pasifleriGoster}
              onChange={(e) => setPasifleriGoster(e.target.checked)}
              className="w-3.5 h-3.5 accent-[#E5D3B3]"
            />
            Pasif göster ({pasifSayisi})
          </label>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4">{error}</p>
      )}

      {/* Add Form */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-4">Yeni {singularLabel} Ekle</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Ad Soyad" className={inp} />
          <input value={second} onChange={(e) => setSecond(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder={secondLabel} className={inp} />
          <button onClick={add} disabled={busy}
            className="flex items-center gap-2 bg-[#E5D3B3] hover:bg-white text-black px-6 py-3 rounded-2xl font-bold text-xs tracking-[0.15em] uppercase transition-all disabled:opacity-50 flex-shrink-0">
            <Plus className="w-4 h-4" /> Ekle
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {gorunen.map((r, i) => (
          <div
            key={r.id}
            className="group flex justify-between items-center px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${r.is_active ? 'bg-[#E5D3B3]/15 text-[#E5D3B3]' : 'bg-white/5 text-zinc-600'}`}>
                {r.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={`text-sm font-medium ${r.is_active ? 'text-white' : 'text-zinc-600 line-through'}`}>{r.name}</p>
                <p className="text-zinc-500 text-xs">{r[secondField] ?? '—'}</p>
              </div>
            </div>
            <button onClick={() => toggleActive(r)}
              className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all duration-200 border border-transparent hover:border-white/10 bg-white/5 text-zinc-400 hover:text-white">
              {r.is_active ? <><Trash2 className="w-3 h-3" /> Pasife Al</> : <><RotateCcw className="w-3 h-3" /> Aktif Et</>}
            </button>
          </div>
        ))}
        {gorunen.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{rows.length === 0 ? 'Henüz kayıt yok.' : 'Aktif kayıt yok.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
