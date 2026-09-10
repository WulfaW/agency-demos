"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, ArrowRight, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";

interface CommissionCalculatorProps {
  onOpenContact: (note?: string) => void;
}

export default function CommissionCalculator({ onOpenContact }: CommissionCalculatorProps) {
  const [dailyTransfers, setDailyTransfers] = useState(12);
  const [avgPrice, setAvgPrice] = useState(3500); // 3.500 TL average

  const monthlyTransfers = dailyTransfers * 30;
  const monthlyRevenue = monthlyTransfers * avgPrice;
  const intermediaryCommission = monthlyRevenue * 0.25; // 25% lost to Booking/Kiwi
  const savedAnnualLoss = intermediaryCommission * 6; // 6 month season gain

  return (
    <section id="calculator" className="py-24 bg-[#070709] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>[ ARACI KOMİSYONU & NET KAZANÇ SİMÜLATÖRÜ ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Aracı Platformlara Yılda Ne Kadar Kaptırıyorsunuz?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl">
            Booking.com, KiwiTaxi veya otel konsiyerjleri sizden %20-30 komisyon alıyor. Kendi rezervasyon motorunuzla bu paranın tamamı kasanızda kalsın.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 max-w-4xl mx-auto border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono uppercase text-neutral-300 mb-2">
                  <span>Günlük Ortalama Sefer Sayısı:</span>
                  <span className="text-amber-400 font-bold text-sm">{dailyTransfers} Sefer / Gün</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="1"
                  value={dailyTransfers}
                  onChange={(e) => setDailyTransfers(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                  <span>2 sefer</span>
                  <span>30 sefer</span>
                  <span>60+ sefer</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono uppercase text-neutral-300 mb-2">
                  <span>Ortalama Transfer / Hizmet Ücreti:</span>
                  <span className="text-white font-bold text-sm">{avgPrice.toLocaleString("tr-TR")} ₺</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="250"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                  <span>1.000 ₺</span>
                  <span>7.500 ₺</span>
                  <span>15.000 ₺</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-400 space-y-1">
                <div className="flex justify-between">
                  <span>Aylık Sefer Hacmi:</span>
                  <span className="text-white font-mono font-semibold">{monthlyTransfers} Sefer</span>
                </div>
                <div className="flex justify-between">
                  <span>Aylık Üretilen Brüt Hacim:</span>
                  <span className="text-white font-mono font-semibold">{monthlyRevenue.toLocaleString("tr-TR")} ₺</span>
                </div>
              </div>
            </div>

            {/* Results Output Box */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0e0e12] border border-white/10 space-y-5">
              <div className="space-y-3 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Aracılara Giden Aylık Kayıp (%25):
                  </span>
                  <span className="font-mono text-base font-bold text-red-400">
                    -{intermediaryCommission.toLocaleString("tr-TR")} ₺ / Ay
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20">
                  <div className="text-xs text-neutral-300">Bir Sezonda (6 Ay) Kasanızda Kalan Net Tasarruf:</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                    +{savedAnnualLoss.toLocaleString("tr-TR")} ₺
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenContact(
                    `Günlük ${dailyTransfers} sefer ve ${avgPrice} ₺ ortalama ücret hacmimiz için komisyonsuz kendi rezervasyon motorumuzu kurmak istiyoruz.`
                  )
                }
                className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bu Tasarrufu Sağlayacak Sistemi Kurun</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
