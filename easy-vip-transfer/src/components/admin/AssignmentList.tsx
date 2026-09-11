'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, CalendarDays, AlertTriangle, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { overlaps } from '@/lib/overlap';

const fmt = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul',
});

const parseRange = (during: string) => {
  const [s, e] = String(during).replace(/^[[(]|[)\]]$/g, '').split(',');
  return { start: s.replace(/"/g, ''), end: e.replace(/"/g, '') };
};

export default function AssignmentList({ refreshKey }: { refreshKey: number }) {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [iptalleriGoster, setIptalleriGoster] = useState(false);
  const [silinecek, setSilinecek] = useState<string | null>(null);
  const supabase = createClient();

  const load = async () => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, drivers(name), vehicles(name)')
      .order('created_at', { ascending: false });
    if (error) { setError(error.message); return; }
    setRows(data ?? []);
  };

  useEffect(() => { load(); }, [refreshKey]);

  /** Bir görev, iptal olmayan başka bir görevle aynı sürücü veya aracı paylaşıyorsa çakışmalıdır. */
  const isConflicting = (row: any) => {
    if (row.status === 'cancelled') return false;
    const a = parseRange(row.during);
    return rows.some((other) => {
      if (other.id === row.id || other.status === 'cancelled') return false;
      const sharesDriver = row.driver_id && other.driver_id === row.driver_id;
      const sharesVehicle = row.vehicle_id && other.vehicle_id === row.vehicle_id;
      if (!sharesDriver && !sharesVehicle) return false;
      const b = parseRange(other.during);
      return overlaps(a.start, a.end, b.start, b.end);
    });
  };

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('assignments').update({ status }).eq('id', id);
    if (error) { setError(error.message); return; }
    load();
  };

  /** Yanlis girilen kaydi tamamen siler. Iki adimli: once "Emin misin?"e doner. */
  const sil = async (id: string) => {
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    if (error) { setError(error.message); return; }
    setSilinecek(null);
    load();
  };

  const iptalSayisi = rows.filter((r) => r.status === 'cancelled').length;
  const gorunen = iptalleriGoster ? rows : rows.filter((r) => r.status !== 'cancelled');

  return (
    <div className="space-y-4">
      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      {iptalSayisi > 0 && (
        <label className="flex items-center justify-end gap-2 text-xs text-zinc-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={iptalleriGoster}
            onChange={(e) => setIptalleriGoster(e.target.checked)}
            className="w-3.5 h-3.5 accent-[#E5D3B3]"
          />
          İptal edilenleri göster ({iptalSayisi})
        </label>
      )}

      {gorunen.map((r) => {
        const { start, end } = parseRange(r.during);
        return (
          <div key={r.id} className="flex justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
            <div>
              <p className="text-white text-lg flex items-center gap-2">
                {r.customer_name}
                {r.customer_phone && <span className="text-[#E5D3B3] text-sm">{r.customer_phone}</span>}
                {isConflicting(r) && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] uppercase tracking-widest">
                    <AlertTriangle className="w-3 h-3" /> Çakışma
                  </span>
                )}
              </p>
              <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {r.route_from ?? '—'} ➔ {r.route_to ?? '—'}
              </p>
              <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" /> {fmt.format(new Date(start))} – {fmt.format(new Date(end))}
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                {r.drivers?.name ?? 'Sürücü atanmadı'} · {r.vehicles?.name ?? 'Araç atanmadı'}
              </p>
            </div>
            <div className="text-right flex flex-col justify-between items-end">
              <span className="text-xl text-white font-serif">{r.price_agreed ? `€${r.price_agreed}` : '—'}</span>
              {r.status === 'planned' ? (
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setStatus(r.id, 'done')} className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs">Tamamlandı</button>
                  <button onClick={() => setStatus(r.id, 'cancelled')} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-xs">İptal</button>
                </div>
              ) : (
                <span className={`px-4 py-2 rounded-xl text-xs mt-4 ${r.status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {r.status === 'done' ? 'Tamamlandı' : 'İptal'}
                </span>
              )}

              {silinecek === r.id ? (
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[11px] text-zinc-400">Kalıcı olarak silinsin mi?</span>
                  <button onClick={() => sil(r.id)} className="px-3 py-1.5 rounded-lg bg-red-500/25 text-red-300 text-[11px] font-medium">Sil</button>
                  <button onClick={() => setSilinecek(null)} className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-[11px]">Vazgeç</button>
                </div>
              ) : (
                <button
                  onClick={() => setSilinecek(r.id)}
                  className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Sil
                </button>
              )}
            </div>
          </div>
        );
      })}
      {gorunen.length === 0 && (
        <p className="text-zinc-500 text-sm">
          {rows.length === 0 ? 'Henüz görev yok.' : 'Aktif görev yok.'}
        </p>
      )}
    </div>
  );
}
