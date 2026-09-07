'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BentoStats() {
  const { lang } = useLanguage();

  const stats = [
    {
      num: '10+',
      label: lang === 'TR' ? 'Yıllık Deneyim' : lang === 'RU' ? 'Лет Опыта' : 'Years Experience',
      desc: lang === 'TR' ? 'Bodrum ve Ege koylarında lüks taşımacılık tecrübesi' : lang === 'RU' ? 'Опыт VIP перевозок в Бодруме' : 'Premier luxury chauffeur experience across Bodrum',
      icon: Award,
    },
    {
      num: '15.000+',
      label: lang === 'TR' ? 'VIP Transfer' : lang === 'RU' ? 'VIP Трансферов' : 'VIP Transfers',
      desc: lang === 'TR' ? 'Havalimanı, marina ve lüks otellere kusursuz ulaşım' : lang === 'RU' ? 'Безупречные поездки в отели и марины' : 'Flawless transfers to resorts, yachts & airports',
      icon: ShieldCheck,
    },
    {
      num: '4.9 ★',
      label: lang === 'TR' ? 'Google Puanı' : lang === 'RU' ? 'Рейтинг Google' : 'Google Rating',
      desc: lang === 'TR' ? '250+ gerçek misafir incelemesi ve yüksek memnuniyet' : lang === 'RU' ? '250+ реальных отзывов гостей' : '250+ verified guest reviews & highest rating',
      icon: Star,
    },
    {
      num: '%100',
      label: lang === 'TR' ? 'Zamanında Karşılama' : lang === 'RU' ? 'Вовремя 100%' : 'On-Time Rate',
      desc: lang === 'TR' ? 'Canlı radar uçuş takibi ile sıfır rötar ve bekleme' : lang === 'RU' ? 'Отслеживание рейсов и нулевое ожидание' : 'Live flight tracking with zero wait time',
      icon: Clock,
    },
  ];

  return (
    <section className="py-12 px-4 w-full max-w-6xl mx-auto relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/70 p-6 backdrop-blur-xl hover:border-[#E5D3B3]/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-white group-hover:text-[#E5D3B3] transition-colors">
                  {item.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-[#E5D3B3]" />
                </div>
              </div>
              <h3 className="text-xs font-mono tracking-widest text-[#E5D3B3] uppercase mb-1.5 font-bold">
                {item.label}
              </h3>
              <p className="text-xs font-sans text-zinc-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
