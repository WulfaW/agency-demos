'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plane, Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    tag: "HAVALİMANI & JET TERMİNALİ",
    title: "Kişiye Özel İsimlikle Karşılama",
    desc: "Milas-Bodrum Havalimanı (BJV) veya Genel Havacılık VIP Terminali çıkışında, şoförünüz sizi isminizin yazılı olduğu özel tablet/levha ile karşılar. Bagaj asistanlığıyla doğrudan aracınıza eşlik edilir.",
    highlights: ["Canlı Uçuş Takibi", "Ücretsiz Rötar Bekleme", "VIP Terminal Desteği"],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    accent: "Milas-Bodrum (BJV) ➔ Yalıkavak"
  },
  {
    number: "02",
    tag: "FIRST CLASS SEYAHAT",
    title: "Özel Kabin İçi Konforu",
    desc: "Ses yalıtımlı özel kabin, yıldız ambiyans tavan aydınlatması, ultra geniş deri koltuklar ve soğuk içecek ikramlarıyla Bodrum sıcağında dinlenerek yolculuk yapın.",
    highlights: ["Yıldız Tavan Ambiyansı", "Soğuk Minibar & Wi-Fi", "Özel Ses Yalıtımı"],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
    accent: "Mercedes Maybach & S-Class"
  },
  {
    number: "03",
    tag: "KUSURSUZ TESLİM",
    title: "Otel, Villa & Marina Kapısına Teslim",
    desc: "Yalıkavak Marina, Mandarin Oriental, Maçakızı, Scorpios veya özel teknenizin iskelesine kadar sıfır trafik stresi, tam gizlilik ve protokol nezaketiyle ulaştırılırsınız.",
    highlights: ["Marina İskele Geçişi", "Protokol & Gizlilik", "Nakit / Kart ile Ödeme"],
    image: "https://images.unsplash.com/photo-1582236814424-9b2fdb1cb6f3?q=80&w=1200&auto=format&fit=crop",
    accent: "Mandarin Oriental & Marina"
  }
];

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function StickyScrollExperience() {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="py-28 px-4 w-full max-w-6xl mx-auto relative z-10 border-t border-white/5">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-20 text-center md:text-left"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase font-medium">
            {t.experience.badge}
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
          {t.experience.title1}<br />
          <span className="italic font-light text-[#E5D3B3]">{t.experience.title2}</span>
        </h2>
      </motion.div>

      {/* Split Interactive Experience */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Left Interactive Step Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-3xl p-8 transition-all duration-500 border ${
                  isActive
                    ? "bg-[#0a0a0a]/90 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-[#E5D3B3]/30"
                    : "bg-white/[0.01] hover:bg-white/[0.03] border-white/[0.05] opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                      isActive ? "bg-[#E5D3B3] text-black" : "bg-white/5 text-zinc-400"
                    }`}>
                      {step.number}
                    </span>
                    <span className="text-[10px] font-sans tracking-widest text-[#E5D3B3] uppercase">
                      {step.tag}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? "bg-[#E5D3B3] scale-125" : "bg-zinc-700"
                  }`} />
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-sm font-sans text-zinc-400 font-light leading-relaxed mb-6">
                  {step.desc}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  {step.highlights.map((hl, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E5D3B3]" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Sticky Visual Display (5 cols) */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="backdrop-blur-2xl bg-[#0a0a0a]/80 border border-white/10 rounded-3xl p-6 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden relative">
            
            {/* Ambient Backlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5D3B3]/10 rounded-full blur-[70px] pointer-events-none" />

            {/* Visual Image container */}
            <div className="relative h-64 md:h-72 w-full rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-white/5">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover transition-all duration-700 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-[#E5D3B3] font-mono">
                  {steps[activeStep].accent}
                </span>
                <span className="text-xs font-serif text-white">
                  Adım {steps[activeStep].number} / 03
                </span>
              </div>
            </div>

            {/* Fast WhatsApp Route Booking */}
            <div className="space-y-3">
              <div className="text-xs text-zinc-400 flex items-center justify-between border-b border-white/5 pb-3">
                <span>Rezervasyon Tipi:</span>
                <strong className="text-white font-serif">VIP Kapıdan Kapıya Transfer</strong>
              </div>
              <div className="text-xs text-zinc-400 flex items-center justify-between border-b border-white/5 pb-3">
                <span>Şoför Statüsü:</span>
                <span className="text-emerald-400 font-medium">● 7/24 Aktif & Hazır</span>
              </div>
              
              <a
                href="https://wa.me/905305673991?text=Merhaba,%20VIP%20transfer%20hizmetiniz%20hakkinda%20bilgi%20ve%20rezervasyon%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 flex items-center justify-center gap-2 bg-white/5 hover:bg-[#E5D3B3] hover:text-black border border-white/10 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
              >
                <span>Bu Deneyimi Rezerve Et</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
