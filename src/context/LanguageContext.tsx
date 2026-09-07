'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'TR' | 'EN' | 'RU';

interface Translations {
  nav: {
    fleet: string;
    routes: string;
    services: string;
    faq: string;
    bookNow: string;
    calc: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    btnCalc: string;
    btnFleet: string;
    popularRoutes: string;
  };
  calc: {
    badge: string;
    title: string;
    quickSelect: string;
    from: string;
    to: string;
    date: string;
    passengers: string;
    btnQuote: string;
    badge1: string;
    badge2: string;
    badge3: string;
    available: string;
  };
  fleet: {
    badge: string;
    title: string;
    subtitle: string;
    selectedSpecs: string;
    bookCar: string;
    fromPrice: string;
  };
  map: {
    badge: string;
    title: string;
    subtitle: string;
    hubTitle: string;
    hubDesc: string;
    airportTitle: string;
    airportDesc: string;
    calcRoute: string;
    selectedDest: string;
    driveTime: string;
    bookWhatsApp: string;
  };
  experience: {
    badge: string;
    title1: string;
    title2: string;
    bookExperience: string;
  };
  comparison: {
    badge: string;
    title: string;
    subtitle: string;
    colStandard: string;
    colVip: string;
  };
  mobileBar: {
    callNow: string;
    vipWhatsApp: string;
  };
}

