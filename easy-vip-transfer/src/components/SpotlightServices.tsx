'use client';

import React, { useState, useRef } from 'react';
import { Plane, Anchor, Clock, Compass, ShieldCheck, Crown, Map, Sparkles, Wifi, Wine, ChevronRight, PhoneCall } from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';

const categories = [
  { id: 'airport', label: 'Havalimanı VIP', icon: Plane },
  { id: 'marina', label: 'Marina & Yat', icon: Anchor },
  { id: 'hourly', label: 'Saatlik & Günlük Tahsis', icon: Clock },
  { id: 'intercity', label: 'Şehirlerarası Özel', icon: Compass },
];

const servicesData: Record<string, Array<{ title: string; desc: string; badge: string; icon: any; image: string }>> = {
  airport: [
    {
      title: 'Milas-Bodrum (BJV) Karşılama',
      desc: 'Uçuşunuz canlı radardan takip edilir. İsim levhası ile VIP kapı çıkışında karşılanıp doğrudan aracınıza geçersiniz.',
      badge: 'Canlı Takip',
      icon: Plane,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Genel Havacılık & Özel Jet',
      desc: 'Bodrum VIP Jet Terminali aprondan doğrudan bagaj ve yolcu transferi. Gizlilik protokolü garantisi.',
      badge: 'VIP Jet Protokolü',
      icon: Crown,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Dönüş & Otelden Uçuşa',
      desc: 'Otelinizden veya villanızdan uçağınızın saatine göre milimetrik hesaplanmış kalkış planı.',
      badge: 'Sıfır Rötar Riski',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop'
    },
  ],
  marina: [
    {
      title: 'Yalıkavak Marina VIP Transfer',
      desc: 'Süperyat iskelesi, lüks restoranlar ve beach clublara özel tahsisli araç girişi.',
      badge: 'İskele İçi Geçiş',
      icon: Anchor,
      image: 'https://images.unsplash.com/photo-1582236814424-9b2fdb1cb6f3?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'D-Marin Turgutreis & Bodrum Marina',
      desc: 'Yelkenli, gulet ve motoryat yolcularına özel geniş bagaj hacimli Mercedes Vito & Sprinter transferi.',
      badge: 'Geniş Bagaj Kapasitesi',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Scorpios, Lucca & Maçakızı Servisi',
      desc: 'Bodrum’un en seçkin gece kulüpleri ve beach clublarına beklemesiz gidiş-dönüş VIP şoförlük.',
      badge: 'Gece Protokolü',
      icon: Wine,
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop'
    },
  ],
  hourly: [
    {
      title: 'Tam Gün Şoförlü Araç Tahsisi',
      desc: '8, 12 veya 24 saat boyunca şoförünüz ve Maybach/Vito aracınız sadece sizin emrinizde bekler.',
      badge: 'Sınırsız Bekleme',
      icon: Clock,
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'İş & Protokol Seyahatleri',
      desc: 'Gizlilik sözleşmeli, takım elbiseli profesyonel şoförlerle resmi heyet ve iş insanı transferleri.',
      badge: 'Protokol Şoförü',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Kişiye Özel Bodrum & Çevre Turu',
      desc: 'Gümüşlük gün batımı, Çökertme Koyu, Antik Tiyatro ve özel şarap bağları rotaları.',
      badge: 'Özel Rota',
      icon: Map,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    },
  ],
  intercity: [
    {
      title: 'Bodrum ➔ İzmir & Çeşme',
      desc: 'Adnan Menderes Havalimanı veya Alaçatı/Çeşme otellerine kesintisiz, lüks uzun yol transferi.',
      badge: 'Uzun Yol Konforu',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Bodrum ➔ Marmaris & Göcek',
      desc: 'Mavi yolculuk başlangıç limanlarına (Göcek, Fethiye, Marmaris) konforlu ve güvenli geçiş.',
      badge: 'Mavi Tur Bağlantısı',
      icon: Anchor,
      image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Bodrum ➔ Didim & Kuşadası',
      desc: 'Didim Marina ve Kuşadası kruvaziyer limanlarına kapıdan kapıya özel VIP ulaşım.',
      badge: 'Hızlı Otoyol Seyahati',
      icon: Plane,
      image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop'
    },
  ],
};

