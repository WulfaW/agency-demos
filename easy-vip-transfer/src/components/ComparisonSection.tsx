'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard } from 'lucide-react';

export default function ComparisonSection() {
  const { t } = useLanguage();

  return (
    <section id="comparison" className="py-32 px-4 w-full max-w-7xl mx-auto relative z-10 border-t border-white/5">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-24"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
          <span className="text-[13px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase font-medium">
            Mükemmeliyet Standardı
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-6">
          Neden Easy VIP?
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-sm md:text-sm max-w-2xl mx-auto leading-relaxed">
          Turistik veya standart ulaşım değil; iş dünyası ve VİP misafirler için kurgulanmış, sıfır toleranslı operasyon disiplini.
        </p>
      </motion.div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[400px_300px] gap-4 md:gap-6">
        
        {/* Bento 1: Large Image Focus (Radar & Delay Policy) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-8 md:row-span-1 relative rounded-3xl overflow-hidden group border border-white/10 shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://cdn.21st.dev/assets/mirror/a9/a9c2900d44fe6288b344f447cb12a05f7e64c439479a8ccb977d3b20eb371156.jpg')] bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-1000"></div>
          
          {/* Dark Overlay & Radial Gradient for depth */}
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[13px] tracking-[0.2em] text-white/80 uppercase font-mono">BJV Canlı Radar Protokolü</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight leading-none">
              Rötar Stresine Son.
            </h3>
            <p className="text-sm md:text-base text-zinc-300 font-sans max-w-lg leading-relaxed">
              Bodrum uçuşunuz saniye saniye radarla izlenir. Uçak 3 saat gecikse bile şoförünüz havaalanında sizi bekler. Sürpriz bekleme ücreti veya iptal riski yoktur.
            </p>
          </div>
        </motion.div>

        {/* Bento 2: Pure Typography (Legal / Tursab) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-4 md:row-span-1 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden relative"
        >
          {/* Subtle noise and glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
          
          <div>
            <span className="text-[13px] tracking-[0.2em] text-[#E5D3B3] uppercase font-mono mb-4 block">Yasal Güvence</span>
            <h3 className="text-6xl font-serif text-white tracking-tighter mb-2">TÜRSAB</h3>
            <h4 className="text-2xl font-serif text-zinc-400">A-Grubu Lisans</h4>
          </div>
          <p className="text-sm text-zinc-400 mt-8 font-light">
            Korsan taksi ve belgesiz taşımacılık risklerinden uzak. %100 Yasal D2 taşıma belgesi ve her yolcu için VIP seyahat sigortası.
          </p>
        </motion.div>

        {/* Bento 3: Financial Transparency */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:col-span-5 md:row-span-1 backdrop-blur-2xl bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative"
        >
          <div className="absolute bottom-0 right-0 p-8 opacity-10">
            <CreditCard className="w-32 h-32 text-white" strokeWidth={1} />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center">
            <span className="text-[13px] tracking-[0.2em] text-[#E5D3B3] uppercase font-mono mb-4 block">Şeffaf Fiyatlandırma</span>
            <h3 className="text-3xl font-serif text-white mb-4">Gizli Masraf Yok.</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Tünel, otoyol, havalimanı otopark ücretleri ve vergiler baştan konuştuğumuz fiyata dahildir. Araçta kredi kartı, döviz veya havale ile esnek ödeme imkanı.
            </p>
          </div>
        </motion.div>

        {/* Bento 4: Elite Fleet */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:col-span-7 md:row-span-1 relative rounded-3xl overflow-hidden group border border-white/10 shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://cdn.21st.dev/assets/mirror/61/615a133fcd9891823eb52fbfe8cda7bc7e64177b9668d29792079da5a5d105ad.jpg')] bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-1000 grayscale opacity-40 mix-blend-overlay"></div>
          
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl md:text-7xl font-serif text-white tracking-tighter">100%</span>
              <div className="h-12 w-[1px] bg-white/20"></div>
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-mono">Mercedes-Benz<br/>Filo Standartı</span>
            </div>
            <p className="text-sm md:text-base text-zinc-300 font-sans max-w-xl leading-relaxed">
              Rastgele araç gönderimi yapmıyoruz. Sadece iç dizaynı özel yapım Mercedes Maybach, Vito ve Sprinter VIP serisi araçlar. Akustik yalıtım, buzdolabı ve Wi-Fi donanımı standarttır.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