export const translations: Record<Language, Translations> = {
  TR: {
    nav: {
      fleet: 'Araç Filosu',
      routes: 'Rotalar',
      services: 'Ayrıcalıklar',
      faq: 'SSS',
      bookNow: 'Rezervasyon',
      calc: 'Fiyat Hesapla',
    },
    hero: {
      badge: "Bodrum'un En Seçkin VIP Filosu",
      title1: 'Zamanınız Değerli,',
      title2: 'Yolculuğunuz Kusursuz',
      title3: 'Olmalı.',
      subtitle: "Milas-Bodrum Havalimanı'ndan Mandarin Oriental'e, Yalıkavak Marina'dan Türkbükü'ne. Maybach ve S-Class konforuyla kişiye özel 7/24 First Class transfer deneyimi.",
      btnCalc: 'Fiyatı Hesapla',
      btnFleet: 'Filoyu Keşfet',
      popularRoutes: 'Popüler Rotalar:',
    },
    calc: {
      badge: 'Bodrum VIP Transfer',
      title: 'Transfer Fiyatı Alın',
      quickSelect: 'Hızlı Seçim:',
      from: 'Nereden',
      to: 'Nereye',
      date: 'Tarih',
      passengers: 'Yolcu',
      btnQuote: 'Teklif Al',
      badge1: 'TÜRSAB A Grubu',
      badge2: 'Gizli Ücret Yok',
      badge3: 'Ücretsiz İptal',
      available: 'Araçlar Müsait',
    },
    fleet: {
      badge: 'Kişiye Özel Hazırlanan Filo',
      title: "Bodrum'un En Seçkin Araç Koleksiyonu",
      subtitle: 'Tüm araçlarımız özel ses izolasyonu, yıldız ambiyans tavanı ve soğuk meşrubat ikramlarıyla donatılmıştır.',
      selectedSpecs: 'Seçili Araç Donanımı',
      bookCar: 'Bu Aracı Ayırt',
      fromPrice: '/ başlangıç',
    },
    map: {
      badge: 'Bodrum Yarımadası & Ulaşım',
      title: 'Koylara ve Marinalara VIP Erişim',
      subtitle: "Milas-Bodrum Uluslararası Havalimanı (BJV); Yalıkavak Marina, Göltürkbükü (Amanruya / Mandarin), Türkbükü ve Bodrum Yarımadası'nın tüm lüks koylarına açılan kapınızdır.",
      hubTitle: 'Operasyon & Karşılama Merkezi',
      hubDesc: 'Milas-Bodrum Havalimanı (BJV) & Yalıkavak Marina\n48400 Bodrum / Muğla, Türkiye',
      airportTitle: 'Havalimanı Bağlantısı',
      airportDesc: 'Milas-Bodrum Airport (BJV) ➔ 30-45 dk VIP Sürüş\n7/24 Kesintisiz Canlı Uçuş & Rötar Takibi',
      calcRoute: 'Transfer Fiyatını Hesapla',
      selectedDest: 'Seçili Destinasyon',
      driveTime: 'Sürüş',
      bookWhatsApp: 'WhatsApp İle Ayırt',
    },
    experience: {
      badge: 'Kusursuz Yolculuk Akışı',
      title1: 'Uçağınızdan Bodrum Koylarına',
      title2: '3 Adımda First Class Deneyim',
      bookExperience: 'Bu Deneyimi Rezerve Et',
    },
    comparison: {
      badge: 'Neden Easy VIP?',
      title: 'Standart Ulaşım vs. Easy VIP Deneyimi',
      subtitle: 'Bodrum seyahatinizi şansa bırakmayın. Farkı ilk andan itibaren hissedin.',
      colStandard: 'Sıradan Taksi / Shuttle',
      colVip: 'Easy VIP Transfer',
    },
    mobileBar: {
      callNow: 'Hemen Ara',
      vipWhatsApp: 'WhatsApp VIP',
    },
  },
  EN: {
    nav: {
      fleet: 'Fleet',
      routes: 'Routes',
      services: 'Privileges',
      faq: 'FAQ',
      bookNow: 'Book Now',
      calc: 'Estimate Price',
    },
    hero: {
      badge: "Bodrum's Premier VIP Fleet",
      title1: 'Your Time is Precious,',
      title2: 'Your Journey Must Be',
      title3: 'Flawless.',
      subtitle: 'From Milas-Bodrum Airport to Mandarin Oriental, Yalıkavak Marina to Türkbükü. Bespoke 24/7 First Class transfer in Maybach & S-Class luxury.',
      btnCalc: 'Get Instant Quote',
      btnFleet: 'Explore Fleet',
      popularRoutes: 'Popular Routes:',
    },
    calc: {
      badge: 'Bodrum Luxury Chauffeur',
      title: 'Calculate Transfer Price',
      quickSelect: 'Quick Select:',
      from: 'Pick-up',
      to: 'Drop-off',
      date: 'Date',
      passengers: 'Guests',
      btnQuote: 'Get Quote',
      badge1: 'TÜRSAB Licensed',
      badge2: 'No Hidden Fees',
      badge3: 'Free Cancellation',
      available: 'Vehicles Ready',
    },
    fleet: {
      badge: 'Tailored Luxury Fleet',
      title: "Bodrum's Finest Luxury Car Collection",
      subtitle: 'All vehicles equipped with acoustic noise cancellation, starlight ceiling, and premium refreshments.',
      selectedSpecs: 'Selected Vehicle Specifications',
      bookCar: 'Reserve This Vehicle',
      fromPrice: '/ starting from',
    },
    map: {
      badge: 'Bodrum Peninsula & Navigation',
      title: 'VIP Access to Bays & Marinas',
      subtitle: 'Milas-Bodrum International Airport (BJV) is your direct gateway to Yalıkavak Marina, Mandarin Oriental, Amanruya, and premier Aegean resorts.',
      hubTitle: 'Operations & Chauffeur Hub',
      hubDesc: 'Milas-Bodrum Airport (BJV) & Yalıkavak Marina\n48400 Bodrum / Muğla, Turkey',
      airportTitle: 'Airport Connection',
      airportDesc: 'Milas-Bodrum Airport (BJV) ➔ 30-45 min VIP Ride\n24/7 Live Flight & Delay Monitoring',
      calcRoute: 'Calculate Route Price',
      selectedDest: 'Selected Destination',
      driveTime: 'Drive',
      bookWhatsApp: 'Book via WhatsApp',
    },
    experience: {
      badge: 'Seamless Journey Flow',
      title1: 'From Flight Arrival to Aegean Bays',
      title2: '3 Steps to First Class Travel',
      bookExperience: 'Reserve This Experience',
    },
    comparison: {
      badge: 'Why Easy VIP?',
      title: 'Standard Taxi vs. Easy VIP Experience',
      subtitle: "Don't leave your Bodrum vacation to chance. Feel the difference from the very first moment.",
      colStandard: 'Standard Taxi / Shuttle',
      colVip: 'Easy VIP Transfer',
    },
    mobileBar: {
      callNow: 'Call 24/7',
      vipWhatsApp: 'WhatsApp VIP',
    },
  },
  RU: {
    nav: {
      fleet: 'Автопарк',
      routes: 'Маршруты',
      services: 'Привилегии',
      faq: 'Вопросы',
      bookNow: 'Бронировать',
      calc: 'Калькулятор',
    },
    hero: {
      badge: 'Премиум VIP Автопарк в Бодруме',
      title1: 'Ваше Время Бесценно,',
      title2: 'Ваша Поездка Должна Быть',
      title3: 'Безупречной.',
      subtitle: 'Из аэропорта Милас-Бодрум в Mandarin Oriental, Yalıkavak Marina и Тюркбюкю. Персональный трансфер Первого Класса 24/7 на Mercedes Maybach.',
      btnCalc: 'Рассчитать Цену',
      btnFleet: 'Наш Автопарк',
      popularRoutes: 'Популярные Маршруты:',
    },
    calc: {
      badge: 'VIP Трансфер в Бодруме',
      title: 'Расчет Стоимости Трансфера',
      quickSelect: 'Быстрый Выбор:',
      from: 'Откуда',
      to: 'Куда',
      date: 'Дата',
      passengers: 'Пассажиры',
      btnQuote: 'Получить Цену',
      badge1: 'Лицензия TÜRSAB',
      badge2: 'Без Скрытых Доплат',
      badge3: 'Бесплатная Отмена',
      available: 'Автомобили Доступны',
    },
    fleet: {
      badge: 'Персонально Подготовленный Флот',
      title: 'Эксклюзивная Коллекция Автомобилей',
      subtitle: 'Все автомобили оборудованы звездным небом, шумоизоляцией и прохладительными напитками.',
      selectedSpecs: 'Характеристики Выбранного Авто',
      bookCar: 'Забронировать',
      fromPrice: '/ от',
    },
    map: {
      badge: 'Полуостров Бодрум и Навигация',
      title: 'VIP Доступ к Бухтам и Маринам',
      subtitle: 'Аэропорт Милас-Бодрум (BJV) — ваши ворота в Yalıkavak Marina, Mandarin Oriental, Amanruya и элитные отели Эгейского побережья.',
      hubTitle: 'Операционный Центр и Встреча',
      hubDesc: 'Аэропорт Милас-Бодрум (BJV) и Yalıkavak Marina\n48400 Бодрум / Мугла, Турция',
      airportTitle: 'Трансфер из Аэропорта',
      airportDesc: 'Аэропорт Милас-Бодрум (BJV) ➔ 30-45 мин VIP Поездки\nКруглосуточное отслеживание рейсов',
      calcRoute: 'Рассчитать Маршрут',
      selectedDest: 'Выбранное Направление',
      driveTime: 'В пути',
      bookWhatsApp: 'Заказать в WhatsApp',
    },
    experience: {
      badge: 'Идеальный Процесс Поездки',
      title1: 'От Трапа Самолета до Бухт Бодрума',
      title2: '3 Шага к Путешествию Первого Класса',
      bookExperience: 'Заказать VIP Опыт',
    },
    comparison: {
      badge: 'Почему Easy VIP?',
      title: 'Обычное Такси против Easy VIP',
      subtitle: 'Не оставляйте отдых в Бодруме на волю случая. Почувствуйте премиум-сервис с первой минуты.',
      colStandard: 'Обычное Такси',
      colVip: 'Easy VIP Transfer',
    },
    mobileBar: {
      callNow: 'Позвонить 24/7',
      vipWhatsApp: 'WhatsApp VIP',
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('TR');

  useEffect(() => {
    const saved = localStorage.getItem('easyvip_lang') as Language;
    if (saved && (saved === 'TR' || saved === 'EN' || saved === 'RU')) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('easyvip_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
