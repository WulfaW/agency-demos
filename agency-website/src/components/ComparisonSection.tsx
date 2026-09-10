"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";

export default function ComparisonSection() {
  const comparisonItems = [
    {
      feature: "Online Ödeme & Kapora",
      competitor: "YOK — 'Ödeme araçta' (Form toplama, %100 No-Show riski)",
      aura: "VAR — 3D Secure, tam ödeme veya %20-30 kapora (No-Show sıfırlanır)",
    },
    {
      feature: "Otomatik Onay & Bildirim",
      competitor: "YOK — Sadece manuel 'wa.me' linki, operatör manuel yazar",
      aura: "VAR — WhatsApp Business API + SMS + e-posta ile anlık resmi onay",
    },
    {
      feature: "Canlı Uçuş Telemetrisi",
      competitor: "YOK — Sadece 'Uçuş takip sistemimiz var' yazısı (entegrasyon yok)",
      aura: "VAR — AeroDataBox API canlı uçuş kodu rötar takibi & şoför bildirimi",
    },
    {
      feature: "SEO & İçerik Kapsamı",
      competitor: "66 sayfa — Sadece tek yönlü rota, otel sayfaları yok, ters yön yok",
      aura: "1.000+ Programmatic sayfa — Çift yön, tüm oteller ve araç sınıfı matrisi",
    },
    {
      feature: "AI Arama Optimizasyonu (GEO/AEO)",
      competitor: "Eksik — Schema JS sonrası yükleniyor (AI botları göremiyor)",
      aura: "Eksiksiz — SSR JSON-LD, llms.txt, Speakable ve AI botları için tam açık",
    },
    {
      feature: "Şoför & Operasyon Paneli",
      competitor: "YOK — Şoförlere WhatsApp'tan manuel mesaj atılıyor",
      aura: "VAR — Mobil şoför paneli (Yolcuyu aldım/bıraktım, canlı harita konumu)",
    },
    {
      feature: "B2B Otel & Acente Portalı",
      competitor: "YOK — Sadece son tüketiciye yönelik basit form",
      aura: "VAR — Otellere ve acentelere özel komisyonlu B2B rezervasyon paneli",
    },
    {
      feature: "Sunucu & Altyapı",
      competitor: "Plesk paylaşımlı panel / 1 MB şişirilmiş HTML",
      aura: "Vercel Global Edge CDN + Supabase PostgreSQL RLS / <150 KB ham HTML",
    },
  ];

  return (
    <section id="comparison" className="py-24 bg-[#0a0a0d] border-t border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[11px] font-mono uppercase tracking-widest text-red-400 mb-3">
            <Sparkles className="w-3 h-3" />
            <span>[ GERÇEK TEKNİK KIYASLAMA ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Klasik Ajans Şablonu mu, Gelir Getiren Rezervasyon Motoru mu?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl">
            Piyasadaki dijital ajanslar hazır temalara form koyup teslim eder. Biz işletmenize aracısız nakit akışı sağlayan tam teşekküllü operasyon yazılımı kuruyoruz.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 bg-[#121216] p-4 sm:p-6 border-b border-white/[0.08] text-xs font-mono font-bold tracking-wider uppercase">
            <div className="col-span-12 sm:col-span-4 text-neutral-400">Özellik & Altyapı</div>
            <div className="col-span-6 sm:col-span-4 text-red-400 hidden sm:block">Klasik Ajans Yaklaşımı (Jet/Mavi)</div>
            <div className="col-span-6 sm:col-span-4 text-emerald-400 hidden sm:block">AURA Rezervasyon Motoru</div>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {comparisonItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="grid grid-cols-1 sm:grid-cols-12 p-4 sm:p-6 items-center gap-3 sm:gap-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Feature Title */}
                <div className="sm:col-span-4 text-xs font-semibold text-white">
                  {item.feature}
                </div>

                {/* Competitor / Old Way */}
                <div className="sm:col-span-4 flex items-start gap-2 text-xs text-neutral-400">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{item.competitor}</span>
                </div>

                {/* AURA Way */}
                <div className="sm:col-span-4 flex items-start gap-2 text-xs text-neutral-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed font-medium text-white">{item.aura}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
