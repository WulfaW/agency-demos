"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Target,
  Search,
  Video,
  Share2,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface ServicesSectionProps {
  onOpenContact: (mode?: string, note?: string) => void;
}

export default function ServicesSection({ onOpenContact }: ServicesSectionProps) {
  const services = [
    {
      id: "ikas",
      title: "İkas E-Ticaret Paketleri",
      category: "E-TİCARET ALTYAPISI",
      badge: "Ödüllü İş Ortağı",
      desc: "Profesyonel mağazanızı anahtar teslim kuralım! İkas altyapısıyla 0.8s ultra-hızlı, güvenli ve ölçeklenebilir bir e-ticaret deneyimi sunuyor, satışlarınızı zirveye taşıyoruz.",
      features: [
        "Özel mobil uyumlu UI/UX tema tasarımı",
        "Tüm kargo ve sanal POS (İyzico, PayTR, Stripe) entegrasyonları",
        "Pazaryeri (Trendyol, Hepsiburada, Amazon) tam senkronizasyonu",
        "Gelişmiş SEO ve dönüşüm optimizasyonu",
      ],
      icon: ShoppingBag,
      accent: "from-blue-500/20 to-transparent",
      btnText: "İkas Paketlerini İncele",
    },
    {
      id: "meta-ads",
      title: "Meta ADS (Facebook & Instagram)",
      category: "PERFORMANS PAZARLAMA",
      badge: "Yüksek ROAS",
      desc: "Doğru kitle segmentasyonu, dinamik ürün katalogları ve dönüşüm API'si (CAPI) ile reklam bütçenizin her kuruşunu maksimum ciroya dönüştürüyoruz.",
      features: [
        "A/B kreatif ve kitle test sistematiği",
        "Meta CAPI (Server-Side Tracking) ile kayıpsız veri",
        "Dinamik yeniden hedefleme (Retargeting) hunileri",
        "Haftalık detaylı ROAS ve karlılık raporlaması",
      ],
      icon: Target,
      accent: "from-[#ff5b00]/20 to-transparent",
      btnText: "Meta Reklam Teklifi Al",
    },
    {
      id: "google-ads",
      title: "Google ADS & Performance Max",
      category: "ARAMA & DÖNÜŞÜM",
      badge: "Premier Partner",
      desc: "Google'da en üst sıralarda yerinizi alın! Satın alma niyeti en yüksek müşterileri arama ağı, alışveriş ve YouTube kampanyaları ile anında sitenize çekiyoruz.",
      features: [
        "Performance Max & Google Merchant Center optimizasyonu",
        "Negatif anahtar kelime ve bütçe koruma kalkanı",
        "Dönüşüm değerine göre dinamik teklif stratejileri",
        "Lokal ve global hedefleme modelleri",
      ],
      icon: Search,
      accent: "from-amber-500/20 to-transparent",
      btnText: "Google Ads Danışmanlığı",
    },
    {
      id: "tiktok-ads",
      title: "TikTok ADS & Viral Pazarlama",
      category: "VİDEO & PERFORMANS",
      badge: "Trend Odaklı",
      desc: "Genç ve dinamik kitleyi müşteriye dönüştürün! TikTok for Business reklamları ve trend video kreatifleri ile markanızı viral hale getiriyoruz.",
      features: [
        "UGC (User Generated Content) video reklam kreatifleri",
        "TikTok Pixel & Events API entegrasyonu",
        "Lead form ve anında satış hedefli reklamlar",
        "Influencer ortaklıkları ve içerik dağıtımı",
      ],
      icon: Video,
      accent: "from-pink-500/20 to-transparent",
      btnText: "TikTok Kampanyası Başlat",
    },
    {
      id: "social-media",
      title: "Sosyal Medya & Kreatif Yönetim",
      category: "MARKA KİMLİĞİ",
      badge: "360° Yönetim",
      desc: "Markanızı tüm sosyal kanallarda en lüks ve prestijli şekilde temsil ediyoruz. Stratejik içerik planlaması, profesyonel grafik & video üretimi ve topluluk yönetimi.",
      features: [
        "Aylık stratejik içerik takvimi ve planlama",
        "Reels, Shorts ve Story video prodüksiyonu",
        "Marka kimliğine özel görsel tasarım dili",
        "Müşteri etkileşimi ve DM/yorum yönetimi",
      ],
      icon: Share2,
      accent: "from-purple-500/20 to-transparent",
      btnText: "Sosyal Medya Teklifi Al",
    },
    {
      id: "ai-software",
      title: "Otonom AI & Özel Web Sistemleri",
      category: "YENİ NESİL YAZILIM",
      badge: "Jet Core Özel",
      desc: "Klasik ajans sınırlarını aşıyoruz. Otonom AI lead scraper botları, Easy VIP Transfer düzeyinde rezervasyon motorları ve WhatsApp operasyon botları geliştiriyoruz.",
      features: [
        "Google Maps otonom B2B müşteri avcısı (Lead Hunter)",
        "Next.js 15 & Supabase ile milisaniyelik web sistemleri",
        "Otomatik WhatsApp & SMS operasyonel botları",
        "Notion, CRM ve kurumsal ERP API entegrasyonları",
      ],
      icon: Bot,
      accent: "from-emerald-500/20 to-transparent",
      btnText: "Özel AI Sistemi Tasarla",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#131312] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#ff7a00] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ HİZMETLERİMİZ // 360° DİJİTAL BÜYÜME ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Dijitalde Zirveye Çıkın, Jet Digital ile Fark Yaratın.
          </h2>
          <p className="mt-4 text-base text-neutral-400 max-w-2xl">
            E-ticaret kurulumundan milyonluk reklam yönetimine, kreatif prodüksiyondan yapay zeka otomasyonuna kadar tüm büyüme araçlarınız tek çatı altında.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden group"
            >
              <div
                className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${service.accent} rounded-full blur-2xl pointer-events-none`}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#ff5b00] group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-[#ff5b00]/15 text-[#ff7a00] border border-[#ff5b00]/25 font-semibold">
                    {service.badge}
                  </span>
                </div>

                <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  {service.category}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-8">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5b00] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenContact("service", `${service.title} hizmeti hakkında detaylı bilgi ve teklif almak istiyorum.`)}
                className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-[#ff5b00] text-white hover:text-white border border-white/10 hover:border-[#ff5b00] text-xs font-semibold transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>{service.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
