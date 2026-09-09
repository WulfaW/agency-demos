'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Paperclip, Smile } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT_INFO } from '@/data/transferData';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleWhatsApp = () => {
    const text = encodeURIComponent(message || 'Merhaba, transfer hizmetleri hakkında bilgi almak istiyorum.');
    window.open(`https://wa.me/${CONTACT_INFO.phoneClean}?text=${text}`, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  // Dinamik Metinler
  const getTexts = () => {
    switch(lang) {
      case 'EN': return { title: 'CONTACT US', sub: 'VIP Operations', msg: 'Hello! How can we assist you with your Bodrum VIP Transfer? You can write your specific vehicle request or route.', input: 'Type your message...', btn: 'Message on WhatsApp' };
      case 'RU': return { title: 'СВЯЗАТЬСЯ', sub: 'VIP Операции', msg: 'Здравствуйте! Как мы можем помочь вам с VIP-трансфером в Бодруме? Напишите ваш маршрут или пожелания.', input: 'Введите сообщение...', btn: 'Написать в WhatsApp' };
      case 'DE': return { title: 'KONTAKT', sub: 'VIP Operationen', msg: 'Hallo! Wie können wir Ihnen bei Ihrem VIP-Transfer in Bodrum helfen? Nennen Sie uns einfach Ihre Route.', input: 'Nachricht schreiben...', btn: 'Über WhatsApp schreiben' };
      case 'AR': return { title: 'اتصل بنا', sub: 'عمليات كبار الشخصيات', msg: 'مرحباً! كيف يمكننا مساعدتك في النقل الخاص بك في بودروم؟', input: 'اكتب رسالتك...', btn: 'راسلنا على واتساب' };
      default: return { title: 'BİZE ULAŞIN', sub: 'VIP Operasyon Hattı', msg: 'Merhaba! Size Bodrum VIP Transfer hizmetlerimizle ilgili nasıl yardımcı olabiliriz? Özel araç talebinizi veya rotanızı yazabilirsiniz.', input: 'Mesajınızı yazın...', btn: "WhatsApp'tan Yaz" };
    }
  };
  const texts = getTexts();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[320px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto flex flex-col backdrop-blur-2xl bg-[#0a0a0a]/95 border border-white/[0.08]"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/[0.06] bg-[#050505]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-white/[0.08]">
                    <span className="text-[9px] font-serif font-bold text-[#E5D3B3] tracking-widest text-center leading-tight">EASY<br/>VIP</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#050505] rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-[12px] font-sans font-bold text-white tracking-[0.15em] uppercase">{texts.title}</h3>
                  <p className="text-[10px] text-zinc-400 font-medium">{texts.sub}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors bg-white/[0.03] p-1.5 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-[240px] p-4 flex flex-col gap-3 overflow-y-auto subtle-scrollbar">
              <div className="bg-[#111] p-3.5 rounded-2xl rounded-tl-sm w-[85%] border border-white/[0.05]">
                <p className="text-[11.5px] text-zinc-300 leading-relaxed font-light">
                  {texts.msg}
                </p>
                <span className="text-[9px] text-zinc-500 mt-1.5 block tracking-widest uppercase">EASY VIP</span>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 flex flex-col gap-3 border-t border-white/[0.06] bg-[#050505]">
              <div className="flex items-center gap-2 px-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleWhatsApp()}
                  placeholder={texts.input}
                  className="flex-1 bg-transparent text-xs text-white placeholder:text-zinc-600 focus:outline-none font-light"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2 mt-1">
                <button 
                  onClick={handleWhatsApp}
                  className="group flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0a0a0a] hover:bg-[#111] border border-[#25D366]/20 transition-all duration-300"
                >
                  <svg className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span className="text-xs font-sans font-bold tracking-widest text-[#25D366] group-hover:text-white transition-colors uppercase">{texts.btn}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative group bg-[#0a0a0a] hover:bg-[#111] border border-white/[0.08] text-white p-4 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all hover:scale-110 flex items-center justify-center overflow-hidden"
      >
        {isOpen ? <X className="w-6 h-6 text-zinc-400 group-hover:text-white relative z-10" /> : <MessageCircle className="w-6 h-6 text-[#E5D3B3] relative z-10" />}
      </button>
    </div>
  );
}
