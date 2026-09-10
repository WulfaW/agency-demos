"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Jet Digital kimdir?",
      a: "Jet Digital, işletmelerin dijital dünyada hızla büyümesini sağlayan bir dijital pazarlama ve teknoloji ajansıdır. E-Ticaret altyapıları (İkas & Shopify), performans pazarlama (Meta, Google, TikTok Ads) ve özel yapay zeka otomasyonlarıyla markanızı ölçeklendiriyoruz.",
    },
    {
      q: "Jet Digital hangi hizmetleri sunuyor?",
      a: "Google Ads reklam yönetimi, Meta (Facebook & Instagram) dönüşüm reklamları, TikTok Ads, anahtar teslim İkas ve Shopify e-ticaret mağaza kurulumu, sosyal medya yönetimi, SEO optimizasyonu ve otonom AI veri kazıma & CRM sistemleri sunuyoruz.",
    },
    {
      q: "İKAS ile e-ticaret altyapısı kurmanın avantajları nelerdir?",
      a: "İkas, 0.8 saniyelik ultra-hızlı açılış süresi, yerli sunucu avantajı, pazaryeri (Trendyol/Hepsiburada) tam entegrasyonu ve sıfır yazılım bilgisiyle kolay yönetim sunar. Jet Digital olarak İkas'ın ödüllü yetkili iş ortağıyız ve sitenizi anahtar teslim teslim ediyoruz.",
    },
    {
      q: "Sosyal medya yönetimi ve reklamlarla satışlarımı nasıl artırabilirim?",
      a: "Dönüşüm odaklı video kreatifler, Meta CAPI sunucu taraflı takip sistematiği ve dinamik yeniden hedefleme (Retargeting) hunileri kuruyoruz. Reklam bütçenizi sadece görüntülenmeye değil, doğrudan sepete atma ve satın alma ciro artışına odaklıyoruz.",
    },
    {
      q: "Jet Digital'in teknoloji ve iş ortakları kimlerdir?",
      a: "Ödüllü yetkili iş ortağı olduğumuz İKAS e-ticaret altyapısının yanı sıra; Shopify, Google Premier, Meta Business, TikTok Ads ve Stripe ile doğrudan resmi ortaklık seviyesinde çalışmaktayız.",
    },
    {
      q: "Proje teslim ve canlıya geçiş süresi ne kadardır?",
      a: "Standart e-ticaret ve reklam kurulumlarımız ortalama 10-14 gün içerisinde anahtar teslim şekilde tamamlanıp satışa hazır hale getirilir.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#181817] border-t border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#ff7a00] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>[ SIKÇA SORULAN SORULAR ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Hakkımızda En Çok Merak Edilenler.
          </h2>
          <p className="mt-3 text-sm text-neutral-400 max-w-xl">
            İkas e-ticaret paketleri, reklam yönetimi ve süreçlerimiz hakkında merak ettiğiniz tüm yanıtlar burada.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group"
              >
                <span className="font-semibold text-sm sm:text-base text-white group-hover:text-[#ff7a00] transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                    openIdx === idx ? "rotate-180 text-[#ff5b00]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.04] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
