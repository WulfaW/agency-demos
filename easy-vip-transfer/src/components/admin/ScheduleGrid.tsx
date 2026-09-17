'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, Car, User, X, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { parseRange, dayBounds, placeInDay, assignLanes, istanbulToday } from '@/lib/schedule';
import DayPicker from './DayPicker';

const TZ = 'Europe/Istanbul';
const HOUR_PX = 72;
const LANE_PX = 46;
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
type Mode = 'driver' | 'vehicle';

export default function ScheduleGrid({ refreshKey }: { refreshKey: number }) {
  const [date, setDate] = useState(istanbulToday);
  const [mode, setMode] = useState<Mode>('driver');
  const [drivers, setDrivers] = useState<Resource[]>([]);
  const [vehicles, setVehicles] = useState<Resource[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const day = useMemo(() => dayBounds(date), [date]);

  const load = async () => {
    setError('');
    const range = `[${day.start.toISOString()},${day.end.toISOString()})`;
    const [d, v, a] = await Promise.all([
      supabase.from('drivers').select('id,name,is_active').order('name'),
      supabase.from('vehicles').select('id,name,is_active').order('name'),
      supabase
        .from('assignments')
        .select('*, drivers(name), vehicles(name)')
        .neq('status', 'cancelled')
        .overlaps('during', range),
    ]);
    if (d.error) { setError(d.error.message); return; }
    if (v.error) { setError(v.error.message); return; }
    if (a.error) { setError(a.error.message); return; }
    setDrivers(d.data ?? []);
    setVehicles(v.data ?? []);
    setJobs(a.data ?? []);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); setSelected(null); }, [date, refreshKey]);

  const key = mode === 'driver' ? 'driver_id' : 'vehicle_id';
  const resources = mode === 'driver' ? drivers : vehicles;

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

  const setStatus = async (id: string, status: 'done' | 'cancelled') => {
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setDate(shiftDay(date, -1))} aria-label="Önceki gün" className="p-2 rounded-lg border border-border text-muted hover:text-foreground">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <DayPicker value={date} label={fmtDay.format(day.start)} onChange={setDate} />
          <button onClick={() => setDate(shiftDay(date, 1))} aria-label="Sonraki gün" className="p-2 rounded-lg border border-border text-muted hover:text-foreground">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => setDate(istanbulToday())} className="ml-2 px-3 py-1.5 rounded-lg border border-border text-xs text-muted hover:text-foreground">
            Bugün
          </button>
        </div>

        <div className="flex rounded-xl border border-border p-1" role="tablist">
          {(['driver', 'vehicle'] as Mode[]).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => { setMode(m); setSelected(null); }}
              className={`px-4 py-1.5 rounded-lg text-xs ${mode === m ? 'bg-accent text-background font-semibold' : 'text-muted hover:text-foreground'}`}
            >
              {m === 'driver' ? 'Sürücüye göre' : 'Araca göre'}
            </button>
          ))}
        </div>
      </div>

      {/* Izgara */}
      <div className="rounded-3xl border border-border bg-white/[0.02] overflow-hidden">
        <div ref={scrollRef} className="overflow-x-auto">
          <div style={{ width: 160 + 24 * HOUR_PX }}>
            {/* Saat basligi */}
            <div className="flex border-b border-border">
              <div className="sticky left-0 z-20 w-40 shrink-0 bg-background" />
              {Array.from({ length: 24 }, (_, h) => (
                <div key={h} style={{ width: HOUR_PX }} className="shrink-0 py-2 pl-2 text-[11px] text-muted border-l border-border">
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {rows.length === 0 && (
              <p className="px-6 py-10 text-sm text-muted">
                {mode === 'driver' ? 'Aktif sürücü yok.' : 'Aktif araç yok.'} Önce {mode === 'driver' ? 'Sürücüler' : 'Araçlar'} sekmesinden ekleyin.
              </p>
            )}

            {rows.map((row) => {
              const items = rowData.get(row.id) ?? [];
              const { lane, laneCount, conflicting } = assignLanes(items.map((i) => ({ id: i.job.id, start: i.start, end: i.end })));
              const height = laneCount * LANE_PX + 8;

              return (
                <div key={row.id} className="flex border-b border-border last:border-b-0">
                  <div
                    style={{ height }}
                    className={`sticky left-0 z-10 w-40 shrink-0 bg-background px-4 flex items-center text-sm ${row.id === UNASSIGNED ? 'text-accent italic' : 'text-foreground'}`}
                  >
                    <span className="truncate">{row.name}</span>
                    {!row.is_active && <span className="ml-1.5 text-[10px] text-muted">(pasif)</span>}
                  </div>

                  <div className="relative" style={{ width: 24 * HOUR_PX, height }}>
                    {Array.from({ length: 24 }, (_, h) => (
                      <div key={h} className="absolute top-0 bottom-0 border-l border-border" style={{ left: h * HOUR_PX }} />
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
                          className={`absolute px-2.5 text-left overflow-hidden border transition-colors
                            ${p.continuesBefore ? 'rounded-l-none border-l-2 border-l-dashed' : 'rounded-l-lg'}
                            ${p.continuesAfter ? 'rounded-r-none' : 'rounded-r-lg'}
                            ${clash ? 'bg-amber-500/20 border-amber-400/60 text-amber-100' : 'bg-accent/15 border-accent/40 text-foreground'}
                            ${isSel ? 'ring-2 ring-accent' : 'hover:brightness-125'}`}
                        >
                          <span className="block truncate text-xs font-medium leading-tight mt-1">
                            {p.continuesBefore && '← '}{job.customer_name}{p.continuesAfter && ' →'}
                          </span>
                          <span className="block truncate text-[10px] opacity-70 leading-tight">
                            {mode === 'driver' ? (job.vehicles?.name ?? 'Araç yok') : (job.drivers?.name ?? 'Sürücü yok')}
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
          <div className="rounded-3xl border border-border bg-white/[0.02] p-6 flex flex-wrap justify-between gap-6">
            <div className="space-y-2 text-sm">
              <p className="text-lg text-foreground">{selected.customer_name}</p>
              {selected.customer_phone && <p className="flex items-center gap-2 text-accent"><Phone className="w-3.5 h-3.5" /> {selected.customer_phone}</p>}
              <p className="flex items-center gap-2 text-muted"><MapPin className="w-3.5 h-3.5" /> {selected.route_from ?? '—'} → {selected.route_to ?? '—'}</p>
              <p className="text-muted">{fmtFull.format(new Date(start))} – {fmtFull.format(new Date(end))}</p>
              <p className="flex items-center gap-4 text-muted">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {selected.drivers?.name ?? 'Sürücü atanmadı'}</span>
                <span className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5" /> {selected.vehicles?.name ?? 'Araç atanmadı'}</span>
              </p>
              {selected.price_agreed && <p className="text-foreground">Anlaşılan: €{selected.price_agreed}</p>}
              {selected.notes && <p className="text-muted italic">{selected.notes}</p>}
            </div>

            <div className="flex flex-col items-end justify-between gap-4">
              <button onClick={() => setSelected(null)} aria-label="Kapat" className="text-muted hover:text-foreground"><X className="w-4 h-4" /></button>

              <div className="flex flex-col items-end gap-3">
                {selected.status === 'planned' ? (
                  <div className="flex gap-2">
                    <button onClick={() => setStatus(selected.id, 'done')} className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs">Tamamlandı</button>
                    <button onClick={() => setStatus(selected.id, 'cancelled')} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-xs">İptal</button>
                  </div>
                ) : (
                  <span className="px-4 py-2 rounded-xl text-xs bg-emerald-500/10 text-emerald-400">Tamamlandı</span>
                )}

                {confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted">Kalıcı olarak silinsin mi?</span>
                    <button onClick={() => remove(selected.id)} className="px-3 py-1.5 rounded-lg bg-red-500/25 text-red-300 text-[11px] font-medium">Sil</button>
                    <button onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 rounded-lg border border-border text-muted text-[11px]">Vazgeç</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-[11px] text-muted hover:text-red-400">
                    <Trash2 className="w-3 h-3" /> Sil
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
