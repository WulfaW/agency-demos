'use client';

import React, { useState, useRef } from 'react';
import { Plane, Anchor, Clock, Compass, ShieldCheck, Crown, Map, Sparkles, Wifi, Wine, ChevronRight, PhoneCall } from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';
import { useLanguage } from '@/context/LanguageContext';


// Spotlight Card component with cursor tracking
const SpotlightCard = ({ title, desc, badge, image, icon: Icon, spotlightColor, buttonText }: { title: string; desc: string; badge: string; image: string; icon: any; spotlightColor?: string, buttonText: string }) => {
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
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-0 group-hover:opacity-10 group-hover:scale-105 transition-all duration-700"
        />
      </div>

      {/* Mouse-Following Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor || 'rgba(229, 211, 179, 0.12)'}, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#E5D3B3] uppercase px-3 py-1 rounded-full bg-[#E5D3B3]/10 border border-[#E5D3B3]/20">
            {badge}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-serif text-white mb-3 tracking-wide">{title}</h3>
        <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-8 flex-grow">{desc}</p>
        
        <div className="flex items-center justify-between border-t border-white/10 pt-6 group-hover:border-[#E5D3B3]/30 transition-colors">
          <span className="font-mono text-[14px] tracking-widest uppercase">{buttonText}</span>
          <ChevronRight className="w-4 h-4 text-[#E5D3B3] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';

export default function SpotlightServices() {

  const { lang } = useLanguage();
  const getCategories = () => {
    switch(lang) {
      case 'EN': return [
        { id: 'airport', label: 'Airport VIP', icon: Plane },
        { id: 'marina', label: 'Marina & Yacht', icon: Anchor },
        { id: 'hourly', label: 'Hourly Disposal', icon: Clock },
        { id: 'intercity', label: 'Intercity', icon: Compass },
      ];
      case 'RU': return [
        { id: 'airport', label: 'VIP Аэропорт', icon: Plane },
        { id: 'marina', label: 'Марины и Яхты', icon: Anchor },
        { id: 'hourly', label: 'Почасовая Аренда', icon: Clock },
        { id: 'intercity', label: 'Межгород', icon: Compass },
      ];
      case 'DE': return [
        { id: 'airport', label: 'Flughafen VIP', icon: Plane },
        { id: 'marina', label: 'Yachthafen', icon: Anchor },
        { id: 'hourly', label: 'Stundenweise', icon: Clock },
        { id: 'intercity', label: 'Überland', icon: Compass },
      ];
      case 'AR': return [
        { id: 'airport', label: 'المطار', icon: Plane },
        { id: 'marina', label: 'المارينا واليخوت', icon: Anchor },
        { id: 'hourly', label: 'تأجير بالساعة', icon: Clock },
        { id: 'intercity', label: 'بين المدن', icon: Compass },
      ];
      default: return [
        { id: 'airport', label: 'Havalimanı VIP', icon: Plane },
        { id: 'marina', label: 'Marina & Yat', icon: Anchor },
        { id: 'hourly', label: 'Saatlik & Günlük Tahsis', icon: Clock },
        { id: 'intercity', label: 'Şehirlerarası Özel', icon: Compass },
      ];
    }
  };
  const categories = getCategories();

  const getServicesData = () => {
    switch (lang) {
      case 'EN': return {
        airport: [
          { title: 'Milas-Bodrum (BJV) Greeter', desc: 'Live flight tracking. Met at the VIP exit with a name board.', badge: 'Live Tracking', icon: Plane, image: '/images/inside.jpg' },
          { title: 'Aviation & Private Jet', desc: 'Direct apron transfer from Bodrum VIP Jet Terminal.', badge: 'VIP Protocol', icon: Crown, image: '/images/route.jpg' },
          { title: 'Return to Airport', desc: 'Flawless schedule planning for your departure.', badge: 'Zero Delay', icon: ShieldCheck, image: '/images/Zuma-Bodrum-14.jpg' },
        ],
        marina: [
          { title: 'Yalıkavak Marina VIP', desc: 'Private vehicle access to superyacht piers and clubs.', badge: 'Pier Access', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'D-Marin & Bodrum Marina', desc: 'Spacious Mercedes Vito for yacht passengers.', badge: 'Spacious Luggage', icon: Compass, image: '/images/macakizi-hotel-bodrum.jpg' },
          { title: 'Beach Club Shuttles', desc: 'No-wait VIP chauffeurs to top clubs like Scorpios.', badge: 'Night Protocol', icon: Wine, image: '/images/demirbuku-koyu.jpg' },
        ],
        hourly: [
          { title: 'Full Day Disposal', desc: 'Your Maybach/Vito awaits your command for 8-24 hours.', badge: 'Unlimited Wait', icon: Clock, image: '/images/inside.jpg' },
          { title: 'Shopping & Dining', desc: 'Wait-and-return service for restaurants and luxury shopping.', badge: 'Flexible Route', icon: Map, image: '/images/Zuma-Bodrum-14.jpg' },
          { title: 'Business Roadshow', desc: 'High-speed Wi-Fi and privacy screen for corporate guests.', badge: 'Mobile Office', icon: Wifi, image: '/images/route.jpg' },
        ],
        intercity: [
          { title: 'Bodrum - Izmir', desc: 'Smooth highway transfer to Adnan Menderes Airport (ADB).', badge: 'Express Safe', icon: Compass, image: '/images/route.jpg' },
          { title: 'Bodrum - Dalaman', desc: 'Direct connection to Marmaris, Göcek, and Fethiye marinas.', badge: 'Coastal Route', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'Bodrum - Antalya', desc: 'VIP cross-country transfer with premium rest stops.', badge: 'Long Distance VIP', icon: Sparkles, image: '/images/inside.jpg' },
        ],
      };
      case 'RU': return {
        airport: [
          { title: 'Встреча в BJV', desc: 'Отслеживание рейса. Встреча с табличкой.', badge: 'Живое Отслеживание', icon: Plane, image: '/images/inside.jpg' },
          { title: 'Частные рейсы', desc: 'Прямой трансфер с перрона VIP-терминала.', badge: 'VIP Протокол', icon: Crown, image: '/images/route.jpg' },
          { title: 'Возврат в аэропорт', desc: 'Идеальное планирование вылета.', badge: 'Без Опозданий', icon: ShieldCheck, image: '/images/Zuma-Bodrum-14.jpg' },
        ],
        marina: [
          { title: 'Yalıkavak Marina', desc: 'Прямой доступ к яхтам и клубам.', badge: 'Доступ к Пирсу', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'D-Marin', desc: 'Просторные авто для пассажиров яхт.', badge: 'Большой Багаж', icon: Compass, image: '/images/macakizi-hotel-bodrum.jpg' },
          { title: 'Пляжные Клубы', desc: 'VIP-трансфер в клубы без ожидания.', badge: 'Ночной Протокол', icon: Wine, image: '/images/demirbuku-koyu.jpg' },
        ],
        hourly: [
          { title: 'Аренда на день', desc: 'Автомобиль в вашем распоряжении 8-24 часа.', badge: 'Безлимитное Ожидание', icon: Clock, image: '/images/inside.jpg' },
          { title: 'Шоппинг и Рестораны', desc: 'Сервис с ожиданием для ресторанов и бутиков.', badge: 'Гибкий Маршрут', icon: Map, image: '/images/Zuma-Bodrum-14.jpg' },
          { title: 'Бизнес поездки', desc: 'Wi-Fi и конфиденциальность для бизнес-гостей.', badge: 'Мобильный Офис', icon: Wifi, image: '/images/route.jpg' },
        ],
        intercity: [
          { title: 'Бодрум - Измир', desc: 'Быстрый трансфер в аэропорт Измира.', badge: 'Экспресс', icon: Compass, image: '/images/route.jpg' },
          { title: 'Бодрум - Даламан', desc: 'Прямое сообщение с Маринами Гёчека.', badge: 'Прибрежный Маршрут', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'Бодрум - Анталия', desc: 'VIP трансфер по всей стране.', badge: 'Дальние Поездки', icon: Sparkles, image: '/images/inside.jpg' },
        ],
      };
      case 'DE': return {
        airport: [
          { title: 'BJV Begrüßung', desc: 'Flugverfolgung & Begrüßung mit Namensschild.', badge: 'Live-Tracking', icon: Plane, image: '/images/inside.jpg' },
          { title: 'Privatjets', desc: 'Direkter Vorfeld-Transfer vom VIP Terminal.', badge: 'VIP Protokoll', icon: Crown, image: '/images/route.jpg' },
          { title: 'Rückfahrt zum Flughafen', desc: 'Perfekte Zeitplanung für Ihren Abflug.', badge: 'Pünktlichkeit', icon: ShieldCheck, image: '/images/Zuma-Bodrum-14.jpg' },
        ],
        marina: [
          { title: 'Yalıkavak Marina', desc: 'Direkter Zugang zu Superyacht-Piers.', badge: 'Pier-Zugang', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'D-Marin', desc: 'Geräumige Fahrzeuge für Yachtgäste.', badge: 'Viel Gepäck', icon: Compass, image: '/images/macakizi-hotel-bodrum.jpg' },
          { title: 'Beach Clubs', desc: 'Ohne Wartezeit zu Top-Clubs wie Scorpios.', badge: 'Nacht-Protokoll', icon: Wine, image: '/images/demirbuku-koyu.jpg' },
        ],
        hourly: [
          { title: 'Tagesmiete', desc: 'Ihr Chauffeur steht Ihnen 8-24 Stunden zur Verfügung.', badge: 'Unbegrenzte Wartezeit', icon: Clock, image: '/images/inside.jpg' },
          { title: 'Shopping & Dining', desc: 'Warte- und Rückfahrservice für Restaurants.', badge: 'Flexible Route', icon: Map, image: '/images/Zuma-Bodrum-14.jpg' },
          { title: 'Business', desc: 'High-Speed Wi-Fi und Privatsphäre für Firmen.', badge: 'Mobiles Büro', icon: Wifi, image: '/images/route.jpg' },
        ],
        intercity: [
          { title: 'Bodrum - Izmir', desc: 'Reibungsloser Transfer zum Flughafen ADB.', badge: 'Express Sicher', icon: Compass, image: '/images/route.jpg' },
          { title: 'Bodrum - Dalaman', desc: 'Direkte Verbindung nach Göcek und Fethiye.', badge: 'Küstenroute', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'Bodrum - Antalya', desc: 'VIP Überland-Transfer mit Pausen.', badge: 'Langstrecke VIP', icon: Sparkles, image: '/images/inside.jpg' },
        ],
      };
      case 'AR': return {
        airport: [
          { title: 'استقبال مطار BJV', desc: 'تتبع الرحلة واستقبال بلوحة الاسم.', badge: 'تتبع مباشر', icon: Plane, image: '/images/inside.jpg' },
          { title: 'الطيران الخاص', desc: 'نقل مباشر من صالة كبار الشخصيات.', badge: 'بروتوكول VIP', icon: Crown, image: '/images/route.jpg' },
          { title: 'العودة للمطار', desc: 'تخطيط مثالي لرحلة المغادرة.', badge: 'بدون تأخير', icon: ShieldCheck, image: '/images/Zuma-Bodrum-14.jpg' },
        ],
        marina: [
          { title: 'مارينا ياليكافاك', desc: 'وصول مباشر لليخوت والنوادي.', badge: 'وصول مباشر', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'دي مارين', desc: 'سيارات واسعة لضيوف اليخوت.', badge: 'أمتعة كبيرة', icon: Compass, image: '/images/macakizi-hotel-bodrum.jpg' },
          { title: 'نوادي الشاطئ', desc: 'نقل لكبار الشخصيات للنوادي الليلية.', badge: 'خدمة ليلية', icon: Wine, image: '/images/demirbuku-koyu.jpg' },
        ],
        hourly: [
          { title: 'تأجير يومي', desc: 'سيارتك تحت تصرفك لمدة 8-24 ساعة.', badge: 'انتظار غير محدود', icon: Clock, image: '/images/inside.jpg' },
          { title: 'تسوق ومطاعم', desc: 'خدمة الانتظار للمطاعم والتسوق.', badge: 'مسار مرن', icon: Map, image: '/images/Zuma-Bodrum-14.jpg' },
          { title: 'رجال الأعمال', desc: 'إنترنت عالي السرعة وخصوصية.', badge: 'مكتب متنقل', icon: Wifi, image: '/images/route.jpg' },
        ],
        intercity: [
          { title: 'بودروم - إزمير', desc: 'نقل سلس إلى مطار إزمير.', badge: 'سريع وآمن', icon: Compass, image: '/images/route.jpg' },
          { title: 'بودروم - دالامان', desc: 'اتصال مباشر بمراسي غوجيك.', badge: 'مسار ساحلي', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'بودروم - أنطاليا', desc: 'نقل لكبار الشخصيات بين المدن.', badge: 'مسافات طويلة', icon: Sparkles, image: '/images/inside.jpg' },
        ],
      };
      default: return {
        airport: [
          { title: 'Milas-Bodrum (BJV) Karşılama', desc: 'Uçuşunuz canlı radardan takip edilir. İsim levhası ile karşılanırsınız.', badge: 'Canlı Takip', icon: Plane, image: '/images/inside.jpg' },
          { title: 'Genel Havacılık & Özel Jet', desc: 'Bodrum VIP Jet Terminali aprondan doğrudan bagaj ve yolcu transferi.', badge: 'VIP Jet Protokolü', icon: Crown, image: '/images/route.jpg' },
          { title: 'Dönüş & Otelden Uçuşa', desc: 'Otelinizden uçağınızın saatine göre kalkış planı.', badge: 'Sıfır Rötar Riski', icon: ShieldCheck, image: '/images/Zuma-Bodrum-14.jpg' },
        ],
        marina: [
          { title: 'Yalıkavak Marina VIP Transfer', desc: 'Süperyat iskelesi ve beach clublara özel araç girişi.', badge: 'İskele İçi Geçiş', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'D-Marin Turgutreis & Bodrum', desc: 'Geniş bagaj hacimli Mercedes Vito transferi.', badge: 'Geniş Bagaj Kapasitesi', icon: Compass, image: '/images/macakizi-hotel-bodrum.jpg' },
          { title: 'Scorpios & Maçakızı Servisi', desc: 'Seçkin gece kulüplerine beklemesiz gidiş-dönüş.', badge: 'Gece Protokolü', icon: Wine, image: '/images/demirbuku-koyu.jpg' },
        ],
        hourly: [
          { title: 'Tam Gün Şoförlü Araç Tahsisi', desc: 'Aracınız ve şoförünüz emrinizde bekler.', badge: 'Sınırsız Bekleme', icon: Clock, image: '/images/inside.jpg' },
          { title: 'Alışveriş & Restoran Bekleme', desc: 'Akşam yemekleri ve lüks alışveriş için bekle-dön servisi.', badge: 'Esnek Güzergah', icon: Map, image: '/images/Zuma-Bodrum-14.jpg' },
          { title: 'Kurumsal Roadshow', desc: 'Şirket yöneticileri için yüksek hızlı Wi-Fi ve ara bölme standart.', badge: 'Mobil Ofis', icon: Wifi, image: '/images/route.jpg' },
        ],
        intercity: [
          { title: 'Bodrum - İzmir (ADB) Havalimanı', desc: 'Adnan Menderes Havalimanına sarsıntısız otoyol transferi.', badge: 'Ekspres Güvenli', icon: Compass, image: '/images/route.jpg' },
          { title: 'Bodrum - Dalaman & Göcek', desc: 'Marmaris, Göcek ve Fethiye marinalarına direkt bağlantı.', badge: 'Kıyı Şeridi Rotası', icon: Anchor, image: '/images/cennetkoyu.jpg' },
          { title: 'Bodrum - Antalya', desc: 'Uzun yolculuklar için mola planlamalı VIP şehirlerarası transfer.', badge: 'Uzun Mesafe VIP', icon: Sparkles, image: '/images/inside.jpg' },
        ],
      };
    }
  };
  const servicesData = getServicesData() as Record<string, Array<{ title: string; desc: string; badge: string; icon: any; image: string }>>;

  const categoryColors: Record<string, string> = {
    airport: 'from-blue-600 to-indigo-800 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]',
    marina: 'from-emerald-500 to-teal-700 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    hourly: 'from-purple-500 to-fuchsia-700 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    intercity: 'from-[#E5D3B3] to-[#C19B5E] text-black shadow-[0_0_30px_rgba(229,211,179,0.3)] border-none',
  };

  const getCategoryColorRgba = (id: string) => {
    if (id === 'airport') return 'rgba(99, 102, 241, 0.2)'; // Indigo
    if (id === 'marina') return 'rgba(16, 185, 129, 0.2)'; // Emerald
    if (id === 'hourly') return 'rgba(168, 85, 247, 0.2)'; // Purple
    return 'rgba(229, 211, 179, 0.2)'; // Gold
  };

  const getTexts = () => {
    switch(lang) {
      case 'EN': return { sub: 'PREMIUM SERVICES', title: 'Exclusive Privileges', desc: 'Beyond standards, an Aegean VIP experience.', button: '24/7 Booking' };
      case 'RU': return { sub: 'ПРЕМИУМ УСЛУГИ', title: 'Эксклюзивные Привилегии', desc: 'За гранью стандартов, эгейский VIP-опыт.', button: 'Бронирование 24/7' };
      case 'DE': return { sub: 'PREMIUM-DIENSTE', title: 'Exklusive Privilegien', desc: 'Jenseits von Standards, ein VIP-Erlebnis in der Ägäis.', button: '24/7 Buchung' };
      case 'AR': return { sub: 'خدمات ممتازة', title: 'امتيازات حصرية', desc: 'خارج المعايير، تجربة كبار الشخصيات في بحر إيجة.', button: 'حجز على مدار الساعة' };
      default: return { sub: 'VIP OPERASYON HİZMETLERİ', title: 'Ayrıcalıklı Hizmet Yelpazemiz', desc: 'BODRUM VE EGE GENELİNDE KİŞİYE VE KURUMLARA ÖZEL LÜKS MOBİLİTE ÇÖZÜMLERİ.', button: '7/24 Rezervasyon' };
    }
  };
  const texts = getTexts();

  const [activeTab, setActiveTab] = useState('airport');

  return (
    <section id="services" className="py-28 px-4 w-full max-w-6xl mx-auto relative z-10">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
          <span className="text-[13px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase font-medium">
            {texts.sub}
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4">
          {texts.title}
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-sm max-w-xl mx-auto leading-relaxed">
          {texts.desc}
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
                  ? `bg-gradient-to-r font-bold ${categoryColors[cat.id]}`
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
            spotlightColor={getCategoryColorRgba(activeTab)}
            buttonText={texts.button}
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
