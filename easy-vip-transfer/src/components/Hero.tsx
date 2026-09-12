'use client';

import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
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
    <section id="hero" className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/40 to-[#030303]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center mt-12">
        
        {/* Premium Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-8 md:w-12 bg-white/10"></div>
          <span className="text-[12px] font-mono tracking-[0.4em] text-white/70 uppercase font-medium">
            {t.hero.badge}
          </span>
          <div className="h-px w-8 md:w-12 bg-white/10"></div>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[1.05] mb-8"
        >
          {t.hero.title1} <br />
          <span className="italic text-[#E5D3B3]">{t.hero.title2}</span> {t.hero.title3}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg text-zinc-400 font-sans font-light max-w-2xl mx-auto tracking-wide leading-relaxed mb-12"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Dual Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#calculator"
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-[#E5D3B3] text-black text-sm font-bold tracking-widest uppercase transition-colors duration-300 active:scale-95"
          >
            <span>{t.hero.btnCalc}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#fleet"
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 backdrop-blur-md text-white text-sm font-medium tracking-widest uppercase transition-all duration-300 active:scale-95"
          >
            <span className="text-zinc-400 group-hover:text-white transition-colors">{t.hero.btnFleet}</span>
          </a>
        </motion.div>

      </div>

      {/* Bottom Subtle Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] via-[#030303] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
