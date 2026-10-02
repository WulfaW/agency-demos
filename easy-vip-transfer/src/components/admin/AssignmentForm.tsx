'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { describeConflicts, type Busy } from '@/lib/overlap';
import { User, Car, Clock, MapPin, Phone, Euro, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { LuxuryDatePicker } from '@/components/ui/LuxuryDatePicker';
import { LuxurySelect } from '@/components/ui/LuxurySelect';
import { LOCATIONS } from '@/data/transferData';

type Option = { id: string; name: string };

const inp = 'w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E5D3B3]/40 focus:bg-white/[0.05] transition-all duration-200';

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
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const MOCK_DRIVERS: Option[] = [
    { id: 'mock-1', name: 'Mehmet Yılmaz' },
    { id: 'mock-2', name: 'Ahmet Kaya' },
    { id: 'mock-3', name: 'Can Demir' },
  ];
  const MOCK_VEHICLES: Option[] = [
    { id: 'mock-a', name: 'Mercedes Maybach S680' },
    { id: 'mock-b', name: 'Mercedes Vito VIP' },
    { id: 'mock-c', name: 'Mercedes Sprinter VIP' },
  ];

  useEffect(() => {
    (async () => {
      const [d, v] = await Promise.all([
        supabase.from('drivers').select('id,name').eq('is_active', true).order('name'),
        supabase.from('vehicles').select('id,name').eq('is_active', true).order('name'),
      ]);
      setDrivers((d.data && d.data.length > 0) ? d.data : MOCK_DRIVERS);
      setVehicles((v.data && v.data.length > 0) ? v.data : MOCK_VEHICLES);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: keyof typeof form, val: string) => {
    setForm((f) => ({ ...f, [k]: val }));
    setConflicts([]);
    setError('');
  };

  const validate = (): string | null => {
    if (!form.customerName.trim()) return 'Müşteri adı zorunlu.';
    if (!form.start || !form.end) return 'Başlangıç ve bitiş zamanı zorunlu.';
    if (new Date(form.end) <= new Date(form.start)) return 'Bitiş, başlangıçtan sonra olmalı.';
    return null;
  };

  const findConflicts = async (): Promise<string[] | null> => {
    if (!form.driverId && !form.vehicleId) return [];
    const range = `[${new Date(form.start).toISOString()},${new Date(form.end).toISOString()})`;
    let q = supabase.from('assignments').select('id,customer_name,during,driver_id,vehicle_id').neq('status', 'cancelled').overlaps('during', range);
    const ors: string[] = [];
    if (form.driverId) ors.push(`driver_id.eq.${form.driverId}`);
    if (form.vehicleId) ors.push(`vehicle_id.eq.${form.vehicleId}`);
    q = q.or(ors.join(','));
    const { data, error } = await q;
    if (error) { setError(error.message); return null; }
    const busy: Busy[] = (data ?? []).map((r) => {
      const [start, end] = String(r.during).replace(/^[[(]|[)\]]$/g, '').split(',');
      return { id: r.id, customerName: r.customer_name, start: start.replace(/"/g, ''), end: end.replace(/"/g, ''), driverId: r.driver_id, vehicleId: r.vehicle_id };
    });
    return describeConflicts(busy, { driverId: form.driverId || null, driverName: drivers.find((d) => d.id === form.driverId)?.name ?? null, vehicleId: form.vehicleId || null, vehicleName: vehicles.find((v) => v.id === form.vehicleId)?.name ?? null });
  };

  const save = async (): Promise<boolean> => {
    const { error } = await supabase.from('assignments').insert({
      driver_id: form.driverId || null, vehicle_id: form.vehicleId || null,
      during: `[${new Date(form.start).toISOString()},${new Date(form.end).toISOString()})`,
      customer_name: form.customerName.trim(), customer_phone: form.customerPhone.trim() || null,
      route_from: form.routeFrom.trim() || null, route_to: form.routeTo.trim() || null,
      price_agreed: form.priceAgreed ? Number(form.priceAgreed) : null, notes: form.notes.trim() || null,
    });
    setBusy(false);
    if (error) { setError(error.message); return false; }
    setForm({ driverId: '', vehicleId: '', start: '', end: '', customerName: '', customerPhone: '', routeFrom: '', routeTo: '', priceAgreed: '', notes: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    onSaved();
    return true;
  };

  const handleSubmit = async () => {
    const v = validate();
    if (v) { setError(v); return; }
    setBusy(true); setError(''); setConflicts([]);
    const found = await findConflicts();
    if (found === null) { setBusy(false); return; }
    const saved = await save();
    if (saved && found.length > 0) setConflicts(found);
  };

  return (
    <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
      {/* Header */}
      <div className="px-4 md:px-8 py-5 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-serif text-white tracking-wide">Yeni Görev</h2>
          <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] mt-0.5">Transfer Kaydı Oluştur</p>
        </div>
        {success && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
            <CheckCircle2 className="w-4 h-4" />
            Görev kaydedildi
          </div>
        )}
      </div>

      <div className="p-4 md:p-8 space-y-5">
        {error && (
          <div className="flex items-center gap-3 text-red-300 text-sm bg-red-500/[0.08] border border-red-500/20 rounded-2xl px-5 py-4">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Row 1: Sürücü & Araç */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-40">
          <div className="h-[56px]">
            <LuxurySelect
              label="Sürücü"
              icon={User}
              value={form.driverId}
              onChange={(val) => set('driverId', val)}
              options={[{value: '', label: 'Sürücü seçin (opsiyonel)'}, ...drivers.map((d) => ({ value: d.id, label: d.name }))]}
            />
          </div>
          <div className="h-[56px]">
            <LuxurySelect
              label="Araç"
              icon={Car}
              value={form.vehicleId}
              onChange={(val) => set('vehicleId', val)}
              options={[{value: '', label: 'Araç seçin (opsiyonel)'}, ...vehicles.map((v) => ({ value: v.id, label: v.name }))]}
            />
          </div>
        </div>

        {/* Row 2: Tarih & Saat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-[56px] relative z-50">
            <LuxuryDatePicker label="Başlangıç" value={form.start} onChange={(val) => set('start', val)} />
          </div>
          <div className="h-[56px] relative z-40">
            <LuxuryDatePicker label="Bitiş" value={form.end} onChange={(val) => set('end', val)} />
          </div>
        </div>

        {/* Row 3: Müşteri */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">Müşteri Bilgileri</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.customerName} onChange={(e) => set('customerName', e.target.value)} placeholder="Müşteri adı" className={inp} />
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
              <input
                value={form.customerPhone}
                onChange={(e) => set('customerPhone', e.target.value.replace(/[^\d\s+()]/g, ''))}
                placeholder="Telefon (Örn: +90 5XX XXX XX XX)"
                className={`${inp} pl-10`}
              />
            </div>
          </div>
        </div>

        {/* Row 4: Rota & Ücret */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-20">
          <div className="h-[56px]">
            <LuxurySelect
              icon={MapPin}
              value={form.routeFrom}
              onChange={(val) => set('routeFrom', val)}
              placeholder="Nereden"
              options={[{value: '', label: 'Nereden'}, ...LOCATIONS.map(l => ({ value: l.name, label: l.name }))]}
            />
          </div>
          <div className="h-[56px]">
            <LuxurySelect
              icon={MapPin}
              value={form.routeTo}
              onChange={(val) => set('routeTo', val)}
              placeholder="Nereye"
              options={[{value: '', label: 'Nereye'}, ...LOCATIONS.map(l => ({ value: l.name, label: l.name }))]}
            />
          </div>
        </div>
        
        {/* Row 5: Ücret & Not */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative">
            <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
            <input
              type="text"
              value={form.priceAgreed}
              onChange={(e) => set('priceAgreed', e.target.value.replace(/\D/g, ''))}
              placeholder="Anlaşılan Ücret (€)"
              className={`${inp} pl-10`}
            />
          </div>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
            <input value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Not (opsiyonel)" className={`${inp} pl-10`} />
          </div>
        </div>

        {/* Conflicts */}
        {conflicts.length > 0 && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-200 text-sm font-medium mb-1">Kaydedildi — çakışma uyarısı</p>
              {conflicts.map((c, i) => <p key={i} className="text-amber-100/70 text-xs">{c}</p>)}
            </div>
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={busy}
          className="flex items-center gap-2 bg-[#E5D3B3] hover:bg-white text-black font-bold text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-2xl transition-all duration-300 disabled:opacity-50">
          {busy ? (
            <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Kaydediliyor...</>
          ) : (
            <><CheckCircle2 className="w-4 h-4" /> Görevi Kaydet</>
          )}
        </button>
      </div>
    </div>
  );
}
