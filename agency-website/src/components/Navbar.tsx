"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  Calendar,
  ShoppingBag,
  Target,
  Search,
  Video,
  Bot,
  Calculator,
  Building2,
  HelpCircle,
  Mail,
  Zap,
} from "lucide-react";

interface NavbarProps {
  onOpenContact: (mode?: string) => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "İkas E-Ticaret Paketleri",
      desc: "Anahtar teslim, ultra-hızlı online mağaza",
      icon: ShoppingBag,
      href: "#services",
      badge: "Yetkili Partner",
    },
    {
      title: "Shopify E-Ticaret",
      desc: "Global satış ve özel tema mimarisi",
      icon: Zap,
      href: "#services",
    },
    {
      title: "Meta (Instagram/FB) Ads",
      desc: "Dönüşüm ve yüksek ROAS odaklı reklamlar",
      icon: Target,
      href: "#services",
      badge: "Meta Partner",
    },
    {
      title: "Google ADS & PMax",
      desc: "Arama ağı, alışveriş ve video kampanyaları",
      icon: Search,
      href: "#services",
      badge: "Premier Partner",
    },
    {
      title: "TikTok ADS",
      desc: "Viral kreatifler ve performans yönetimi",
      icon: Video,
      href: "#services",
    },
    {
      title: "Otonom AI & Özel Yazılım",
      desc: "Lead avcısı, CRM ve VIP rezervasyon motoru",
      icon: Bot,
      href: "#services",
      badge: "Yeni Nesil",
    },
  ];

  const tools = [
    { title: "E-Ticaret & ROAS Hesaplama", href: "#tools", desc: "Karlılık ve reklam getirisi simülatörü" },
    { title: "Pazaryeri Komisyon Hesaplayıcı", href: "#tools", desc: "Trendyol, Hepsiburada net kar analizi" },
    { title: "KDV & Desi Hesaplama", href: "#tools", desc: "Kargo ve vergi maliyet hesabı" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className={`w-full transition-all duration-300 ${
            scrolled
              ? "bg-[#131312]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff5b00] to-[#e04f00] flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(255,91,0,0.4)]">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
                  JET<span className="text-[#ff5b00]">DIGITAL</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase -mt-1">
                  E-Ticaret & Dijital Pazarlama
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Hizmetlerimiz Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-sm font-medium text-neutral-300 hover:text-white py-2 transition-colors">
                  <span>Hizmetlerimiz</span>
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </button>

                <AnimatePresence>
                  {activeDropdown === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-[540px] p-4 rounded-2xl bg-[#181817] border border-white/10 shadow-2xl grid grid-cols-2 gap-2 z-50 backdrop-blur-2xl"
                    >
                      {services.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition-all flex items-start gap-3 group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-white/[0.05] group-hover:bg-[#ff5b00]/10 border border-white/10 group-hover:border-[#ff5b00]/30 flex items-center justify-center text-white group-hover:text-[#ff5b00] shrink-0 transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#ff5b00]/20 text-[#ff7a00] border border-[#ff5b00]/30">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">{item.desc}</p>
                          </div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#showcase" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                Referanslarımız
              </a>

              <a href="#partners" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                İş Ortaklarımız
              </a>

              {/* Araçlar Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("tools")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-sm font-medium text-neutral-300 hover:text-white py-2 transition-colors">
                  <span>Araçlar</span>
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </button>

                <AnimatePresence>
                  {activeDropdown === "tools" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-72 p-3 rounded-2xl bg-[#181817] border border-white/10 shadow-2xl flex flex-col gap-1.5 z-50 backdrop-blur-2xl"
                    >
                      {tools.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors"
                        >
                          <div className="text-xs font-semibold text-white">{item.title}</div>
                          <div className="text-[11px] text-neutral-400 mt-0.5">{item.desc}</div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#faq" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                SSS
              </a>

              <a href="#contact" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                İletişim
              </a>
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => onOpenContact("call")}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#ff5b00]" />
                <span>Sizi Arayalım</span>
              </button>

              <button
                onClick={() => onOpenContact("appointment")}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#ff5b00] hover:bg-[#e04f00] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,91,0,0.35)] hover:shadow-[0_0_30px_rgba(255,91,0,0.5)]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Hızlı Randevu</span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-50 p-6 rounded-3xl bg-[#181817]/98 backdrop-blur-2xl border border-white/10 shadow-2xl lg:hidden flex flex-col gap-3"
          >
            <div className="text-xs font-mono uppercase text-[#ff5b00] tracking-wider mb-1">Hizmetlerimiz</div>
            {services.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-neutral-200 hover:text-white py-1 flex items-center justify-between"
              >
                <span>{s.title}</span>
                {s.badge && <span className="text-[10px] text-[#ff5b00] font-mono">{s.badge}</span>}
              </a>
            ))}

            <div className="h-px bg-white/10 my-2" />

            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-300 hover:text-white"
            >
              Referanslarımız & Vaka Analizleri
            </a>
            <a
              href="#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-300 hover:text-white"
            >
              İş Ortaklarımız (İkas, Shopify, Meta)
            </a>
            <a
              href="#tools"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-300 hover:text-white"
            >
              E-Ticaret & ROAS Araçları
            </a>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact("call");
                }}
                className="py-3 rounded-xl text-xs font-semibold text-white bg-white/10 border border-white/10 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#ff5b00]" />
                <span>Sizi Arayalım</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact("appointment");
                }}
                className="py-3 rounded-xl text-xs font-semibold text-white bg-[#ff5b00] flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Randevu Al</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
