'use client';

import React from 'react';
import {
  ShieldCheck,
  BadgeCheck,
  Car,
  CreditCard,
  Headphones,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { TRUST_POINTS, CONTACT_INFO } from '@/data/transferData';

export default function TrustSection() {
  return (
    <section id="trust" className="py-24 bg-[#0a0a0e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-mono tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Güven & Standartlar</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bodrum'da Neden <br />
              <span className="gold-gradient-text">Easy VIP Transfer?</span>
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed">
              Bodrum merkezli Halikarnassos Travel güvencesiyle 10 yılı aşkın süredir iş dünyası liderlerine, ailelere ve VIP misafirlerimize kesintisiz, güvenli ve lüks transfer çözümleri sunuyoruz.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">TÜRSAB A Grubu Lisanslı ve Sigortalı</h4>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    Tüm yolcularımız seyahat süresince özel kasko ve koltuk ferdi kaza sigortası kapsamındadır.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Deneyimli & Protokol Eğitimli Kaptanlar</h4>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    Tüm sürücülerimiz ileri sürüş teknikleri belgesine sahip, yabancı dil bilen ve Bodrum yarımadasının tüm koylarına hakim profesyonellerdir.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Araçta Temassız & Çoklu Para Birimi Ödeme</h4>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    Nakit (TL, Euro, USD, GBP) veya tüm yerli & yabancı kredi kartlarıyla araç içi mobil POS ile anında ödeme.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-sm font-mono text-zinc-400 uppercase">Resmi Belge No</span>
                  <div className="text-sm font-bold text-amber-400">{CONTACT_INFO.tursabNo}</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono text-zinc-400 uppercase">Hizmet Bölgesi</span>
                  <div className="text-sm font-bold text-white">Tüm Bodrum & Ege</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Bento Cards (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST_POINTS.map((tp, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-6 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {idx === 0 && <ShieldCheck className="w-6 h-6 text-amber-400" />}
                    {idx === 1 && <BadgeCheck className="w-6 h-6 text-amber-400" />}
                    {idx === 2 && <Car className="w-6 h-6 text-amber-400" />}
                    {idx === 3 && <CreditCard className="w-6 h-6 text-amber-400" />}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{tp.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tp.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[14px] font-mono text-amber-400">
                  <Sparkles className="w-3 h-3" />
                  <span>VIP Standart</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
