"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, TrendingUp, ShoppingBag, Car, Search, CheckCircle2 } from "lucide-react";

interface ShowcaseProps {
  onOpenContact: (mode?: string, note?: string) => void;
}

export default function Showcase({ onOpenContact }: ShowcaseProps) {
  const cases = [
    {
      title: "Luxes Secret // Premium Moda & İç Giyim",
      category: "İkas E-Ticaret & Meta ADS",
      badge: "+480% Satış Büyümesi",
      desc: "İkas altyapısına geçiş sonrası 0.7s açılış hızı, dinamik katalog reklamları ve CAPI kurulumu ile 5.8x ROAS yakalandı.",
      metrics: [
        { label: "ROAS Çarpanı", val: "5.8x" },
        { label: "Dönüşüm Oranı", val: "+210%" },
        { label: "Altyapı Hızı", val: "0.7s" },
      ],
      tags: ["İkas Altyapısı", "Meta CAPI", "Dinamik Katalog", "E-Ticaret"],
    },
    {
      title: "Easy VIP Transfer // Lüks Seyahat & Filo",
      category: "Özel Web & Otonom Operasyon",
      badge: "Flagship Software",
      desc: "Bodrum, Antalya ve İstanbul için 4 dilli VIP rezervasyon, şoför otomatik dispeç botu ve milisaniyelik Next.js mimarisi.",
      metrics: [
        { label: "Yükleme Hızı", val: "0.6s" },
        { label: "Otomatik Dispeç", val: "100%" },
        { label: "Dil Desteği", val: "4 Dil" },
      ],
      tags: ["Next.js 15", "Supabase", "WhatsApp Bot", "VIP Turizm"],
    },
    {
      title: "MC York // Erkek Giyim & Aksesuar",
      category: "Shopify Global & TikTok Ads",
      badge: "+320% Ciro Artışı",
      desc: "UGC video prodüksiyonu ve TikTok Ads ile 18-35 yaş hedef kitlesinde viral dönüşüm yakalanarak aylık 7 haneli ciroya ulaşıldı.",
      metrics: [
        { label: "TikTok ROAS", val: "4.9x" },
        { label: "Aylık Sipariş", val: "4,500+" },
        { label: "Sepet Tutarı", val: "+65%" },
      ],
      tags: ["TikTok Ads", "Shopify", "UGC Video", "Global Satış"],
    },
  ];

  return (
    <section id="showcase" className="py-24 bg-[#131312] border-t border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#ff7a00] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ BAŞARILI REFERANSLAR & VAKA ANALİZLERİ ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Birlikte Rekor Ciroya Ulaştığımız Markalar.
          </h2>
          <p className="mt-4 text-base text-neutral-400 max-w-2xl">
            Sadece web sitesi tasarlamıyoruz; markaların cirolarını 3x-5x katlayan komple büyüme sistemleri kuruyoruz.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {c.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-semibold">
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-[#ff7a00] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {c.desc}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/[0.06] mb-6">
                  {c.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-left">
                      <div className="text-lg font-bold font-mono text-white">{m.val}</div>
                      <div className="text-[10px] text-neutral-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {c.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenContact("case", `${c.title} benzeri bir büyüme stratejisi ve teklif almak istiyorum.`)}
                className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-[#ff5b00] text-white text-xs font-semibold border border-white/10 hover:border-[#ff5b00] transition-all flex items-center justify-center gap-2"
              >
                <span>Benzer Proje Başlat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
