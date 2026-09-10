"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Menu, X, Terminal } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
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
    { name: "Yetenekler", href: "#services" },
    { name: "Projeler & Vitrin", href: "#showcase" },
    { name: "Teknoloji", href: "#tech-stack" },
    { name: "ROI Hesapla", href: "#roi-calculator" },
    { name: "Süreç", href: "#process" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 md:px-6 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
              : "bg-white/[0.03] backdrop-blur-md border border-white/[0.06]"
          }`}
        >
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/15 flex items-center justify-center text-white font-mono font-bold text-sm shadow-inner group-hover:border-white/30 transition-colors">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-wider text-white flex items-center gap-1.5">
                AURA<span className="text-neutral-500">//</span>CORE
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                AI & Systems Studio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.05]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="relative group overflow-hidden px-4 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Proje Başlat</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle Menu"
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
            className="fixed inset-x-4 top-24 z-40 p-5 rounded-2xl bg-[#0d0d11]/95 backdrop-blur-2xl border border-white/10 shadow-2xl md:hidden flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full mt-2 py-3 rounded-xl text-sm font-semibold text-black bg-white flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Teklif ve Strateji Görüşmesi</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
