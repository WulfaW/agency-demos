import Link from "next/link";
import { ArrowUpRight, Code2, Gauge, Smartphone, LayoutDashboard, Search, Lock } from "lucide-react";

export default function HizmetlerPage() {
  const services = [
    {
      icon: Code2,
      title: "1. Özel Web Mühendisliği",
      tag: "CORE DEV",
      description: "WordPress, Wix veya hazır şablonların sınırlarını tamamen kaldırıyoruz. Next.js 15, TypeScript ve Tailwind CSS ile piksel hassasiyetinde, sıfır kod atığıyla markanıza özel amiral gemisi siteler kodluyoruz."
    },
    {
      icon: Gauge,
      title: "2. Işık Hızı & Mobil Optimizasyon",
      tag: "PERFORMANCE",
      description: "Google PageSpeed testlerinde 95+ puan garantisi. Görseller mikrosaniyeler içinde WebP formatında yüklenir, kodlar sunucu tarafında (SSR) derlenir. Reklamdan gelen turist beklemeden dönüşüm yapar."
    },
    {
      icon: LayoutDashboard,
      title: "3. Müşteriye Özel Görsel Admin Paneli",
      tag: "CUSTOM CMS",
      description: "Bir fiyat değiştirmek veya yeni bir fotoğraf eklemek için ajansa muhtaç kalmayın. Sitenize özel entegre ettiğimiz görsel panel sayesinde çift tıkla metin güncelleyin; ama tasarımı asla bozamazsınız."
    },
    {
      icon: Search,
      title: "4. Programmatic SEO & Rota Matrisi",
      tag: "GROWTH & SEO",
      description: "Mavi Transfer'in yaptığı gibi; bölgenizdeki tüm varış noktaları için (örn: Dalaman-Marmaris, Dalaman-Göcek) Google botlarının bayıldığı yüzlerce SEO uyumlu rota sayfasını otomatik kurguluyoruz."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <header className="space-y-4 max-w-2xl">
        <div className="text-xs font-mono tracking-widest uppercase text-[#C5A880]">MÜHENDİSLİK ÇÖZÜMLERİMİZ</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Nasıl Değer Üretiyoruz?
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Biz müşterilerimize "web sitesi" satmıyoruz; reklam bütçenizi koruyan, Google'da otorite kuran ve satışları artıran operasyonel makineler teslim ediyoruz.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="glass-panel rounded-3xl p-8 space-y-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-neutral-400">{s.tag}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{s.title}</h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="glass-panel rounded-3xl p-8 text-center space-y-4 border border-[#C5A880]/20">
        <h3 className="text-2xl font-bold text-white">Sektörünüze Özel Çözümü Konuşalım</h3>
        <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
          Mevcut sitenizin teknik analizini ve nerede para kaybettiğinizi 15 dakikalık bir keşif toplantısında ücretsiz raporlayalım.
        </p>
        <div>
          <Link href="/iletisim" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all">
            <span>Keşif Randevusu Al</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}