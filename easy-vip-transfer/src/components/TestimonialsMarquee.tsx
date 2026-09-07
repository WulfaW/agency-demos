'use client';

import React from 'react';
import { Star, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Alperen Y.',
    location: 'İstanbul ➔ Yalıkavak Marina',
    rating: 5,
    date: 'Ağustos 2026',
    comment: 'Milas Havalimanı’nda uçağımız 1 saat rötar yapmasına rağmen şoförümüz isimliğimizle kapıda bekliyordu. Maybach aracın içi tertemiz ve soğuk ikramlar harikaydı. Bodrum’da tek geçerim.',
  },
  {
    name: 'Michael & Elena S.',
    location: 'London ➔ Mandarin Oriental',
    rating: 5,
    date: 'Temmuz 2026',
    comment: 'Exceptional VIP service. The driver spoke fluent English, assisted with our heavy yacht luggage, and drove very smoothly. Will definitely book again next summer!',
  },
  {
    name: 'Dr. Selin Kara',
    location: 'BJV ➔ Maçakızı Türkbükü',
    rating: 5,
    date: 'Ağustos 2026',
    comment: 'Gece 02:00 transferimiz için çağırdık. Dakiklik, güvenlik ve konfor kusursuzdu. Sabit fiyat garantisi olması ve sürpriz ücret çıkmaması en büyük artısı.',
  },
  {
    name: 'Emre Çakır',
    location: 'Yalıkavak ➔ Scorpios Beach',
    rating: 5,
    date: 'Ağustos 2026',
    comment: 'Günlük tahsis hizmeti aldık. Şoförümüz tüm gün boyunca bizi beklemeden kapıda karşıladı. Mercedes Vito aracın yıldız tavanı ve ses sistemi efsaneydi.',
  },
  {
    name: 'Dmitry V.',
    location: 'BJV Jet Terminal ➔ Cennet Koyu',
    rating: 5,
    date: 'Haziran 2026',
    comment: 'Top tier VIP transfer in Bodrum. Fast reservation on WhatsApp, fixed price, no hidden costs. 10/10 recommendation.',
  },
];

export default function TestimonialsMarquee() {
  return (
    <section className="py-28 w-full relative z-10 border-t border-white/5 overflow-hidden">
      
      {/* Header with Google Rating Badge */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase font-medium">
            Misafir Yorumları (4.9 / 5.0)
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4">
          Misafirlerimizin Deneyimleri
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-xs max-w-xl mx-auto leading-relaxed">
          Bodrum’un en seçkin otellerine ve marinalarına taşıdığımız misafirlerimizin gerçek yorumları.
        </p>
      </motion.div>

      {/* Infinite Scrolling Marquee Track */}
      <div className="relative w-full flex overflow-x-hidden">
        {/* Left & Right gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 animate-marquee py-4 whitespace-nowrap">
          {[...reviews, ...reviews].map((rev, idx) => (
            <div
              key={idx}
              className="w-[340px] md:w-[420px] shrink-0 backdrop-blur-2xl bg-[#0a0a0a]/80 border border-white/[0.08] rounded-3xl p-7 relative whitespace-normal flex flex-col justify-between group hover:border-[#E5D3B3]/40 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{rev.date}</span>
                </div>

                <p className="text-sm font-sans text-zinc-300 font-light leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-serif text-white font-medium">{rev.name}</h4>
                  <span className="text-[11px] font-mono text-[#E5D3B3] block">{rev.location}</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
