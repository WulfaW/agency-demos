"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Globe2,
  Database,
  Workflow,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Layers,
  Zap,
  Activity,
  CheckCircle2
} from "lucide-react";

export default function BentoServices() {
  return (
    <section id="services" className="py-24 relative bg-[#050505]">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-emerald-400 mb-3">
            <Sparkles className="w-3 h-3" />
            <span>[ SYSTEM CAPABILITIES ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Sadece web sitesi değil; kendi kendine çalışan dijital operasyon motorları üretiyoruz.
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl text-base">
            Modern SaaS mimarisini, yapay zeka ajanlarını ve lüks tüketici deneyimini tek bir pürüzsüz ekosistemde birleştiriyoruz.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento Item 1 (Col-span 8) - Otonom AI Lead & Ajanlar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 p-7 md:p-9 rounded-3xl glass-panel glass-panel-hover relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/[0.06] rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">[ CAPABILITY 01 ]</span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                Otonom AI Ajanları & Otomatik Müşteri Avcılığı
              </h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl">
                Google Haritalar ve hedef pazarınızdaki işletmeleri otonom kazıyan, telefon ve karar verici verilerini zenginleştirip CRM'e (Notion/HubSpot) aktaran özel AI botları geliştiriyoruz.
              </p>
            </div>

            {/* Interactive Terminal / Code Simulation UI */}
            <div className="mt-8 rounded-2xl bg-[#09090b] border border-white/10 p-4 font-mono text-xs text-neutral-300 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>agent_hunter.py --status:active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400">SYNCED WITH NOTION</span>
                </div>
              </div>
              <div className="space-y-1.5 text-neutral-400">
                <div className="text-emerald-400/90">&gt; Target: &quot;Luxury Yacht Charters Bodrum&quot; (42 verified leads found)</div>
                <div className="text-neutral-300">&gt; AI Enrichment: Decision Maker contacted, WhatsApp pipeline triggered.</div>
                <div className="text-neutral-500 text-[11px]">&gt; Auto-categorization: &quot;High Intent VIP Customer&quot; -&gt; Notion ID #892</div>
              </div>
            </div>
          </motion.div>

          {/* Bento Item 2 (Col-span 4) - VIP Web & Rezervasyon Sistemleri */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 p-7 md:p-9 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.05] rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Globe2 className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">[ CAPABILITY 02 ]</span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Ultra-Lüks VIP Web & Rezervasyon
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Yüksek profilli müşterilere hitap eden, milisaniyelik yanıt süresine sahip, Apple & Aman Resort lüksünde web arayüzleri.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Rezervasyon Dönüşümü</span>
                <span className="font-mono font-bold text-emerald-400">+185%</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full w-[88%]" />
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">Çok dilli + Dinamik Fiyatlandırma</div>
            </div>
          </motion.div>

          {/* Bento Item 3 (Col-span 4) - Operasyon & WhatsApp Entegrasyonu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4 p-7 md:p-9 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/[0.05] rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">[ CAPABILITY 03 ]</span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Canlı Operasyon & WhatsApp API
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Şoför atama, canlı rota takibi, otomatik SMS/WhatsApp onayları ve gerçek zamanlı seyahat telemetrisi.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Tek tıkla şoför WhatsApp görev atama</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Uçuş kodu canlı rötar takibi</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Item 4 (Col-span 8) - Enterprise SaaS & Veritabanı Mimarisi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-8 p-7 md:p-9 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Database className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">[ CAPABILITY 04 ]</span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                Production-Ready Gold Standard Teknoloji Yığını
              </h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl">
                Next.js App Router, Supabase RLS (Row Level Security), Stripe ödeme altyapısı, Vercel Serverless ve Cloudflare CDN ile sıfır bakım maliyetli, sınırsız ölçeklenebilen altyapılar.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { tag: "Next.js 15", desc: "React 19 & App Router" },
                { tag: "Supabase", desc: "PostgreSQL & Auth" },
                { tag: "Stripe", desc: "Global Güvenli Ödeme" },
                { tag: "Cloudflare", desc: "DDoS & Global Edge" },
              ].map((tech, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-left">
                  <div className="font-mono text-xs font-semibold text-white">{tech.tag}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{tech.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
