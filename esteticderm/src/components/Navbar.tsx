"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import AppointmentModal from "./AppointmentModal";

const languages = [
  { code: "TR", name: "Türkçe" },
  { code: "EN", name: "English" },
  { code: "DE", name: "Deutsch" },
  { code: "RU", name: "Русский" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("TR");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setLangOpen(false); // Close dropdown on scroll
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-cream/80 backdrop-blur-md shadow-sm py-4 border-b border-gold-400/20" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-2xl tracking-wide text-charcoal font-medium">ESTETICDERM</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-600">Istanbul Aesthetic</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm tracking-wide text-charcoal hover:text-gold-600 transition-colors">Ana Sayfa</Link>
            <Link href="#hakkimizda" className="text-sm tracking-wide text-charcoal hover:text-gold-600 transition-colors">Hakkımızda</Link>
            <Link href="#hizmetler" className="text-sm tracking-wide text-charcoal hover:text-gold-600 transition-colors">Hizmetler</Link>
            <Link href="#blog" className="text-sm tracking-wide text-charcoal hover:text-gold-600 transition-colors">Blog</Link>
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm tracking-wide text-charcoal hover:text-gold-600 transition-colors py-2"
              >
                <Globe className="w-4 h-4" />
                <span>{activeLang}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-charcoal/5 overflow-hidden flex flex-col"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setActiveLang(lang.code);
                          setLangOpen(false);
                        }}
                        className={`text-left px-4 py-2.5 text-sm transition-colors hover:bg-gold-50/50 ${activeLang === lang.code ? 'text-gold-600 font-medium bg-gold-50/30' : 'text-charcoal'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="tel:+905384824585" className="hidden lg:flex items-center gap-2 text-sm font-medium tracking-wide text-charcoal px-4 py-2 rounded-full border border-charcoal/10 hover:border-gold-400 hover:text-gold-600 transition-all">
              <Phone className="w-4 h-4" />
              0538 482 45 85
            </a>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-charcoal text-cream text-sm tracking-wider rounded-full hover:bg-gold-600 hover:text-charcoal transition-colors"
            >
              Randevu Al
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-charcoal relative z-50"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-charcoal">Ana Sayfa</Link>
        <Link href="#hakkimizda" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-charcoal">Hakkımızda</Link>
        <Link href="#hizmetler" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-charcoal">Hizmetler</Link>
        <Link href="#blog" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-charcoal">Blog</Link>
        
        <div className="flex gap-4 mt-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setActiveLang(lang.code);
                setMobileMenuOpen(false);
              }}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${activeLang === lang.code ? 'border-gold-600 text-gold-600' : 'border-charcoal/20 text-charcoal'}`}
            >
              {lang.code}
            </button>
          ))}
        </div>

        <button 
          onClick={() => {
            setMobileMenuOpen(false);
            setIsModalOpen(true);
          }}
          className="px-8 py-4 bg-charcoal text-cream text-lg rounded-full mt-4"
        >
          Randevu Al
        </button>
      </div>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
