import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, CalendarHeart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

// Mock database for service details
const servicesData: Record<string, any> = {
  "buz-lazer-epilasyon": {
    title: "Buz Lazer Epilasyon",
    subtitle: "Soprano ICE Platinum Teknolojisi",
    desc: "Güzellik ve kişisel bakımda öne çıkan profesyonel, ağrısız ve kalıcı çözüm.",
    content: [
      "Buz lazer epilasyon, istenmeyen tüylerden kurtulmanın en konforlu ve etkili yoludur. Soprano ICE Platinum cihazımız, kıl köklerini kademeli olarak ısıtırken, cilt yüzeyini -3 dereceye kadar soğutarak acı hissini tamamen ortadan kaldırır.",
      "İnce veya kalın, koyu veya açık renkli tüm kıl tiplerinde ve her cilt renginde yaz-kış güvenle uygulanabilir."
    ],
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1600&auto=format&fit=crop",
    benefits: ["Acısız ve konforlu", "Tüm cilt tiplerine uygun", "Kısa seans süreleri", "Kalıcı sonuçlar"],
    duration: "30-45 Dakika",
    sessions: "6-8 Seans",
    recovery: "Yok (Hemen sosyal hayata dönüş)"
  },
  "hydrafacial": {
    title: "Hydrafacial",
    subtitle: "Amerikan Cilt Bakımı",
    desc: "Cildi derinlemesine temizler, nemlendirir, yeniler ve pürüzsüz bir görünüme kavuşturur.",
    content: [
      "Hydrafacial, vortex (girdap) teknolojisi kullanarak cildi ölü hücrelerden, siyah noktalardan ve aşırı yağdan vakumla arındıran ödüllü bir cilt bakım sistemidir.",
      "İşlem sonrasında cilde antioksidan, peptit ve hyalüronik asit içeren özel serumlar enjekte edilerek cildin neme doyması, parlaması ve gençleşmesi sağlanır."
    ],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop",
    benefits: ["Derinlemesine temizlik", "Anında parlaklık", "Siyah nokta tedavisi", "Cilt tonu eşitleme"],
    duration: "45 Dakika",
    sessions: "Aylık Bakım Önerilir",
    recovery: "Yok (Hafif bir pembelik olabilir, 1 saate geçer)"
  }
};

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  
  // Find service or use a generic template if slug is unknown
  const service = servicesData[slug] || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    subtitle: "Profesyonel Klinik Uygulaması",
    desc: "Esteticderm uzmanlığı ile hayalinizdeki görünüme kavuşun.",
    content: [
      "Bu hizmetimiz hakkında detaylı bilgi almak ve uzmanlarımızla ön görüşme sağlamak için lütfen randevu formunu doldurun veya bizimle iletişime geçin.",
      "En son teknoloji cihazlar ve steril klinik ortamında, size özel kişiselleştirilmiş protokoller uyguluyoruz."
    ],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop",
    benefits: ["Kişiye özel protokol", "Uzman kadro", "Steril ortam", "Kaliteli ürünler"],
    duration: "Uzman görüşmesi sonrası belirlenir",
    sessions: "Kişiye özel",
    recovery: "İşleme göre değişiklik gösterir"
  };

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/40 z-10" />
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-sm mb-4 font-medium">{service.subtitle}</span>
          <h1 className="text-4xl md:text-6xl font-serif text-cream mb-6 leading-tight max-w-4xl">
            {service.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl -mt-16 relative z-30">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-charcoal/5">
          
          <Link href={`/${locale}/#hizmetler`} className="inline-flex items-center gap-2 text-charcoal/50 hover:text-gold-600 transition-colors mb-12 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Tüm Hizmetlere Dön
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Content Area */}
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-serif text-charcoal mb-6 leading-relaxed">
                {service.desc}
              </h2>
              
              <div className="space-y-6 text-charcoal/70 leading-loose text-lg font-light mb-12">
                {service.content.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <h3 className="text-2xl font-serif text-charcoal mb-6">Uygulamanın Avantajları</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 bg-cream/50 p-4 rounded-xl border border-charcoal/5">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <span className="text-charcoal/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4">
              <div className="bg-charcoal text-cream p-8 rounded-2xl sticky top-32">
                <h4 className="font-serif text-xl mb-8 text-gold-400">İşlem Özeti</h4>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-cream" />
                    </div>
                    <div>
                      <span className="block text-xs text-cream/50 uppercase tracking-wider mb-1">İşlem Süresi</span>
                      <span className="text-sm font-medium">{service.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <CalendarHeart className="w-5 h-5 text-cream" />
                    </div>
                    <div>
                      <span className="block text-xs text-cream/50 uppercase tracking-wider mb-1">Seans Sayısı</span>
                      <span className="text-sm font-medium">{service.sessions}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-cream" />
                    </div>
                    <div>
                      <span className="block text-xs text-cream/50 uppercase tracking-wider mb-1">İyileşme Süreci</span>
                      <span className="text-sm font-medium">{service.recovery}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-gold-500 text-charcoal font-medium rounded-xl hover:bg-gold-400 transition-colors">
                  Ücretsiz Danışmanlık Al
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
