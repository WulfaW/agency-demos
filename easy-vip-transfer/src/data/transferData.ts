export interface LocationOption {
  id: string;
  name: string;
  category: 'airport' | 'region' | 'marina' | 'intercity';
  baseDistanceKm: number; // distance from BJV
  baseMinutes: number;
}

export interface VehicleOption {
  id: string;
  name: string;
  model: string;
  tagline: string;
  capacity: string;
  luggage: string;
  basePriceEur: number;
  multiplier: number;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export interface TransferService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
}

export const LOCATIONS: LocationOption[] = [
  { id: 'bjv', name: 'Milas-Bodrum Havalimanı (BJV)', category: 'airport', baseDistanceKm: 0, baseMinutes: 0 },
  { id: 'mandarin', name: 'Mandarin Oriental Bodrum (Cennet Koyu)', category: 'region', baseDistanceKm: 46, baseMinutes: 40 },
  { id: 'amanruya', name: 'Amanruya Bodrum (Demirbükü Koyu)', category: 'region', baseDistanceKm: 42, baseMinutes: 38 },
  { id: 'yalikavak-marina', name: 'Yalıkavak Marina & Beach Clublar', category: 'marina', baseDistanceKm: 52, baseMinutes: 45 },
  { id: 'macakizi-scorpios', name: 'Göltürkbükü (Maçakızı / Scorpios Bodrum)', category: 'region', baseDistanceKm: 45, baseMinutes: 40 },
  { id: 'lujo-titanic', name: 'Güvercinlik (Lujo Hotel / Titanic Luxury)', category: 'region', baseDistanceKm: 18, baseMinutes: 15 },
  { id: 'maxx-royal', name: 'Maxx Royal Bodrum Resort (Gölköy)', category: 'region', baseDistanceKm: 43, baseMinutes: 38 },
  { id: 'bodrum-merkez', name: 'Bodrum Merkez & Milta Marina', category: 'marina', baseDistanceKm: 35, baseMinutes: 30 },
  { id: 'edition-bodrum', name: 'The Bodrum EDITION (Tilkicik Koyu)', category: 'region', baseDistanceKm: 50, baseMinutes: 42 },
  { id: 'rixos-premium', name: 'Rixos Premium Bodrum (Zeytinlikahve)', category: 'region', baseDistanceKm: 32, baseMinutes: 28 },
  { id: 'torba', name: 'Torba & Kaynar Koyu (Vogue Supreme)', category: 'region', baseDistanceKm: 30, baseMinutes: 25 },
  { id: 'turgutreis', name: 'Turgutreis & D-Marin', category: 'marina', baseDistanceKm: 55, baseMinutes: 50 },
  { id: 'gumusluk', name: 'Gümüşlük & Balık Restoranları', category: 'region', baseDistanceKm: 58, baseMinutes: 50 },
  { id: 'caresse-bitez', name: 'Bitez & Caresse Luxury Collection', category: 'region', baseDistanceKm: 40, baseMinutes: 35 },
  { id: 'marmaris-gocek', name: 'Göcek & Marmaris Marinaları', category: 'intercity', baseDistanceKm: 175, baseMinutes: 140 },
  { id: 'izmir-adb', name: 'İzmir Adnan Menderes Havalimanı (ADB)', category: 'airport', baseDistanceKm: 220, baseMinutes: 165 },
];

