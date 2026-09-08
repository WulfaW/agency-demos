'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageDropdown } from '@/components/LanguageDropdown';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] py-4 px-4 sm:px-6 pointer-events-none flex justify-center">
      
      {/* Main Container - Unified when unscrolled, Transparent when scrolled */}
      <motion.div
        animate={{
          backgroundColor: isScrolled ? 'rgba(0,0,0,0)' : 'rgba(5, 5, 5, 0.4)',
          backdropFilter: isScrolled ? 'blur(0px)' : 'blur(16px)',
          borderColor: isScrolled ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.08)',
          boxShadow: isScrolled ? 'none' : '0 10px 30px rgba(0,0,0,0.3)',
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="pointer-events-auto flex items-center justify-between w-full max-w-6xl h-14 md:h-16 rounded-full border transition-all"
      >
        
        {/* Left Side: Brand Logo (Becomes a pill when scrolled) */}
        <motion.div
          animate={{
            backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.9)' : 'rgba(0, 0, 0, 0)',
            backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
            borderColor: isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)',
            paddingLeft: isScrolled ? '1.5rem' : '1.5rem',
            paddingRight: isScrolled ? '1.5rem' : '0rem',
            boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="h-full flex items-center rounded-full border"
        >
          <a href="#" className="flex items-center gap-2 group w-full justify-center">
            <span className="font-serif font-semibold text-sm sm:text-lg tracking-[0.25em] text-white group-hover:text-[#E5D3B3] transition-colors">
              EASY VIP
            </span>
          </a>
        </motion.div>

        {/* Center: Navigation Links (Fade out when scrolled) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
            >
              <a href="#fleet" className="text-[10px] font-sans tracking-[0.2em] text-zinc-300 hover:text-white transition-colors uppercase font-medium drop-shadow-md">
                {t.nav.fleet}
              </a>
              <a href="#routes" className="text-[10px] font-sans tracking-[0.2em] text-zinc-300 hover:text-white transition-colors uppercase font-medium drop-shadow-md">
                {t.nav.routes}
              </a>
              <a href="#services" className="text-[10px] font-sans tracking-[0.2em] text-zinc-300 hover:text-white transition-colors uppercase font-medium drop-shadow-md">
                {t.nav.services}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Right Side: Language & CTA (Becomes a pill when scrolled) */}
        <motion.div
          animate={{
            backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.9)' : 'rgba(0, 0, 0, 0)',
            backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
            borderColor: isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)',
            paddingLeft: isScrolled ? '0.75rem' : '0rem',
            paddingRight: isScrolled ? '0.75rem' : '1.5rem',
            boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="h-full flex items-center gap-3 md:gap-4 rounded-full border"
        >
          {/* Language dropdown fades out when scrolled */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0, overflow: 'hidden' }}
                className="hidden md:flex items-center"
              >
                <LanguageDropdown />
              </motion.div>
            )}
          </AnimatePresence>

          <a href="#calculator" className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-[#E5D3B3] hover:bg-white text-black text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors">
            <span>{t.hero.btnCalc}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Menu (Always visible on mobile) */}
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-1.5 text-white hover:text-[#E5D3B3] transition-colors focus:outline-none">
            <Menu className="w-5 h-5" />
          </button>
        </motion.div>

      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[200] bg-[#030303]/95 backdrop-blur-3xl flex flex-col pointer-events-auto"
          >
            <div className="flex items-center justify-between p-6">
              <div className="font-serif font-semibold text-xl tracking-[0.2em] text-white">
                EASY VIP <span className="text-[#E5D3B3]">BODRUM</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/70 hover:text-white transition-colors rounded-full bg-white/5 border border-white/10">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col px-8 py-8 gap-8">
              <nav className="flex flex-col gap-6">
                <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="text-xl font-sans tracking-[0.1em] text-zinc-400 hover:text-white transition-colors uppercase">
                  {t.nav.fleet}
                </a>
                <a href="#routes" onClick={() => setMobileMenuOpen(false)} className="text-xl font-sans tracking-[0.1em] text-zinc-400 hover:text-white transition-colors uppercase">
                  {t.nav.routes}
                </a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-sans tracking-[0.1em] text-zinc-400 hover:text-white transition-colors uppercase">
                  {t.nav.services}
                </a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-xl font-sans tracking-[0.1em] text-zinc-400 hover:text-white transition-colors uppercase">
                  {t.nav.faq}
                </a>
              </nav>

              <div className="h-px w-full bg-white/10" />
              
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-6 py-4 rounded-2xl bg-[#E5D3B3] text-black text-sm font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(229,211,179,0.3)]">
                <span>{t.hero.btnCalc}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
