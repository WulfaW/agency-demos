"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, TrendingUp, Percent, ArrowRight, CheckCircle2, DollarSign } from "lucide-react";

interface ToolsSectionProps {
  onOpenContact: (mode?: string, note?: string) => void;
}

export default function ToolsSection({ onOpenContact }: ToolsSectionProps) {
  const [activeTab, setActiveTab] = useState<"marketplace" | "roas">("marketplace");

  // Marketplace calculator state
  const [salePrice, setSalePrice] = useState(1000);
  const [costPrice, setCostPrice] = useState(400);
  const [shippingCost, setShippingCost] = useState(50);
  const [marketplaceCommission, setMarketplaceCommission] = useState(20); // 20%
  const [kdvRate, setKdvRate] = useState(20); // 20%

  // Calculations for Marketplace vs Own E-Commerce Site
  const commissionAmount = (salePrice * marketplaceCommission) / 100;
  const kdvAmount = (salePrice * kdvRate) / (100 + kdvRate);
  const marketplaceNetProfit = salePrice - costPrice - shippingCost - commissionAmount - kdvAmount * 0.5;

  // Own site has only ~2.5% POS commission instead of 20%
  const ownSitePosCommission = (salePrice * 2.5) / 100;
  const ownSiteNetProfit = salePrice - costPrice - shippingCost - ownSitePosCommission - kdvAmount * 0.5;
  const extraGainPerSale = ownSiteNetProfit - marketplaceNetProfit;

  // ROAS calculator state
  const [adBudget, setAdBudget] = useState(30000);
  const [targetRoas, setTargetRoas] = useState(4.5);
  const projectedRevenue = adBudget * targetRoas;
  const projectedGrossProfit = projectedRevenue * 0.4 - adBudget;

  return (
    <section id="tools" className="py-24 bg-[#131312] border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#ff7a00] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>[ JET DIGITAL ÜCRETSİZ E-TİCARET ARAÇLARI ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Pazaryeri Komisyonu ve ROAS Karlılık Hesaplayıcı.
          </h2>
          <p className="mt-4 text-base text-neutral-400 max-w-2xl">
            Trendyol ve Hepsiburada'ya ödediğiniz devasa komisyonlar yerine kendi İkas/Shopify sitenizde ne kadar net kar edeceğinizi hesaplayın.
          </p>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-8 p-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "marketplace"
                  ? "bg-[#ff5b00] text-white shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Pazaryeri vs Kendi Siteniz
            </button>
            <button
              onClick={() => setActiveTab("roas")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "roas"
                  ? "bg-[#ff5b00] text-white shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Meta & Google ROAS Simülatörü
            </button>
          </div>
        </div>

        {/* Tab 1: Marketplace vs Own Site */}
        {activeTab === "marketplace" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-mono uppercase text-neutral-400 mb-2">
                    <span>Ürün Satış Fiyatı (KDV Dahil)</span>
                    <span className="text-white font-bold">{salePrice.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="50"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ff5b00]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono uppercase text-neutral-400 mb-2">
                    <span>Ürün Alış / Üretim Maliyeti</span>
                    <span className="text-white font-bold">{costPrice.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="6000"
                    step="50"
                    value={costPrice}
                    onChange={(e) => setCostPrice(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ff5b00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Pazaryeri Komisyonu (%)
                    </label>
                    <input
                      type="number"
                      value={marketplaceCommission}
                      onChange={(e) => setMarketplaceCommission(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Kargo Maliyeti (₺)
                    </label>
                    <input
                      type="number"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Comparison Box */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-[#181817] border border-white/10 space-y-5">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <div className="text-xs text-neutral-400">Pazaryeri Net Karınız</div>
                    <div className="text-xl font-bold text-neutral-300 font-mono mt-1">
                      {Math.max(0, Math.round(marketplaceNetProfit)).toLocaleString("tr-TR")} ₺
                    </div>
                    <div className="text-[10px] text-red-400 mt-0.5">-{commissionAmount} ₺ komisyon</div>
                  </div>

                  <div>
                    <div className="text-xs text-[#ff7a00] font-semibold">Kendi İkas Sitenizde Net Kar</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                      {Math.max(0, Math.round(ownSiteNetProfit)).toLocaleString("tr-TR")} ₺
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Yalnızca POS komisyonu (~%2.5)</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#ff5b00]/10 border border-[#ff5b00]/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-300">Her 100 Satışta Ekstra Kazancınız:</div>
                    <div className="text-2xl font-extrabold text-[#ff7a00] font-mono mt-0.5">
                      +{(extraGainPerSale * 100).toLocaleString("tr-TR")} ₺
                    </div>
                  </div>
                  <Sparkles className="w-8 h-8 text-[#ff5b00]" />
                </div>

                <button
                  onClick={() =>
                    onOpenContact("ikas", `Pazaryeri komisyonlarından kurtulup kendi İkas e-ticaret sitemi kurmak istiyorum. Aylık satış hacmim: ${salePrice * 100} ₺`)
                  }
                  className="w-full py-3.5 rounded-xl bg-[#ff5b00] hover:bg-[#e04f00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Kendi İkas Mağazanızı 14 Günde Açın</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: ROAS Simulator */}
        {activeTab === "roas" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-mono uppercase text-neutral-400 mb-2">
                    <span>Aylık Reklam Bütçesi</span>
                    <span className="text-white font-bold">{adBudget.toLocaleString("tr-TR")} ₺</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="300000"
                    step="5000"
                    value={adBudget}
                    onChange={(e) => setAdBudget(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ff5b00]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono uppercase text-neutral-400 mb-2">
                    <span>Hedeflenen ROAS (Reklam Getiri Çarpanı)</span>
                    <span className="text-[#ff7a00] font-bold">{targetRoas}x ROAS</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="0.5"
                    value={targetRoas}
                    onChange={(e) => setTargetRoas(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ff5b00]"
                  />
                </div>
              </div>

              {/* ROAS Result Box */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-[#181817] border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs text-neutral-400">Üretilecek Aylık Toplam Ciro:</span>
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                    {projectedRevenue.toLocaleString("tr-TR")} ₺
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs text-neutral-400">Tahmini Net Brüt Kar Katkısı:</span>
                  <span className="text-lg font-bold text-white font-mono">
                    ~{Math.max(0, Math.round(projectedGrossProfit)).toLocaleString("tr-TR")} ₺
                  </span>
                </div>

                <button
                  onClick={() =>
                    onOpenContact("ads", `Aylık ${adBudget.toLocaleString("tr-TR")} ₺ reklam bütçesi ile ${targetRoas}x ROAS hedefli Meta & Google Ads yönetimi teklifi almak istiyorum.`)
                  }
                  className="w-full py-3.5 rounded-xl bg-[#ff5b00] hover:bg-[#e04f00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg mt-4"
                >
                  <span>Bu ROAS Hedefi İçin Reklam Stratejisi Al</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
