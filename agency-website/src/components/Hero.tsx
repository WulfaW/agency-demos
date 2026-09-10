"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden bg-grid-subtle">
      {/* Background Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/[0.08] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Status / Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 shadow-inner"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] font-medium tracking-wider text-neutral-300 uppercase">
            [ NEXT-GEN AI ARCHITECTURE & VIP SOFTWARE ]
          </span>
          <span className="text-neutral-600">|</span>
          <span className="font-mono text-[11px] text-emerald-400 font-semibold">Q3/Q4 CAPACITY OPEN</span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white max-w-5xl leading-[1.08]"
        >
          Lüks Markalar & Girişimler İçin{" "}
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            Otonom AI & Yüksek Performanslı
          </span>{" "}
          Web Sistemleri.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed"
        >
          Karmaşık iş süreçlerinizi otonom yapay zeka ajanlarıyla otomatikleştiriyoruz. Apple, VistaJet ve Aman Resorts standartlarında kusursuz, ultra-hızlı web ve operasyon sistemleri geliştiriyoruz.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)]"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Ücretsiz Mimari Analiz Al</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#showcase"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.04] text-white font-medium text-sm hover:bg-white/[0.08] border border-white/10 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Canlı Proje Vitrinini İncele</span>
          </a>
        </motion.div>

        {/* Key Metrics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl"
        >
          {[
            {
              icon: Zap,
              label: "0.6s İlk Yükleme",
              sub: "Lighthouse 100/100 Skoru",
              color: "text-amber-400",
            },
            {
              icon: Cpu,
              label: "Otonom AI Ajanları",
              sub: "Otomatik Lead & Veri Akışı",
              color: "text-emerald-400",
            },
            {
              icon: Layers,
              label: "14 Günde Canlıya",
              sub: "Modern AI Stack ile Hızlı Çıkış",
              color: "text-cyan-400",
            },
            {
              icon: ShieldCheck,
              label: "Kurumsal Güvenlik",
              sub: "Supabase & Stripe RLS Altyapısı",
              color: "text-purple-400",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-panel glass-panel-hover flex flex-col items-start text-left group"
            >
              <item.icon className={`w-5 h-5 ${item.color} mb-2.5 transition-transform group-hover:scale-110`} />
              <div className="text-sm font-semibold text-white tracking-tight">{item.label}</div>
              <div className="text-xs text-neutral-400 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
