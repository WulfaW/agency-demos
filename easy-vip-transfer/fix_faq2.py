import os

filepath = "src/components/FaqAndFooter.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the existing faqs array
start_faq = content.find("const faqs = [")
end_faq = content.find("];\n", start_faq) + 3
content = content[:start_faq] + content[end_faq:]

# Insert getFaqs inside the component
func_start = content.find("export default function FaqAndFooter() {")
func_body_start = content.find("{", func_start) + 1

get_faqs_code = """
  const getFaqs = () => {
    switch(lang) {
      case 'EN': return [
        { q: "How are the transfer fees calculated?", a: "Prices are calculated based on the distance of your route and the vehicle class (Maybach, S-Class, Vito VIP). There are no hidden fees; all prices include fuel, highway tolls, and taxes." },
        { q: "What should I do if my flight is delayed?", a: "We track your flight via live radar. Even if your flight is delayed for hours, your chauffeur will wait at the airport free of charge." },
        { q: "Can we make extra stops?", a: "Extra stops or detours are possible upon request, though they may incur a slight additional fee depending on the route." },
        { q: "How can I pay?", a: "You can pay in cash (EUR, USD, GBP, TRY) or via Credit Card inside the vehicle. Wire transfer is also available for corporate accounts." },
        { q: "Do you have baby car seats?", a: "Yes, we provide hygienic, sanitized baby car seats free of charge upon request during reservation." }
      ];
      case 'RU': return [
        { q: "Как рассчитывается стоимость?", a: "Цены рассчитываются в зависимости от расстояния и класса автомобиля. Нет скрытых платежей, все включено." },
        { q: "Что делать, если рейс задерживается?", a: "Мы отслеживаем ваш рейс по радару. Водитель будет ждать вас бесплатно даже при задержке." },
        { q: "Можно ли делать остановки?", a: "Да, это возможно по запросу, может взиматься небольшая дополнительная плата." },
        { q: "Как я могу оплатить?", a: "Оплата наличными (EUR, USD, GBP, TRY) или кредитной картой в автомобиле." },
        { q: "Есть ли детские кресла?", a: "Да, мы предоставляем детские кресла бесплатно по предварительному запросу." }
      ];
      case 'DE': return [
        { q: "Wie werden die Kosten berechnet?", a: "Die Preise basieren auf Entfernung und Fahrzeugklasse. Keine versteckten Gebühren." },
        { q: "Was passiert bei Flugverspätungen?", a: "Wir verfolgen Ihren Flug live. Ihr Chauffeur wartet kostenlos." },
        { q: "Können wir zusätzliche Stopps machen?", a: "Zusätzliche Stopps sind auf Anfrage möglich." },
        { q: "Wie kann ich bezahlen?", a: "Bar (EUR, USD, TRY) oder per Kreditkarte im Fahrzeug." },
        { q: "Haben Sie Kindersitze?", a: "Ja, auf Anfrage stellen wir kostenlose Kindersitze zur Verfügung." }
      ];
      case 'AR': return [
        { q: "كيف يتم حساب الرسوم؟", a: "يتم حساب الأسعار بناءً على المسافة وفئة السيارة. لا توجد رسوم خفية." },
        { q: "ماذا لو تأخرت رحلتي؟", a: "نحن نتتبع رحلتك عبر الرادار الحي. سينتظرك سائقك مجانًا." },
        { q: "هل يمكننا التوقف الإضافي؟", a: "نعم، التوقفات الإضافية ممكنة عند الطلب." },
        { q: "كيف يمكنني الدفع؟", a: "نقداً أو بالبطاقة داخل السيارة." },
        { q: "هل لديكم مقاعد أطفال؟", a: "نعم، نوفر مقاعد أطفال مجاناً عند الطلب." }
      ];
      default: return [
        { q: 'Milas-Bodrum Havalimanı’nda karşılama nasıl yapılıyor?', a: 'Uçağınız iniş yaptığı anda canlı radardan takip edilir. İç hatlar veya dış hatlar gelen yolcu kapısında şoförümüz isminizin yazılı olduğu özel tablet/levha ile sizi karşılar, bagajlarınıza yardımcı olarak doğrudan VIP aracınıza eşlik eder.' },
        { q: 'Uçağım rötar yaparsa ek ücret öder miyim?', a: 'Kesinlikle hayır. Uçuş takip sistemimiz sayesinde gecikmeler anlık olarak şoförünüze bildirilir. Uçağınız kaç saat rötar yaparsa yapsın hiçbir ek bekleme ücreti talep edilmez.' },
        { q: 'Ödemeyi nasıl yapabilirim? Kredi kartı geçerli mi?', a: 'Ödemenizi transferiniz tamamlandığında araç içinde şoförümüze nakit (TL, Euro, Dolar, GBP) veya temassız kredi kartı / banka kartı ile güvenle yapabilirsiniz. Ayrıca kurumsal fatura taleplerinizde şirket hesabımıza havale/EFT seçeneği de mevcuttur.' },
        { q: 'Araçlarınız yasal ve belgeli mi?', a: 'Evet. Easy VIP Transfer, T.C. Kültür ve Turizm Bakanlığı ile TÜRSAB A Grubu Seyahat Acentası işletme belgesine ve Ulaştırma Bakanlığı D2 Yetki Belgesine sahiptir. Tüm yolcularımız yolculuk süresince ferdi kaza ve koltuk sigortası kapsamındadır.' },
        { q: 'Bebek veya çocuk koltuğu temin ediyor musunuz?', a: 'Evet, rezervasyon esnasında belirttiğiniz takdirde araçlarımıza Avrupa standartlarına uygun Isofix çocuk ve bebek oto koltuğu tamamen ücretsiz olarak yerleştirilmektedir.' }
      ];
    }
  };
  const faqs = getFaqs();
"""
content = content[:func_body_start] + "\n" + get_faqs_code + content[func_body_start:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
