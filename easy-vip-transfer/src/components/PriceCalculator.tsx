'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, ArrowRight, ShieldCheck, ChevronDown, Check, ArrowLeftRight, Wine, Baby, Wifi, Flower2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { LOCATIONS, CONTACT_INFO } from '@/data/transferData';

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
      <p className="text-[9px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1 px-1">
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSwap = () => {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  };

  const handleWhatsApp = async () => {
    if (!name || !phone) {
      alert(lang === 'TR' ? 'Lütfen adınızı ve telefonunuzu giriniz.' : 'Please enter your name and phone number.');
      return;
    }

    const fromName = LOCATIONS.find((l) => l.id === from)?.name || from;
    const toName = LOCATIONS.find((l) => l.id === to)?.name || to;
    
    setIsSubmitting(true);
    try {
      // 1. Backend'e kaydet ve mail at (Supabase & Resend)
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          from: fromName,
          to: toName,
          date,
          vehicle: passengers + ' Yolcu Aracı',
          price: 0 // Will calculate in backend or admin
        })
      });
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);

    // 2. WhatsApp'a yönlendir
    let msg = `Hello, I would like to request a VIP transfer quote.%0A%0A`;
    if (name) msg += `👤 *Name:* ${name}%0A`;
    if (fromName) msg += `📍 *From:* ${fromName}%0A`;
    if (toName) msg += `📍 *To:* ${toName}%0A`;
    if (date) msg += `📅 *Date:* ${date}%0A`;
    msg += `👥 *Guests:* ${passengers} Persons%0A`;
    if (selectedExtras.length > 0) {
      const extrasText = selectedExtras.map(id => conciergeOptions.find(o => o.id === id)?.label).join(', ');
      msg += `✨ *VIP Extras:* ${extrasText}%0A`;
    }
    msg += `%0ACould you please share vehicle availability and pricing?`;
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
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[9px] font-sans tracking-[0.25em] text-[#E5D3B3]/60 uppercase mb-2">
              {t.calc.badge}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight italic">
              {t.calc.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-sans font-medium text-emerald-400 tracking-[0.15em] uppercase">
              {t.calc.available}
            </span>
          </div>
        </div>

        {/* Quick Destination Chips */}
        <div className="relative z-20 flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-white/[0.04]">
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mr-1">
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
              className="px-3 py-1 rounded-full bg-white/[0.03] hover:bg-[#E5D3B3]/10 border border-white/[0.06] hover:border-[#E5D3B3]/30 text-[10px] font-sans text-zinc-400 hover:text-white transition-all duration-200"
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
            <p className="text-[9px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1 px-1">
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
            <p className="text-[9px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1 px-1">
              <span className="text-[#E5D3B3]">✦</span>
              {lang === 'TR' ? 'Telefon / WhatsApp' : lang === 'RU' ? 'Телефон / WhatsApp' : 'Phone / WhatsApp'}
            </p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+90 5XX XXX XX XX"
              className="w-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-3.5 text-sm text-white focus:outline-none focus:border-[#E5D3B3]/30 transition-all duration-200"
            />
          </div>
        </div>

        {/* Row 3: Tarih + Yolcu + CTA */}
        <div className="relative z-10 flex flex-col sm:flex-row items-end gap-3 mb-5">

          {/* Date */}
          <div className="w-full sm:flex-1">
            <p className="text-[9px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-1.5 flex items-center gap-1 px-1">
              <Calendar className="w-3 h-3 text-[#E5D3B3]" />
              {t.calc.date}
            </p>
            <div className="flex items-center bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-3.5 transition-all duration-200 focus-within:border-[#E5D3B3]/30">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none [color-scheme:dark] cursor-pointer font-light"
              />
            </div>
          </div>

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
            <p className="text-[9px] tracking-[0.2em] uppercase mb-1.5 px-1 select-none text-transparent">·</p>
            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto group flex items-center justify-center gap-2.5 bg-[#E5D3B3] hover:bg-white text-black font-sans font-bold text-[11px] tracking-[0.18em] uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(229,211,179,0.12)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] whitespace-nowrap"
            >
              {t.calc.btnQuote}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Row 3: VIP Concierge Add-ons Chips */}
        <div className="relative z-10 pt-4 pb-2 border-t border-white/[0.04]">
          <p className="text-[9px] font-sans tracking-[0.2em] text-zinc-500 uppercase mb-2 px-1 flex items-center gap-1.5">
            <span className="text-[#E5D3B3]">✦</span>
            {lang === 'TR' ? 'Özel Concierge Talepleri:' : lang === 'RU' ? 'Дополнительные опции:' : 'VIP Concierge Add-ons:'}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {conciergeOptions.map((opt) => {
              const isSelected = selectedExtras.includes(opt.id);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleExtra(opt.id)}
                  className={`group flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#E5D3B3]/10 border-[#E5D3B3]/40 shadow-[0_0_20px_rgba(229,211,179,0.1)]'
                      : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.05] hover:border-white/[0.1]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-colors duration-300 ${isSelected ? 'text-[#E5D3B3]' : 'text-zinc-500 group-hover:text-[#E5D3B3]/70'}`} />
                  <span className={`text-[9.5px] font-sans tracking-[0.15em] uppercase transition-colors duration-300 ${isSelected ? 'font-bold text-[#E5D3B3]' : 'font-medium text-zinc-400 group-hover:text-zinc-200'}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.04] flex flex-wrap items-center gap-x-6 gap-y-2">
          {[t.calc.badge1, t.calc.badge2, t.calc.badge3].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5 text-[9px] font-sans text-zinc-600 tracking-[0.15em] uppercase">
              <ShieldCheck className="w-3 h-3 text-[#E5D3B3]/50" />
              {badge}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
