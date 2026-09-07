'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, PhoneCall, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';

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
    <header className="fixed top-0 left-0 right-0 z-[100] py-5 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between w-full relative h-14">
        
        {/* Left Side: Brand Logo */}
        <motion.div 
          initial={false}
          animate={{
            x: isScrolled ? 0 : '0%',
            backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.9)' : 'rgba(5, 5, 5, 0.4)',
            backdropFilter: 'blur(16px)',
            borderColor: isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.08)',
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="pointer-events-auto flex items-center justify-center px-6 h-full rounded-full border shadow-xl absolute left-0 origin-left"
          style={{
            width: isScrolled ? 'auto' : '100%',
            maxWidth: isScrolled ? '200px' : '300px',
            zIndex: 10,
          }}
        >
          <a href="#" className="flex items-center gap-2 group w-full justify-center">
            <span className="font-serif font-semibold text-sm sm:text-lg tracking-[0.25em] text-white group-hover:text-[#E5D3B3] transition-colors">
              EASY VIP
            </span>
          </a>
        </motion.div>

        {/* Right Side: Navigation & Actions (Only visible when scrolled) */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pointer-events-auto flex items-center h-full rounded-full border border-white/10 shadow-xl bg-[#050505]/90 backdrop-blur-md absolute right-0 origin-right px-3 sm:px-4"
              style={{
                width: 'auto',
                justifyContent: 'flex-end',
                zIndex: 10,
              }}
            >
              <div className="flex items-center justify-end w-full">
                
                {/* Desktop Links */}
                <nav className="hidden lg:flex items-center gap-6 mr-6">
                  <a href="#fleet" className="text-[10px] font-sans tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase font-medium">
                    {t.nav.fleet}
                  </a>
                  <a href="#routes" className="text-[10px] font-sans tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase font-medium">
                    {t.nav.routes}
                  </a>
                  <a href="#services" className="text-[10px] font-sans tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase font-medium">
                    {t.nav.services}
                  </a>
                  <a href="#faq" className="text-[10px] font-sans tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase font-medium">
                    {t.nav.faq}
                  </a>
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-3">
                  <LanguageDropdown />
                  <a href="#calculator" className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5D3B3] hover:bg-white text-black text-[10px] font-bold tracking-widest uppercase transition-colors">
                    <span>{t.hero.btnCalc}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>

                  {/* Mobile Hamburger */}
                  <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-1.5 text-white hover:text-[#E5D3B3] transition-colors focus:outline-none">
                    <Menu className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Unscrolled Static Right Actions (Only visible when NOT scrolled) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-auto absolute right-0 flex items-center gap-4 h-full pr-4"
              style={{ zIndex: 20 }}
            >
              <nav className="hidden lg:flex items-center gap-8 mr-4">
                  <a href="#fleet" className="text-[10px] font-sans tracking-[0.2em] text-zinc-300 hover:text-white transition-colors uppercase font-medium drop-shadow-md">
                    {t.nav.fleet}
                  </a>
                  <a href="#routes" className="text-[10px] font-sans tracking-[0.2em] text-zinc-300 hover:text-white transition-colors uppercase font-medium drop-shadow-md">
                    {t.nav.routes}
                  </a>
                  <a href="#services" className="text-[10px] font-sans tracking-[0.2em] text-zinc-300 hover:text-white transition-colors uppercase font-medium drop-shadow-md">
                    {t.nav.services}
                  </a>
              </nav>
              <LanguageDropdown />
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-1.5 text-white hover:text-[#E5D3B3] transition-colors focus:outline-none drop-shadow-md">
                <Menu className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
