'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Star, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutVIP() {
  const { lang } = useLanguage();

  const getTexts = () => {
    switch (lang) {
      case 'EN': return {
        exp: 'Years of Experience',
        expSub: '15,000+ Successful VIP Transfers in Bodrum and the Aegean',
        pre: 'PREMIUM SERVICE CONCEPT',
        title1: 'Feel the ', title2: 'Privilege, ', title3: 'Raise the ', title4: 'Standards.',
        desc: "We offer a bespoke, first-class travel experience in Bodrum, not just an ordinary taxi ride. Our advanced Mercedes-Benz Maybach and VIP Vito fleet combines with our special protocol chauffeurs who have undergone strict security and privacy training. Our goal is not just to get you to a destination, but to make you feel privileged every second of the journey.",
        card1Title: 'Protocol Chauffeurs', card1Desc: 'Professionals with advanced driving certificates, English-speaking, suited, and loyal to the principle of privacy.',
        card2Title: 'Maximum Security', card2Desc: 'All vehicles in our fleet undergo mechanical and hygienic VIP cleaning protocols before each transfer.',
        card3Title: 'Zero Delay Policy', card3Desc: 'Your flight is tracked via live radar. Your vehicle is waiting for you at the VIP gate before you even get your luggage.',
        card4Title: 'First Class Refreshments', card4Desc: 'Minibar, cold drinks, Nespresso coffee, and boutique service that instantly responds to your special requests.',
        btn: 'Explore Our Fleet'
      };
      case 'RU': return {
        exp: 'Лет Опыта',
        expSub: 'Более 15 000 успешных VIP-трансферов в Бодруме и Эгейском регионе',
        pre: 'ПРЕМИУМ СЕРВИС',
        title1: 'Почувствуйте ', title2: 'Привилегию, ', title3: 'Повысьте ', title4: 'Стандарты.',
        desc: "Мы предлагаем первоклассный индивидуальный сервис в Бодруме, а не обычную поездку на такси. Наш автопарк Mercedes-Benz Maybach и VIP Vito сочетается с профессиональными водителями, прошедшими строгую подготовку по безопасности и конфиденциальности. Наша цель — чтобы вы чувствовали себя особенными каждую секунду пути.",
        card1Title: 'Водители Протокола', card1Desc: 'Профессионалы с сертификатами экстремального вождения, говорящие по-английски, в строгих костюмах и соблюдающие конфиденциальность.',
        card2Title: 'Максимальная Безопасность', card2Desc: 'Все автомобили проходят механическую и гигиеническую VIP-очистку перед каждым трансфером.',
        card3Title: 'Политика Без Опозданий', card3Desc: 'Ваш рейс отслеживается по радару. Автомобиль ждет вас у VIP-выхода еще до того, как вы получите багаж.',
        card4Title: 'Угощения Первого Класса', card4Desc: 'Мини-бар, прохладительные напитки, кофе Nespresso и бутик-сервис, мгновенно отвечающий вашим запросам.',
        btn: 'Смотреть Автопарк'
      };
      case 'DE': return {
        exp: 'Jahre Erfahrung',
        expSub: '15.000+ Erfolgreiche VIP-Transfers in Bodrum und der Ägäis',
        pre: 'PREMIUM-SERVICE-KONZEPT',
        title1: 'Fühlen Sie das ', title2: 'Privileg, ', title3: 'Heben Sie die ', title4: 'Standards.',
        desc: "Wir bieten in Bodrum ein maßgeschneidertes erstklassiges Reiseerlebnis, nicht nur eine gewöhnliche Taxifahrt. Unsere Flotte aus Mercedes-Benz Maybach und VIP Vito wird von speziellen Protokoll-Chauffeuren gefahren, die streng in Sicherheit und Privatsphäre geschult wurden. Unser Ziel ist es, dass Sie sich in jeder Sekunde der Reise privilegiert fühlen.",
        card1Title: 'Protokoll-Chauffeure', card1Desc: 'Profis mit Zertifikaten für fortgeschrittenes Fahren, englischsprachig, im Anzug und diskret.',
        card2Title: 'Maximale Sicherheit', card2Desc: 'Alle Fahrzeuge unserer Flotte durchlaufen vor jedem Transfer mechanische und hygienische VIP-Reinigungsprotokolle.',
        card3Title: 'Null-Verspätung-Politik', card3Desc: 'Ihr Flug wird per Live-Radar verfolgt. Ihr Fahrzeug wartet bereits am VIP-Gate auf Sie.',
        card4Title: 'First-Class-Erfrischungen', card4Desc: 'Minibar, kalte Getränke, Nespresso-Kaffee und Boutique-Service für Ihre speziellen Anfragen.',
        btn: 'Unsere Flotte'
      };
      case 'AR': return {
        exp: 'سنوات من الخبرة',
        expSub: 'أكثر من 15,000 نقل VIP ناجح في بودروم',
        pre: 'مفهوم الخدمة الممتازة',
        title1: 'اشعر ', title2: 'بالامتياز، ', title3: 'ارفع ', title4: 'المعايير.',
        desc: "نحن نقدم تجربة سفر من الدرجة الأولى مصممة خصيصًا في بودروم، وليس مجرد رحلة تاكسي عادية. يندمج أسطولنا من سيارات مايباخ وفيتو مع سائقي البروتوكول المدربين. هدفنا هو أن نجعلك تشعر بالتميز في كل ثانية من الرحلة.",
        card1Title: 'سائقو البروتوكول', card1Desc: 'محترفون يتحدثون الإنجليزية ويلتزمون بالسرية والأمان التام.',
        card2Title: 'أقصى درجات الأمان', card2Desc: 'تخضع جميع السيارات لبروتوكولات التنظيف الميكانيكي والصحي قبل كل رحلة.',
        card3Title: 'سياسة عدم التأخير', card3Desc: 'يتم تتبع رحلتك عبر الرادار الحي. سيارتك تنتظرك عند بوابة VIP قبل أن تتسلم أمتعتك.',
        card4Title: 'مرطبات من الدرجة الأولى', card4Desc: 'ميني بار، مشروبات باردة، قهوة، وخدمة استجابة فورية لطلباتك الخاصة.',
        btn: 'اكتشف أسطولنا'
      };
      default: return {
        exp: 'Yıllık Tecrübe',
        expSub: "Bodrum ve Ege'de 15.000+ Başarılı VIP Transfer",
        pre: 'PREMIUM HİZMET ANLAYIŞI',
        title1: 'Ayrıcalığı ', title2: 'Hissedin, ', title3: 'Standartları ', title4: 'Yükseltin.',
        desc: "Bodrum'da sıradan bir taksi yolculuğu değil, kişiye özel tasarlanmış birinci sınıf bir seyahat deneyimi sunuyoruz. Gelişmiş Mercedes-Benz Maybach ve VIP Vito filomuz, sıkı güvenlik ve gizlilik eğitimlerinden geçmiş özel protokol şoförlerimizle birleşiyor. Amacımız sadece sizi bir yere ulaştırmak değil, yolculuğun her saniyesinde ayrıcalıklı olduğunuzu hissettirmektir.",
        card1Title: 'Protokol Şoförleri', card1Desc: 'İleri sürüş teknikleri sertifikalı, İngilizce bilen, takım elbiseli ve gizlilik prensibine sadık profesyoneller.',
        card2Title: 'Maksimum Güvenlik', card2Desc: 'Filomuzdaki tüm araçlar her transfer öncesi mekanik ve hijyenik VIP temizlik protokollerinden geçer.',
        card3Title: 'Sıfır Rötar Politikası', card3Desc: 'Uçuşunuz canlı radardan takip edilir. Siz daha bavullarınızı almadan aracınız VIP kapıda sizi bekliyor olur.',
        card4Title: 'First Class İkramlar', card4Desc: 'Mini bar, soğuk içecekler, Nespresso kahve ve özel taleplerinize anında cevap veren butik hizmet.',
        btn: 'Filomuzu Keşfedin'
      };
    }
  };
  const texts = getTexts();

  return (
    <section className="relative py-32 px-4 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E5D3B3]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Image / Visuals */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 glass-panel"
          >
            <img 
              src="/images/wix_img_0.jpg" 
              alt="VIP Chauffeur Service Bodrum" 
              className="w-full h-full object-cover opacity-80"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
            
            {/* Experience Badge */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-center gap-6">
                <div className="text-4xl md:text-5xl font-serif text-[#E5D3B3]">10+</div>
                <div>
                  <div className="text-white text-sm font-bold tracking-widest uppercase">{texts.exp}</div>
                  <div className="text-zinc-400 text-sm mt-1">{texts.expSub}</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#E5D3B3]/10 rounded-full blur-[50px]" />
        </div>

        {/* Right Column: Text & Values */}
        <div className="lg:col-span-7 lg:pl-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-sm tracking-[0.3em] text-[#E5D3B3] uppercase font-bold mb-4 flex items-center gap-3">
              <span className="w-10 h-[1px] bg-[#E5D3B3]"></span>
              Easy VIP Transfer
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-6">
              {texts.title1} <span className="italic font-light text-zinc-400">{texts.title2}</span><br />
              {texts.title3} <span className="text-[#E5D3B3]">{texts.title4}</span>
            </h3>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-light">
              {texts.desc}
            </p>
          </motion.div>

          {/* Grid of Values */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#E5D3B3]">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1.5">{texts.card1Title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{texts.card1Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#E5D3B3]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1.5">{texts.card2Title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{texts.card2Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#E5D3B3]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1.5">{texts.card3Title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{texts.card3Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#E5D3B3]">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1.5">{texts.card4Title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{texts.card4Desc}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#fleet"
              className="inline-flex items-center justify-center h-12 px-8 text-sm tracking-widest uppercase border border-white/10 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
            >
              {texts.btn}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
