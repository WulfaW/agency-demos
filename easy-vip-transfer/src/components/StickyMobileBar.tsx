'use client';

import React from 'react';
import { PhoneCall, MessageCircle, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';

import { useLanguage } from '@/context/LanguageContext';

export default function StickyMobileBar() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] md:hidden w-[90%] max-w-sm">
      <div className="flex items-center p-1.5 bg-[#0a0a0a]/85 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        
        {/* Direct Call Button */}
        <a
          href={`tel:${CONTACT_INFO.phoneClean}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full hover:bg-white/5 transition-colors text-white active:scale-95"
        >
          <PhoneCall className="w-4 h-4 text-white/60" />
          <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-medium">{t.mobileBar.callNow}</span>
        </a>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10" />

        {/* WhatsApp Fast Booking Button */}
        <a
          href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Hello,%20I%20would%20like%20to%20get%20a%20quote%20for%20Bodrum%20VIP%20transfer.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full hover:bg-white/5 transition-colors text-[#E5D3B3] active:scale-95"
        >
          <MessageCircle className="w-4 h-4 text-[#E5D3B3]" />
          <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-bold">{t.mobileBar.vipWhatsApp}</span>
        </a>

      </div>
    </div>
  );
}
