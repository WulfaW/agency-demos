import os

def process_faq():
    filepath = "src/components/FaqAndFooter.tsx"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    start_faq = content.find("const faqData = [")
    end_faq = content.find("];", start_faq) + 2
    
    new_content = content[:start_faq] + content[end_faq:]
    
    get_faq_code = """
  const { lang } = useLanguage();
  const getFaqData = () => {
    if(lang === 'EN') return [
      { q: "How are the transfer fees calculated?", a: "Prices are calculated based on the distance of your route and the vehicle class (Maybach, S-Class, Vito VIP). There are no hidden fees; all prices include fuel, highway tolls, and taxes." },
      { q: "What should I do if my flight is delayed?", a: "We track your flight via live radar. Even if your flight is delayed for hours, your chauffeur will wait at the airport free of charge." },
      { q: "Can we make extra stops?", a: "Extra stops or detours are possible upon request, though they may incur a slight additional fee depending on the route." },
      { q: "How can I pay?", a: "You can pay in cash (EUR, USD, GBP, TRY) or via Credit Card inside the vehicle. Wire transfer is also available for corporate accounts." },
      { q: "Do you have baby car seats?", a: "Yes, we provide hygienic, sanitized baby car seats free of charge upon request during reservation." }
    ];
    if(lang === 'RU') return [
      { q: "Как рассчитывается стоимость?", a: "Цены рассчитываются в зависимости от расстояния и класса автомобиля. Нет скрытых платежей, все включено." },
      { q: "Что делать, если рейс задерживается?", a: "Мы отслеживаем ваш рейс по радару. Водитель будет ждать вас бесплатно даже при задержке." },
      { q: "Можно ли делать остановки?", a: "Да, это возможно по запросу, может взиматься небольшая дополнительная плата." },
      { q: "Как я могу оплатить?", a: "Оплата наличными (EUR, USD, GBP, TRY) или кредитной картой в автомобиле." },
      { q: "Есть ли детские кресла?", a: "Да, мы предоставляем детские кресла бесплатно по предварительному запросу." }
    ];
    if(lang === 'DE') return [
      { q: "Wie werden die Kosten berechnet?", a: "Die Preise basieren auf Entfernung und Fahrzeugklasse. Keine versteckten Gebühren." },
      { q: "Was passiert bei Flugverspätungen?", a: "Wir verfolgen Ihren Flug live. Ihr Chauffeur wartet kostenlos." },
      { q: "Können wir zusätzliche Stopps machen?", a: "Zusätzliche Stopps sind auf Anfrage möglich." },
      { q: "Wie kann ich bezahlen?", a: "Bar (EUR, USD, TRY) oder per Kreditkarte im Fahrzeug." },
      { q: "Haben Sie Kindersitze?", a: "Ja, auf Anfrage stellen wir kostenlose Kindersitze zur Verfügung." }
    ];
    if(lang === 'AR') return [
      { q: "كيف يتم حساب الرسوم؟", a: "يتم حساب الأسعار بناءً على المسافة وفئة السيارة. لا توجد رسوم خفية." },
      { q: "ماذا لو تأخرت رحلتي؟", a: "نحن نتتبع رحلتك عبر الرادار الحي. سينتظرك سائقك مجانًا." },
      { q: "هل يمكننا التوقف الإضافي؟", a: "نعم، التوقفات الإضافية ممكنة عند الطلب." },
      { q: "كيف يمكنني الدفع؟", a: "نقداً أو بالبطاقة داخل السيارة." },
      { q: "هل لديكم مقاعد أطفال؟", a: "نعم، نوفر مقاعد أطفال مجاناً عند الطلب." }
    ];
    return [
      { q: "Transfer ücretleri nasıl hesaplanıyor?", a: "Fiyatlar, seçtiğiniz rotanın mesafesine ve araç sınıfına (Maybach, S-Class, Vito VIP) göre belirlenir. Gizli ücret yoktur; yakıt, otoyol ve vergiler dahildir." },
      { q: "Uçağım rötar yaparsa ne olur?", a: "Uçuşunuz canlı radar sisteminden takip edilir. Uçağınız saatlerce rötar yapsa dahi şoförünüz havalimanında sizi ücretsiz bekler." },
      { q: "Güzergah dışı ekstra duraklama yapabilir miyiz?", a: "Planlanan rota üzerinde kısa süreli ihtiyaç molaları ücretsizdir. Ancak farklı bir lokasyona uğrama veya uzun süreli bekleme talepleriniz için ek ücret uygulanabilir." },
      { q: "Ödemeyi nasıl yapabilirim?", a: "Ödemenizi araç içinde nakit (EUR, USD, GBP, TRY) veya Kredi Kartı ile yapabilirsiniz. Kurumsal talepler için fatura karşılığı havale/EFT seçeneğimiz de mevcuttur." },
      { q: "Bebek/çocuk koltuğu temin ediyor musunuz?", a: "Evet, rezervasyon sırasında belirtmeniz durumunda, aracınıza yaş grubuna uygun, hijyenik çocuk/bebek koltuğu ücretsiz olarak yerleştirilir." }
    ];
  };
  const faqData = getFaqData();
"""
    
    new_content = new_content.replace("  const { lang } = useLanguage();", get_faq_code)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

process_faq()
print("Done FAQ")
