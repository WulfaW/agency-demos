'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { describeConflicts, type Busy } from '@/lib/overlap';

type Option = { id: string; name: string };

export default function AssignmentForm({ onSaved }: { onSaved: () => void }) {
  const [drivers, setDrivers] = useState<Option[]>([]);
  const [vehicles, setVehicles] = useState<Option[]>([]);
  const [form, setForm] = useState({
    driverId: '', vehicleId: '', start: '', end: '',
    customerName: '', customerPhone: '', routeFrom: '', routeTo: '',
    priceAgreed: '', notes: '',
  });
  const [conflicts, setConflicts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const [d, v] = await Promise.all([
        supabase.from('drivers').select('id,name').eq('is_active', true).order('name'),
        supabase.from('vehicles').select('id,name').eq('is_active', true).order('name'),
      ]);
      if (d.error) { setError(d.error.message); return; }
      if (v.error) { setError(v.error.message); return; }
      setDrivers(d.data ?? []);
      setVehicles(v.data ?? []);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: keyof typeof form, val: string) => {
    setForm((f) => ({ ...f, [k]: val }));
    setConflicts([]);
  };

  const validate = (): string | null => {
    if (!form.customerName.trim()) return 'Müşteri adı zorunlu.';
    if (!form.start || !form.end) return 'Başlangıç ve bitiş zamanı zorunlu.';
    if (new Date(form.end) <= new Date(form.start)) return 'Bitiş, başlangıçtan sonra olmalı.';
    return null;
  };

  /** Çakışan görevleri sorgular. Boş dizi = çakışma yok. */
  const findConflicts = async (): Promise<string[] | null> => {
    if (!form.driverId && !form.vehicleId) return [];

    const range = `[${new Date(form.start).toISOString()},${new Date(form.end).toISOString()})`;
    let q = supabase
      .from('assignments')
      .select('id,customer_name,during,driver_id,vehicle_id')
      .neq('status', 'cancelled')
      .overlaps('during', range);

    const ors: string[] = [];
    if (form.driverId) ors.push(`driver_id.eq.${form.driverId}`);
    if (form.vehicleId) ors.push(`vehicle_id.eq.${form.vehicleId}`);
    q = q.or(ors.join(','));

    const { data, error } = await q;
    if (error) { setError(error.message); return null; }

    const busy: Busy[] = (data ?? []).map((r) => {
      const [start, end] = String(r.during).replace(/^[[(]|[)\]]$/g, '').split(',');
      return {
        id: r.id,
        customerName: r.customer_name,
        start: start.replace(/"/g, ''),
        end: end.replace(/"/g, ''),
        driverId: r.driver_id,
        vehicleId: r.vehicle_id,
      };
    });

    return describeConflicts(busy, {
      driverId: form.driverId || null,
      driverName: drivers.find((d) => d.id === form.driverId)?.name ?? null,
      vehicleId: form.vehicleId || null,
      vehicleName: vehicles.find((v) => v.id === form.vehicleId)?.name ?? null,
    });
  };

  const save = async (): Promise<boolean> => {
    const { error } = await supabase.from('assignments').insert({
      driver_id: form.driverId || null,
      vehicle_id: form.vehicleId || null,
      during: `[${new Date(form.start).toISOString()},${new Date(form.end).toISOString()})`,
      customer_name: form.customerName.trim(),
      customer_phone: form.customerPhone.trim() || null,
      route_from: form.routeFrom.trim() || null,
      route_to: form.routeTo.trim() || null,
      price_agreed: form.priceAgreed ? Number(form.priceAgreed) : null,
      notes: form.notes.trim() || null,
    });

    setBusy(false);
    if (error) { setError(error.message); return false; }

    setForm({ driverId: '', vehicleId: '', start: '', end: '', customerName: '',
      customerPhone: '', routeFrom: '', routeTo: '', priceAgreed: '', notes: '' });
    onSaved();
    return true;
  };

  const handleSubmit = async () => {
    const v = validate();
    if (v) { setError(v); return; }

    setBusy(true); setError(''); setConflicts([]);
    // Cakisma kaydi durdurmaz; kullanici isterse ust uste is yazabilir. Sadece not duser.
    const found = await findConflicts();
    if (found === null) { setBusy(false); return; }

    const saved = await save();
    if (saved && found.length > 0) setConflicts(found);
  };

  const input = 'w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm';

  return (
    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] space-y-4">
      <h2 className="text-xl font-serif text-white">Yeni Görev</h2>

      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select value={form.driverId} onChange={(e) => set('driverId', e.target.value)} className={input}>
          <option value="">Sürücü seçin (opsiyonel)</option>
          {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select value={form.vehicleId} onChange={(e) => set('vehicleId', e.target.value)} className={input}>
          <option value="">Araç seçin (opsiyonel)</option>
          {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>

        <label className="text-[10px] uppercase tracking-widest text-zinc-500">Başlangıç
          <input type="datetime-local" value={form.start} onChange={(e) => set('start', e.target.value)} className={`${input} mt-1 [color-scheme:dark]`} />
        </label>
        <label className="text-[10px] uppercase tracking-widest text-zinc-500">Bitiş
          <input type="datetime-local" value={form.end} onChange={(e) => set('end', e.target.value)} className={`${input} mt-1 [color-scheme:dark]`} />
        </label>

        <input value={form.customerName} onChange={(e) => set('customerName', e.target.value)} placeholder="Müşteri adı" className={input} />
        <input value={form.customerPhone} onChange={(e) => set('customerPhone', e.target.value)} placeholder="Telefon" className={input} />
        <input value={form.routeFrom} onChange={(e) => set('routeFrom', e.target.value)} placeholder="Nereden" className={input} />
        <input value={form.routeTo} onChange={(e) => set('routeTo', e.target.value)} placeholder="Nereye" className={input} />
        <input type="number" value={form.priceAgreed} onChange={(e) => set('priceAgreed', e.target.value)} placeholder="Anlaşılan ücret (€)" className={input} />
        <input value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Not" className={input} />
      </div>

      {conflicts.length > 0 && (
        <div role="status" className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5 space-y-2">
          <p className="text-amber-200 text-sm font-medium">Kaydedildi — not: bu saatlerde çakışma var</p>
          {conflicts.map((c, i) => (
            <p key={i} className="text-amber-100/80 text-sm">{c}</p>
          ))}
          <p className="text-muted text-xs pt-1">Takvimde bu işler üst üste amber blok olarak görünür.</p>
        </div>
      )}

      <button onClick={handleSubmit} disabled={busy}
        className="bg-accent text-background px-8 py-3 rounded-xl font-bold disabled:opacity-50">
        {busy ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
    </div>
  );
}
