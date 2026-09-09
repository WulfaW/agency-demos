'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// We now accept any string as language code from the dropdown. 
// But strictly typed keys are TR, EN, RU for translations.
export type Language = string;

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
      fleet: 'Araçlar',
      routes: 'Rotalar',
      services: 'Hizmetler',
      faq: 'SSS',
      bookNow: 'Rezervasyon',
      calc: 'Fiyat Al',
    },
    hero: {
      badge: "Bodrum VIP Transfer",
      title1: 'Sıfır Rötar.',
      title2: 'Sıfır Stres.',
      title3: 'Sadece Transfer.',
      subtitle: "Milas-Bodrum Havalimanı (BJV) ve Marina bağlantıları için 7/24 şoförlü Maybach ve Vito kiralama. Bekleme yok, gizlilik protokolü devrede.",
      btnCalc: 'Fiyat Hesapla',
      btnFleet: 'Filoyu İncele',
      popularRoutes: 'Popüler:',
    },
    calc: {
      badge: 'Rezervasyon',
      title: 'Transfer Fiyatı Alın',
      quickSelect: 'Hızlı Seçim:',
      from: 'Nereden',
      to: 'Nereye',
      date: 'Tarih',
      passengers: 'Kişi Sayısı',
      btnQuote: 'Fiyatı Gör',
      badge1: 'TÜRSAB A Grubu',
      badge2: 'Sabit Fiyat',
      badge3: 'Ücretsiz İptal',
      available: 'Araçlar Müsait',
    },
    fleet: {
      badge: 'Araç Filosu',
      title: "Mercedes-Benz Maybach & Vito",
      subtitle: 'Tüm araçlarımızda standart olarak ses izolasyonu, karşılıklı VIP koltuklar ve ikramlar bulunur.',
      selectedSpecs: 'Araç Donanımı',
      bookCar: 'Bu Aracı Seç',
      fromPrice: '/ başlangıç',
    },
    map: {
      badge: 'Bölge & Ulaşım',
      title: 'Bodrum Yarımadası',
      subtitle: "Havalimanı ve marinalar arası direkt ulaşım. Geliş saatinize göre optimize edilmiş rotalar.",
      hubTitle: 'Operasyon Merkezi',
      hubDesc: 'Milas-Bodrum Havalimanı (BJV) & Yalıkavak Marina\n48400 Bodrum / Muğla',
      airportTitle: 'Havalimanı Transferi',
      airportDesc: 'Milas-Bodrum Airport (BJV) ➔ 30-45 dk\nCanlı Uçuş & Rötar Takibi',
      calcRoute: 'Rotayı Hesapla',
      selectedDest: 'Seçilen Bölge',
      driveTime: 'Sürüş Süresi',
      bookWhatsApp: 'WhatsApp Üzerinden Sor',
    },
    experience: {
      badge: 'Operasyon Akışı',
      title1: 'Havalimanından Otele',
      title2: 'Standart İşleyiş',
      bookExperience: 'Rezervasyon Yap',
    },
    comparison: {
      badge: 'Karşılaştırma',
      title: 'Neden Bizi Seçmelisiniz?',
      subtitle: 'Standart ulaşım yöntemleri ile kurumsal transfer arasındaki farklar.',
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
  AR: {
    nav: {
      fleet: 'الأسطول',
      routes: 'المسارات',
      services: 'الخدمات',
      faq: 'أسئلة',
      bookNow: 'احجز الآن',
      calc: 'حساب السعر',
    },
    hero: {
      badge: 'أسطول كبار الشخصيات في بودروم',
      title1: 'وقتك ثمين،',
      title2: 'ورحلتك يجب أن تكون',
      title3: 'خالية من العيوب.',
      subtitle: 'من مطار ميلاس-بودروم إلى ماندارين أورينتال وياليكافاك مارينا. خدمة نقل من الدرجة الأولى على مدار 24/7 مع مايباخ وسيارات مرسيدس الفاخرة.',
      btnCalc: 'احصل على السعر',
      btnFleet: 'تصفح الأسطول',
      popularRoutes: 'المسارات الشائعة:',
    },
    calc: {
      badge: 'نقل كبار الشخصيات',
      title: 'حساب تكلفة النقل',
      quickSelect: 'اختيار سريع:',
      from: 'من',
      to: 'إلى',
      date: 'التاريخ',
      passengers: 'الركاب',
      btnQuote: 'عرض السعر',
      badge1: 'مرخص من TÜRSAB',
      badge2: 'أسعار ثابتة',
      badge3: 'إلغاء مجاني',
      available: 'السيارات متاحة',
    },
    fleet: {
      badge: 'أسطول فاخر مخصص',
      title: 'مجموعة السيارات الفاخرة',
      subtitle: 'جميع السيارات مزودة بعزل صوتي، سقف مضيء، ومرطبات متميزة.',
      selectedSpecs: 'مواصفات السيارة',
      bookCar: 'احجز هذه السيارة',
      fromPrice: '/ يبدأ من',
    },
    map: {
      badge: 'شبه جزيرة بودروم والملاحة',
      title: 'وصول كبار الشخصيات للخلجان والمراسي',
      subtitle: 'مطار ميلاس-بودروم هو بوابتك المباشرة إلى أرقى الفنادق والمنتجعات في بحر إيجة.',
      hubTitle: 'مركز العمليات',
      hubDesc: 'مطار ميلاس بودروم وياليكافاك مارينا\n48400 بودروم / موغلا، تركيا',
      airportTitle: 'نقل المطار',
      airportDesc: 'مطار ميلاس-بودروم ➔ رحلة فاخرة لمدة 30-45 دقيقة\nمراقبة الرحلات الجوية على مدار 24 ساعة',
      calcRoute: 'حساب مسار الرحلة',
      selectedDest: 'الوجهة المختارة',
      driveTime: 'وقت القيادة',
      bookWhatsApp: 'احجز عبر واتساب',
    },
    experience: {
      badge: 'تجربة رحلة سلسة',
      title1: 'من وصول الرحلة إلى الخلجان',
      title2: '3 خطوات للسفر من الدرجة الأولى',
      bookExperience: 'احجز هذه التجربة',
    },
    comparison: {
      badge: 'لماذا تختارنا؟',
      title: 'سيارات الأجرة العادية مقابل النقل الفاخر',
      subtitle: 'لا تترك إجازتك للصدفة. اشعر بالفرق من اللحظة الأولى.',
      colStandard: 'تاكسي عادي',
      colVip: 'ايزي في آي بي',
    },
    mobileBar: {
      callNow: 'اتصل الآن',
      vipWhatsApp: 'واتساب',
    },
  },
  DE: {
    nav: {
      fleet: 'Fuhrpark',
      routes: 'Routen',
      services: 'Leistungen',
      faq: 'FAQ',
      bookNow: 'Buchen',
      calc: 'Preis Berechnen',
    },
    hero: {
      badge: 'Bodrums Premium VIP Flotte',
      title1: 'Ihre Zeit ist Kostbar,',
      title2: 'Ihre Reise Muss',
      title3: 'Perfekt Sein.',
      subtitle: 'Vom Flughafen Milas-Bodrum zum Mandarin Oriental oder zur Yalıkavak Marina. Erstklassiger 24/7 Chauffeurservice in Maybach & S-Klasse.',
      btnCalc: 'Sofortpreis Erhalten',
      btnFleet: 'Fuhrpark Entdecken',
      popularRoutes: 'Beliebte Routen:',
    },
    calc: {
      badge: 'VIP Chauffeurservice',
      title: 'Transferpreis Berechnen',
      quickSelect: 'Schnellauswahl:',
      from: 'Abholort',
      to: 'Zielort',
      date: 'Datum',
      passengers: 'Personen',
      btnQuote: 'Preis Anzeigen',
      badge1: 'TÜRSAB Lizenziert',
      badge2: 'Keine Versteckten Kosten',
      badge3: 'Kostenlose Stornierung',
      available: 'Fahrzeuge Verfügbar',
    },
    fleet: {
      badge: 'Maßgeschneiderter Luxus',
      title: 'Exklusive Fahrzeugkollektion',
      subtitle: 'Alle Fahrzeuge sind standardmäßig mit Geräuschisolierung, Sternenhimmel und Premium-Erfrischungen ausgestattet.',
      selectedSpecs: 'Fahrzeugausstattung',
      bookCar: 'Fahrzeug Reservieren',
      fromPrice: '/ ab',
    },
    map: {
      badge: 'Bodrum Halbinsel & Navigation',
      title: 'VIP-Zugang zu Buchten & Marinas',
      subtitle: 'Der Flughafen Milas-Bodrum ist Ihr direkter Zugang zum Mandarin Oriental, Amanruya und den besten Resorts der Ägäis.',
      hubTitle: 'Einsatzzentrale',
      hubDesc: 'Flughafen Milas-Bodrum (BJV) & Yalıkavak Marina\n48400 Bodrum / Muğla, Türkei',
      airportTitle: 'Flughafentransfer',
      airportDesc: 'Flughafen BJV ➔ 30-45 Min. VIP Fahrt\n24/7 Live Flug- & Verspätungsüberwachung',
      calcRoute: 'Routenpreis Berechnen',
      selectedDest: 'Ausgewähltes Ziel',
      driveTime: 'Fahrzeit',
      bookWhatsApp: 'Über WhatsApp Buchen',
    },
    experience: {
      badge: 'Reibungsloser Ablauf',
      title1: 'Vom Flugzeug zur Ägäis',
      title2: '3 Schritte zur First-Class Reise',
      bookExperience: 'Erlebnis Buchen',
    },
    comparison: {
      badge: 'Warum Easy VIP?',
      title: 'Standard Taxi vs. Easy VIP',
      subtitle: 'Überlassen Sie Ihren Bodrum-Urlaub nicht dem Zufall. Spüren Sie den Unterschied vom ersten Moment an.',
      colStandard: 'Standard Taxi',
      colVip: 'Easy VIP Transfer',
    },
    mobileBar: {
      callNow: 'Jetzt Anrufen',
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
    const saved = localStorage.getItem('easyvip_lang');
    if (saved) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('easyvip_lang', newLang);
  };

  // Safe fallback to English if translation isn't explicitly defined
  const currentTranslations = (translations as any)[lang] || (translations as any)['EN'];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: currentTranslations }}>
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
