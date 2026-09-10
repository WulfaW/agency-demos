"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, Cpu, Database, Rocket, CheckCircle2 } from "lucide-react";

export default function Process() {
  const steps = [
    {
      phase: "PHASE 01 // GÜN 1-3",
      title: "Mimari Blueprint & Anti-Slop Tasarım",
      desc: "İşletmenizin veri akışını haritalandırıyor, gereksiz kod ve slop'tan arındırılmış lüks Apple/Aman standartlarında arayüz prototiplerini hazırlıyoruz.",
      icon: Terminal,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      phase: "PHASE 02 // GÜN 4-7",
      title: "Next.js & Otonom AI Ajan Geliştirme",
      desc: "Antigravity AI alt-ajanlarımız ve Next.js 15 mimarimiz ile milisaniyelik yanıt veren frontend ve otonom veri kazıma/CRM motorunu kodluyoruz.",
      icon: Cpu,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      phase: "PHASE 03 // GÜN 8-11",
      title: "Supabase, Stripe & WhatsApp Entegrasyonu",
      desc: "PostgreSQL veritabanı, Row Level Security, uçtan uca güvenli tahsilat ve anlık WhatsApp/SMS bildirim botlarını devreye alıyoruz.",
      icon: Database,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      phase: "PHASE 04 // GÜN 12-14",
      title: "Lighthouse 100 Testleri & Canlı Lansman",
      desc: "Playwright E2E testleri, Cloudflare Edge optimizasyonu ve sıfır hata kontrolleri ile sistemi küresel ölçekte canlıya alıyoruz.",
      icon: Rocket,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
  ];

  return (
    <section id="process" className="py-24 relative bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>[ THE 14-DAY VELOCITY WORKFLOW ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Aylar süren bürokrasiye son: 14 günde fikirden canlıya.
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl text-base">
            Otonom AI destekli modern geliştirme metodolojimiz sayesinde geleneksel ajansların aylar süren projelerini 2 haftada üretime hazır hale getiriyoruz.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${step.bg} ${step.border} border flex items-center justify-center ${step.color}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500">{step.phase}</span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Eksiksiz Doğrulama & Teslim</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
