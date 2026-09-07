'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Star, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { MetalButton, LiquidButton } from '@/components/ui/button';

export default function AboutVIP() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 px-4 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E5D3B3]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Image / Visuals */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 glass-panel"
          >
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop" 
              alt="VIP Chauffeur Service Bodrum" 
              className="w-full h-full object-cover opacity-80"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
            
            {/* Experience Badge */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-center gap-6">
                <div className="text-4xl md:text-5xl font-serif text-[#E5D3B3]">10+</div>
                <div>
                  <div className="text-white text-sm font-bold tracking-widest uppercase">Yıllık Tecrübe</div>
                  <div className="text-zinc-400 text-xs mt-1">Bodrum ve Ege'de 15.000+ Başarılı VIP Transfer</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#E5D3B3]/10 rounded-full blur-[50px]" />
        </div>

        {/* Right Column: Text & Values */}
        <div className="lg:col-span-7 lg:pl-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xs tracking-[0.3em] text-[#E5D3B3] uppercase font-bold mb-4 flex items-center gap-3">
              <span className="w-10 h-[1px] bg-[#E5D3B3]"></span>
              Easy VIP Transfer
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-6">
              Ayrıcalığı <span className="italic font-light text-zinc-400">Hissedin,</span><br />
              Standartları <span className="text-[#E5D3B3]">Yükseltin.</span>
            </h3>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-light">
              Bodrum'da sıradan bir taksi yolculuğu değil, kişiye özel tasarlanmış birinci sınıf bir seyahat deneyimi sunuyoruz. 
              Gelişmiş Mercedes-Benz Maybach ve VIP Vito filomuz, sıkı güvenlik ve gizlilik eğitimlerinden geçmiş özel protokol şoförlerimizle birleşiyor. 
              Amacımız sadece sizi bir yere ulaştırmak değil, yolculuğun her saniyesinde ayrıcalıklı olduğunuzu hissettirmektir.
            </p>
          </motion.div>

          {/* Grid of Values */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#E5D3B3]">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1.5">Protokol Şoförleri</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">İleri sürüş teknikleri sertifikalı, İngilizce bilen, takım elbiseli ve gizlilik prensibine sadık profesyoneller.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#E5D3B3]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1.5">Maksimum Güvenlik</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">Filomuzdaki tüm araçlar her transfer öncesi mekanik ve hijyenik VIP temizlik protokollerinden geçer.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#E5D3B3]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1.5">Sıfır Rötar Politikası</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">Uçuşunuz canlı radardan takip edilir. Siz daha bavullarınızı almadan aracınız VIP kapıda sizi bekliyor olur.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#E5D3B3]">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1.5">First Class İkramlar</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">Mini bar, soğuk içecekler, Nespresso kahve ve özel taleplerinize anında cevap veren butik hizmet.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#fleet">
              <LiquidButton className="h-12 px-8 text-xs tracking-widest uppercase border border-white/10 bg-white/5">
                Filomuzu Keşfedin
              </LiquidButton>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
