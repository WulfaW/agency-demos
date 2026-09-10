"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, ArrowRight, Menu, X, CheckCircle2 } from "lucide-react";

interface NavbarProps {
  onOpenContact: (note?: string) => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sistem Mimarisi", href: "#engine-layers" },
    { name: "Klasik Ajans vs AURA", href: "#comparison" },
    { name: "Easy VIP Transfer Vaka Analizi", href: "#case-study" },
    { name: "Komisyon Hesaplayıcı", href: "#calculator" },
    { name: "Kalite Manifestosu", href: "#manifesto" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-5 py-3 rounded-2xl transition-all duration-200 ${
            scrolled
              ? "bg-[#0c0c0e]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
              : "bg-white/[0.03] backdrop-blur-md border border-white/[0.06]"
          }`}
        >
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center text-white font-mono font-bold text-sm shadow-inner group-hover:border-amber-400/50 transition-colors">
              <Terminal className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-wider text-white flex items-center gap-1.5">
                AURA<span className="text-neutral-500">//</span>SYSTEMS
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                Komisyonsuz Rezervasyon Motorları
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white rounded-lg transition-colors hover:bg-white/[0.04]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenContact("Sistem mimarisi ve canlı demo analizi talebi.")}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg hover:scale-[1.02]"
            >
              <span>Canlı Demo İncele</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-50 p-5 rounded-2xl bg-[#0c0c0e]/98 backdrop-blur-2xl border border-white/10 shadow-2xl lg:hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact("Mobil menüden canlı demo ve teklif talebi.");
              }}
              className="w-full mt-2 py-3 rounded-xl text-xs font-semibold text-black bg-white flex items-center justify-center gap-2"
            >
              <span>Canlı Demo ve Teklif Al</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
