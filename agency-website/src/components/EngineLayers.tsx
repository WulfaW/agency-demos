"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Plane,
  MessageSquare,
  Building2,
  Globe2,
  Bot,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface EngineLayersProps {
  onOpenContact: (note?: string) => void;
}

export default function EngineLayers({ onOpenContact }: EngineLayersProps) {
  const layers = [
    {
      number: "01",
      title: "Gelir & 3D Secure Kapora Tahsilatı",
      badge: "No-Show Önleme",
      desc: "iyzico, PayTR veya Stripe ile 3D Secure tam ödeme veya %20-30 kapora modeli. Yolcu rezervasyonu garanti altına alır, son dakika iptalleri sıfırlanır.",
      features: [
        "Tam ödeme veya kapora seçenekleri",
        "Çoklu para birimi (₺, €, $, £) anlık kur dönüşümü",
        "Kendi şirket hesabınıza doğrudan takas ve tahsilat",
      ],
      icon: CreditCard,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      number: "02",
      title: "Canlı Uçuş Telemetrisi & Şoför Dispeçi",
      badge: "Gerçek Entegrasyon",
      desc: "Uçuş kodu girildiğinde AeroDataBox API ile canlı iniş saati ve rötar telemetrisi otomatik çekilir. Şoför paneline anlık karşılama saati iletilir.",
      features: [
        "Canlı uçuş takibi ve dinamik karşılama saati",
        "Şoför mobil görev kabul / yolcuyu aldım paneli",
        "Canlı araç konumu harita bağlantısı",
      ],
      icon: Plane,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      number: "03",
      title: "WhatsApp Business API Otomatik Onay",
      badge: "Resmi API",
      desc: "Rezervasyon anında yolcuya ve şoföre WhatsApp üzerinden resmi onay fişi, araç plakası ve karşılama noktası konumu otomatik iletilir.",
      features: [
        "Kişiselleştirilmiş PDF rezervasyon fişi",
        "Şoför bilgisi ve araç görseli otomatik mesajı",
        "Uçuş inişinde otomatik 'Hoş Geldiniz' karşılaması",
      ],
      icon: MessageSquare,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      number: "04",
      title: "B2B Otel & Acente Portalı",
      badge: "Kurumsal Gelir",
      desc: "Bölgedeki butik oteller, konsiyerjler ve acenteler kendi şifreleriyle sisteme girip belirlenen komisyon oranıyla rezervasyon oluşturabilir.",
      features: [
        "Otele özel komisyon ve fatura yönetimi",
        "Toplu rezervasyon ve transfer takvimi",
        "Aylık hakediş ve cari mutabakat paneli",
      ],
      icon: Building2,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      number: "05",
      title: "1.000+ Sayfa Programmatic SEO & GEO/AEO",
      badge: "Arama Hakimiyeti",
      desc: "Sadece 30 sayfa değil; Dalaman, Bodrum, Antalya için çift yönlü, otel bazlı ve araç sınıflı 1.000+ sayfa. llms.txt ve SSR schema ile AI aramalarında ilk sıra.",
      features: [
        "Ters yön (Datça → Dalaman) ve otel bazlı sayfalar",
        "GPTBot, ClaudeBot, PerplexityBot tam açık robots.txt",
        "SSR'da çalışan zengin LocalBusiness & TaxiService schema",
      ],
      icon: Globe2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      number: "06",
      title: "Otonom AI B2B Lead Avcısı (Hunter Engine)",
      badge: "Proaktif Müşteri Bulucu",
      desc: "Google Haritalar'dan hedef bölgedeki lüks otel, yat kiralama ve turizm firmalarını otonom tarayıp telefon/yetkili verilerini doğrudan CRM'inize işleyen AI motorumuz.",
      features: [
        "Haftalık 1.000+ yerel kurumsal işletme taraması",
        "Doğrulanmış telefon ve yetkili iletişim bilgisi",
        "Notion / HubSpot CRM otomatik senkronizasyonu",
      ],
      icon: Bot,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
    },
  ];

  return (
    <section id="engine-layers" className="py-24 bg-[#070709] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ SİSTEMİN 6 TEMEL MİMARİ KATMANI ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Sadece Arayüz Değil; Kendi Kendine Çalışan Operasyon Motoru.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl">
            Ödeme almayan basit form siteleri geride kaldı. Rezervasyondan şoför atamaya, B2B acente portalından otonom müşteri kazımaya kadar uçtan uca altyapı.
          </p>
        </div>

        {/* 6 Layers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map((layer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-7 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-10 h-10 rounded-xl ${layer.bg} ${layer.border} border flex items-center justify-center ${layer.color}`}>
                    <layer.icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-bold">
                    KATMAN {layer.number}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-white/[0.04] border border-white/10 text-neutral-300 font-semibold mb-2">
                  {layer.badge}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                  {layer.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {layer.desc}
                </p>

                {/* Feature checklist */}
                <div className="space-y-2 pt-4 border-t border-white/[0.06] mb-6">
                  {layer.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenContact(`${layer.title} katmanı hakkında detaylı bilgi ve demo talep ediyorum.`)}
                className="w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-white text-neutral-300 hover:text-black border border-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Detaylı İncele</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