// Spotlight Card component with cursor tracking
const SpotlightCard = ({ title, desc, badge, image, icon: Icon }: { title: string; desc: string; badge: string; image: string; icon: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative rounded-3xl border border-white/[0.08] bg-[#0a0a0a]/70 p-8 overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1 group hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Hover Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-all duration-700 scale-105 group-hover:scale-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
      </div>

      {/* Mouse-Following Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(229, 211, 179, 0.12), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-md">
              <Icon className="w-5 h-5 text-[#E5D3B3]" />
            </div>
            <span className="text-[13px] font-mono tracking-widest text-[#E5D3B3] uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.08]">
              {badge}
            </span>
          </div>

          <h3 className="text-xl font-serif text-white mb-3 group-hover:text-[#E5D3B3] transition-colors">
            {title}
          </h3>
          <p className="text-sm font-sans text-zinc-300 font-light leading-relaxed group-hover:text-white transition-colors">
            {desc}
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
          <span className="font-mono text-[14px] tracking-widest uppercase">7/24 Rezervasyon</span>
          <ChevronRight className="w-4 h-4 text-[#E5D3B3] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';

export default function SpotlightServices() {
  const { lang } = useLanguage();
  const getTexts = () => {
    switch(lang) {
      case 'EN': return { sub: 'PREMIUM SERVICES', title: 'Exclusive Privileges', desc: 'Beyond standards, an Aegean VIP experience.' };
      case 'RU': return { sub: 'ПРЕМИУМ УСЛУГИ', title: 'Эксклюзивные Привилегии', desc: 'За гранью стандартов, эгейский VIP-опыт.' };
      case 'DE': return { sub: 'PREMIUM-DIENSTE', title: 'Exklusive Privilegien', desc: 'Jenseits von Standards, ein VIP-Erlebnis in der Ägäis.' };
      case 'AR': return { sub: 'خدمات ممتازة', title: 'امتيازات حصرية', desc: 'خارج المعايير، تجربة كبار الشخصيات في بحر إيجة.' };
      case 'TR': return { sub: '{texts.sub}', title: '{texts.title}', desc: '{texts.desc}' };
    }
  };
  const texts = getTexts();

  const [activeTab, setActiveTab] = useState('airport');

  return (
    <section id="services" className="py-28 px-4 w-full max-w-6xl mx-auto relative z-10">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-14"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
          <span className="text-[13px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase font-medium">
            VIP Operasyon Hizmetleri
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4">
          Ayrıcalıklı Hizmet Yelpazemiz
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-sm max-w-xl mx-auto leading-relaxed">
          Bodrum ve Ege genelinde kişiye ve kurumlara özel lüks mobilite çözümleri.
        </p>
      </motion.div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-sans tracking-wider uppercase transition-all duration-300 ${
                isActive
                  ? 'bg-[#E5D3B3] text-black font-bold shadow-[0_0_30px_rgba(229,211,179,0.25)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 border border-white/[0.08]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Grid with Mouse-Following Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicesData[activeTab].map((service, idx) => (
          <SpotlightCard
            key={idx}
            title={service.title}
            desc={service.desc}
            badge={service.badge}
            image={service.image}
            icon={service.icon}
          />
        ))}
      </div>

      {/* Direct Concierge Contact Strip */}
      <div className="mt-12 backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#E5D3B3]/10 border border-[#E5D3B3]/20 flex items-center justify-center text-[#E5D3B3]">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-serif text-white">Özel Bir Rota veya Talebiniz mi Var?</h4>
            <p className="text-sm text-zinc-400">VIP Concierge ekibimiz 7/24 dakikalar içinde size özel teklif hazırlar.</p>
          </div>
        </div>
        <a
          href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Merhaba,%20ozel%20bir%20VIP%20transfer%20rotasi%20icin%20teklif%20almak%20istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-white text-black hover:bg-[#E5D3B3] text-sm font-bold tracking-widest uppercase transition-colors"
        >
          Hızlı Teklif İste
        </a>
      </div>

    </section>
  );
}
