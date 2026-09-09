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

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[320px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden pointer-events-auto flex flex-col"
          >
            {/* Header */}
            <div className="bg-white p-4 flex items-center justify-between border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-zinc-200">
                    <span className="text-[9px] font-serif font-bold text-white tracking-widest text-center leading-tight">EASY<br/>VIP</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-[13px] font-sans font-bold text-black tracking-wide">BİZE ULAŞIN</h3>
                  <p className="text-[11px] text-zinc-500 font-medium">En kısa sürede cevap vereceğiz</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-black transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body (Gray area) */}
            <div className="bg-zinc-200/50 h-[240px] p-4 flex flex-col gap-3 overflow-y-auto">
              <div className="bg-white p-3 rounded-2xl rounded-tl-sm w-[85%] shadow-sm border border-zinc-100">
                <p className="text-xs text-zinc-700 leading-relaxed">Merhaba! Size Bodrum VIP Transfer hizmetlerimizle ilgili nasıl yardımcı olabiliriz?</p>
                <span className="text-[9px] text-zinc-400 mt-1 block">Şimdi</span>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white p-3 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleWhatsApp()}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 bg-transparent text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
                />
                <Smile className="w-4 h-4 text-zinc-400 cursor-not-allowed" />
                <Paperclip className="w-4 h-4 text-zinc-400 cursor-not-allowed" />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button 
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-zinc-600" />
                </button>
                <button 
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20b858] transition-colors shadow-sm shadow-green-500/20"
                >
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-[#25D366] hover:bg-[#20b858] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
}
