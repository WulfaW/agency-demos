"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, Code2, Cpu, Cloud, Database, Shield, Zap, Lock, CreditCard } from "lucide-react";

export default function TechStack() {
  const stackItems = [
    {
      category: "Frontend & Performance",
      items: [
        { name: "Next.js 15", desc: "React 19, Server Components & App Router" },
        { name: "Tailwind CSS v4", desc: "Modern utility styling & micro-glows" },
        { name: "Framer Motion", desc: "60 FPS pürüzsüz micro-animasyonlar" },
      ],
    },
    {
      category: "Backend & Database",
      items: [
        { name: "Supabase PostgreSQL", desc: "Row Level Security (RLS) & Realtime" },
        { name: "Vercel Edge Network", desc: "Global CDN & Serverless Compute" },
        { name: "Trigger.dev", desc: "Arka plan uzun soluklu async görevler" },
      ],
    },
    {
      category: "AI & Automation Engine",
      items: [
        { name: "Antigravity AI Multi-Agents", desc: "Otonom paralel yazılım mühendisliği" },
        { name: "Apify Scraping Actors", desc: "Google Maps & B2B veri kazıma motoru" },
        { name: "Notion & Linear API", desc: "Merkezi CRM ve görev otomasyonu" },
      ],
    },
    {
      category: "Payments & Reliability",
      items: [
        { name: "Stripe Connect", desc: "Global kredi kartı & Apple Pay tahsilatı" },
        { name: "Cloudflare", desc: "DDoS koruması, SSL & DNS yönetimi" },
        { name: "PostHog & Sentry", desc: "Ürün analitiği ve anlık hata yakalama" },
      ],
    },
  ];

  return (
    <section id="tech-stack" className="py-24 relative bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-3">
            <Sparkles className="w-3 h-3" />
            <span>[ THE PRODUCTION GOLD STANDARD ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Sadece modern, test edilmiş ve kurumsal ölçekte teknolojiler.
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl text-base">
            Geleneksel hantal ajans yığınlarını terk ettik. Saniyeler içinde yüklenen, sıfır sunucu bakımı gerektiren ve global standartlarda çalışan araçları kullanıyoruz.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackItems.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.06]">
                  {group.category}
                </div>
                <div className="space-y-4">
                  {group.items.map((tech, tIdx) => (
                    <div key={tIdx} className="group/item">
                      <div className="text-sm font-bold text-white group-hover/item:text-cyan-400 transition-colors">
                        {tech.name}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                        {tech.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
