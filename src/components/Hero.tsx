'use client';

import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const popularRoutes = [
  { label: 'BJV ➔ Mandarin Oriental', from: 'bjv', to: 'mandarin' },
  { label: 'BJV ➔ Yalıkavak Marina', from: 'bjv', to: 'yalikavak-marina' },
  { label: 'BJV ➔ Amanruya / Maçakızı', from: 'bjv', to: 'amanruya' },
  { label: 'BJV ➔ Lujo / Titanic', from: 'bjv', to: 'lujo-titanic' },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-36">
      
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.45 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=80"
          alt="VIP Transfer Bodrum"
          className="w-full h-full object-cover"
        />
        
        {/* Soft, rich luxury gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/90 via-[#030303]/50 to-[#030303]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-[#030303]/80" />
        
        {/* Ambient Center Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E5D3B3]/[0.04] rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Premium Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-8 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E5D3B3]" />
          <span className="text-[10px] tracking-[0.25em] text-zinc-300 uppercase font-sans font-medium">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-white tracking-tight leading-[1.12] mb-6 drop-shadow-2xl"
        >
          {t.hero.title1} <br />
          <span className="italic font-light text-[#E5D3B3]">{t.hero.title2}</span> {t.hero.title3}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base text-zinc-300 font-sans font-light max-w-2xl mx-auto tracking-wide leading-relaxed mb-10 opacity-90"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Dual Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          <a
            href="#calculator"
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E5D3B3] hover:bg-white text-black text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(229,211,179,0.25)] hover:shadow-[0_0_50px_rgba(255,255,255,0.35)] active:scale-98"
          >
            <span>{t.hero.btnCalc}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#fleet"
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 backdrop-blur-md text-white text-xs font-medium tracking-widest uppercase transition-all duration-300 active:scale-98"
          >
            <span className="text-zinc-300 group-hover:text-white transition-colors">{t.hero.btnFleet}</span>
          </a>
        </motion.div>

        {/* Fast Popular Route Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mr-1 hidden sm:inline-block">
            {t.hero.popularRoutes}
          </span>
          {popularRoutes.map((route, i) => (
            <a
              key={i}
              href="#calculator"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#E5D3B3]/40 text-[11px] font-sans text-zinc-400 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              <MapPin className="w-3 h-3 text-[#E5D3B3]" />
              <span>{route.label}</span>
            </a>
          ))}
        </motion.div>

      </div>

      {/* Bottom Subtle Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#030303] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
