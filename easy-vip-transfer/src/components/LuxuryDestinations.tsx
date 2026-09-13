'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CONTACT_INFO } from '@/data/transferData';

export default function LuxuryDestinations() {
  const { lang } = useLanguage();

  const getTexts = () => {
    switch (lang) {
      case 'EN': return { pop: 'Premier VIP Hubs', bays: 'Bodrum’s Most Exclusive Bays', desc: 'Direct first class transfer from BJV Airport straight to your resort or yacht berth.', ride: 'Ride', book: 'Book Direct', wa1: 'Hello, I would like to get a VIP transfer quote for ', wa2: '.' };
      case 'RU': return { pop: 'Элитные Локации', bays: 'Самые Престижные Бухты Бодрума', desc: 'VIP трансфер из аэропорта в топовые курорты и марины Бодрума.', ride: 'в пути', book: 'Забронировать', wa1: 'Здравствуйте, я хотел бы узнать стоимость VIP-трансфера для ', wa2: '.' };
      case 'DE': return { pop: 'Premium VIP Hubs', bays: 'Bodrums Exklusivste Buchten', desc: 'Direkter First-Class-Transfer vom BJV-Flughafen direkt zu Ihrem Resort oder Yachtliegeplatz.', ride: 'Fahrt', book: 'Jetzt Buchen', wa1: 'Hallo, ich möchte ein VIP-Transferangebot für ', wa2: ' erhalten.' };
      case 'AR': return { pop: 'محاور كبار الشخصيات الممتازة', bays: 'أكثر خلجان بودروم حصرية', desc: 'نقل مباشر من الدرجة الأولى من مطار BJV مباشرة إلى منتجعك أو مرسى يختك.', ride: 'رحلة', book: 'احجز الآن', wa1: 'مرحباً، أود الحصول على عرض سعر نقل VIP لـ ', wa2: '.' };
      default: return { pop: 'Popüler VIP Noktaları', bays: 'Bodrum’un En Seçkin Koyları', desc: 'Milas-Bodrum Havalimanı’ndan (BJV) lüks otelinize ve süperyat iskelesine konforlu VIP transfer.', ride: 'Sürüş', book: 'Hemen Rezerve Et', wa1: 'Merhaba, ', wa2: ' için Bodrum VIP transfer fiyatı öğrenmek istiyorum.' };
    }
  };
  const tDest = getTexts();

  const getDestTexts = (id: string) => {
    if (lang === 'TR') {
      if (id === 'mandarin') return { desc: 'Ultra lüks sahil villaları, Hakkasan & Lucca Beach erişimi.' };
      if (id === 'yalikavak') return { desc: 'Dünyaca ünlü markalar, Novikov, Zuma & gece hayatı.' };
      if (id === 'amanruya') return { desc: 'İzole zeytinlikler arasında taş villalar ve sakin lüks.' };
      if (id === 'macakizi') return { desc: 'Efsanevi iskele partileri, Sunset ritüelleri ve gastronomi.' };
    }
    if (lang === 'RU') {
      if (id === 'mandarin') return { desc: 'Ультра-роскошные виллы и пляжные клубы.' };
      if (id === 'yalikavak') return { desc: 'Суперяхтенная марина, бутики и рестораны.' };
      if (id === 'amanruya') return { desc: 'Уединенные каменные виллы среди оливковых рощ.' };
      if (id === 'macakizi') return { desc: 'Легендарные вечеринки и гастрономия у моря.' };
    }
    if (lang === 'DE') {
      if (id === 'mandarin') return { desc: 'Ultraluxuriöse Küstenvillen, Zugang zu Hakkasan & Lucca Beach.' };
      if (id === 'yalikavak') return { desc: 'Superyacht-Liegeplätze, Luxusboutiquen, Novikov & Zuma.' };
      if (id === 'amanruya') return { desc: 'Abgelegene Steinpavillons, private Pools & ruhiger Luxus.' };
      if (id === 'macakizi') return { desc: 'Kultige Deck-Partys, Sonnenuntergangsrituale & maßgeschneiderte Gastronomie.' };
    }
    if (lang === 'AR') {
      if (id === 'mandarin') return { desc: 'فيلات ساحلية فاخرة جداً، إمكانية الوصول إلى شاطئ هاكاسان ولوكا.' };
      if (id === 'yalikavak') return { desc: 'مراسي اليخوت الفاخرة، البوتيكات الفاخرة، نوفيكوف وزوما.' };
      if (id === 'amanruya') return { desc: 'أجنحة حجرية منعزلة، مسابح خاصة وفخامة هادئة.' };
      if (id === 'macakizi') return { desc: 'حفلات مميزة، طقوس غروب الشمس وتناول طعام مخصص.' };
    }
    // Default EN
    if (id === 'mandarin') return { desc: 'Ultra-luxury coastal villas, Hakkasan & Lucca Beach access.' };
    if (id === 'yalikavak') return { desc: 'Superyacht berths, luxury boutiques, Novikov & Zuma.' };
    if (id === 'amanruya') return { desc: 'Secluded stone pavilions, private pools & quiet luxury.' };
    if (id === 'macakizi') return { desc: 'Iconic deck parties, sunset rituals & bespoke dining.' };
    return { desc: '' };
  };

  const destinations = [
    {
      id: 'mandarin',
      name: 'Mandarin Oriental Bodrum',
      bay: 'Cennet Koyu • Göltürkbükü',
      time: '40 dk',
      image: '/images/cennetkoyu.jpg',
      badge: 'Cennet Koyu',
    },
    {
      id: 'yalikavak',
      name: 'Yalıkavak Marina & Zuma',
      bay: 'Süperyat Limanı • Yalıkavak',
      time: '45 dk',
      image: '/images/Zuma-Bodrum-14.jpg',
      badge: 'Süperyat Hub',
    },
    {
      id: 'amanruya',
      name: 'Amanruya Luxury Resort',
      bay: 'Demirbükü Koyu • Torba',
      time: '35 dk',
      image: '/images/demirbuku-koyu.jpg',
      badge: 'Sessiz Lüks',
    },
    {
      id: 'macakizi',
      name: 'Maçakızı & Scorpios',
      bay: 'Türkbükü • Bodrum',
      time: '45 dk',
      image: '/images/macakizi-hotel-bodrum.jpg',
      badge: 'İkonik Beach',
    },
  ];

  return (
    <section id="destinations" className="py-24 px-4 w-full max-w-6xl mx-auto relative z-10 border-t border-white/5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
          <span className="text-[13px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase font-medium">
            {tDest.pop}
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4">
          {tDest.bays}
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-sm max-w-xl mx-auto leading-relaxed">
          {tDest.desc}
        </p>
      </motion.div>

      {/* 4-Card Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((dest, idx) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] min-h-[320px] flex flex-col justify-between p-7 hover:border-[#E5D3B3]/40 transition-all duration-500 shadow-2xl"
          >
            {/* Background Image with Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 group-hover:opacity-45 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
            </div>

            {/* Top Meta */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[13px] font-mono text-[#E5D3B3] uppercase font-bold">
                {dest.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 text-sm font-mono text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-[#E5D3B3]" />
                {dest.time} {tDest.ride}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 pt-12">
              <p className="text-[13px] font-mono tracking-widest text-[#E5D3B3] uppercase mb-1">
                {dest.bay}
              </p>
              <h3 className="text-xl md:text-2xl font-serif text-white font-medium mb-2 group-hover:text-[#E5D3B3] transition-colors">
                {dest.name}
              </h3>
              <p className="text-sm font-sans text-zinc-400 font-light leading-relaxed mb-5 max-w-md">
                {getDestTexts(dest.id).desc}
              </p>

              <a
                href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(tDest.wa1 + dest.name + tDest.wa2)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-sans font-bold text-white group-hover:text-[#E5D3B3] tracking-widest uppercase transition-colors"
              >
                <span>{tDest.book}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
