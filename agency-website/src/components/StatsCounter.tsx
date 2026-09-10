"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Database, Smartphone } from "lucide-react";

export default function StatsCounter() {
  const verifiedFacts = [
    {
      value: "0.6s",
      label: "Lighthouse Açılış Hızı",
      desc: "Next.js 15 Server Components ve Vercel Global Edge CDN",
      icon: Zap,
    },
    {
      value: "%0",
      label: "Aracı Komisyonu",
      desc: "Doğrudan kendi iyzico / Stripe hesabınıza geçen tahsilat",
      icon: ShieldCheck,
    },
    {
      value: "PostgreSQL",
      label: "Supabase RLS Altyapısı",
      desc: "Bankacılık seviyesinde veri güvenliği ve canlı telemetri",
      icon: Database,
    },
    {
      value: "100%",
      label: "Mobil & PWA Uyumlu",
      desc: "Şoförler ve müşteriler için anlık bildirimli mobil arayüz",
      icon: Smartphone,
    },
  ];

  return (
    <section className="py-16 bg-[#181817] border-t border-b border-white/[0.06] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedFacts.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col items-start text-left"
            >
              <item.icon className="w-5 h-5 text-[#ff5b00] mb-3" />
              <div className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight font-mono">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-neutral-200 mt-1">{item.label}</div>
              <div className="text-xs text-neutral-400 mt-1 leading-relaxed">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
