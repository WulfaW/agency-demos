"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Check, Sparkles, AlertCircle } from "lucide-react";

export default function QualityManifesto() {
  const checklist = [
    "Sıfır 404 URL: Sitemap'teki her rota ve sayfa 200 döner, kırık link barındırmaz.",
    "Doğrulanabilir Kanıt: Sahte sayaçlar (1000+, 4.9/5) veya uydurma 'Ayşe Yılmaz' referansı kullanılmaz.",
    "Tam SSR Schema: JSON-LD scriptleri sayfa kaynağında (SSR) yer alır, AI botları anında okur.",
    "Çok Dilli Gerçek Slug: İngilizce ve Almanca rotalar Türkçe bozuk slug yerine tam çevrilir.",
    "Hafif & Optimize Kod: 1 MB şişirilmiş HTML yerine <150 KB temiz, Vercel Edge ile anında açılan mimari.",
    "Gerçek Ödeme & Kapora: Yalnızca form toplayıp no-show yaratmaz; 3D Secure ile tahsilat yapar.",
  ];

  return (
    <section id="manifesto" className="py-24 bg-[#0a0a0d] border-t border-white/[0.06] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>[ ZERO-SLOP KALİTE MANİFESTOSU ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl">
            Her Teslimatta Canlı Denetim Raporu.
          </h2>
          <p className="mt-4 text-sm text-neutral-400 max-w-xl">
            Geliştirdiğimiz her rezervasyon ve yazılım sisteminde aşağıdaki standartları garanti altına alıyoruz.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklist.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 rounded-2xl glass-panel flex items-start gap-3 border border-white/10"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
