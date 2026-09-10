"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PhoneCall, CheckCircle2, Zap, ShieldCheck, TrendingUp, Users } from "lucide-react";

interface HeroProps {
  onOpenContact: (mode?: string, customNote?: string) => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const [quickPhone, setQuickPhone] = useState("");
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone) return;
    setLoading(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Hero Hızlı Arama Talebi",
          phone: quickPhone,
          industry: "Genel / Hızlı Arama",
          message: "Hero bölümündeki 'Sizi Arayalım' formundan telefon numarası bırakıldı.",
        }),
      });
      setQuickSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clientBrands = [
    "Luxes Secret",
    "MC York",
    "Havens Butik",
    "Lora Bianca",
    "Opia Leather",
    "Milda Collection",
    "Robin Luxury Store",
    "Easy VIP Transfer",
    "Famos Giyim",
    "Onearj",
    "Antimatter Case",
    "Pruf Tatlar",
    "Smool Istanbul",
    "Mugani Glassware",
    "Yöresel Bahçe",
  ];

  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-[#131312] bg-grid-subtle">
      {/* Radial Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#ff5b00]/[0.09] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        {/* Social Proof Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl mb-8 shadow-inner"
        >
          <div className="flex -space-x-1.5 overflow-hidden">
            <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-tr from-amber-500 to-[#ff5b00] border-2 border-[#131312]" />
            <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-[#131312]" />
            <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 border-2 border-[#131312]" />
          </div>
          <span className="text-xs font-semibold text-white tracking-tight">
            +350 Mutlu İşletme
          </span>
          <span className="text-neutral-600">|</span>
          <span className="font-mono text-[11px] text-[#ff7a00] font-medium tracking-wide">
            50+ MN ₺ YÖNETİLEN HACİM
          </span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08]"
        >
          Dijitalde Başarınızı{" "}
          <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff5b00] to-[#e04f00] bg-clip-text text-transparent">
            Zirveye Çıkartalım.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed"
        >
          Jet Digital olarak e-ticaret ve dijital pazarlamada yenilikçi çözümler sunuyor, işletmenizin büyümesini hızlandırıyoruz. İkas & Shopify altyapıları, yüksek ROAS'lı Meta & Google reklamları ve yapay zeka sistemleri ile satışlarınızı katlayın.
        </motion.p>

        {/* Fast "Sizi Arayalım" Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 w-full max-w-md"
        >
          {quickSubmitted ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Numaranız alındı! Uzmanımız 15 dakika içinde sizi arayacak.</span>
            </div>
          ) : (
            <form
              onSubmit={handleQuickSubmit}
              className="p-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-2 focus-within:border-[#ff5b00]/60 transition-colors"
            >
              <input
                required
                type="tel"
                placeholder="Telefon Numaranız (+90 532...)"
                value={quickPhone}
                onChange={(e) => setQuickPhone(e.target.value)}
                className="w-full bg-transparent px-4 text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-full bg-[#ff5b00] hover:bg-[#e04f00] text-white font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-[0_0_20px_rgba(255,91,0,0.4)] disabled:opacity-50"
              >
                {loading ? (
                  <span>Gönderiliyor...</span>
                ) : (
                  <>
                    <span>Sizi Arayalım</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Secondary Badges / Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-neutral-400 font-medium"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Anahtar Teslim İkas / Shopify</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#ff5b00]" />
            <span>ROAS & Satış Odaklı Reklamlar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>7/24 Teknik & Operasyon Desteği</span>
          </div>
        </motion.div>
      </div>

      {/* Brand Logos Marquee */}
      <div className="mt-20 border-t border-b border-white/[0.06] py-6 bg-white/[0.01] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500">
            [ BİRLİKTE BÜYÜDÜĞÜMÜZ BAŞARILI MARKALARDAN BAZILARI ]
          </span>
        </div>

        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee flex items-center justify-around gap-12 text-sm sm:text-base font-semibold text-neutral-400 tracking-wider">
            {clientBrands.concat(clientBrands).map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.04] text-neutral-300 whitespace-nowrap hover:text-white hover:border-white/10 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff5b00]/60" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
