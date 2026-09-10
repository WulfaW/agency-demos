"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Car, Plane, Smartphone, CheckCircle2 } from "lucide-react";

interface ShowcaseSectionProps {
  onOpenContact: (note?: string) => void;
}

export default function ShowcaseSection({ onOpenContact }: ShowcaseSectionProps) {
  return (
    <section id="case-study" className="py-24 bg-[#0a0a0d] border-t border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ CANLI VAKA ANALİZİ // AMİRAL GEMİSİ ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Easy VIP Transfer: Form Toplamayan, Rezervasyon Kapatan Motor.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl">
            Bodrum ve Antalya bölgesinde faaliyet gösteren lüks transfer filosu için geliştirdiğimiz yeni nesil rezervasyon ve operasyon ekosistemi.
          </p>
        </div>

        {/* Big Case Study Box */}
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
                  CANLI PROJE
                </span>
                <span className="text-xs font-mono text-neutral-500">Bodrum & Milas Havalimanı</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Aracı Portallardan Bağımsız, %100 Doğrudan Nakit Akışı.
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Eski sistemde telefon ve WhatsApp üzerinden manuel fiyat verilip no-show yaşanırken; AURA Rezervasyon Motoru ile online 3D Secure kapora tahsilatı, 4 dilli dinamik kur (€, $, £, ₺) ve canlı uçuş telemetrisi devreye alındı.
              </p>

              {/* Verified Facts Grid */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/[0.06] font-mono">
                <div>
                  <div className="text-xl font-bold text-white">0.6s</div>
                  <div className="text-[10px] text-neutral-400 uppercase mt-0.5">Açılış Hızı</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-emerald-400">%0</div>
                  <div className="text-[10px] text-neutral-400 uppercase mt-0.5">Aracı Kesintisi</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-cyan-400">4 Dil</div>
                  <div className="text-[10px] text-neutral-400 uppercase mt-0.5">TR / EN / DE / RU</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Next.js 15 App Router + Supabase PostgreSQL RLS mimarisi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Şoför görev yönetim ve anlık yolcu kabul arayüzü</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AeroDataBox API ile canlı uçuş kodu rötar entegrasyonu</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenContact("Easy VIP Transfer benzeri kendi rezervasyon motorumuzu kurmak istiyoruz.")}
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs transition-all flex items-center gap-2 shadow-lg hover:bg-neutral-200"
                >
                  <span>Sektörünüz İçin Canlı Demo Talep Edin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Interactive Mockup Column */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#09090c] border border-white/10 p-5 shadow-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-neutral-400 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-white font-bold">DISPATCH ENGINE ACTIVE</span>
                  </div>
                  <span>REF: #EVIP-9284</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">Yolcu:</span>
                    <span className="text-white font-semibold">David Harrison (London / UK)</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">Rota:</span>
                    <span>BJV Havalimanı → Mandarin Oriental</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-400">Araç:</span>
                    <span>Mercedes VIP Maybach Edition</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase">Ödeme & Kapora Durumu</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">€42.00 (%30 Kapora Tahsil Edildi)</div>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                    3D SECURE ONAYLI
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cyan-500/[0.05] border border-cyan-500/20 text-[11px] text-neutral-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Uçuş: BA672 (British Airways)</span>
                  </div>
                  <span className="text-cyan-400 font-bold">RÖTARSIZ (16:40)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