export const VEHICLES: VehicleOption[] = [
  {
    id: 'vito-maybach',
    name: 'Mercedes-Benz Vito VIP',
    model: 'Maybach Edition (2024-2025)',
    tagline: 'Ultra Lüks İç Dizayn & Yıldız Tavan',
    capacity: '1 - 6 Yolcu',
    luggage: '6 Büyük Boy Valiz',
    basePriceEur: 55,
    multiplier: 1.0,
    image: '/images/wix_img_0.jpg',
    features: [
      'Starlight (Yıldız) Ambiyans Tavan',
      'Masajlı & Isıtmalı Deri VIP Koltuklar',
      'Apple TV & Netflix Entegre Smart TV',
      'Yüksek Hızlı 5G Wi-Fi & PlayStation 5',
      'Şampanya & Soğuk Meşrubat Minibar',
      'Akustik Ses İzolasyonlu VIP Bölme',
    ],
    specs: [
      { label: 'Kapasite', value: '1-6 Kişi' },
      { label: 'Bagaj', value: '6 Valiz + 6 El' },
      { label: 'İkram', value: 'Premium Soğuk & Sıcak' },
      { label: 'Sürücü', value: 'Özel Protokol Kaptan' },
    ],
  },
  {
    id: 'sprinter-vip',
    name: 'Mercedes-Benz Sprinter VIP',
    model: 'Presidential Suite (2024)',
    tagline: 'Geniş Gruplar & Aileler İçin Kral Dairesi Konforu',
    capacity: '1 - 16 Yolcu',
    luggage: '16 Büyük Boy Valiz',
    basePriceEur: 90,
    multiplier: 1.5,
    image: '/images/wix_img_1.jpg',
    features: [
      'Geniş Ayak Mesafeli Yatarlı Hakiki Deri Koltuklar',
      'Bağımsız Çift Bölgeli Dijital İklimlendirme',
      '32" Ultra HD Multimedya & Sinema Sistemi',
      'Geniş Özel Bagaj Hacmi (Golf & Su Sporu Ekipmanı)',
      'Espresso Makinesi & Geniş Soğutucu Dolap',
      '220V Priz & USB-C Hızlı Şarj İstasyonları',
    ],
    specs: [
      { label: 'Kapasite', value: '1-16 Kişi' },
      { label: 'Bagaj', value: '16+ Büyük Valiz' },
      { label: 'İkram', value: 'Full Bar & Espresso' },
      { label: 'Alan', value: 'Ayakta Durulabilir VIP Tavan' },
    ],
  },
  {
    id: 'maybach-sclass',
    name: 'Mercedes-Maybach S-Class',
    model: 'First-Class Executive',
    tagline: 'Maksimum Prestij, İş Dünyası & Protokol',
    capacity: '1 - 3 Yolcu',
    luggage: '3 Büyük Valiz',
    basePriceEur: 140,
    multiplier: 2.2,
    image: '/images/wix_img_2.jpg',
    features: [
      'First Class Executive Arka Yatış Koltukları',
      'Burmester 4D High-End Surround Ses Sistemi',
      'Buzdolabı & Gümüş Şampanya Kadehleri',
      'Akustik Konfor ve Karartmalı Mahremiyet Camları',
      'Yabancı Dil Bilen Özel Protokol Şoförü',
      'VIP Havalimanı Apron Karşılama Opsiyonu',
    ],
    specs: [
      { label: 'Kapasite', value: '1-3 Kişi' },
      { label: 'Bagaj', value: '3 Valiz' },
      { label: 'Statü', value: 'Ultra Lüks Protokol' },
      { label: 'Konfor', value: 'Aktif Gürültü Engelleme' },
    ],
  },
];

export const SERVICES: TransferService[] = [
  {
    id: 'airport',
    title: '7/24 Havalimanı VIP Karşılama',
    description: 'Milas-Bodrum (BJV) veya İzmir (ADB) havalimanında isminizin yazılı olduğu levhayla karşılama. Uçuşunuz canlı takip edilir, rötarlarda ek ücret talep edilmez.',
    iconName: 'Plane',
    badge: 'Uçuş Takibi Dahil',
  },
  {
    id: 'chauffeur',
    title: 'Şoförlü Saatlik / Günlük VIP Tahsis',
    description: '4, 8, 12 saatlik veya haftalık özel şoförlü tahsis hizmeti. Bodrum içindeki toplantılarınız, beach club ziyaretleriniz ve alışverişleriniz için aracınız kapınızda bekler.',
    iconName: 'Clock',
    badge: 'Kişiye Özel Tahsis',
  },
  {
    id: 'marina',
    title: 'Marina & Beach Club Shuttle',
    description: 'Yalıkavak Marina, Türkbükü Maçakızı, Scorpios, Lucca Beach ve lüks otellere gecikmesiz, şık ve güvenli VIP transfer deneyimi.',
    iconName: 'Anchor',
    badge: 'Gece & Gündüz',
  },
  {
    id: 'wedding',
    title: 'Düğün, Davet & Özel Etkinlikler',
    description: 'Hayatınızın en özel anları için süslenmiş Maybach gelin arabası ve davetlileriniz için senkronize VIP Sprinter transfer filosu.',
    iconName: 'Sparkles',
    badge: 'Protokol Hizmeti',
  },
  {
    id: 'intercity',
    title: 'Ege & Şehirlerarası VIP Turlar',
    description: 'Bodrum çıkışlı Efes Antik Kenti, Pamukkale, Marmaris, Göcek veya İstanbul transferlerinde birinci sınıf konforla seyahat edin.',
    iconName: 'Compass',
    badge: 'Günübirlik & Özel Rotalar',
  },
  {
    id: 'concierge',
    title: 'VIP Concierge & Özel Talepler',
    description: 'Özel şampanya siparişi, çocuk oto koltuğu, rehber eşliği veya özel güvenlik talepleriniz seyahatiniz öncesinde hazır edilir.',
    iconName: 'ShieldCheck',
    badge: 'Kişiselleştirilmiş',
  },
];

