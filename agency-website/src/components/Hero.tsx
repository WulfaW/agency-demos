"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Plane, ShieldCheck, CheckCircle2, DollarSign, Clock, Layers, Car } from "lucide-react";

interface HeroProps {
  onOpenContact: (note?: string) => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const [flightCode, setFlightCode] = useState("TK2514");
  const [selectedRoute, setSelectedRoute] = useState("Milas-Bodrum Havalimanı (BJV) → Mandarin Oriental");

  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-[#070709] bg-grid-subtle">
      {/* Subtle Architectural Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        {/* Telemetry Monospace Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-neutral-300 uppercase tracking-wider">
            [ SİTE DEĞİL REZERVASYON MOTORU ]
          </span>
          <span className="text-neutral-600">|</span>
          <span className="font-mono text-[11px] text-amber-400 font-medium">3D SECURE & KAPORA ENTEGRASYONU</span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08]"
        >
          Onlar Web Sitesi Kuruyor.{" "}
          <span className="bg-gradient-to-r from-amber-200 via-white to-neutral-400 bg-clip-text text-transparent">
            Biz Komisyonsuz Kendi Rezervasyon Motorunuzu
          </span>{" "}
          İnşa Ediyoruz.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed"
        >
          Aracı portallara %20-30 komisyon kaptırmaya son. Klasik ajanslar sadece form toplayan şablonlar kurarken, biz <span className="text-white font-semibold">3D Secure ödeme, kapora tahsilatı (no-show önleme), canlı uçuş telemetrisi ve WhatsApp Business API</span> ile çalışan kendi Booking altyapınızı teslim ediyoruz.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => onOpenContact("Easy VIP Transfer mimarisi hakkında canlı demo ve analiz istiyorum.")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xl hover:bg-neutral-200"
          >
            <span>Canlı Rezervasyon Motorunu Test Edin</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#comparison"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.04] text-white font-medium text-xs hover:bg-white/[0.08] border border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <span>Klasik Ajans vs AURA Kıyaslaması</span>
          </a>
        </motion.div>

        {/* Interactive Flight & Dispatch Telemetry Preview Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 w-full max-w-3xl rounded-2xl bg-[#0c0c0f] border border-white/10 p-5 shadow-2xl text-left font-mono text-xs"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-white/[0.06] gap-2">
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">LIVE ENGINE SIMULATOR:</span>
              <span className="text-neutral-400">easyviptransfer.com // v2.4</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                0% ARACI KOMİSYONU
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                3D SECURE AKTİF
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-7 space-y-2">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-neutral-200">
                  <Car className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate text-xs">{selectedRoute}</span>
                </div>
                <span className="text-white font-bold shrink-0">€140</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-neutral-200">
                  <Plane className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs">Uçuş Kodu: <strong className="text-white">{flightCode}</strong> (THY İstanbul → Bodrum)</span>
                </div>
                <span className="text-cyan-400 text-[11px]">İNİŞ: 14:25</span>
              </div>
            </div>

            <div className="md:col-span-5 p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-400">Aracı Portal Kesintisi (%25):</span>
                <span className="text-red-400 font-bold">-€35.00</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-400">AURA Motorunda Net Kazanç:</span>
                <span className="text-emerald-400 font-bold">€136.50 (%97.5)</span>
              </div>
              <div className="text-[10px] text-neutral-400 pt-1 border-t border-white/[0.04]">
                * %30 kapora anında banka hesabınıza geçer, no-show riski ortadan kalkar.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
