'use client';

import React from 'react';
import { Star, Sparkles, Quote, MapPin } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Canan K.',
    title: 'İş İnsanı / İstanbul',
    route: 'BJV Havalimanı ⇄ Mandarin Oriental Türkbükü',
    comment:
      'Bodrum’a her inişimizde uçağımız rötar yapsa dahi kaptanımız bizi kapıda hazır bekliyor. Maybach Vito’nun içi tertemiz, ikramlar ve Wi-Fi mükemmel. Artık Bodrum’daki tek tercihimiz.',
    rating: 5,
    date: 'Ağustos 2024',
  },
  {
    name: 'Markus & Elena Weber',
    title: 'VIP Misafir / Münih, Almanya',
    route: 'BJV Havalimanı ⇄ Yalıkavak Marina',
    comment:
      'Punctual, super luxurious and great chauffeur. The starlight ceiling and chilled champagne were a delightful touch after a 4-hour flight. Highly recommended for Bodrum transfers.',
    rating: 5,
    date: 'Temmuz 2024',
  },
  {
    name: 'Dr. Serhat Yılmaz',
    title: 'Grup Organizasyonu',
    route: 'BJV ⇄ Bodrum Merkez (16 Kişilik Sprinter VIP)',
    comment:
      'Tüm aile ve dostlarımızla katıldığımız düğün organizasyonumuz için Sprinter VIP tahsis ettik. Araç kral dairesi gibiydi, bagajlarımız eksiksiz sığdı ve süreç kusursuz yönetildi.',
    rating: 5,
    date: 'Eylül 2024',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* Minimal Subtitle */}
        <span className="text-[10px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase mb-4 block">
          Müşteri Deneyimleri
        </span>
        
        {/* Elegant Title */}
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight italic mb-10">
          VIP Yolcularımızdan
        </h2>

        {/* Google Reviews Badge */}
        <div className="w-full max-w-sm glass-panel rounded-3xl p-6 border border-white/10 flex flex-col items-center mb-12 shadow-[0_0_40px_rgba(229,211,179,0.05)]">
          <div className="flex items-center gap-4 mb-4">
            {/* Google G Logo SVG */}
            <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-zinc-400">Google'da 44 değerlendirme</span>
            </div>
          </div>
          <a href="#" className="w-full py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white text-[13px] font-sans font-medium tracking-wide transition-colors flex items-center justify-center">
            Google'da tüm yorumları gör
          </a>
        </div>

        {/* Review Cards (Carousel Style) */}
        <div className="w-full max-w-2xl">
          <div className="glass-panel rounded-3xl p-8 border border-white/[0.05] relative">
            <Quote className="absolute top-8 right-8 w-8 h-8 text-white/5" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#1e4620] flex items-center justify-center text-white font-semibold text-sm">
                S
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">süleyman öztürk</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[#FBBC05] fill-[#FBBC05]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-500">4 hafta önce</span>
                </div>
              </div>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Bodrum'a her inişimizde uçağımız rötar yapsa dahi kaptanımız bizi kapıda hazır bekliyor. Süreç esnasındaki ilgi alakaları hızlı dönüşleri ve muazzam el işçiliği (!) beklemediğimden çok daha iyi bir sonuç aldım. Herkese mükemmel bir tavsiyedir 👍
            </p>
            <button className="text-[#E5D3B3] text-xs font-semibold hover:underline">
              Devamını oku
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
