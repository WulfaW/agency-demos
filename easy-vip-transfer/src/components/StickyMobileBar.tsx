'use client';

import React from 'react';
import { PhoneCall, MessageCircle, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';

import { useLanguage } from '@/context/LanguageContext';

export default function StickyMobileBar() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl border-t border-white/10">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        
        {/* Direct Call Button */}
        <a
          href={`tel:${CONTACT_INFO.phoneClean}`}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white text-xs font-semibold tracking-wider transition-all active:scale-95 shadow-lg"
        >
          <PhoneCall className="w-4 h-4 text-[#E5D3B3]" />
          <span>{t.mobileBar.callNow}</span>
        </a>

        {/* WhatsApp Fast Booking Button */}
        <a
          href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Hello,%20I%20would%20like%20to%20get%20a%20quote%20for%20Bodrum%20VIP%20transfer.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#E5D3B3] hover:bg-white text-black text-xs font-bold tracking-wider uppercase transition-all active:scale-95 shadow-[0_0_25px_rgba(229,211,179,0.3)]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.mobileBar.vipWhatsApp}</span>
        </a>

      </div>
    </div>
  );
}
