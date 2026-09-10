"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, ArrowRight, CheckCircle2, TrendingUp, Clock, Zap } from "lucide-react";

interface RoiCalculatorProps {
  onOpenContact: (defaultMessage?: string) => void;
}

export default function RoiCalculator({ onOpenContact }: RoiCalculatorProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("VIP Turizm & Transfer");
  const [leadVolume, setLeadVolume] = useState(150);

  const industries = [
    { name: "VIP Turizm & Transfer", timeMultiplier: 1.2, convBoost: "+185%", devDays: "10-14 Gün" },
    { name: "Lüks Gayrimenkul & Villa", timeMultiplier: 1.5, convBoost: "+210%", devDays: "12-16 Gün" },
    { name: "Sağlık & Estetik Turizmi", timeMultiplier: 1.8, convBoost: "+240%", devDays: "14-18 Gün" },
    { name: "B2B SaaS & Hizmet", timeMultiplier: 2.0, convBoost: "+195%", devDays: "14-21 Gün" },
  ];

  const currentIndustry = industries.find((i) => i.name === selectedIndustry) || industries[0];
  const hoursSavedPerMonth = Math.round(leadVolume * currentIndustry.timeMultiplier);
  const potentialMonthlyGrowth = Math.round(leadVolume * 0.4 * 350); // Simulated currency gain

  return (
    <section id="roi-calculator" className="py-24 relative bg-[#07070a] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-emerald-400 mb-3">
            <Calculator className="w-3 h-3" />
            <span>[ INTERACTIVE ROI & VELOCITY SIMULATOR ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            Sistemlerimizin işletmenize kazandıracağı zaman ve geliri hesaplayın.
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl text-base">
            Otonom yapay zeka ajanları ve yüksek dönüşümlü arayüzler ile operasyonel maliyetlerinizi sıfırlayın.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 max-w-4xl mx-auto border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2.5">
                  1. Sektörünüzü Seçin:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind.name}
                      onClick={() => setSelectedIndustry(ind.name)}
                      className={`p-3 rounded-xl text-xs font-medium text-left border transition-all ${
                        selectedIndustry === ind.name
                          ? "bg-white text-black border-white font-semibold shadow-lg"
                          : "bg-white/[0.02] text-neutral-300 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {ind.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-mono uppercase text-neutral-400">
                    2. Aylık Müşteri / Rezervasyon Hacmi:
                  </label>
                  <span className="font-mono text-sm font-bold text-emerald-400">{leadVolume} Talep / Ay</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={leadVolume}
                  onChange={(e) => setLeadVolume(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                  <span>20</span>
                  <span>500</span>
                  <span>1,000+</span>
                </div>
              </div>
            </div>

            {/* Results Output Box */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#09090c] border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs text-neutral-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Aylık Tasarruf Edilen Ekip Süresi:
                  </span>
                  <span className="font-mono text-lg font-bold text-white">~{hoursSavedPerMonth} Saat / Ay</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs text-neutral-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Beklenen Dönüşüm Artışı:
                  </span>
                  <span className="font-mono text-lg font-bold text-emerald-400">
                    {currentIndustry.convBoost}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Fikirden Canlıya Çıkış Süresi:
                  </span>
                  <span className="font-mono text-sm font-bold text-amber-300">
                    {currentIndustry.devDays}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenContact(
                    `Sektör: ${selectedIndustry}, Aylık Hacim: ${leadVolume} talep. Bu sistem için özel mimari planı ve teklif almak istiyorum.`
                  )
                }
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bu Mimari İçin Teklif & Yol Haritası Al</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
