import os

def process_sticky():
    filepath = "src/components/StickyScrollExperience.tsx"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # remove the existing steps array
    steps_start = content.find("const steps = [")
    steps_end = content.find("];", steps_start) + 2
    
    new_content = content[:steps_start] + content[steps_end:]
    
    get_steps_code = """
  const { t, lang } = useLanguage();
  const getSteps = () => {
    switch(lang) {
      case 'EN': return [
        { number: "01", tag: "AIRPORT & JET TERMINAL", title: "Personalized Greeting", desc: "Your chauffeur will greet you with a personalized name board at the exit of Milas-Bodrum Airport (BJV) or the General Aviation VIP Terminal. You will be directly escorted to your vehicle with baggage assistance.", highlights: ["Live Flight Tracking", "Free Delay Waiting", "VIP Terminal Support"], image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", accent: "BJV ➔ Yalıkavak" },
        { number: "02", tag: "FIRST CLASS TRAVEL", title: "Private Cabin Comfort", desc: "Travel comfortably in the Bodrum heat with a soundproof private cabin, starlight ceiling, ultra-wide leather seats, and cold drinks.", highlights: ["Starlight Ceiling", "Cold Minibar & Wi-Fi", "Private Soundproofing"], image: "/images/wix_img_2.jpg", accent: "Mercedes Maybach & S-Class" },
        { number: "03", tag: "FLAWLESS ARRIVAL", title: "Door-to-door Delivery", desc: "You will be delivered to Yalıkavak Marina, Mandarin Oriental, Maçakızı, Scorpios, or your private yacht pier with zero traffic stress, full privacy, and protocol courtesy.", highlights: ["Marina Pier Access", "Protocol & Privacy", "Cash / Card Payment"], image: "https://images.unsplash.com/photo-1582236814424-9b2fdb1cb6f3?q=80&w=1200&auto=format&fit=crop", accent: "Mandarin Oriental & Marina" }
      ];
      case 'RU': return [
        { number: "01", tag: "АЭРОПОРТ И JET ТЕРМИНАЛ", title: "Персональная встреча", desc: "Ваш водитель встретит вас с именной табличкой на выходе из аэропорта Бодрум (BJV).", highlights: ["Отслеживание рейса", "Бесплатное ожидание", "Поддержка VIP-терминала"], image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", accent: "BJV ➔ Yalıkavak" },
        { number: "02", tag: "ПЕРВЫЙ КЛАСС", title: "Комфорт в салоне", desc: "Путешествуйте с комфортом: звукоизолированный салон, звездное небо, широкие кожаные сиденья и прохладительные напитки.", highlights: ["Звездный потолок", "Минибар и Wi-Fi", "Звукоизоляция"], image: "/images/wix_img_2.jpg", accent: "Mercedes Maybach" },
        { number: "03", tag: "ИДЕАЛЬНОЕ ПРИБЫТИЕ", title: "Доставка до двери", desc: "Без стресса и пробок вас доставят в Yalıkavak Marina, Mandarin Oriental или к вашей яхте.", highlights: ["Доступ к марине", "Приватность", "Оплата картой/наличными"], image: "https://images.unsplash.com/photo-1582236814424-9b2fdb1cb6f3?q=80&w=1200&auto=format&fit=crop", accent: "Mandarin Oriental" }
      ];
      case 'DE': return [
        { number: "01", tag: "FLUGHAFEN", title: "Persönliche Begrüßung", desc: "Ihr Chauffeur begrüßt Sie mit einem Namensschild am Ausgang des Flughafens (BJV).", highlights: ["Flugverfolgung", "Kostenlose Wartezeit", "VIP-Terminal-Support"], image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", accent: "BJV ➔ Yalıkavak" },
        { number: "02", tag: "FIRST CLASS", title: "Komfort", desc: "Reisen Sie bequem mit schalldichter Kabine, Sternenhimmel, breiten Ledersitzen und kalten Getränken.", highlights: ["Sternenhimmel", "Minibar & Wi-Fi", "Schalldicht"], image: "/images/wix_img_2.jpg", accent: "Mercedes Maybach" },
        { number: "03", tag: "ANKUNFT", title: "Tür-zu-Tür Lieferung", desc: "Stressfreie Ankunft in der Yalıkavak Marina, im Mandarin Oriental oder an Ihrer Yacht.", highlights: ["Marina Zugang", "Privatsphäre", "Bar / Karte"], image: "https://images.unsplash.com/photo-1582236814424-9b2fdb1cb6f3?q=80&w=1200&auto=format&fit=crop", accent: "Mandarin Oriental" }
      ];
      case 'AR': return [
        { number: "01", tag: "المطار والمحطة الخاصة", title: "استقبال شخصي", desc: "سيستقبلك سائقك بلوحة تحمل اسمك عند مخرج المطار.", highlights: ["تتبع الرحلة", "انتظار مجاني", "دعم صالة كبار الشخصيات"], image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", accent: "BJV ➔ Yalıkavak" },
        { number: "02", tag: "الدرجة الأولى", title: "راحة المقصورة الخاصة", desc: "سافر براحة مع مقصورة عازلة للصوت، وسقف مرصع بالنجوم، ومقاعد جلدية واسعة، ومشروبات باردة.", highlights: ["سقف مرصع بالنجوم", "ميني بار وواي فاي", "عزل صوتي"], image: "/images/wix_img_2.jpg", accent: "Mercedes Maybach" },
        { number: "03", tag: "وصول مثالي", title: "توصيل من الباب للباب", desc: "ستصل إلى وجهتك بخصوصية تامة وبدون توتر مروري.", highlights: ["دخول المارينا", "الخصوصية", "الدفع نقداً / بالبطاقة"], image: "https://images.unsplash.com/photo-1582236814424-9b2fdb1cb6f3?q=80&w=1200&auto=format&fit=crop", accent: "Mandarin Oriental" }
      ];
      default: return [
        { number: "01", tag: "HAVALİMANI & JET TERMİNALİ", title: "Kişiye Özel İsimlikle Karşılama", desc: "Milas-Bodrum Havalimanı (BJV) veya Genel Havacılık VIP Terminali çıkışında, şoförünüz sizi isminizin yazılı olduğu özel tablet/levha ile karşılar. Bagaj asistanlığıyla doğrudan aracınıza eşlik edilir.", highlights: ["Canlı Uçuş Takibi", "Ücretsiz Rötar Bekleme", "VIP Terminal Desteği"], image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", accent: "Milas-Bodrum (BJV) ➔ Yalıkavak" },
        { number: "02", tag: "FIRST CLASS SEYAHAT", title: "Özel Kabin İçi Konforu", desc: "Ses yalıtımlı özel kabin, yıldız ambiyans tavan aydınlatması, ultra geniş deri koltuklar ve soğuk içecek ikramlarıyla Bodrum sıcağında dinlenerek yolculuk yapın.", highlights: ["Yıldız Tavan Ambiyansı", "Soğuk Minibar & Wi-Fi", "Özel Ses Yalıtımı"], image: "/images/wix_img_2.jpg", accent: "Mercedes Maybach & S-Class" },
        { number: "03", tag: "KUSURSUZ TESLİM", title: "Otel, Villa & Marina Kapısına Teslim", desc: "Yalıkavak Marina, Mandarin Oriental, Maçakızı, Scorpios veya özel teknenizin iskelesine kadar sıfır trafik stresi, tam gizlilik ve protokol nezaketiyle ulaştırılırsınız.", highlights: ["Marina İskele Geçişi", "Protokol & Gizlilik", "Nakit / Kart ile Ödeme"], image: "https://images.unsplash.com/photo-1582236814424-9b2fdb1cb6f3?q=80&w=1200&auto=format&fit=crop", accent: "Mandarin Oriental & Marina" }
      ];
    }
  };
  const steps = getSteps();
"""
    
    new_content = new_content.replace("const { t } = useLanguage();", get_steps_code)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

process_sticky()
print("Done Sticky")
