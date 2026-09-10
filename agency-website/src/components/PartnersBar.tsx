"use client";

import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Target, Search, Video, Zap, ShieldCheck } from "lucide-react";

export default function PartnersBar() {
  const partners = [
    {
      name: "ikas",
      role: "Yetkili Çözüm Ortağı",
      desc: "Türkiye'nin en hızlı e-ticaret altyapısı",
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30",
    },
    {
      name: "Shopify",
      role: "Certified Partner",
      desc: "Global e-ticaret & özel tema geliştirme",
      color: "from-emerald-500/20 to-emerald-600/10",
      border: "border-emerald-500/30",
    },
    {
      name: "Meta",
      role: "Business Partner",
      desc: "Facebook, Instagram & WhatsApp Ads",
      color: "from-indigo-500/20 to-indigo-600/10",
      border: "border-indigo-500/30",
    },
    {
      name: "Google",
      role: "Premier Partner",
      desc: "Google Ads & Performance Max",
      color: "from-amber-500/20 to-amber-600/10",
      border: "border-amber-500/30",
    },
    {
      name: "TikTok",
      role: "Agency Partner",
      desc: "TikTok for Business & Viral Kreatif",
      color: "from-pink-500/20 to-pink-600/10",
      border: "border-pink-500/30",
    },
    {
      name: "Stripe & Supabase",
      role: "Infrastructure Partner",
      desc: "Uluslararası ödeme & veritabanı",
      color: "from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/30",
    },
  ];

  return (
    <section id="partners" className="py-20 bg-[#131312] border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5b00]/10 border border-[#ff5b00]/20 text-[11px] font-mono uppercase tracking-widest text-[#ff7a00] mb-3">
            <Sparkles className="w-3 h-3" />
            <span>[ RESMİ İŞ ORTAKLIKLARIMIZ ]</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Dünyanın ve Türkiye'nin Öncü Teknoloji Devleriyle Birlikteyiz.
          </h2>
          <p className="mt-3 text-sm text-neutral-400 max-w-xl">
            İşletmenize en iyi performansı sağlamak için resmi sertifikalı partnerliklerimizle hizmet veriyoruz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`p-4 rounded-2xl bg-gradient-to-b ${partner.color} border ${partner.border} backdrop-blur-md flex flex-col justify-between text-left hover:scale-[1.02] transition-transform`}
            >
              <div>
                <div className="text-lg font-bold text-white tracking-tight">{partner.name}</div>
                <div className="text-[10px] font-mono text-[#ff7a00] uppercase font-semibold mt-0.5">
                  {partner.role}
                </div>
              </div>
              <div className="text-[11px] text-neutral-300 mt-4 leading-snug">{partner.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
