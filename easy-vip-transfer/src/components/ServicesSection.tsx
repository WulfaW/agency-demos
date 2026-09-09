'use client';

import React from 'react';
import { ShieldCheck, Clock, Globe, CreditCard, Sparkles, Map } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section className="py-24 px-4 w-full max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 tracking-wide">
          Ayrıcalıklar Dünyası
        </h2>
        <p className="text-zinc-400 font-sans tracking-widest uppercase text-sm md:text-sm mt-6">
          Neden Bizi Tercih Etmelisiniz?
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 auto-rows-[250px]">
        
        {/* Box 1: Large Horizontal - 7/24 Support */}
        <div className="col-span-1 md:col-span-2 row-span-1 backdrop-blur-xl bg-[#0a0a0a]/50 border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden group hover:bg-[#0a0a0a]/80 transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-[#E5D3B3]" />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-white mb-2">7/24 VIP Karşılama</h3>
              <p className="text-zinc-400 font-sans text-sm font-light max-w-md">
                Uçağınız rötar yapsa dahi ek ücret ödemezsiniz. Havalimanında isminize özel isimlik ile VIP karşılama ve bagaj asistanlığı.
              </p>
            </div>
          </div>
        </div>

        {/* Box 2: Tall Vertical - Fixed Price */}
        <div className="col-span-1 row-span-1 md:row-span-2 backdrop-blur-xl bg-[#0a0a0a]/50 border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden group hover:bg-[#0a0a0a]/80 transition-colors">
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-emerald-500/10 rounded-full blur-[80px] -mb-20 pointer-events-none group-hover:bg-emerald-500/20 transition-colors" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-[#E5D3B3]" />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-white mb-2">Sabit Fiyat<br/>Sıfır Sürpriz</h3>
              <p className="text-zinc-400 font-sans text-sm font-light">
                Otopark, tünel, otoban ücretleri ve vergiler fiyatlarımıza dahildir. Araçta kredi kartı, döviz veya nakit ödeme kolaylığı.
              </p>
            </div>
          </div>
        </div>

        {/* Box 3: Small Square - Legal */}
        <div className="col-span-1 row-span-1 backdrop-blur-xl bg-[#0a0a0a]/50 border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden group hover:bg-[#0a0a0a]/80 transition-colors">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#E5D3B3]" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-white mb-1">TÜRSAB A Grubu</h3>
              <p className="text-zinc-400 font-sans text-sm font-light">
                %100 Yasal, sigortalı ve D2 yetki belgeli resmi taşımacılık.
              </p>
            </div>
          </div>
        </div>

        {/* Box 4: Small Square - Global */}
        <div className="col-span-1 row-span-1 backdrop-blur-xl bg-[#0a0a0a]/50 border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden group hover:bg-[#0a0a0a]/80 transition-colors">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-[#E5D3B3]" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-white mb-1">Eğitimli Sürücüler</h3>
              <p className="text-zinc-400 font-sans text-sm font-light">
                Yabancı dil bilen, protokol eğitimi almış VIP şoför kadrosu.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
