'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Briefcase, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Wifi, Wine, Tv } from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';

const fleetCars = [
  {
    id: 'vito',
    name: 'Mercedes-Benz VIP Vito Extra Long',
    category: 'VIP Minivan (En Çok Tercih Edilen)',
    tagline: 'Geniş aileler, arkadaş grupları ve yat transferleri için lüks salon konforu.',
    capacity: '7 Kişi',
    luggage: '7 Büyük Valiz',
    priceEur: '€75',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1400&auto=format&fit=crop',
    features: ['Yıldız Tavan Ambiyansı', 'Deri Yatar Koltuklar', 'Apple TV & Wi-Fi', 'Soğuk Minibar İkramı', 'Gizlilik Bölmesi', 'Geniş Bagaj Hacmi'],
    badge: 'Popüler Tercih'
  },
  {
    id: 'maybach',
    name: 'Mercedes-Benz Maybach S-Class VIP',
    category: 'First Class Exclusive',
    tagline: 'İş insanları, protokol ve özel kutlamalar için zirve sessizlik ve zarafet.',
    capacity: '3 Kişi',
    luggage: '3 Büyük Valiz',
    priceEur: '€120',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1400&auto=format&fit=crop',
    features: ['Masajlı Hakiki Deri Koltuk', 'Özel Ses İzolasyonu', 'Şampanya & Meşrubat Servisi', 'Burmester High-End Ses', 'Kablosuz Hızlı Şarj', 'Protokol Şoförü'],
    badge: 'En Prestijli'
  },
  {
    id: 'sprinter',
    name: 'Mercedes-Benz VIP Sprinter Grand Edition',
    category: 'Ultra Lüks VIP Minibüs',
    tagline: 'Büyük heyetler, düğün organizasyonları ve kurumsal etkinlikler için 16 kişilik lüks süit.',
    capacity: '16 Kişi',
    luggage: '16 Büyük Valiz',
    priceEur: '€150',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1400&auto=format&fit=crop',
    features: ['Tam Boy Ayakta Durulabilir Tavan', 'PlayStation & Smart TV', 'Konferans Oturma Düzeni', 'Nespresso Kahve Makinesi', 'Özel Lavabo & Gardırop', 'Geniş Bagaj Bölümü'],
    badge: 'Grup & Protokol'
  }
];

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Fleet() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Maybach in center
  const { t } = useLanguage();

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? fleetCars.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === fleetCars.length - 1 ? 0 : prev + 1));
  };

  const activeCar = fleetCars[activeIndex];

  return (
    <section id="fleet" className="py-28 px-4 w-full max-w-6xl mx-auto relative z-10 border-t border-white/5 overflow-hidden">
      
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
          <span className="text-[13px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase font-medium">
            {t.fleet.badge}
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4">
          {t.fleet.title}
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-sm max-w-xl mx-auto leading-relaxed">
          {t.fleet.subtitle}
        </p>
      </motion.div>

      {/* 3D Coverflow Track */}
      <div className="relative w-full max-w-5xl mx-auto py-8 [perspective:1200px]">
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/80 hover:bg-[#E5D3B3] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-95"
          aria-label="Önceki Araç"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/80 hover:bg-[#E5D3B3] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-95"
          aria-label="Sonraki Araç"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 3D Cards Container */}
        <div className="flex items-center justify-center min-h-[380px] md:min-h-[440px] relative">
          {fleetCars.map((car, idx) => {
            const isCenter = idx === activeIndex;
            const isLeft = (idx === activeIndex - 1) || (activeIndex === 0 && idx === fleetCars.length - 1);
            const isRight = (idx === activeIndex + 1) || (activeIndex === fleetCars.length - 1 && idx === 0);

            // Calculate 3D transformation
            let transformClass = 'hidden';
            if (isCenter) {
              transformClass = 'z-30 scale-100 opacity-100 translate-x-0 [transform:rotateY(0deg)] shadow-[0_30px_100px_rgba(0,0,0,0.9)] ring-1 ring-[#E5D3B3]/40';
            } else if (isLeft) {
              transformClass = 'z-20 scale-[0.84] opacity-50 -translate-x-[45%] md:-translate-x-[55%] [transform:rotateY(25deg)] blur-[1px] hover:opacity-80';
            } else if (isRight) {
              transformClass = 'z-20 scale-[0.84] opacity-50 translate-x-[45%] md:translate-x-[55%] [transform:rotateY(-25deg)] blur-[1px] hover:opacity-80';
            }

            return (
              <div
                key={car.id}
                onClick={() => setActiveIndex(idx)}
                className={`absolute w-[300px] sm:w-[380px] md:w-[460px] h-[360px] md:h-[420px] rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-white/15 bg-[#0a0a0a] ${transformClass}`}
              >
                {/* Vehicle Photography */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[13px] font-mono text-[#E5D3B3] uppercase font-bold">
                    {car.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-sm font-serif text-white font-bold">
                    {car.priceEur} <span className="text-[13px] font-sans font-normal text-zinc-400">/ başlangıç</span>
                  </span>
                </div>

                {/* Bottom Card Meta */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[13px] font-mono tracking-widest text-[#E5D3B3] uppercase block mb-1">
                    {car.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-white font-medium mb-3">
                    {car.name}
                  </h3>
                  
                  {/* Micro Specs */}
                  <div className="flex items-center gap-4 text-sm font-mono text-zinc-300">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#E5D3B3]" /> {car.capacity}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-[#E5D3B3]" /> {car.luggage}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {fleetCars.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === dotIdx ? 'w-8 bg-[#E5D3B3]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Araç ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Active Vehicle Full Equipment & WhatsApp Reservation Strip */}
      <div className="mt-10 max-w-4xl mx-auto backdrop-blur-2xl bg-[#0a0a0a]/90 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div>
            <span className="text-[13px] font-mono tracking-widest text-zinc-400 uppercase">Seçili Araç Donanımı</span>
            <h4 className="text-2xl font-serif text-white mt-0.5">{activeCar.name}</h4>
            <p className="text-sm text-zinc-400 mt-1 max-w-lg font-light leading-relaxed">{activeCar.tagline}</p>
          </div>
          
          <a
            href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Merhaba,%20*${encodeURIComponent(activeCar.name)}*%20araciniz%20icin%20Bodrum%20VIP%20transfer%20fiyati%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E5D3B3] hover:bg-white text-black text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(229,211,179,0.25)] shrink-0"
          >
            <span>Bu Aracı Ayırt</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6">
          {activeCar.features.map((feat, fIdx) => (
            <div key={fIdx} className="flex items-center gap-2 text-sm text-zinc-300 font-light">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E5D3B3] shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
