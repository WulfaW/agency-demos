'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageDropdown } from '@/components/LanguageDropdown';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user is an authorized admin
    if (typeof window !== 'undefined' && localStorage.getItem('easyvip_admin_auth') === 'true') {
      setIsAdmin(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] py-4 px-4 sm:px-6 pointer-events-none flex justify-center">
      <motion.div 
        className={`w-full max-w-6xl relative flex items-center justify-between h-14 transition-all duration-500 ${
          !isScrolled ? 'rounded-full backdrop-blur-xl bg-[#0a0a0a]/80 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : ''
        }`}
      >
        
        {/* LEFT PILL: Brand Logo */}
        <motion.div
          className={`pointer-events-auto h-full px-4 sm:px-6 flex items-center justify-center transition-all duration-500 ${
            isScrolled ? 'rounded-full backdrop-blur-xl bg-[#0a0a0a]/80 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : ''
          }`}
        >
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
            <span className="font-serif font-semibold text-sm sm:text-base tracking-[0.2em] text-white group-hover:text-[#E5D3B3] transition-colors">
              EASY VIP
            </span>
          </button>
        </motion.div>

        {/* CENTER PILL: Navigation Links (Disappears on scroll) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-auto absolute left-1/2 -translate-x-1/2 h-full hidden lg:flex items-center gap-2 px-3"
            >
              <a href="#fleet" className="px-5 py-2 text-[11px] font-sans tracking-[0.1em] text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-all uppercase font-medium">
                {t.nav.fleet}
              </a>
              <a href="#routes" className="px-5 py-2 text-[11px] font-sans tracking-[0.1em] text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-all uppercase font-medium">
                {t.nav.routes}
              </a>
              <a href="#services" className="px-5 py-2 text-[11px] font-sans tracking-[0.1em] text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-all uppercase font-medium">
                {t.nav.services}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* RIGHT PILL: Actions (Language + CTA) */}
        <motion.div
          className={`pointer-events-auto h-full flex items-center gap-1 pl-2 pr-2 sm:pl-3 sm:pr-3 transition-all duration-500 ${
            isScrolled ? 'rounded-full backdrop-blur-xl bg-[#0a0a0a]/80 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : ''
          }`}
        >
          {/* Language dropdown fades out when scrolled to save space, like gamemaps IRL's small right pill */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0, overflow: 'hidden' }}
                className="hidden md:flex items-center mr-1"
              >
                <LanguageDropdown />
              </motion.div>
            )}
          </AnimatePresence>

          {isAdmin && (
            <a href="/admin" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 mr-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-emerald-500 hover:text-black">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Yönetim</span>
            </a>
          )}

          <a href="#calculator" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5D3B3] hover:bg-white text-black text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors">
            <span>{t.hero.btnCalc}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Menu (Always visible on mobile) */}
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 ml-1 text-white hover:text-[#E5D3B3] transition-colors focus:outline-none rounded-full bg-white/5">
            <Menu className="w-4 h-4" />
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
