'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard } from 'lucide-react';

export default function ComparisonSection() {
  const { lang } = useLanguage();

  const getTexts = () => {
    switch (lang) {
      case 'EN': return {
        badge: 'Standard of Excellence',
        title: 'Why Easy VIP?',
        subtitle: 'Not tourist or standard transport; operational discipline built with zero tolerance for business and VIP guests.',
        bento1Sub: 'BJV Live Radar Protocol',
        bento1Title: 'End of Delay Stress.',
        bento1Desc: 'Your Bodrum flight is tracked second by second. Even if delayed for 3 hours, your chauffeur waits at the airport. No surprise waiting fees or cancellation risks.',
        bento2Sub: 'Legal Assurance',
        bento2Title: 'TÜRSAB',
        bento2TitleSub: 'Class-A License',
        bento2Desc: 'Free from pirate taxi risks. 100% Legal D2 transport certificate and VIP travel insurance for every passenger.',
        bento3Sub: 'Transparent Pricing',
        bento3Title: 'No Hidden Costs.',
        bento3Desc: 'Tunnels, highways, airport parking fees, and taxes are included in the price we agree on. Flexible payment via credit card, foreign currency, or wire transfer in the vehicle.',
        bento4Sub: 'Mercedes-Benz Fleet Standard',
        bento4Title: '100%',
        bento4Desc: 'We do not send random vehicles. Only custom-designed Mercedes Maybach, Vito, and Sprinter VIP series. Acoustic insulation, minibar, and Wi-Fi are standard.'
      };
      case 'RU': return {
        badge: 'Стандарт качества',
        title: 'Почему Easy VIP?',
        subtitle: 'Операционная дисциплина, созданная с нулевой терпимостью к ошибкам для VIP гостей.',
        bento1Sub: 'Протокол BJV Радар',
        bento1Title: 'Конец стрессам из-за задержек.',
        bento1Desc: 'Ваш рейс отслеживается посекундно. Водитель ждет вас без доплат даже при задержке в 3 часа.',
        bento2Sub: 'Юридическая гарантия',
        bento2Title: 'TÜRSAB',
        bento2TitleSub: 'Лицензия класса А',
        bento2Desc: 'Никаких рисков с нелегальными такси. Полная страховка для каждого пассажира.',
        bento3Sub: 'Прозрачные цены',
        bento3Title: 'Без скрытых платежей.',
        bento3Desc: 'Платные дороги, налоги и парковка уже включены. Оплата картой или наличными в авто.',
        bento4Sub: 'Стандарт Mercedes-Benz',
        bento4Title: '100%',
        bento4Desc: 'Только VIP серия Mercedes Maybach, Vito и Sprinter с шумоизоляцией, Wi-Fi и минибаром.'
      };
      case 'DE': return {
        badge: 'Exzellenzstandard',
        title: 'Warum Easy VIP?',
        subtitle: 'Kompromisslose operative Disziplin für unsere VIP-Gäste.',
        bento1Sub: 'BJV Live-Radar Protokoll',
        bento1Title: 'Kein Stress bei Verspätungen.',
        bento1Desc: 'Ihr Flug wird sekündlich verfolgt. Ihr Chauffeur wartet kostenlos, auch bei 3 Stunden Verspätung.',
        bento2Sub: 'Rechtliche Sicherheit',
        bento2Title: 'TÜRSAB',
        bento2TitleSub: 'Klasse-A Lizenz',
        bento2Desc: 'Keine illegalen Taxis. 100% legal und voll versichert.',
        bento3Sub: 'Transparente Preise',
        bento3Title: 'Keine versteckten Kosten.',
        bento3Desc: 'Maut, Parkgebühren und Steuern sind inklusive. Zahlung per Karte oder bar im Fahrzeug.',
        bento4Sub: 'Mercedes-Benz Flotte',
        bento4Title: '100%',
        bento4Desc: 'Nur VIP Mercedes Maybach, Vito und Sprinter mit WLAN, Minibar und akustischer Isolierung.'
      };
      case 'AR': return {
        badge: 'معيار التميز',
        title: 'لماذا Easy VIP؟',
        subtitle: 'انضباط تشغيلي مصمم بدون تسامح لضيوف كبار الشخصيات.',
        bento1Sub: 'بروتوكول رادار BJV',
        bento1Title: 'نهاية توتر التأخير.',
        bento1Desc: 'يتم تتبع رحلتك ثانية بثانية. سائقك ينتظرك بدون رسوم إضافية حتى لو تأخرت الرحلة.',
        bento2Sub: 'ضمان قانوني',
        bento2Title: 'TÜRSAB',
        bento2TitleSub: 'رخصة فئة A',
        bento2Desc: 'تأمين كامل وتراخيص قانونية بنسبة 100%.',
        bento3Sub: 'أسعار شفافة',
        bento3Title: 'لا تكاليف خفية.',
        bento3Desc: 'جميع الضرائب والرسوم مشمولة. يمكنك الدفع بالبطاقة أو نقدًا.',
        bento4Sub: 'أسطول مرسيدس-بنز',
        bento4Title: '100%',
        bento4Desc: 'فقط سيارات مرسيدس مايباخ وفيتو VIP مع إنترنت وثلاجة صغيرة.'
      };
      default: return {
        badge: 'Mükemmeliyet Standardı',
        title: 'Neden Easy VIP?',
        subtitle: 'Turistik veya standart ulaşım değil; iş dünyası ve VIP misafirler için kurgulanmış, sıfır toleranslı operasyon disiplini.',
        bento1Sub: 'BJV Canlı Radar Protokolü',
        bento1Title: 'Rötar Stresine Son.',
        bento1Desc: 'Bodrum uçuşunuz saniye saniye radarla izlenir. Uçak 3 saat gecikse bile şoförünüz havalimanında sizi bekler. Sürpriz bekleme ücreti veya iptal riski yoktur.',
        bento2Sub: 'Yasal Güvence',
        bento2Title: 'TÜRSAB',
        bento2TitleSub: 'A-Grubu Lisans',
        bento2Desc: 'Korsan taksi ve belgesiz taşımacılık risklerinden uzak. %100 Yasal D2 taşıma belgesi ve her yolcu için VIP seyahat sigortası.',
        bento3Sub: 'Şeffaf Fiyatlandırma',
        bento3Title: 'Gizli Masraf Yok.',
        bento3Desc: 'Tünel, otoyol, havalimanı otopark ücretleri ve vergiler baştan konuştuğumuz fiyata dahildir. Araçta kredi kartı, döviz veya havale ile esnek ödeme imkanı.',
        bento4Sub: 'Mercedes-Benz Filo Standardı',
        bento4Title: '100%',
        bento4Desc: 'Rastgele araç gönderimi yapmıyoruz. Sadece iç dizaynı özel yapım Mercedes Maybach, Vito ve Sprinter VIP serisi araçlar. Akustik yalıtım, buzdolabı ve Wi-Fi donanımı standarttır.'
      };
    }
  };
  const texts = getTexts();

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
            {texts.badge}
          </span>
          <div className="h-[1px] w-8 bg-[#E5D3B3]/40"></div>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-6">
          {texts.title}
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-sm md:text-sm max-w-2xl mx-auto leading-relaxed">
          {texts.subtitle}
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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-1000"></div>
          
          {/* Dark Overlay & Radial Gradient for depth */}
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[13px] tracking-[0.2em] text-white/80 uppercase font-mono">{texts.bento1Sub}</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight leading-none">
              {texts.bento1Title}
            </h3>
            <p className="text-sm md:text-base text-zinc-300 font-sans max-w-lg leading-relaxed">
              {texts.bento1Desc}
            </p>
          </div>
        </motion.div>

        {/* Bento 2: Pure Typography (TÜRSAB) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-4 md:row-span-1 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden relative"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
          
          <div>
            <span className="text-[13px] tracking-[0.2em] text-[#E5D3B3] uppercase font-mono mb-4 block">{texts.bento2Sub}</span>
            <h3 className="text-6xl font-serif text-white tracking-tighter mb-2">{texts.bento2Title}</h3>
            <h4 className="text-2xl font-serif text-zinc-400">{texts.bento2TitleSub}</h4>
          </div>
          
          <p className="text-sm text-zinc-400 mt-8 font-light">
            {texts.bento2Desc}
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
            <span className="text-[13px] tracking-[0.2em] text-[#E5D3B3] uppercase font-mono mb-4 block">{texts.bento3Sub}</span>
            <h3 className="text-3xl font-serif text-white mb-4">{texts.bento3Title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              {texts.bento3Desc}
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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522037169490-349f7e4f1692?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-1000 grayscale opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl md:text-7xl font-serif text-white tracking-tighter">{texts.bento4Title}</span>
              <div className="h-12 w-[1px] bg-white/20"></div>
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-mono">{texts.bento4Sub}</span>
            </div>
            <p className="text-sm md:text-base text-zinc-300 font-sans max-w-xl leading-relaxed">
              {texts.bento4Desc}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
