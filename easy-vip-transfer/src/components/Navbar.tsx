'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, PhoneCall, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';

import { useLanguage, Language } from '@/context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: Language[] = ['TR', 'EN', 'RU'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Floating Capsule Bar */}
        <div className={`flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
            : 'bg-black/40 backdrop-blur-xl border border-white/[0.08]'
        }`}>
          
          {/* 1. Left: Single-Line Elegant Brand Mark */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-serif font-semibold text-lg tracking-[0.25em] text-white group-hover:text-[#E5D3B3] transition-colors">
              EASY VIP
            </span>
            <span className="text-[9px] font-sans tracking-[0.2em] text-zinc-500 uppercase hidden sm:inline-block border-l border-white/10 pl-2">
              Bodrum
            </span>
          </a>

          {/* 2. Center: Minimalist Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#fleet" 
              className="text-xs font-sans tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase font-medium"
            >
              {t.nav.fleet}
            </a>
            <a 
              href="#routes" 
              className="text-xs font-sans tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase font-medium"
            >
              {t.nav.routes}
            </a>
            <a 
              href="#services" 
              className="text-xs font-sans tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase font-medium"
            >
              {t.nav.services}
            </a>
            <a 
              href="#faq" 
              className="text-xs font-sans tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase font-medium"
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* 3. Right: Language & Action Button */}
          <div className="flex items-center gap-3">
            
            {/* Interactive Language Pill */}
            <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-full p-0.5 text-[10px] font-mono text-zinc-400">
              {languages.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    lang === l
                      ? 'bg-[#E5D3B3] text-black font-bold shadow-sm'
                      : 'hover:text-white text-zinc-400'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <a
              href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Hello,%20I%20would%20like%20to%20get%20a%20quote%20for%20Bodrum%20VIP%20transfer.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-[#E5D3B3] hover:bg-white text-black text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
            >
              <span>{t.nav.bookNow}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-zinc-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

      </div>

      {/* Full-Screen Minimal Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[76px] z-40 bg-[#030303]/98 backdrop-blur-3xl p-6 flex flex-col justify-between border-t border-white/10 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 mt-8">
            {[
              { name: t.nav.calc, href: '#calculator' },
              { name: t.nav.fleet, href: '#fleet' },
              { name: t.nav.routes, href: '#routes' },
              { name: t.nav.services, href: '#services' },
              { name: t.nav.faq, href: '#faq' },
            ].map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xl font-serif tracking-wider text-zinc-200 hover:text-[#E5D3B3] border-b border-white/5 pb-4"
              >
                <span>{item.name}</span>
                <span className="text-xs font-mono text-zinc-600">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="space-y-3 pb-12">
            <a
              href={`https://wa.me/${CONTACT_INFO.phoneClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#E5D3B3] text-black text-xs font-bold tracking-widest uppercase shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp VIP</span>
            </a>
            <a
              href={`tel:${CONTACT_INFO.phoneClean}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 text-white text-xs font-mono border border-white/10"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E5D3B3]" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
