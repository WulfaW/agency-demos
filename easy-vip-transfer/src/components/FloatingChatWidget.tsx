'use client';

import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
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

  // Fallback: Minimal elegant WhatsApp button — no neon glow
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <a
        href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(texts.defaultWa)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#0d0d0d] border border-white/10 rounded-full shadow-2xl hover:border-white/20 hover:bg-[#141414] transition-all duration-300 group"
        aria-label="WhatsApp"
      >
        <img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="WhatsApp" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="text-[12px] font-sans tracking-[0.15em] text-zinc-400 group-hover:text-white transition-colors uppercase">WhatsApp</span>
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
