'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, Car, User, X, Trash2, CheckCircle2, XCircle, RotateCcw, Pencil } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { parseRange, dayBounds, placeInDay, assignLanes, istanbulToday } from '@/lib/schedule';
import DayPicker from './DayPicker';
import JobEditModal from './JobEditModal';

const TZ = 'Europe/Istanbul';
const HOUR_PX = 96;
const LANE_PX = 64;
const UNASSIGNED = '__unassigned__';

const shiftDay = (date: string, n: number) => {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

const fmtDay = new Intl.DateTimeFormat('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ });
const fmtTime = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: TZ });
const fmtFull = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: TZ });

type Resource = { id: string; name: string; is_active: boolean };

export default function ScheduleGrid({ refreshKey }: { refreshKey: number }) {
  const [date, setDate] = useState(istanbulToday);
  const [drivers, setDrivers] = useState<Resource[]>([]);
  const [vehicles, setVehicles] = useState<Resource[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [editingJob, setEditingJob] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const day = useMemo(() => dayBounds(date), [date]);

  const MOCK_DRIVERS = [
    { id: 'mock-1', name: 'Mehmet Yılmaz', is_active: true },
    { id: 'mock-2', name: 'Ahmet Kaya', is_active: true },
    { id: 'mock-3', name: 'Can Demir', is_active: true },
  ];

  const load = async () => {
    setError('');
    const range = `[${day.start.toISOString()},${day.end.toISOString()})`;
    const [d, v, a] = await Promise.all([
      supabase.from('drivers').select('id,name,is_active').order('name'),
      supabase.from('vehicles').select('id,name,is_active').eq('is_active', true).order('name'),
      supabase
        .from('assignments')
        .select('*, drivers(name), vehicles(name)')
        .overlaps('during', range),
    ]);
    setDrivers((d.data && d.data.length > 0) ? d.data : MOCK_DRIVERS);
    setVehicles(v.data ?? []);
    setJobs(a.data ?? []);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); setSelected(null); }, [date, refreshKey]);

  // Satirlar surucu; arac blogun icinde yazar. Ayni surucu/araca cakisan is veritabani kuraliyla engellenir.
  const key = 'driver_id';
  const resources = drivers;

  // Aktif kaynaklar + o gun isi olan pasif kaynaklar (isi olan kaynak tablodan kaybolmasin).
  const rows = useMemo(() => {
    const used = new Set(jobs.map((j) => j[key]).filter(Boolean));
    const list = resources.filter((r) => r.is_active || used.has(r.id));
    const unassigned = jobs.some((j) => !j[key]);
    return unassigned ? [{ id: UNASSIGNED, name: 'Atanmamış', is_active: true }, ...list] : list;
  }, [resources, jobs, key]);

  const rowData = useMemo(() => {
    const map = new Map<string, { job: any; start: string; end: string }[]>();
    for (const job of jobs) {
      const rowId = job[key] ?? UNASSIGNED;
      const { start, end } = parseRange(job.during);
      if (!map.has(rowId)) map.set(rowId, []);
      map.get(rowId)!.push({ job, start, end });
    }
    return map;
  }, [jobs, key]);

  // Acilista ilk isin saatine, is yoksa bugun icin su anki saate kaydir.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const earliest = jobs
      .map((j) => placeInDay(parseRange(j.during).start, parseRange(j.during).end, day)?.leftPct)
      .filter((p): p is number => p !== undefined)
      .sort((a, b) => a - b)[0];
    let hour = 7;
    if (earliest !== undefined) hour = Math.floor((earliest / 100) * 24);
    else if (date === istanbulToday()) hour = Number(fmtTime.format(new Date()).slice(0, 2));
    el.scrollLeft = Math.max(0, (hour - 1) * HOUR_PX);
  }, [jobs, day, date]);

  const setStatus = async (id: string, status: 'planned' | 'done' | 'cancelled') => {
    const { error } = await supabase.from('assignments').update({ status }).eq('id', id);
    if (error) { setError(error.message); return; }
    setSelected(null);
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    if (error) { setError(error.message); return; }
    setSelected(null);
    setConfirmDelete(false);
    load();
  };

  const select = (job: any) => { setSelected(job); setConfirmDelete(false); };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      {/* Ust serit */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setDate(shiftDay(date, -1))} 
            aria-label="Önceki gün" 
            className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <DayPicker value={date} label={fmtDay.format(day.start)} onChange={setDate} />
          <button 
            onClick={() => setDate(shiftDay(date, 1))} 
            aria-label="Sonraki gün" 
            className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setDate(istanbulToday())} 
            className="ml-1 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-400 hover:text-white hover:border-[#E5D3B3]/30 hover:text-[#E5D3B3] transition-all"
          >
            Bugün
          </button>
        </div>
      </div>

      {/* Izgara */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        <div ref={scrollRef} className="overflow-x-auto subtle-scrollbar pb-2">
          <div style={{ width: 160 + 24 * HOUR_PX }}>
            {/* Saat basligi */}
            <div className="flex border-b border-white/[0.06]">
              <div className="sticky left-0 z-20 w-40 shrink-0 bg-[#080808]" />
              {Array.from({ length: 24 }, (_, h) => (
                <div key={h} style={{ width: HOUR_PX }} className="shrink-0 py-2 pl-2 text-[11px] text-zinc-600 border-l border-white/[0.06]">
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {rows.length === 0 && (
              <p className="px-6 py-10 text-sm text-zinc-500">
                Aktif sürücü yok. Önce Sürücüler sekmesinden ekleyin.
              </p>
            )}

            {rows.map((row) => {
              const items = rowData.get(row.id) ?? [];
              const { lane, laneCount, conflicting } = assignLanes(items.map((i) => ({ id: i.job.id, start: i.start, end: i.end })));
              const height = laneCount * LANE_PX + 8;

              return (
                <div key={row.id} className="flex border-b border-white/[0.06] last:border-b-0">
                  <div
                    style={{ height }}
                    className={`sticky left-0 z-10 w-40 shrink-0 bg-[#080808] px-4 flex items-center text-sm ${row.id === UNASSIGNED ? 'text-[#E5D3B3] italic' : 'text-zinc-300'}`}
                  >
                    <span className="truncate">{row.name}</span>
                    {!row.is_active && <span className="ml-1.5 text-[10px] text-zinc-600">(pasif)</span>}
                  </div>

                  <div className="relative" style={{ width: 24 * HOUR_PX, height }}>
                    {Array.from({ length: 24 }, (_, h) => (
                      <div key={h} className="absolute top-0 bottom-0 border-l border-white/[0.05]" style={{ left: h * HOUR_PX }} />
                    ))}

                    {items.map(({ job, start, end }) => {
                      const p = placeInDay(start, end, day);
                      if (!p) return null;
                      const clash = conflicting.has(job.id);
                      const isSel = selected?.id === job.id;
                      return (
                        <button
                          key={job.id}
                          onClick={() => select(job)}
                          title={`${job.customer_name} · ${fmtTime.format(new Date(start))}–${fmtTime.format(new Date(end))}`}
                          style={{
                            left: `${p.leftPct}%`,
                            width: `calc(${p.widthPct}% - 3px)`,
                            top: 4 + (lane.get(job.id) ?? 0) * LANE_PX,
                            height: LANE_PX - 6,
                          }}
                          className={`absolute px-2.5 text-left overflow-hidden border transition-all duration-200
                            ${p.continuesBefore ? 'rounded-l-none border-l-2 border-l-dashed' : 'rounded-l-lg'}
                            ${p.continuesAfter ? 'rounded-r-none' : 'rounded-r-lg'}
                            ${clash
                              ? 'bg-amber-500/20 border-amber-400/60 text-amber-100'
                              : job.status === 'done'
                              ? 'bg-emerald-500/25 border-emerald-400/50 text-emerald-100'
                              : job.status === 'cancelled'
                              ? 'bg-zinc-800/60 border-zinc-600/30 text-zinc-500 opacity-60'
                              : 'bg-[#E5D3B3]/10 border-[#E5D3B3]/30 text-zinc-200'}
                            ${isSel ? 'ring-2 ring-[#E5D3B3]/60 brightness-125' : 'hover:brightness-125'}`}
                        >
                          <span className={`block truncate text-xs font-semibold leading-tight mt-1 ${job.status === 'cancelled' ? 'line-through opacity-60' : ''}`}>
                            {p.continuesBefore && '← '}{job.customer_name}{p.continuesAfter && ' →'}
                            {job.status === 'done' && <span className="ml-1 text-emerald-400">✓</span>}
                            {job.status === 'cancelled' && <span className="ml-1 text-zinc-500">✕</span>}
                          </span>
                          <span className={`block truncate text-[10px] leading-tight ${job.status === 'cancelled' ? 'opacity-30 line-through' : 'opacity-60'}`}>
                            {job.vehicles?.name ?? 'Araç atanmadı'}
                            {job.route_to && ` · ${job.route_to}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detay */}
      {selected && (() => {
        const { start, end } = parseRange(selected.during);
        return (
          <>
            {editingJob && (
              <JobEditModal
                job={editingJob}
                drivers={drivers}
                vehicles={vehicles}
                onClose={() => setEditingJob(null)}
                onSaved={() => { setEditingJob(null); setSelected(null); load(); }}
              />
            )}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 flex flex-wrap justify-between gap-6">
            <div className="space-y-2 text-sm min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-lg text-white font-serif">{selected.customer_name}</p>
                <button
                  onClick={() => setEditingJob(selected)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-[#E5D3B3] hover:border-[#E5D3B3]/30 text-xs transition-all"
                >
                  <Pencil className="w-3 h-3" /> Düzenle
                </button>
              </div>
              {selected.customer_phone && <p className="flex items-center gap-2 text-[#E5D3B3]"><Phone className="w-3.5 h-3.5" /> {selected.customer_phone}</p>}
              <p className="flex items-center gap-2 text-zinc-400"><MapPin className="w-3.5 h-3.5" /> {selected.route_from ?? '—'} → {selected.route_to ?? '—'}</p>
              <p className="text-zinc-400">{fmtFull.format(new Date(start))} – {fmtFull.format(new Date(end))}</p>
              <p className="flex items-center gap-4 text-zinc-400">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {selected.drivers?.name ?? 'Sürücü atanmadı'}</span>
                <span className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5" /> {selected.vehicles?.name ?? 'Araç atanmadı'}</span>
              </p>
              {selected.price_agreed && <p className="text-white">Anlaşılan: €{selected.price_agreed}</p>}
              {selected.notes && <p className="text-zinc-500 italic">{selected.notes}</p>}
            </div>

            <div className="flex flex-col items-end justify-between gap-4">
              <button onClick={() => setSelected(null)} aria-label="Kapat" className="text-zinc-600 hover:text-white transition-colors"><X className="w-4 h-4" /></button>

              <div className="flex flex-col items-end gap-3">
                {selected.status === 'planned' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStatus(selected.id, 'done')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm font-bold hover:bg-emerald-500 hover:border-emerald-500 hover:text-black active:scale-95 transition-all duration-150 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Tamamla
                    </button>
                    <button
                      onClick={() => setStatus(selected.id, 'cancelled')}
                      className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/30 hover:border-red-500/60 active:scale-95 transition-all duration-150 flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" /> İptal
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold border ${selected.status === 'done' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                      {selected.status === 'done' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {selected.status === 'done' ? 'Tamamlandı' : 'İptal Edildi'}
                    </span>
                    <button
                      onClick={() => setStatus(selected.id, 'planned')}
                      className="p-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 active:scale-95 transition-all"
                      title="Geri Al"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-zinc-500">Kalıcı olarak silinsin mi?</span>
                    <button onClick={() => remove(selected.id)} className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-[11px] font-medium">Sil</button>
                    <button onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 rounded-lg border border-white/10 text-zinc-500 hover:text-white text-[11px] transition-colors">Vazgeç</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3 h-3" /> Sil
                  </button>
                )}
              </div>
            </div>
          </div>
          </>
        );
      })()}
    </div>
  );
}
