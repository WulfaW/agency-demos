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

  // Fallback: Simple WhatsApp button without the fake chat window
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <a
        href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(texts.defaultWa)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20b858] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 pointer-events-auto"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} className="fill-current" />
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
