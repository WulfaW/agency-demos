'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, Save, User, Car, MapPin, Phone, DollarSign, FileText, Clock, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { LuxuryDatePicker } from '@/components/ui/LuxuryDatePicker';
import { LuxurySelect } from '@/components/ui/LuxurySelect';
import { LOCATIONS } from '@/data/transferData';

type Resource = { id: string; name: string };

interface Props {
  job: any;
  drivers: Resource[];
  vehicles: Resource[];
  onClose: () => void;
  onSaved: () => void;
}

import { parseRange } from '@/lib/schedule';

const fmtToLocal = (isoStr: string) => {
  if (!isoStr) return '';
  // Convert ISO to datetime-local format (YYYY-MM-DDTHH:MM) in Istanbul time
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return '';
  const tz = 'Europe/Istanbul';
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  }).formatToParts(d);
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
};

const localToISO = (local: string, tz = 'Europe/Istanbul') => {
  if (!local) return '';
  // Convert datetime-local string to ISO, assuming Istanbul timezone
  const [datePart, timePart] = local.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);
  // Create a date in Istanbul time
  const d = new Date(`${datePart}T${timePart}:00`);
  // Get Istanbul offset
  const offsetStr = new Intl.DateTimeFormat('en', {
    timeZone: tz,
    timeZoneName: 'shortOffset',
  }).formatToParts(d).find(p => p.type === 'timeZoneName')?.value ?? '+03:00';
  const sign = offsetStr.includes('-') ? -1 : 1;
  const [offH, offM] = offsetStr.replace('GMT', '').replace('+', '').replace('-', '').split(':').map(Number);
  const offsetMs = sign * (offH * 60 + (offM || 0)) * 60 * 1000;
  const utcMs = d.getTime() - offsetMs;
  return new Date(utcMs).toISOString();
};

