'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Car, Users, ArrowRight, ShieldCheck, ChevronDown, Check, ArrowLeftRight, Wine, Baby, Wifi, Flower2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOCATIONS, CONTACT_INFO } from '@/data/transferData';

/* ─── Luxury Date + Time Picker ──────────────────────────────────────────── */
const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00", "23:00",
];

const LuxuryDatePicker = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(() => {
    if (value && value.includes(' ')) return value.split(' ')[1];
    return null;
  });
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupH = 440;
      const showAbove = window.innerHeight - rect.bottom < popupH + 20;
      const left = Math.min(rect.left, window.innerWidth - 570);
      setPopupStyle({
        position: 'fixed',
        left,
        ...(showAbove ? { bottom: window.innerHeight - rect.top + 8 } : { top: rect.bottom + 8 }),
        width: 560,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDateStr = value ? value.split(' ')[0] : '';
  const selectedDate = selectedDateStr ? new Date(selectedDateStr + 'T00:00:00') : null;

  const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const dayNames = ['Pz', 'Pa', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (y: number, m: number) => new Date(y, m, 1).getDay();

  const prevMonth = () => setViewDate(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 });
  const nextMonth = () => setViewDate(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 });

  const selectDay = (day: number) => {
    const d = new Date(viewDate.year, viewDate.month, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    onChange(selectedTime ? `${iso} ${selectedTime}` : iso);
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    if (selectedDateStr) onChange(`${selectedDateStr} ${time}`);
  };

  const reset = () => { setSelectedTime(null); onChange(''); };
  const confirm = () => setIsOpen(false);

  const displayValue = (() => {
    if (!selectedDate) return '';
    const dp = `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`;
    return selectedTime ? `${dp}, ${selectedTime}` : dp;
  })();

  const daysInMonth = getDaysInMonth(viewDate.year, viewDate.month);
  const firstDay = getFirstDay(viewDate.year, viewDate.month);

  return (
    <div className="relative w-full h-full" ref={ref}>
      <div ref={triggerRef} className="w-full h-full">
        <button
          type="button"
          onClick={() => setIsOpen(p => !p)}
          className="w-full h-full flex flex-col justify-center px-4 py-3 hover:bg-white/[0.03] transition-colors focus:outline-none text-left"
        >
          <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-1">{label}</span>
          <span className={`text-[15px] truncate ${displayValue ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
            {displayValue || 'Tarih & Saat Seçin'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            style={popupStyle}
            className="bg-[#111] border border-white/10 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.95)]"
          >
            <div className="flex divide-x divide-white/[0.06]">
              {/* Calendar */}
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-serif text-white tracking-widest">
                    {monthNames[viewDate.month]} {viewDate.year}
                  </span>
                  <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 mb-1">
                  {dayNames.map(d => (
                    <div key={d} className="text-center text-[11px] font-mono text-zinc-600 py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-0.5">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const d = new Date(viewDate.year, viewDate.month, day);
                    const isSel = selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === viewDate.month &&
                      selectedDate.getFullYear() === viewDate.year;
                    const isToday = d.toDateString() === today.toDateString();
                    return (
                      <button
                        key={day}
                        onClick={() => selectDay(day)}
                        className={`relative h-9 w-full rounded-lg text-[13px] transition-all duration-150 ${
                          isSel ? 'bg-white text-black font-semibold'
                          : isToday ? 'text-white font-medium ring-1 ring-white/20 hover:ring-white/40'
                          : 'text-zinc-300 hover:bg-white/[0.07] hover:text-white'
                        }`}
                      >
                        {day}
                        {isToday && !isSel && (
                          <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E5D3B3]/70" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time — 2-col grid like ruixen */}
              <div className="w-[220px] p-4 flex flex-col">
                <p className="text-[11px] font-mono text-zinc-500 tracking-widest uppercase mb-3">Saat Seç</p>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto subtle-scrollbar">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => selectTime(slot)}
                      className={`py-2.5 rounded-xl text-[13px] font-mono border transition-all duration-150 ${
                        selectedTime === slot
                          ? 'bg-white text-black border-white font-semibold'
                          : 'text-zinc-400 border-white/[0.08] hover:bg-white/[0.06] hover:text-white hover:border-white/20'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer — Airbnb style */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
              <button onClick={reset} className="text-[13px] font-sans text-white underline underline-offset-2 hover:text-zinc-300 transition-colors">
                Sıfırla
              </button>
              <button
                onClick={confirm}
                disabled={!selectedDate || !selectedTime}
                className="px-8 py-3 rounded-xl text-[13px] font-sans font-bold tracking-wider transition-all disabled:opacity-25 disabled:cursor-not-allowed bg-[#222] text-white hover:bg-[#333] border border-white/10"
              >
                Onayla
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Custom Multi Select ──────────────────────────────────────────── */

const MultiSelectDropdown = ({
  label,
  options,
  selectedIds,
  onChange,
  placeholder,
}: {
  label: string;
  options: { id: string; label: string; icon: any }[];
  selectedIds: string[];
  onChange: (id: string) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedCount = selectedIds.length;

  return (
    <div className="relative w-full h-full" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex flex-col justify-center px-4 py-3 hover:bg-white/[0.03] transition-colors focus:outline-none text-left"
      >
        <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-1">{label}</span>
        <span className={`text-[15px] truncate ${selectedCount > 0 ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
          {selectedCount > 0 ? `${selectedCount} Ekstra Seçildi` : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full z-[100]">
          <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden py-2 max-h-[260px] overflow-y-auto subtle-scrollbar">
            {options.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChange(opt.id)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                    <span className={`text-[14px] font-sans tracking-wide uppercase transition-colors ${isSelected ? 'text-white font-medium' : 'text-zinc-400'}`}>
                      {opt.label}
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-white border-white' : 'border-zinc-700'}`}>
                    {isSelected && <Check className="w-3 h-3 text-black" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Custom Pill Select ──────────────────────────────────────────── */
const PillSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { id: string; name: string }[];
  placeholder: string;
  icon: React.ElementType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o.id === value);

  return (
    <div className="relative w-full h-full" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex flex-col justify-center px-4 py-3 hover:bg-white/[0.03] transition-colors focus:outline-none text-left"
      >
        <span className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-1">{label}</span>
        <span className={`text-[15px] truncate ${selected ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
          {selected ? selected.name : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[calc(100%+16px)] -ml-2 z-[100]">
          <div className="bg-[#111] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden py-2 max-h-[260px] overflow-y-auto subtle-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-5 py-3.5 hover:bg-white/[0.04] transition-colors"
              >
                <span className={`text-[15px] ${value === opt.id ? 'text-white font-medium' : 'text-zinc-400'}`}>
                  {opt.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import { useLanguage } from '@/context/LanguageContext';

/* ─── Main Component ─────────────────────────────────────────────── */
export default function PriceCalculator() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const { t, lang } = useLanguage();

  const conciergeOptions = [
    { id: 'champagne', icon: Wine, label: lang === 'TR' ? 'Şampanya Servisi' : lang === 'RU' ? 'Шампанское' : 'Champagne Service' },
    { id: 'babyseat', icon: Baby, label: lang === 'TR' ? 'Bebek / Çocuk Koltuğu' : lang === 'RU' ? 'Детское кресло' : 'Free Baby Seat' },
    { id: 'wifi', icon: Wifi, label: lang === 'TR' ? '5G Wi-Fi & Apple TV' : lang === 'RU' ? '5G Wi-Fi и ТВ' : '5G Wi-Fi & Apple TV' },
    { id: 'flowers', icon: Flower2, label: lang === 'TR' ? 'Özel Karşılama Çiçeği' : lang === 'RU' ? 'Цветы при встрече' : 'VIP Welcome Flowers' },
    { id: 'english', icon: Globe, label: lang === 'TR' ? 'Yabancı Dil Bilen Şoför' : lang === 'RU' ? 'Англоязычный водитель' : 'English Chauffeur' },
  ];

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const [vehicle, setVehicle] = useState('vito');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSwap = () => {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  };

  const vehicleOptions = [
    { id: 'vito', name: 'Mercedes VIP Vito' },
    { id: 'sprinter', name: 'Mercedes VIP Sprinter' },
    { id: 'maybach', name: 'Mercedes Maybach / S-Class' },
  ];

  const handleWhatsApp = () => {
    if (!name || !phone) {
      alert(lang === 'TR' ? 'Lütfen adınızı ve telefonunuzu giriniz.' : 'Please enter your name and phone number.');
      return;
    }

    const fromName = LOCATIONS.find((l) => l.id === from)?.name || from;
    const toName = LOCATIONS.find((l) => l.id === to)?.name || to;
    const vehicleName = vehicleOptions.find(v => v.id === vehicle)?.name || vehicle;
    
    let msg = '';
    
    if (lang === 'TR') {
      msg = `Merhaba, seçtiğim detaylara göre VIP transfer rezervasyonu yapmak istiyorum.%0A%0A`;
      if (name) msg += `👤 *İsim:* ${name}%0A`;
      if (fromName) msg += `📍 *Nereden:* ${fromName}%0A`;
      if (toName) msg += `📍 *Nereye:* ${toName}%0A`;
      if (date) msg += `📅 *Tarih:* ${date}%0A`;
      if (passengers) msg += `👥 *Yolcu:* ${passengers} Kişi%0A`;
      if (vehicleName) msg += `🚘 *Araç:* ${vehicleName}%0A`;
      if (selectedExtras.length > 0) {
        const extrasText = selectedExtras.map(id => conciergeOptions.find(o => o.id === id)?.label).join(', ');
        msg += `💎 *Ekstralar:* ${extrasText}%0A`;
      }
      msg += `%0ABu talebime istinaden müsaitlik ve fiyat bilgisi alabilir miyim?`;
    } else {
      msg = `Hello, I would like to book a VIP transfer based on my selections.%0A%0A`;
      if (name) msg += `👤 *Name:* ${name}%0A`;
      if (fromName) msg += `📍 *From:* ${fromName}%0A`;
      if (toName) msg += `📍 *To:* ${toName}%0A`;
      if (date) msg += `📅 *Date:* ${date}%0A`;
      if (passengers) msg += `👥 *Guests:* ${passengers} Persons%0A`;
      if (vehicleName) msg += `🚘 *Vehicle:* ${vehicleName}%0A`;
      if (selectedExtras.length > 0) {
        const extrasText = selectedExtras.map(id => conciergeOptions.find(o => o.id === id)?.label).join(', ');
        msg += `💎 *Extras:* ${extrasText}%0A`;
      }
      msg += `%0ACan I get price and availability information for this request?`;
    }

    window.open(`https://wa.me/${CONTACT_INFO.phoneClean}?text=${msg}`, '_blank');
  };

  const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => ({
    id: n.toString(),
    name: `${n} ${t.calc.passengers}`,
  }));

  return (
    <section id="calculator" className="relative z-20 w-full max-w-5xl mx-auto px-4 mt-12 mb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-[2.5rem] border border-white/[0.07] bg-[#080808]/80 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.85)] overflow-visible p-8 md:p-10"
      >

        {/* Top edge shimmer + ambient glow */}
        <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none overflow-hidden">
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#E5D3B3]/[0.02] rounded-full blur-[80px]" />
        </div>

        {/* Header */}
        <div className="relative z-10 mb-6">
          <p className="text-[14px] font-sans tracking-[0.25em] text-[#E5D3B3]/60 uppercase mb-2">
            {t.calc.badge}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight italic">
            {t.calc.title}
          </h2>
        </div>

        {/* Quick Destination Chips */}
        <div className="relative z-20 flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-white/[0.04]">
          <span className="text-[14px] font-mono tracking-widest text-zinc-500 uppercase mr-1">
            {t.calc.quickSelect}
          </span>
          {[
            { label: 'Mandarin Oriental', toId: 'mandarin' },
            { label: 'Yalıkavak Marina', toId: 'yalikavak-marina' },
            { label: 'Amanruya / Maçakızı', toId: 'amanruya' },
            { label: 'Lujo / Titanic', toId: 'lujo-titanic' },
          ].map((chip) => (
            <button
              key={chip.toId}
              type="button"
              onClick={() => {
                setFrom('bjv');
                setTo(chip.toId);
              }}
              className="px-3 py-1 rounded-full bg-white/[0.03] hover:bg-[#E5D3B3]/10 border border-white/[0.06] hover:border-[#E5D3B3]/30 text-[13px] font-sans text-zinc-400 hover:text-white transition-all duration-200"
            >
              BJV ➔ {chip.label}
            </button>
          ))}
        </div>

        {/* Airbnb Style Segmented Booking Widget */}
        <div className="w-full border border-white/20 rounded-2xl flex flex-col mb-8 bg-black/40 relative z-30">
          
          {/* Row 1: Route */}
          <div className="flex flex-col sm:flex-row border-b border-white/20 sm:h-[72px]">
            <div className="flex-1 border-b sm:border-b-0 sm:border-r border-white/20 relative z-50 h-[72px] sm:h-auto">
              <PillSelect label={t.calc.from} value={from} onChange={setFrom} options={LOCATIONS} placeholder="Havalimanı, Otel..." icon={MapPin} />
            </div>
            <div className="flex-1 relative z-40 h-[72px] sm:h-auto">
              <PillSelect label={t.calc.to} value={to} onChange={setTo} options={LOCATIONS} placeholder="Havalimanı, Otel..." icon={MapPin} />
            </div>
          </div>

          {/* Row 2: Date & Vehicle */}
          <div className="flex flex-col sm:flex-row border-b border-white/20 sm:h-[72px]">
            <div className="flex-1 border-b sm:border-b-0 sm:border-r border-white/20 relative z-40 h-[72px] sm:h-auto">
              <LuxuryDatePicker label={t.calc.date} value={date} onChange={setDate} />
            </div>
            <div className="flex-1 relative z-30 h-[72px] sm:h-auto">
              <PillSelect label={lang === 'TR' ? 'Araç Seçimi' : 'Vehicle'} value={vehicle} onChange={setVehicle} options={vehicleOptions} placeholder={lang === 'TR' ? 'Araç Seç...' : 'Select Vehicle...'} icon={Car} />
            </div>
          </div>

          {/* Row 3: Passengers & Extras */}
          <div className="flex flex-col sm:flex-row border-b border-white/20 sm:h-[72px]">
            <div className="flex-1 border-b sm:border-b-0 sm:border-r border-white/20 relative z-20 h-[72px] sm:h-auto">
              <PillSelect label={t.calc.passengers} value={passengers} onChange={setPassengers} options={passengerOptions} placeholder={t.calc.passengers} icon={Users} />
            </div>
            <div className="flex-1 relative z-10 h-[72px] sm:h-auto">
              <MultiSelectDropdown
                label={lang === 'TR' ? 'Özel Talepler' : 'VIP Add-ons'}
                options={conciergeOptions}
                selectedIds={selectedExtras}
                onChange={toggleExtra}
                placeholder={lang === 'TR' ? 'Ekstra Seç...' : 'Select Extras...'}
              />
            </div>
          </div>

          {/* Row 4: Contact */}
          <div className="flex flex-col sm:flex-row sm:h-[72px] mb-6">
            <div className="flex-1 border-b sm:border-b-0 sm:border-r border-white/20 px-4 py-2 relative z-10 flex flex-col justify-center h-[72px] sm:h-auto">
              <label className="block text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-0.5">
                {lang === 'TR' ? 'Ad Soyad' : lang === 'RU' ? 'Имя Фамилия' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'TR' ? 'Örn: John Doe' : 'e.g. John Doe'}
                className="w-full bg-transparent text-white outline-none text-[15px] font-medium placeholder-zinc-600 focus:outline-none"
              />
            </div>
            <div className="flex-1 px-4 py-2 relative z-10 flex flex-col justify-center h-[72px] sm:h-auto">
              <label className="block text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-zinc-400 mb-0.5">
                {lang === 'TR' ? 'Telefon / WhatsApp' : lang === 'RU' ? 'Телефон / WhatsApp' : 'Phone / WhatsApp'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={lang === 'TR' ? '+90 5XX XXX XX XX' : '+ (Code) Phone Number'}
                className="w-full bg-transparent text-white outline-none text-[15px] font-medium placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Full width CTA button */}
        <button
          onClick={handleWhatsApp}
          className="w-full bg-[#E5D3B3] text-black hover:bg-white font-sans font-bold text-[15px] tracking-[0.15em] uppercase py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
        >
          {t.calc.btnQuote}
          <ArrowRight className="w-4 h-4" />
        </button>


      </motion.div>
    </section>
  );
}
