'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, ArrowRight, ShieldCheck, ChevronDown, Check, ArrowLeftRight, Wine, Baby, Wifi, Flower2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOCATIONS, CONTACT_INFO } from '@/data/transferData';

/* ─── Luxury Date Picker ──────────────────────────────────────────── */
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = value ? new Date(value + 'T00:00:00') : null;

  const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const dayNames = ['Pa', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday first
  };

  const prevMonth = () => {
    setViewDate(v => v.month === 0
      ? { year: v.year - 1, month: 11 }
      : { year: v.year, month: v.month - 1 }
    );
  };
  const nextMonth = () => {
    setViewDate(v => v.month === 11
      ? { year: v.year + 1, month: 0 }
      : { year: v.year, month: v.month + 1 }
    );
  };

  const selectDay = (day: number) => {
    const d = new Date(viewDate.year, viewDate.month, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    onChange(iso);
    setIsOpen(false);
  };

  const displayValue = selectedDate
    ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    : '';

  const daysInMonth = getDaysInMonth(viewDate.year, viewDate.month);
  const firstDay = getFirstDayOfMonth(viewDate.year, viewDate.month);

  return (
    <div className="relative flex-1 min-w-0" ref={ref}>
      <p className="text-[14px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1 px-1">
        <Calendar className="w-3 h-3 text-[#E5D3B3]" />
        {label}
      </p>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-3.5 transition-all duration-200 focus:outline-none focus:border-[#E5D3B3]/30"
      >
        <span className={`text-sm truncate ${displayValue ? 'text-white' : 'text-zinc-500 font-light'}`}>
          {displayValue || 'Tarih Seçin'}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-zinc-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+8px)] left-0 z-[200] w-[280px] bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden p-4"
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-serif text-white tracking-wider">
                {monthNames[viewDate.month]} {viewDate.year}
              </span>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 mb-2">
              {dayNames.map(d => (
                <div key={d} className="text-center text-[10px] font-mono text-zinc-600 tracking-widest py-1">{d}</div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const thisDate = new Date(viewDate.year, viewDate.month, day);
                const isPast = thisDate < today;
                const isSelected = selectedDate &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === viewDate.month &&
                  selectedDate.getFullYear() === viewDate.year;
                const isToday = thisDate.toDateString() === today.toDateString();

                return (
                  <button
                    key={day}
                    onClick={() => !isPast && selectDay(day)}
                    disabled={isPast}
                    className={`relative h-8 w-full rounded-lg text-[13px] font-sans transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#E5D3B3] text-black font-semibold'
                        : isPast
                        ? 'text-zinc-700 cursor-not-allowed'
                        : isToday
                        ? 'text-[#E5D3B3] hover:bg-white/5'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {day}
                    {isToday && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E5D3B3]/60" />
                    )}
                  </button>
                );
              })}
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
    <div className="relative flex-1 min-w-0" ref={ref}>
      <p className="text-[14px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1.5 px-1">
        <span className="text-[#E5D3B3]">✦</span>
        {label}
      </p>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-3.5 transition-all duration-200 focus:outline-none focus:border-[#E5D3B3]/30"
      >
        <span className={`text-sm truncate ${selectedCount > 0 ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
          {selectedCount > 0 ? `${selectedCount} Ekstra Seçildi` : placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-zinc-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full z-[100]">
          <div className="bg-[#0d0d0d] border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden py-2 max-h-[260px] overflow-y-auto subtle-scrollbar">
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
                    <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-[#E5D3B3]' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                    <span className={`text-[14px] font-sans tracking-wide uppercase transition-colors ${isSelected ? 'text-white font-medium' : 'text-zinc-400'}`}>
                      {opt.label}
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#E5D3B3] border-[#E5D3B3]' : 'border-zinc-700'}`}>
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
    <div className="relative flex-1 min-w-0" ref={ref}>
      <p className="text-[14px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1 px-1">
        <Icon className="w-3 h-3 text-[#E5D3B3]" />
        {label}
      </p>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-3.5 transition-all duration-200 focus:outline-none focus:border-[#E5D3B3]/30"
      >
        <span className={`text-sm truncate ${selected ? 'text-white font-medium' : 'text-zinc-500 font-light'}`}>
          {selected ? selected.name : placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-zinc-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full z-[100]">
          <div className="bg-[#0d0d0d] border border-zinc-800/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden py-2 max-h-[220px] overflow-y-auto subtle-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => { onChange(opt.id); setIsOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-white/[0.05] transition-colors"
              >
                <span className={`truncate pr-2 ${value === opt.id ? 'text-[#E5D3B3] font-medium' : 'text-zinc-300 font-light'}`}>
                  {opt.name}
                </span>
                {value === opt.id && <Check className="w-3.5 h-3.5 shrink-0 text-[#E5D3B3]" />}
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

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSwap = () => {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  };

  const handleWhatsApp = () => {
    if (!name || !phone) {
      alert(lang === 'TR' ? 'Lütfen adınızı ve telefonunuzu giriniz.' : 'Please enter your name and phone number.');
      return;
    }

    const fromName = LOCATIONS.find((l) => l.id === from)?.name || from;
    const toName = LOCATIONS.find((l) => l.id === to)?.name || to;
    
    // WhatsApp'a yönlendir (Dile göre dinamik şablon)
    let msg = '';
    
    if (lang === 'TR') {
      msg = `Merhaba, VIP transfer fiyatı ve müsaitlik durumu hakkında bilgi almak istiyorum.%0A%0A`;
      if (name) msg += `👤 *İsim:* ${name}%0A`;
      if (fromName) msg += `📍 *Nereden:* ${fromName}%0A`;
      if (toName) msg += `📍 *Nereye:* ${toName}%0A`;
      if (date) msg += `📅 *Tarih:* ${date}%0A`;
      msg += `👥 *Yolcu:* ${passengers} Kişi%0A`;
      if (selectedExtras.length > 0) {
        const extrasText = selectedExtras.map(id => conciergeOptions.find(o => o.id === id)?.label).join(', ');
        msg += `✨ *VIP Ekstralar:* ${extrasText}%0A`;
      }
    } else if (lang === 'RU') {
      msg = `Здравствуйте, я хотел бы узнать стоимость и наличие свободных машин для VIP-трансфера.%0A%0A`;
      if (name) msg += `👤 *Имя:* ${name}%0A`;
      if (fromName) msg += `📍 *Откуда:* ${fromName}%0A`;
      if (toName) msg += `📍 *Куда:* ${toName}%0A`;
      if (date) msg += `📅 *Дата:* ${date}%0A`;
      msg += `👥 *Пассажиры:* ${passengers} Человек%0A`;
      if (selectedExtras.length > 0) {
        const extrasText = selectedExtras.map(id => conciergeOptions.find(o => o.id === id)?.label).join(', ');
        msg += `✨ *VIP-услуги:* ${extrasText}%0A`;
      }
    } else {
      // Default to English
      msg = `Hello, I would like to request a VIP transfer quote and check availability.%0A%0A`;
      if (name) msg += `👤 *Name:* ${name}%0A`;
      if (fromName) msg += `📍 *From:* ${fromName}%0A`;
      if (toName) msg += `📍 *To:* ${toName}%0A`;
      if (date) msg += `📅 *Date:* ${date}%0A`;
      msg += `👥 *Guests:* ${passengers} Persons%0A`;
      if (selectedExtras.length > 0) {
        const extrasText = selectedExtras.map(id => conciergeOptions.find(o => o.id === id)?.label).join(', ');
        msg += `✨ *VIP Extras:* ${extrasText}%0A`;
      }
    }

    window.open(`https://wa.me/${CONTACT_INFO.phoneClean}?text=${msg}`, '_blank');
  };

  const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => ({
    id: n.toString(),
    name: `${n} ${t.calc.passengers}`,
  }));

  return (
    <section id="calculator" className="relative z-20 w-full max-w-5xl mx-auto px-4 -mt-28 mb-24">
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

        {/* Row 1: Nereden ↔ Nereye */}
        <div className="relative z-30 flex flex-col sm:flex-row items-end gap-3 mb-4">
          <PillSelect
            label={t.calc.from}
            value={from}
            onChange={setFrom}
            options={LOCATIONS}
            placeholder="Havalimanı, Otel..."
            icon={MapPin}
          />

          <PillSelect
            label={t.calc.to}
            value={to}
            onChange={setTo}
            options={LOCATIONS}
            placeholder="Havalimanı, Otel..."
            icon={MapPin}
          />
        </div>

        {/* Row 2: İsim + Telefon */}
        <div className="relative z-20 flex flex-col sm:flex-row items-end gap-3 mb-4">
          <div className="w-full sm:flex-1">
            <p className="text-[14px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1 px-1">
              <span className="text-[#E5D3B3]">✦</span>
              {lang === 'TR' ? 'Ad Soyad' : lang === 'RU' ? 'Имя Фамилия' : 'Full Name'}
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'TR' ? 'Örn: John Doe' : 'e.g. John Doe'}
              className="w-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-3.5 text-sm text-white focus:outline-none focus:border-[#E5D3B3]/30 transition-all duration-200"
            />
          </div>
          <div className="w-full sm:flex-1">
            <p className="text-[14px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1 px-1">
              <span className="text-[#E5D3B3]">✦</span>
              {lang === 'TR' ? 'Telefon / WhatsApp' : lang === 'RU' ? 'Телефон / WhatsApp' : 'Phone / WhatsApp'}
            </p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={lang === 'TR' ? '+90 5XX XXX XX XX' : lang === 'RU' ? '+ (Код) Номер' : lang === 'DE' ? '+ (Code) Telefon' : lang === 'AR' ? 'رقم الهاتف (+ رمز)' : '+ (Code) Phone Number'}
              className="w-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-3.5 text-sm text-white focus:outline-none focus:border-[#E5D3B3]/30 transition-all duration-200"
            />
          </div>
        </div>

        {/* Row 3: Tarih + Yolcu + CTA */}
        <div className="relative z-10 flex flex-col sm:flex-row items-end gap-3 mb-5">

          <LuxuryDatePicker
            label={t.calc.date}
            value={date}
            onChange={setDate}
          />

          {/* Passengers */}
          <div className="w-full sm:w-[160px]">
            <PillSelect
              label={t.calc.passengers}
              value={passengers}
              onChange={setPassengers}
              options={passengerOptions}
              placeholder={t.calc.passengers}
              icon={Users}
            />
          </div>

          {/* CTA */}
          <div className="w-full sm:w-auto">
            <p className="text-[14px] tracking-[0.2em] uppercase mb-1.5 px-1 select-none text-transparent">·</p>
            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto group flex items-center justify-center gap-2.5 bg-[#E5D3B3] hover:bg-white text-black font-sans font-bold text-[14px] tracking-[0.18em] uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(229,211,179,0.12)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] whitespace-nowrap"
            >
              {t.calc.btnQuote}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Row 3: VIP Concierge Add-ons Dropdown */}
        <div className="relative z-10 pt-4 pb-2 border-t border-white/[0.04]">
          <div className="w-full sm:w-[320px]">
            <MultiSelectDropdown
              label={lang === 'TR' ? 'Özel Concierge Talepleri:' : lang === 'RU' ? 'Дополнительные опции:' : 'VIP Concierge Add-ons:'}
              options={conciergeOptions}
              selectedIds={selectedExtras}
              onChange={toggleExtra}
              placeholder={lang === 'TR' ? 'Ekstra Talep Seçin...' : 'Select Extras...'}
            />
          </div>
        </div>

        {/* Trust strip — luxury engraved style */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.04] flex flex-wrap items-center gap-3">
          {[
            { label: t.calc.badge1, symbol: "✦" },
            { label: t.calc.badge2, symbol: "◈" },
            { label: t.calc.badge3, symbol: "○" },
          ].map(({ label, symbol }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]"
            >
              <span className="text-[10px] text-[#E5D3B3]/50">{symbol}</span>
              <span className="text-[12px] font-sans text-zinc-500 tracking-[0.18em] uppercase">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