export default function JobEditModal({ job, drivers, vehicles, onClose, onSaved }: Props) {
  const supabase = createClient();
  const backdropRef = useRef<HTMLDivElement>(null);

  // Parse existing values
  const { start: initStart, end: initEnd } = parseRange(job.during || '');

  const [form, setForm] = useState({
    customer_name: job.customer_name ?? '',
    customer_phone: job.customer_phone ?? '',
    route_from: job.route_from ?? '',
    route_to: job.route_to ?? '',
    driver_id: job.driver_id ?? '',
    vehicle_id: job.vehicle_id ?? '',
    price_agreed: job.price_agreed ?? '',
    notes: job.notes ?? '',
    status: job.status ?? 'planned',
    start: fmtToLocal(initStart),
    end: fmtToLocal(initEnd),
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.customer_name.trim()) { setError('Müşteri adı zorunlu.'); return; }
    if (!form.start || !form.end) { setError('Başlangıç ve bitiş tarihi zorunlu.'); return; }
    if (form.start >= form.end) { setError('Bitiş zamanı başlangıçtan sonra olmalı.'); return; }

    setSaving(true); setError('');
    const startISO = localToISO(form.start);
    const endISO = localToISO(form.end);

    const { error: err } = await supabase.from('assignments').update({
      customer_name: form.customer_name.trim(),
      customer_phone: form.customer_phone.trim() || null,
      route_from: form.route_from.trim() || null,
      route_to: form.route_to.trim() || null,
      driver_id: form.driver_id || null,
      vehicle_id: form.vehicle_id || null,
      price_agreed: form.price_agreed ? Number(form.price_agreed) : null,
      notes: form.notes.trim() || null,
      status: form.status,
      during: `[${startISO},${endISO})`,
    }).eq('id', job.id);

    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
  };

  // ─── Styles ────────────────────────────────────────────────────
  const inp = 'w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E5D3B3]/40 focus:bg-white/[0.06] transition-all [color-scheme:dark]';
  const sel = `${inp} appearance-none cursor-pointer`;
  const label = 'block text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-2';

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.08] bg-[#0a0a0a] shadow-[0_40px_120px_rgba(0,0,0,0.9)] subtle-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-white/[0.06]">
          <div>
            <h2 className="text-2xl font-serif text-white">Görevi Düzenle</h2>
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mt-0.5">ID: {job.id.slice(0, 8)}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">
          {error && (
            <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</div>
          )}

          {/* Müşteri Bilgileri */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5D3B3]/60 font-medium mb-4 flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Müşteri Bilgileri
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Ad Soyad</label>
                <input className={inp} value={form.customer_name} onChange={e => set('customer_name', e.target.value)} placeholder="Müşteri adı" />
              </div>
              <div>
                <label className={label}><Phone className="inline w-3 h-3 mr-1" />Telefon</label>
                <input className={inp} value={form.customer_phone} onChange={e => set('customer_phone', e.target.value.replace(/[^\d\s+()]/g, ''))} placeholder="+90 5XX XXX XX XX" />
              </div>
            </div>
          </div>

          {/* Güzergah */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5D3B3]/60 font-medium mb-4 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Güzergah
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative z-40">
                <LuxurySelect
                  label="Nereden"
                  icon={MapPin}
                  value={form.route_from}
                  onChange={val => set('route_from', val)}
                  placeholder="Nereden"
                  options={[{value: '', label: 'Kalkış noktası'}, ...LOCATIONS.map(l => ({ value: l.name, label: l.name }))]}
                />
              </div>
              <div className="relative z-30">
                <LuxurySelect
                  label="Nereye"
                  icon={MapPin}
                  value={form.route_to}
                  onChange={val => set('route_to', val)}
                  placeholder="Nereye"
                  options={[{value: '', label: 'Varış noktası'}, ...LOCATIONS.map(l => ({ value: l.name, label: l.name }))]}
                />
              </div>
            </div>
          </div>

          {/* Tarih & Saat */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5D3B3]/60 font-medium mb-4 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Tarih & Saat
            </p>
            <div className="grid grid-cols-2 gap-4 h-[72px]">
              <div className="relative z-50">
                <LuxuryDatePicker label="Başlangıç" value={form.start} onChange={val => set('start', val)} />
              </div>
              <div className="relative z-40">
                <LuxuryDatePicker label="Bitiş" value={form.end} onChange={val => set('end', val)} />
              </div>
            </div>
          </div>

          {/* Atama */}
          <div className="relative z-30">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5D3B3]/60 font-medium mb-4 flex items-center gap-2">
              <Car className="w-3.5 h-3.5" /> Sürücü & Araç Atama
            </p>
            <div className="grid grid-cols-2 gap-4 h-[72px]">
              <LuxurySelect
                label="Sürücü"
                icon={User}
                value={form.driver_id}
                onChange={val => set('driver_id', val)}
                options={[{value: '', label: '— Sürücü atanmadı —'}, ...drivers.map(d => ({ value: d.id, label: d.name }))]}
              />
              <LuxurySelect
                label="Araç"
                icon={Car}
                value={form.vehicle_id}
                onChange={val => set('vehicle_id', val)}
                options={[{value: '', label: '— Araç atanmadı —'}, ...vehicles.map(v => ({ value: v.id, label: v.name }))]}
              />
            </div>
          </div>

          {/* Ücret & Durum */}
          <div className="relative z-20">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5D3B3]/60 font-medium mb-4 flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5" /> Ücret & Durum
            </p>
            <div className="grid grid-cols-2 gap-4 h-[72px]">
              <div>
                <label className={label}>Anlaşılan Ücret (€)</label>
                <input type="text" className={inp} value={form.price_agreed} onChange={e => set('price_agreed', e.target.value.replace(/\D/g, ''))} placeholder="0" />
              </div>
              <LuxurySelect
                label="Durum"
                value={form.status}
                onChange={val => set('status', val)}
                options={[
                  {value: 'planned', label: 'Planlandı'},
                  {value: 'done', label: 'Tamamlandı'},
                  {value: 'cancelled', label: 'İptal Edildi'}
                ]}
              />
            </div>
          </div>

          {/* Notlar */}
          <div>
            <label className={label}><FileText className="inline w-3 h-3 mr-1" />Notlar</label>
            <textarea
              className={`${inp} resize-none`}
              rows={3}
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Özel talepler, uçuş no, vb..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-white/[0.06]">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-white/10 text-sm text-zinc-400 hover:text-white hover:border-white/20 transition-all">
            Vazgeç
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-[#E5D3B3] hover:bg-white text-black px-8 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
