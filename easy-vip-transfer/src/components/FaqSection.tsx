'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS, CONTACT_INFO } from '@/data/transferData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#0a0a0e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Merak Edilenler</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Sıkça Sorulan <span className="gold-gradient-text">Sorular</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base">
            VIP transfer süreciniz ve rezervasyon detayları hakkında tüm sorularınızın yanıtları.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`glass-panel rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-amber-500/40 bg-white/[0.04]' : 'border-white/[0.06] hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm md:text-base font-bold text-white flex items-center gap-3">
                    <span className="text-xs font-mono text-amber-400">0{idx + 1}.</span>
                    {faq.q}
                  </span>
                  <div
                    className={`p-2 rounded-xl bg-white/5 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-400 bg-amber-500/10' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-zinc-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Box */}
        <div className="mt-12 p-6 rounded-3xl glass-panel-gold border border-amber-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Başka bir sorunuz veya özel talebiniz mi var?</h4>
            <p className="text-xs text-zinc-400 mt-1">
              VIP operasyon ekibimiz WhatsApp üzerinden 7/24 saniyeler içinde yanıt vermeye hazır.
            </p>
          </div>
          <a
            href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Merhaba%20Easy%20VIP%20Transfer%2C%20bir%20sorum%20vard%C4%B1.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold shrink-0 hover:scale-105 transition-transform flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>WhatsApp ile Sor</span>
          </a>
        </div>
      </div>
    </section>
  );
}
