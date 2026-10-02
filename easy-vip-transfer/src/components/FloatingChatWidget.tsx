'use client';

import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO } from '@/data/transferData';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingChatWidget() {
  const { lang } = useLanguage();

  const getTexts = () => {
    switch(lang) {
      case 'EN': return { defaultWa: 'Hello, I would like to get information about transfer services.' };
      case 'RU': return { defaultWa: 'Здравствуйте, я хотел бы узнать о трансферных услугах.' };
      case 'DE': return { defaultWa: 'Hallo, ich möchte Informationen zu Transferdiensten erhalten.' };
      case 'AR': return { defaultWa: 'مرحباً، أود الحصول على معلومات حول خدمات النقل.' };
      default: return { defaultWa: 'Merhaba, transfer hizmetleri hakkında bilgi almak istiyorum.' };
    }
  };
  const texts = getTexts();

  useEffect(() => {
    // If Crisp ID exists, load Crisp on first interaction or delay to avoid blocking render
    const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    if (crispId) {
      // Load Crisp
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = crispId;
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    }
  }, []);

  const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

  // If Crisp is active, Crisp's own widget will take over, we don't render our fallback button
  if (crispId) {
    return null;
  }

  // Boutique Luxury WhatsApp Widget
  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start gap-3 pointer-events-none">
      
      {/* Tooltip Bubble */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
        className="pointer-events-auto relative bg-white text-black px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-[0_10px_40px_rgba(229,211,179,0.15)] flex items-center gap-2"
      >
        <span className="text-[11px] sm:text-xs font-semibold tracking-wide">
          {lang === 'TR' ? 'Size özel VIP transfer planlayalım' : 'Let us plan your VIP transfer'}
        </span>
      </motion.div>

      {/* Round Gold Button */}
      <a
        href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(texts.defaultWa)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#E5D3B3] rounded-full shadow-[0_0_30px_rgba(229,211,179,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 relative group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-black" strokeWidth={2.5} />
        {/* Subtle ping animation */}
        <div className="absolute inset-0 rounded-full border border-[#E5D3B3] animate-[ping_3s_ease-in-out_infinite]" />
      </a>
      
    </div>
  );
}

// Add TS typings for Crisp
declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}
