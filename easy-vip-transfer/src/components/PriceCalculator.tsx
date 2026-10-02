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

import { LuxuryDatePicker } from '@/components/ui/LuxuryDatePicker';


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
          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden py-1 max-h-[260px] overflow-y-auto subtle-scrollbar">
            {options.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChange(opt.id)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-[#E5D3B3]' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                    <span className={`text-[13px] font-sans tracking-wide uppercase transition-colors ${isSelected ? 'text-white font-medium' : 'text-zinc-400'}`}>
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
        <div className="absolute top-[calc(100%+8px)] left-0 w-full z-[100]">
          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden py-1 max-h-[260px] overflow-y-auto subtle-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 hover:bg-white/[0.04] transition-colors"
              >
                <span className={`text-[14px] ${value === opt.id ? 'text-[#E5D3B3] font-medium' : 'text-zinc-300'}`}>
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
    const fromName = LOCATIONS.find((l) => l.id === from)?.name || from;
    const toName = LOCATIONS.find((l) => l.id === to)?.name || to;
    const vehicleName = vehicleOptions.find(v => v.id === vehicle)?.name || vehicle;
    
    let msg = '';
    
    if (lang === 'TR') {
      msg = `Merhaba, seçtiğim detaylara göre VIP transfer rezervasyonu yapmak istiyorum.\n\n`;
      if (fromName) msg += `📍 *Nereden:* ${fromName}\n`;
      if (toName) msg += `📍 *Nereye:* ${toName}\n`;
      if (date) msg += `📅 *Tarih:* ${date}\n`;
      if (vehicleName) msg += `🚘 *Araç:* ${vehicleName}\n`;
      msg += `\nBu talebime istinaden müsaitlik ve fiyat bilgisi alabilir miyim?`;
    } else {
      msg = `Hello, I would like to book a VIP transfer based on my selections.\n\n`;
      if (fromName) msg += `📍 *From:* ${fromName}\n`;
      if (toName) msg += `📍 *To:* ${toName}\n`;
      if (date) msg += `📅 *Date:* ${date}\n`;
      if (vehicleName) msg += `🚘 *Vehicle:* ${vehicleName}\n`;
      msg += `\nCan I get price and availability information for this request?`;
    }

    window.open(`https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => ({
    id: n.toString(),
    name: lang === 'TR' ? `${n} Kişi` : lang === 'RU' ? `${n} Человек` : `${n} Passengers`,
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

        {/* Luxury Bento Grid Booking Widget */}
        <div className="w-full flex flex-col gap-2 mb-8 relative z-30">
          
          {/* Row 1: Route */}
          <div className="flex flex-col sm:flex-row gap-2 relative z-50">
            <div className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.1] rounded-2xl transition-all duration-300 relative z-50">
              <PillSelect label={t.calc.from} value={from} onChange={setFrom} options={LOCATIONS} placeholder="Havalimanı, Otel..." icon={MapPin} />
            </div>
            <div className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.1] rounded-2xl transition-all duration-300 relative z-40">
              <PillSelect label={t.calc.to} value={to} onChange={setTo} options={LOCATIONS} placeholder="Havalimanı, Otel..." icon={MapPin} />
            </div>
          </div>

          {/* Row 2: Date & Vehicle */}
          <div className="flex flex-col sm:flex-row gap-2 relative z-40">
            <div className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.1] rounded-2xl transition-all duration-300 relative z-30">
              <LuxuryDatePicker label={t.calc.date} value={date} onChange={setDate} />
            </div>
            <div className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.1] rounded-2xl transition-all duration-300 relative z-20">
              <PillSelect label={lang === 'TR' ? 'Araç Seçimi' : 'Vehicle'} value={vehicle} onChange={setVehicle} options={vehicleOptions} placeholder={lang === 'TR' ? 'Araç Seç...' : 'Select Vehicle...'} icon={Car} />
            </div>
          </div>

        </div>

        {/* Full width CTA button */}
        <button
          onClick={handleWhatsApp}
          className="w-full bg-[#E5D3B3] text-black hover:bg-white font-sans font-bold text-[14px] sm:text-[15px] tracking-[0.15em] uppercase py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 relative z-10"
        >
          {lang === 'TR' ? "WHATSAPP'TAN FİYAT AL" : "GET QUOTE VIA WHATSAPP"}
          <ArrowRight className="w-4 h-4" />
        </button>


      </motion.div>
    </section>
  );
}
