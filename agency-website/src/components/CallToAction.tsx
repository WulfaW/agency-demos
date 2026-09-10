"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PhoneCall, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface CallToActionProps {
  onOpenContact: (mode?: string, note?: string) => void;
}

export default function CallToAction({ onOpenContact }: CallToActionProps) {
  return (
    <section id="contact" className="py-24 bg-[#131312] relative overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ff5b00]/[0.1] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-b from-[#1c1c1a] to-[#141413] border border-white/10 p-8 sm:p-14 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5b00]/15 border border-[#ff5b00]/30 text-xs font-mono uppercase tracking-widest text-[#ff7a00] mb-6">
            <Zap className="w-3.5 h-3.5 fill-[#ff5b00]" />
            <span>HEMEN HAREKETE GEÇİN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
            İşletmenizi Hızlıca Büyütelim!
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            E-ticaret mağazanızı kurmak, reklam bütçenizi en yüksek ROAS ile yönetmek ve dijitalde liderliğe oynamak için uzman ekibimizle hemen tanışın.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenContact("call", "İşletmemizi hızlıca büyütmek için uzman strateji görüşmesi talep ediyoruz.")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#ff5b00] hover:bg-[#e04f00] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,91,0,0.4)] hover:shadow-[0_0_40px_rgba(255,91,0,0.6)]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Sizi Hemen Arayalım</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenContact("appointment", "Hızlı randevu talep ediyorum.")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <span>Online Randevu Oluştur</span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>15 Dakika İçinde Geri Dönüş</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Ücretsiz E-Ticaret & Reklam Analizi</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
