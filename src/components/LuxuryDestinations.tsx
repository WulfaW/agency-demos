'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CONTACT_INFO } from '@/data/transferData';

export default function LuxuryDestinations() {
  const { lang } = useLanguage();

  const destinations = [
    {
      id: 'mandarin',
      name: 'Mandarin Oriental Bodrum',
      bay: 'Cennet Koyu • Göltürkbükü',
      time: '40 dk',
      desc: lang === 'TR' ? 'Ultra lüks sahil villaları, Hakkasan & Lucca Beach erişimi.' : lang === 'RU' ? 'Ультра-роскошные виллы и пляжные клубы.' : 'Ultra-luxury coastal villas, Hakkasan & Lucca Beach access.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop',
      badge: 'Cennet Koyu',
    },
    {
      id: 'yalikavak',
      name: 'Yalıkavak Marina & Zuma',
      bay: 'Süperyat Limanı • Yalıkavak',
      time: '45 dk',
      desc: lang === 'TR' ? 'Dünyaca ünlü markalar, Novikov, Zuma & gece hayatı.' : lang === 'RU' ? 'Суперяхтенная марина, бутики и рестораны.' : 'Superyacht berths, luxury boutiques, Novikov & Zuma.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
      badge: 'Süperyat Hub',
    },
    {
      id: 'amanruya',
      name: 'Amanruya Luxury Resort',
      bay: 'Demirbükü Koyu • Torba',
      time: '38 dk',
      desc: lang === 'TR' ? 'İzole zeytinlikler arasında taş villalar ve sakin lüks.' : lang === 'RU' ? 'Уединенные каменные виллы среди оливковых рощ.' : 'Secluded stone pavilions, private pools & quiet luxury.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop',
      badge: 'Sessiz Lüks',
    },
    {
      id: 'macakizi',
      name: 'Maçakızı & Scorpios Bodrum',
      bay: 'Türkbükü Koyu & Tilkicik',
      time: '40 dk',
      desc: lang === 'TR' ? 'Efsanevi iskele partileri, Sunset ritüelleri ve gastronomi.' : lang === 'RU' ? 'Легендарные вечеринки и гастрономия у моря.' : 'Iconic deck parties, sunset rituals & bespoke dining.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      badge: 'Beach Club',
    },
  ];

  return (
    <section className="py-24 px-4 w-full max-w-6xl mx-auto relative z-10 border-t border-white/5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[#E5D3B3] text-[10px] font-sans tracking-[0.25em] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E5D3B3]" />
          <span>{lang === 'TR' ? 'Popüler VIP Noktaları' : lang === 'RU' ? 'Элитные Локации' : 'Premier VIP Hubs'}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4">
          {lang === 'TR' ? 'Bodrum’un En Seçkin Koyları' : lang === 'RU' ? 'Самые Престижные Бухты Бодрума' : 'Bodrum’s Most Exclusive Bays'}
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-xs max-w-xl mx-auto leading-relaxed">
          {lang === 'TR' ? 'Milas-Bodrum Havalimanı’ndan (BJV) lüks otelinize ve süperyat iskelesine konforlu VIP transfer.' : lang === 'RU' ? 'VIP трансфер из аэропорта в топовые курорты и марины Бодрума.' : 'Direct first class transfer from BJV Airport straight to your resort or yacht berth.'}
        </p>
      </motion.div>

      {/* 4-Card Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((dest, idx) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] min-h-[320px] flex flex-col justify-between p-7 hover:border-[#E5D3B3]/40 transition-all duration-500 shadow-2xl"
          >
            {/* Background Image with Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 group-hover:opacity-45 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
            </div>

            {/* Top Meta */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#E5D3B3] uppercase font-bold">
                {dest.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-[#E5D3B3]" />
                {dest.time} {lang === 'TR' ? 'Sürüş' : lang === 'RU' ? 'в пути' : 'Ride'}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 pt-12">
              <p className="text-[10px] font-mono tracking-widest text-[#E5D3B3] uppercase mb-1">
                {dest.bay}
              </p>
              <h3 className="text-xl md:text-2xl font-serif text-white font-medium mb-2 group-hover:text-[#E5D3B3] transition-colors">
                {dest.name}
              </h3>
              <p className="text-xs font-sans text-zinc-400 font-light leading-relaxed mb-5 max-w-md">
                {dest.desc}
              </p>

              <a
                href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Merhaba,%20${encodeURIComponent(dest.name)}%20icin%20Bodrum%20VIP%20transfer%20fiyati%20ogrenmek%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold text-white group-hover:text-[#E5D3B3] tracking-widest uppercase transition-colors"
              >
                <span>{lang === 'TR' ? 'Hemen Rezerve Et' : lang === 'RU' ? 'Забронировать' : 'Book Direct'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
