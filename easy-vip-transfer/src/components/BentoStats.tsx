'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function BentoStats() {
  const { lang } = useLanguage();

  const stats = [
    {
      num: '10+',
      label: lang === 'TR' ? 'Yıllık Deneyim' : lang === 'RU' ? 'Лет Опыта' : 'Years Experience',
      sub: lang === 'TR' ? 'Bodrum & Ege' : lang === 'RU' ? 'Бодрум & Эгейское' : 'Bodrum & Aegean',
    },
    {
      num: '15K+',
      label: lang === 'TR' ? 'VIP Transfer' : lang === 'RU' ? 'VIP Трансферов' : 'VIP Transfers',
      sub: lang === 'TR' ? 'Tamamlandı' : lang === 'RU' ? 'Завершено' : 'Completed',
    },
    {
      num: '4.9',
      label: lang === 'TR' ? 'Google Puanı' : lang === 'RU' ? 'Рейтинг' : 'Google Rating',
      sub: lang === 'TR' ? '250+ inceleme' : lang === 'RU' ? '250+ отзывов' : '250+ reviews',
    },
    {
      num: '%100',
      label: lang === 'TR' ? 'Zamanında' : lang === 'RU' ? 'Вовремя' : 'On-Time Rate',
      sub: lang === 'TR' ? 'Uçuş takipli' : lang === 'RU' ? 'Отслеживание' : 'Flight tracked',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10 relative z-10">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-0" />
      <div className="flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
        {stats.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="flex-1 px-8 py-8 sm:py-6 first:pl-0 last:pr-0 group"
          >
            <span className="block font-serif text-[3rem] leading-none text-white font-light tracking-tight group-hover:text-[#E5D3B3] transition-colors duration-500 mb-2">
              {item.num}
            </span>
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#E5D3B3]/60 uppercase mb-1">
              {item.label}
            </p>
            <p className="text-[11px] font-sans text-zinc-600">
              {item.sub}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}

