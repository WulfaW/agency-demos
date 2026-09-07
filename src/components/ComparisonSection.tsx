'use client';

import React from 'react';
import { Check, X, Sparkles, ShieldCheck, Car, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const tableData = [
  {
    feature: 'Araç Segmenti & Konfor',
    description: 'Kabin içi temizlik, ses yalıtımı ve konfor standardı',
    standard: 'Rastgele sarı taksi, eski model sedan araçlar',
    easyVip: 'Mercedes Maybach & Vito VIP, yıldız tavan, deri koltuk',
    highlight: true,
  },
  {
    feature: 'Havalimanı Karşılama',
    description: 'Milas-Bodrum (BJV) veya VIP Jet terminali buluşması',
    standard: 'Dışarıda kuyrukta bekleme, kalabalık servisler',
    easyVip: 'Uçak kapısında isminize özel VIP levha & bagaj asistanı',
    highlight: true,
  },
  {
    feature: 'Fiyatlandırma & Ek Masraf',
    description: 'Köprü, otoyol, tünel ve otopark ücretleri',
    standard: 'Taksimetre sürprizleri, sonradan eklenen trafik masrafları',
    easyVip: 'Rezervasyonda sabitlenen net fiyat. Sıfır gizli masraf',
    highlight: true,
  },
  {
    feature: 'Uçuş Rötar & Bekleme',
    description: 'Geciken uçuşlarda aracın bekleme politikası',
    standard: 'Beklemez, araç gider veya yüksek bekleme ücreti yazar',
    easyVip: 'Canlı radar takibiyle saatlerce rötar olsa da ücretsiz bekleme',
    highlight: true,
  },
  {
    feature: 'İkram & Dijital Konfor',
    description: 'Yolculuk esnasındaki multimedya ve içecek servisi',
    standard: 'Klimasız, ikramsız, internetsiz standart yolculuk',
    easyVip: 'Soğuk minibar meşrubat ikramı, Apple TV / Wi-Fi',
    highlight: true,
  },
  {
    feature: 'Yasal Güvence & Sigorta',
    description: 'Yolcu hakları, yetki belgesi ve kurumsal fatura',
    standard: 'Korsan/belgesiz taşıma riski, ferdi kaza sigortası yok',
    easyVip: 'TÜRSAB A Grubu, D2 belgeli, tam kapsamlı yolcu sigortası',
    highlight: true,
  },
];

export default function ComparisonSection() {
  const { t } = useLanguage();

  return (
    <section id="comparison" className="py-28 px-4 w-full max-w-6xl mx-auto relative z-10 border-t border-white/5">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[#E5D3B3] text-[10px] font-sans tracking-[0.25em] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E5D3B3]" />
          <span>{t.comparison.badge}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4">
          {t.comparison.title}
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-xs max-w-xl mx-auto leading-relaxed">
          {t.comparison.subtitle}
        </p>
      </motion.div>

      {/* Luxury Unified Comparison Table */}
      <div className="backdrop-blur-2xl bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
        
        {/* Table Top Header Bar */}
        <div className="grid grid-cols-12 p-6 md:p-8 bg-white/[0.02] border-b border-white/10 items-center gap-4">
          <div className="col-span-12 md:col-span-5">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Hizmet Kriteri</span>
          </div>
          <div className="hidden md:block col-span-3 text-center">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Standart Taksi / Transfer</span>
          </div>
          <div className="col-span-12 md:col-span-4 text-left md:text-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5D3B3] text-black text-xs font-bold tracking-widest uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              Easy VIP Transfer
            </span>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/5">
          {tableData.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 items-center gap-4 md:gap-6 hover:bg-white/[0.015] transition-colors"
            >
              {/* Feature Title & Subtitle */}
              <div className="md:col-span-5">
                <h4 className="text-base font-serif text-white font-medium mb-1">
                  {row.feature}
                </h4>
                <p className="text-xs text-zinc-400 font-sans font-light">
                  {row.description}
                </p>
              </div>

              {/* Standard Taxi (Middle Column) */}
              <div className="md:col-span-3 flex items-start gap-2.5 pt-2 md:pt-0 border-t border-white/5 md:border-t-0">
                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                  <X className="w-3 h-3" />
                </div>
                <div className="text-xs text-zinc-400 font-sans font-light leading-relaxed">
                  <span className="md:hidden font-mono text-zinc-500 block text-[10px] uppercase mb-0.5">Standart Ulaşım:</span>
                  {row.standard}
                </div>
              </div>

              {/* Easy VIP (Highlighted Column) */}
              <div className="md:col-span-4 flex items-start gap-2.5 bg-[#E5D3B3]/[0.03] md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border border-[#E5D3B3]/10 md:border-none">
                <div className="w-5 h-5 rounded-full bg-[#E5D3B3] flex items-center justify-center text-black shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div className="text-xs md:text-sm text-zinc-100 font-sans font-medium leading-relaxed">
                  <span className="md:hidden font-mono text-[#E5D3B3] block text-[10px] uppercase mb-0.5">Easy VIP:</span>
                  {row.easyVip}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Table Guarantee Footer */}
        <div className="p-6 md:p-8 bg-white/[0.02] border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-[#E5D3B3]" />
            <span>Tüm transferlerimizde sabit fiyat ve %100 memnuniyet garantisi sunulmaktadır.</span>
          </div>
          <a
            href="https://wa.me/905305673991?text=Merhaba,%20VIP%20transfer%20hizmetiniz%20icin%20fiyat%20ve%20rezervasyon%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-[#E5D3B3] hover:text-black border border-white/10 text-xs font-bold tracking-widest uppercase transition-all duration-300 text-center"
          >
            Fiyat Teklifi Al
          </a>
        </div>

      </div>

    </section>
  );
}
