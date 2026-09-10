"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Clock } from "lucide-react";

export default function StatsCounter() {
  const stats = [
    {
      value: "%99.4",
      label: "Müşteri Memnuniyeti",
      desc: "Kesintisiz destek ve stratejik büyüme ortaklığı",
      icon: Award,
    },
    {
      value: "+350",
      label: "Büyüyen İşletme",
      desc: "E-Ticaret ve VIP hizmet sektörlerinde aktif referanslar",
      icon: Users,
    },
    {
      value: "50+ Mn ₺",
      label: "Yönetilen Reklam & Ciro",
      desc: "Meta, Google ve TikTok üzerinde yüksek ROAS yönetimi",
      icon: TrendingUp,
    },
    {
      value: "14 Gün",
      label: "Hızlı Teslimat",
      desc: "Fikirden anahtar teslim canlı e-ticaret ve yazılım lansmanı",
      icon: Clock,
    },
  ];

  return (
    <section className="py-16 bg-[#181817] border-t border-b border-white/[0.06] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col items-start text-left"
            >
              <item.icon className="w-5 h-5 text-[#ff5b00] mb-3" />
              <div className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
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
