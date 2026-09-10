import os

def process_services():
    filepath = "src/components/SpotlightServices.tsx"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to remove `const categories = [...]` and `const servicesData = {...}`
    # and put them inside `SpotlightServices` component as a function of `lang`
    
    start_cat = content.find("const categories = [")
    end_data = content.find("};\n", start_cat) + 3
    
    new_content = content[:start_cat] + content[end_data:]
    
    get_data_code = """
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
    // English
    if(lang === 'EN') return {
      airport: [
        { title: 'Milas-Bodrum (BJV) Greeter', desc: 'Live flight tracking. Met at the VIP exit with a name board.', badge: 'Live Tracking', icon: Plane, image: '/images/wix_img_0.jpg' },
        { title: 'Aviation & Private Jet', desc: 'Direct apron transfer from Bodrum VIP Jet Terminal.', badge: 'VIP Protocol', icon: Crown, image: '/images/wix_img_1.jpg' },
        { title: 'Return to Airport', desc: 'Flawless schedule planning for your departure.', badge: 'Zero Delay', icon: ShieldCheck, image: '/images/wix_img_2.jpg' },
      ],
      marina: [
        { title: 'Yalıkavak Marina VIP', desc: 'Private vehicle access to superyacht piers and clubs.', badge: 'Pier Access', icon: Anchor, image: '/images/wix_img_0.jpg' },
        { title: 'D-Marin & Bodrum Marina', desc: 'Spacious Mercedes Vito for yacht passengers.', badge: 'Spacious Luggage', icon: Compass, image: '/images/wix_img_1.jpg' },
        { title: 'Beach Club Shuttles', desc: 'No-wait VIP chauffeurs to top clubs like Scorpios.', badge: 'Night Protocol', icon: Wine, image: '/images/wix_img_2.jpg' },
      ],
      hourly: [
        { title: 'Full Day Disposal', desc: 'Your Maybach/Vito awaits your command for 8-24 hours.', badge: 'Unlimited Wait', icon: Clock, image: '/images/wix_img_0.jpg' },
        { title: 'Business Protocol', desc: 'Professional chauffeurs in suits for official delegations.', badge: 'Protocol Chauffeur', icon: ShieldCheck, image: '/images/wix_img_1.jpg' },
        { title: 'Bespoke Bodrum Tour', desc: 'Custom routes across Bodrum\\'s best sunsets.', badge: 'Custom Route', icon: Map, image: '/images/wix_img_2.jpg' },
      ],
      intercity: [
        { title: 'Bodrum ➔ Izmir', desc: 'Luxury long-distance transfer to Izmir/Cesme.', badge: 'Long Distance', icon: Compass, image: '/images/wix_img_0.jpg' },
        { title: 'Bodrum ➔ Marmaris', desc: 'Safe passage to Blue Voyage starting ports.', badge: 'Blue Voyage', icon: Anchor, image: '/images/wix_img_1.jpg' },
        { title: 'Bodrum ➔ Kusadasi', desc: 'VIP transport to Kusadasi cruise port.', badge: 'Highway Travel', icon: Plane, image: '/images/wix_img_2.jpg' },
      ]
    };
    
    // Turkish (default logic but localized for brevity to just return default if TR/other)
    return {
      airport: [
        { title: 'Milas-Bodrum (BJV) Karşılama', desc: 'Uçuşunuz canlı radardan takip edilir. İsim levhası ile karşılanırsınız.', badge: 'Canlı Takip', icon: Plane, image: '/images/wix_img_0.jpg' },
        { title: 'Genel Havacılık & Özel Jet', desc: 'Bodrum VIP Jet Terminali aprondan doğrudan bagaj ve yolcu transferi.', badge: 'VIP Jet Protokolü', icon: Crown, image: '/images/wix_img_1.jpg' },
        { title: 'Dönüş & Otelden Uçuşa', desc: 'Otelinizden uçağınızın saatine göre kalkış planı.', badge: 'Sıfır Rötar Riski', icon: ShieldCheck, image: '/images/wix_img_2.jpg' },
      ],
      marina: [
        { title: 'Yalıkavak Marina VIP Transfer', desc: 'Süperyat iskelesi ve beach clublara özel araç girişi.', badge: 'İskele İçi Geçiş', icon: Anchor, image: '/images/wix_img_0.jpg' },
        { title: 'D-Marin Turgutreis & Bodrum', desc: 'Geniş bagaj hacimli Mercedes Vito transferi.', badge: 'Geniş Bagaj Kapasitesi', icon: Compass, image: '/images/wix_img_1.jpg' },
        { title: 'Scorpios & Maçakızı Servisi', desc: 'Seçkin gece kulüplerine beklemesiz gidiş-dönüş.', badge: 'Gece Protokolü', icon: Wine, image: '/images/wix_img_2.jpg' },
      ],
      hourly: [
        { title: 'Tam Gün Şoförlü Araç Tahsisi', desc: 'Aracınız ve şoförünüz emrinizde bekler.', badge: 'Sınırsız Bekleme', icon: Clock, image: '/images/wix_img_0.jpg' },
        { title: 'İş & Protokol Seyahatleri', desc: 'Takım elbiseli profesyonel şoförlerle resmi transfer.', badge: 'Protokol Şoförü', icon: ShieldCheck, image: '/images/wix_img_1.jpg' },
        { title: 'Kişiye Özel Bodrum Turu', desc: 'Gümüşlük gün batımı ve özel şarap bağları rotaları.', badge: 'Özel Rota', icon: Map, image: '/images/wix_img_2.jpg' },
      ],
      intercity: [
        { title: 'Bodrum ➔ İzmir & Çeşme', desc: 'İzmir veya Çeşme otellerine kesintisiz lüks transfer.', badge: 'Uzun Yol Konforu', icon: Compass, image: '/images/wix_img_0.jpg' },
        { title: 'Bodrum ➔ Marmaris & Göcek', desc: 'Mavi yolculuk limanlarına konforlu geçiş.', badge: 'Mavi Tur Bağlantısı', icon: Anchor, image: '/images/wix_img_1.jpg' },
        { title: 'Bodrum ➔ Didim & Kuşadası', desc: 'Kruvaziyer limanlarına kapıdan kapıya özel VIP ulaşım.', badge: 'Hızlı Otoyol Seyahati', icon: Plane, image: '/images/wix_img_2.jpg' },
      ]
    };
  };
  const servicesData = getServicesData() as Record<string, Array<{ title: string; desc: string; badge: string; icon: any; image: string }>>;
"""
    
    new_content = new_content.replace("  const { lang } = useLanguage();", get_data_code)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

process_services()
print("Done Services")
