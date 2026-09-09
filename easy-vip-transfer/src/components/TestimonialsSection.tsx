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
    <section className="py-24 bg-[#08080a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-mono tracking-widest uppercase mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Müşteri Deneyimleri</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            VIP Yolcularımızın <span className="gold-gradient-text">Gözünden Easy VIP</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base">
            Bodrum’da %99.4 müşteri memnuniyeti ve 50.000’den fazla kusursuz transfer operasyonu.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-8 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-amber-500/30 group-hover:text-amber-500/60 transition-colors" />
                </div>

                <p className="text-zinc-300 text-sm italic leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <span className="text-sm text-zinc-400">{t.title}</span>
                  </div>
                  <span className="text-[13px] font-mono text-zinc-500">{t.date}</span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[14px] font-mono text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/10">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{t.route}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
