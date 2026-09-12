'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Crown, Star, ShieldCheck } from 'lucide-react';

export default function BentoStats() {
  const { lang } = useLanguage();

  const stats = [
    {
      num: '10+',
      label: lang === 'TR' ? 'Yıllık Deneyim' : lang === 'RU' ? 'Лет Опыта' : 'Years Experience',
      sub: lang === 'TR' ? 'Bodrum ve Ege koylarında' : lang === 'RU' ? 'В Бодруме и Эгейском' : 'Bodrum & Aegean Region',
      icon: Crown,
    },
    {
      num: '15K+',
      label: lang === 'TR' ? 'VIP Transfer' : lang === 'RU' ? 'VIP Трансферов' : 'VIP Transfers',
      sub: lang === 'TR' ? 'Kusursuz tamamlanan seyahat' : lang === 'RU' ? 'Безупречных поездок' : 'Flawlessly completed journeys',
      icon: ShieldCheck,
    },
    {
      num: '4.9',
      label: lang === 'TR' ? 'Google Puanı' : lang === 'RU' ? 'Рейтинг' : 'Google Rating',
      sub: lang === 'TR' ? '250+ gerçek misafir incelemesi' : lang === 'RU' ? '250+ реальных отзывов' : '250+ verified guest reviews',
      icon: Star,
    },
    {
      num: '%100',
      label: lang === 'TR' ? 'Zamanında' : lang === 'RU' ? 'Вовремя' : 'On-Time Rate',
      sub: lang === 'TR' ? 'Canlı radar ile sıfır rötar' : lang === 'RU' ? 'Отслеживание, нулевое ожидание' : 'Live tracking, zero wait time',
      icon: Sparkles,
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
              <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative group overflow-hidden rounded-[24px] bg-white/[0.02] border border-white/5 p-8 lg:p-10 backdrop-blur-xl transition-all duration-500 hover:border-white/10 hover:bg-white/[0.03]"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-12">
                    <span className="font-serif text-[2.5rem] lg:text-[3.2rem] leading-none text-white tracking-tight group-hover:text-white/80 transition-colors duration-500">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.05] transition-all duration-500">
                      <Icon className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <p className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase mb-2">
                    {item.label}
                  </p>
                  <p className="text-[13px] font-sans text-zinc-400 font-light leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