export const TRUST_POINTS = [
  {
    title: 'TÜRSAB A Grubu Lisanslı',
    description: 'T.C. Turizm Bakanlığı onaylı ve D2 taşımacılık belgeli %100 yasal ve resmi VIP operasyon.',
    icon: 'Shield',
  },
  {
    title: 'Sabit Fiyat & Gizli Masraf Yok',
    description: 'Trafik sıkışıklığı, köprü-otoyol veya uçak rötarı durumunda asla ek ücret ödemezsiniz.',
    icon: 'BadgeCheck',
  },
  {
    title: 'Son Model Mercedes Filosu',
    description: 'Düzenli dezenfekte edilen, bakımlı, sigortalı ve lüks donanımlı 2024-2025 model araçlar.',
    icon: 'Car',
  },
  {
    title: 'Esnek Ödeme Yöntemleri',
    description: 'Araçta Nakit (₺, €, $, £), Kredi Kartı / Mobil POS veya Havale/EFT ile ödeme kolaylığı.',
    icon: 'CreditCard',
  },
];

export const FAQS = [
  {
    q: 'Havalimanında karşılamayı nasıl yapıyorsunuz?',
    a: 'Uçağınız indikten sonra profesyonel kaptanımız yolcu çıkış kapısında adınızın ve soyadınızın yazılı olduğu özel tablet veya tabela ile sizi karşılar, bagajlarınızı alarak özel tahsis edilen VIP aracınıza eşlik eder.',
  },
  {
    q: 'Uçağım rötar yaparsa ekstra ücret öder miyim?',
    a: 'Kesinlikle hayır. Rezervasyon sırasında ilettiğiniz uçuş kodunuz operasyon merkezimiz tarafından canlı olarak takip edilir. Uçağınız kaç saat rötar yaparsa yapsın sürücünüz tam iniş saatinizde sizi hazır bekler ve ek ücret talep edilmez.',
  },
  {
    q: 'Ödemeyi ne zaman ve nasıl yapabilirim?',
    a: 'Ödemenizi transferiniz tamamlandığında araç içinde şoförümüze Nakit (TL, Euro, Dolar, Sterlin) veya Kredi Kartı / Temassız POS ile yapabilirsiniz. Ayrıca kurumsal faturalı havale seçeneğimiz de mevcuttur.',
  },
  {
    q: 'Bebek veya çocuk oto koltuğu temin ediyor musunuz?',
    a: 'Evet! Rezervasyon esnasında belirtmeniz durumunda yaş grubuna uygun Isofix güvenlikli çocuk ve bebek koltukları araçlarımızda tamamen ÜCRETSİZ olarak hazır bulundurulur.',
  },
  {
    q: 'Rezervasyonumu iptal etmek veya değiştirmek istersem ne yapmalıyım?',
    a: 'Transfer saatinden 6 saat öncesine kadar WhatsApp veya telefon hattımız üzerinden hiçbir ceza veya kesinti olmadan rezervasyonunuzu iptal edebilir veya saatini güncelleyebilirsiniz.',
  },
  {
    q: 'Şoförlü saatlik araç tahsisi nasıl çalışır?',
    a: 'Bodrum içerisinde 4 saat, 8 saat veya tüm gün (12 saat) boyunca aracınız ve özel şoförünüz sadece sizin belirlediğiniz lokasyonlar arasında emrinizde olur.',
  },
];

export const CONTACT_INFO = {
  brandName: 'Easy VIP Transfer',
  companyLegal: 'Halikarnassos Travel & Turizm Tic. Ltd. Şti.',
  tursabNo: 'TÜRSAB Belge No: 11428',
  phone: '+90 530 567 39 91',
  phoneClean: '905305673991',
  landline: '+90 252 319 25 77',
  email: 'info@easyviptransfer.com',
  address: 'Gümbet Mah. Zengin Hüseyin Sok. No:7/A, 48400 Bodrum / Muğla',
  workingHours: '7 Gün 24 Saat Kesintisiz VIP Hizmet',
};
