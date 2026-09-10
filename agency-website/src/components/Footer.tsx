"use client";

import { Terminal, Shield, ArrowUp, Zap } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/[0.06] pt-16 pb-12 text-neutral-400 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Terminal className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-mono text-sm font-bold text-white tracking-wider">
                AURA<span className="text-neutral-500">//</span>SYSTEMS
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Bodrum, Antalya ve lüks turizm işletmeleri için komisyonsuz, 3D Secure destekli özel rezervasyon ve filo operasyon motorları mühendisliği.
            </p>
          </div>

          {/* Telemetry Status Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-mono text-[11px]">
            <div className="px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300">NEXT.JS 15 + SUPABASE RLS</span>
              <span className="text-neutral-600">|</span>
              <span className="text-emerald-400 font-semibold">0.6S TTFB</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Yukarı Kaydır"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} AURA SYSTEMS. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-4">
            <span>ZERO-SLOP ENGINEERING STANDARDS</span>
            <span className="text-neutral-700">/</span>
            <span>KOMİSYONSUZ REZERVASYON MİMARİSİ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
