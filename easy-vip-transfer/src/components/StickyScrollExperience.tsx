'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plane, Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';



import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function StickyScrollExperience() {
  const [activeStep, setActiveStep] = useState(0);
  
  const { t, lang } = useLanguage();
  const getSteps = () => {
    switch(lang) {
      case 'EN': return [
        { number: "01", tag: "AIRPORT & JET TERMINAL", title: "Personalized Greeting", desc: "Your chauffeur will greet you with a personalized name board at the exit of Milas-Bodrum Airport (BJV) or the General Aviation VIP Terminal. You will be directly escorted to your vehicle with baggage assistance.", highlights: ["Live Flight Tracking", "Free Delay Waiting", "VIP Terminal Support"], image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80", accent: "BJV → Yalıkavak" },
        { number: "02", tag: "FIRST CLASS TRAVEL", title: "Private Cabin Comfort", desc: "Travel comfortably in the Bodrum heat with a soundproof private cabin, starlight ceiling, ultra-wide leather seats, and cold drinks.", highlights: ["Starlight Ceiling", "Cold Minibar & Wi-Fi", "Private Soundproofing"], image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", accent: "Mercedes Maybach & S-Class" },
        { number: "03", tag: "FLAWLESS ARRIVAL", title: "Door-to-door Delivery", desc: "You will be delivered to Yalıkavak Marina, Mandarin Oriental, Maçakızı, Scorpios, or your private yacht pier with zero traffic stress, full privacy, and protocol courtesy.", highlights: ["Marina Pier Access", "Protocol & Privacy", "Cash / Card Payment"], image: "/images/Zuma-Bodrum-14.jpg", accent: "Mandarin Oriental & Marina" }
      ];
      case 'RU': return [
        { number: "01", tag: "АЭРОПОРТ & JET ТЕРМИНАЛ", title: "Персональная Встреча", desc: "Ваш водитель встретит вас с табличкой на выходе из терминала аэропорта (BJV).", highlights: ["Отслеживание Рейса", "Бесплатное Ожидание", "Поддержка VIP-Терминала"], image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80", accent: "BJV → Yalıkavak" },
        { number: "02", tag: "ПЕРВЫЙ КЛАСС", title: "Комфорт в Кабине", desc: "Путешествуйте в комфорте: шумоизолированная кабина, потолок со звёздами, широкие кожаные сиденья и прохладные напитки.", highlights: ["Звёздный Потолок", "Напитки & Wi-Fi", "Шумоизоляция"], image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", accent: "Mercedes Maybach" },
        { number: "03", tag: "БЕЗУПРЕЧНАЯ ДОСТАВКА", title: "Доставка от Двери до Двери", desc: "Вас доставят в марину или к отелю в Yalikavak Marina, Mandarin Oriental или к вашей яхте.", highlights: ["Доступ к Марине", "Конфиденциальность", "Наличные/Безналичный"], image: "/images/Zuma-Bodrum-14.jpg", accent: "Mandarin Oriental" }
      ];
      case 'DE': return [
        { number: "01", tag: "FLUGHAFEN", title: "Persönliche Begrüßung", desc: "Ihr Chauffeur begrüßt Sie mit einem Namensschild am Ausgang des Flughafens (BJV).", highlights: ["Flugverfolgung", "Kostenlose Wartezeit", "VIP-Terminal-Support"], image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80", accent: "BJV → Yalıkavak" },
        { number: "02", tag: "FIRST CLASS", title: "Komfort", desc: "Reisen Sie bequem mit schalldichter Kabine, Sternenhimmel, breiten Ledersitzen und kalten Getränken.", highlights: ["Sternenhimmel", "Minibar & Wi-Fi", "Schalldicht"], image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", accent: "Mercedes Maybach" },
        { number: "03", tag: "ANKUNFT", title: "Tür-zu-Tür Lieferung", desc: "Stressfreie Ankunft in der Yalıkavak Marina, im Mandarin Oriental oder an Ihrer Yacht.", highlights: ["Marina Zugang", "Privatsphäre", "Bar / Karte"], image: "/images/Zuma-Bodrum-14.jpg", accent: "Mandarin Oriental" }
      ];
      case 'AR': return [
        { number: "01", tag: "المطار وصالة الطائرات", title: "استقبال شخصي", desc: "سيستقبلك سائقك بلافتة باسمك عند مخرج المطار.", highlights: ["تتبع الرحلة", "انتظار مجاني", "دعم صالة VIP الخاصة"], image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80", accent: "BJV → Yalıkavak" },
        { number: "02", tag: "درجة أولى", title: "راحة الكابينة الخاصة", desc: "سافر بكل راحة في كابينة خاصة معزولة صوتياً مع سقف نجمي ومقاعد جلدية فاخرة ومشروبات باردة.", highlights: ["سقف النجوم الفاخر", "بار بارد & واي فاي", "عزل صوتي"], image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", accent: "Mercedes Maybach" },
        { number: "03", tag: "وصول مثالي", title: "توصيل من الباب إلى الباب", desc: "ستُوصَل إلى مرسى يختك أو فندقك بلا ضغط.", highlights: ["وصول إلى الرصيف", "خصوصية", "نقدي / بطاقة"], image: "/images/Zuma-Bodrum-14.jpg", accent: "Mandarin Oriental" }
      ];
      default: return [
        { number: "01", tag: "HAVALİMANI & JET TERMİNALİ", title: "Kişiye Özel İsimlikle Karşılama", desc: "Milas-Bodrum Havalimanı (BJV) veya Genel Havacılık VIP Terminali çıkışında, şoförünüz sizi isminizin yazılı olduğu özel tablet/levha ile karşılar. Bagaj asistanlığıyla doğrudan aracınıza eşlik edilir.", highlights: ["Canlı Uçuş Takibi", "Ücretsiz Rötar Bekleme", "VIP Terminal Desteği"], image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80", accent: "Milas-Bodrum (BJV) → Yalıkavak" },
        { number: "02", tag: "FIRST CLASS SEYAHAT", title: "Özel Kabin İçi Konforu", desc: "Ses yalıtımlı özel kabin, yıldız ambiyans tavan aydınlatması, ultra geniş deri koltuklar ve soğuk içecek ikramlarıyla Bodrum sıcağında dinlenerek yolculuk yapın.", highlights: ["Yıldız Tavan Ambiyansı", "Soğuk Minibar & Wi-Fi", "Özel Ses Yalıtımı"], image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", accent: "Mercedes Maybach & S-Class" },
        { number: "03", tag: "KUSURSUZ TESLİM", title: "Otel, Villa & Marina Kapısına Teslim", desc: "Yalıkavak Marina, Mandarin Oriental, Maçakızı, Scorpios veya özel teknenizin iskelesine kadar sıfır trafik stresi, tam gizlilik ve protokol nezaketiyle ulaştırılırsınız.", highlights: ["Marina İskele Geçişi", "Protokol & Gizlilik", "Nakit / Kart ile Ödeme"], image: "/images/Zuma-Bodrum-14.jpg", accent: "Mandarin Oriental & Marina" }
      ];
    }
  };
  const steps = getSteps();


  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section id="experience" className="py-28 px-4 w-full max-w-6xl mx-auto relative z-10 border-t border-white/5">
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
          <span className="text-[13px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase font-medium">
            {t.experience.badge}
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
          {t.experience.title1}<br />
          <span className="italic font-light text-[#E5D3B3]">{t.experience.title2}</span>
        </h2>
      </motion.div>

      {/* Changing Cards Interactive Experience */}
      <div 
        className="max-w-5xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveStep(idx);
                  setIsHovered(true); // Pause auto-rotate when manually clicked
                  setTimeout(() => setIsHovered(false), 8000); // Resume after 8s
                }}
                className={`relative px-6 py-4 rounded-2xl md:rounded-full text-sm font-sans tracking-widest uppercase transition-all duration-300 border overflow-hidden w-full md:w-auto ${
                  isActive 
                    ? "bg-white/[0.08] text-white border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                    : "bg-white/[0.02] text-zinc-500 border-white/[0.05] hover:text-zinc-300 hover:bg-white/[0.04]"
                }`}
              >
                <span className="font-mono mr-3 opacity-50">{step.number}</span>
                {step.tag}
                
                {isActive && (
                  <>
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 border border-[#E5D3B3]/40 rounded-2xl md:rounded-full pointer-events-none"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    {/* Visual Timer Progress Bar */}
                    {!isHovered && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-[#E5D3B3]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        key={`timer-${activeStep}`} // Reset animation when step changes
                      />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Display */}
        <div className="relative min-h-[500px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* Left Text Card */}
              <div className="lg:col-span-7 backdrop-blur-xl bg-[#0a0a0a]/60 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5D3B3]/5 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl md:text-6xl font-serif text-white/20 font-light">
                    {steps[activeStep].number}
                  </span>
                  <div className="h-px w-16 bg-[#E5D3B3]/30"></div>
                </div>

                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">
                  {steps[activeStep].title}
                </h3>
                
                <p className="text-base md:text-lg font-sans text-zinc-400 font-light leading-relaxed mb-10">
                  {steps[activeStep].desc}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  {steps[activeStep].highlights.map((hl, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] text-zinc-200 tracking-wide"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E5D3B3]" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual Card */}
              <div className="lg:col-span-5 h-full">
                <div className="backdrop-blur-2xl bg-[#0a0a0a]/80 border border-white/10 rounded-3xl p-4 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden relative h-full flex flex-col">
                  
                  {/* Visual Image container */}
                  <div className="relative h-64 md:h-72 w-full rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-white/5 shrink-0">
                    <img
                      src={steps[activeStep].image}
                      alt={steps[activeStep].title}
                      className="w-full h-full object-cover transition-transform duration-1000 scale-105 hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[12px] text-[#E5D3B3] font-mono uppercase tracking-widest">
                        {steps[activeStep].accent}
                      </span>
                    </div>
                  </div>

                  {/* Fast WhatsApp Route Booking */}
                  <div className="space-y-4 px-2 pb-2 flex-grow flex flex-col justify-end">
                    <div className="text-sm text-zinc-400 flex items-center justify-between border-b border-white/5 pb-3">
                      <span>Rezervasyon:</span>
                      <strong className="text-white font-serif">VIP Kapıdan Kapıya</strong>
                    </div>
                    <div className="text-sm text-zinc-400 flex items-center justify-between border-b border-white/5 pb-3">
                      <span>Şoför Statüsü:</span>
                      <span className="text-emerald-400 font-medium">● 7/24 Aktif & Hazır</span>
                    </div>
                    
                    <a
                      href="https://wa.me/905305673991?text=Merhaba,%20VIP%20transfer%20hizmetiniz%20hakkinda%20bilgi%20ve%20rezervasyon%20almak%20istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-[#E5D3B3] py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300"
                    >
                      <span>Hemen Rezerve Et</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
