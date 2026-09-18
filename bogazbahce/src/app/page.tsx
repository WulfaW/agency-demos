"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, CalendarHeart, GlassWater, Phone, Mail } from "lucide-react";
import Image from "next/image";

import { Hero04 } from '@/components/hero-04';
import { GalleryAccordion } from '@/components/gallery-accordion';

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Navigation Layer */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-md bg-luxury-bg/80 border-b border-black/5"
      >
        <div className="text-2xl font-display tracking-wider font-bold text-forest-900">Boğaz Bahçe</div>
        <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase text-luxury-text/80">
          <a href="#kurumsal" className="hover:text-gold-500 transition-colors">Kurumsal</a>
          <a href="#etkinlikler" className="hover:text-gold-500 transition-colors">Etkinlikler</a>
          <a href="#menuler" className="hover:text-gold-500 transition-colors">Menüler</a>
          <a href="#galeri" className="hover:text-gold-500 transition-colors">Galeri</a>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="tel:+905326679661" className="text-sm font-medium flex items-center gap-2 hover:text-gold-600 transition-colors">
             <Phone size={16} className="text-gold-500" /> <span className="hidden lg:inline">+90 532 667 96 61</span>
          </a>
          <button className="bg-forest-900 text-luxury-bg px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-forest-900/90 transition-all shadow-xl shadow-forest-900/20">
            Rezervasyon
          </button>
        </div>
      </nav>

      <Hero04 
        title="Boğaza Sıfır Noktada"
        titleLine2="Kır Düğünü"
        description="İster masal gibi bir düğün, isterseniz de elit bir davet. Boğaza sıfır olarak, kır konseptiyle gerçekleştirmek istediğiniz ve hayalini kurduğunuz etkinliğe bizimle ulaşabilirsiniz."
        washImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
        primaryImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
        secondaryImage="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
        animation="subtle"
        primaryCTA={{ ctaEnabled: true, text: "Rezervasyon", variant: "primary", href: "#iletisim" }}
        secondaryCTA={{ ctaEnabled: true, text: "Sanal Tur 360°", variant: "link", href: "#sanal-tur" }}
      />
      {/* About Section based on original content */}
      <section id="kurumsal" className="py-24 px-6 md:px-12 bg-luxury-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm tracking-widest text-gold-600 font-mono uppercase mb-4">Hakkımızda</h2>
            <h3 className="text-4xl md:text-5xl font-display text-luxury-text tracking-tight mb-8">
              Sıradan bir düğün <br/>
              <span className="italic text-gold-500">hizmetinden fazlası...</span>
            </h3>
            <p className="text-luxury-text/80 leading-relaxed mb-6">
              İstanbul'da boğaza sıfır noktada hayalinizdeki mükemmelliği sunuyoruz. Kına gecesi, kır düğünü, nikah-nişan töreni, islami düğün, sünnet düğünü, kurumsal davet, iş toplantıları, mezuniyet töreni ve doğum günü partisi gibi farklı konseptlerde sunduğumuz hizmetlerle kaliteyi en üst düzeye taşıyoruz.
            </p>
            <p className="text-luxury-text/80 leading-relaxed mb-10">
              Boğaz Bahçe olarak sektördeki tüm deneyim ve bilgi-birikimimizi siz misafirlerimiz için seferber ediyor, müşteri memnuniyeti ilkesini esas alarak boğazın olağanüstü atmosferini sizlerle paylaşıyoruz.
            </p>
            
            <div className="flex gap-4">
               <button className="bg-gold-500 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/30">
                 Bizimle İletişime Geçin
               </button>
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop" 
                  alt="Düğün Etkinliği" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
             </div>
             
             {/* Contact Float */}
             <div className="absolute -bottom-10 -left-10 bg-forest-900 text-white p-8 rounded-3xl shadow-2xl max-w-sm">
                <h4 className="font-display text-2xl mb-4">Rezervasyon</h4>
                <div className="space-y-4">
                   <a href="tel:+905326679661" className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors">
                     <Phone size={18} className="text-gold-400" /> +90 532 667 96 61
                   </a>
                   <a href="mailto:info@bogazbahce.com" className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors">
                     <Mail size={18} className="text-gold-400" /> info@bogazbahce.com
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>
      {/* Etkinlikler Section */}
      <section id="etkinlikler" className="py-24 px-6 md:px-12 bg-luxury-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm tracking-widest text-gold-600 font-mono uppercase mb-4">Etkinlikler</h2>
              <h3 className="text-4xl md:text-5xl font-display text-luxury-text tracking-tight">
                Hayalinizdeki <br/>
                <span className="italic text-gold-500">Konseptler</span>
              </h3>
            </div>
            <p className="text-luxury-text/80 max-w-md pb-2 font-light">
              Farklı konseptlerde, tamamen size özel detaylarla tasarlanmış, kusursuz organizasyonlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-[1000px] md:h-[600px]">
            {/* Büyük Kart - Kır Düğünü */}
            <div className="md:col-span-7 relative rounded-3xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" alt="Kır Düğünü" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full transition-transform duration-500 md:translate-y-4 group-hover:translate-y-0">
                <h4 className="text-3xl md:text-4xl font-display text-white mb-3">Kır Düğünü</h4>
                <p className="text-luxury-text/70 max-w-md md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">
                  Boğazın esintisi eşliğinde, yeşilin ve mavinin buluştuğu noktada rüya gibi bir başlangıç.
                </p>
              </div>
            </div>

            {/* Sağ Üst - Kurumsal Davet */}
            <div className="md:col-span-5 relative rounded-3xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop" alt="Kurumsal Davetler" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full transition-transform duration-500 md:translate-y-4 group-hover:translate-y-0">
                <h4 className="text-2xl md:text-3xl font-display text-white mb-2">Kurumsal Davetler</h4>
                <p className="text-luxury-text/70 text-sm md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">
                  İş toplantıları, lansman ve elit şirket yemekleri.
                </p>
              </div>
            </div>

            {/* Alt İki - Kına/Nişan ve Mezuniyet */}
            <div className="md:col-span-5 relative rounded-3xl overflow-hidden group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" alt="Kına ve Nişan" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-8 w-full transition-transform duration-500 md:translate-y-4 group-hover:translate-y-0">
                  <h4 className="text-2xl md:text-3xl font-display text-white mb-2">Kına & Nişan</h4>
                  <p className="text-luxury-text/70 text-sm md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">Geleneksel ve modern konseptlerin birleşimi.</p>
               </div>
            </div>
            
            <div className="md:col-span-7 relative rounded-3xl overflow-hidden group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1523580494112-071d412157d1?q=80&w=2070&auto=format&fit=crop" alt="Mezuniyet" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-8 w-full transition-transform duration-500 md:translate-y-4 group-hover:translate-y-0">
                  <h4 className="text-2xl md:text-3xl font-display text-white mb-2">Mezuniyet & Partiler</h4>
                  <p className="text-luxury-text/70 text-sm md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">Boğaza karşı unutulmaz kutlamalar ve doğum günleri.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
      {/* Menüler Section */}
      <section id="menuler" className="py-24 px-6 md:px-12 bg-luxury-bg">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/3 flex flex-col justify-center sticky top-32 h-fit">
            <h2 className="text-sm tracking-widest text-gold-600 font-mono uppercase mb-4">Gastronomi</h2>
            <h3 className="text-4xl md:text-5xl font-display text-luxury-text tracking-tight mb-6">
              Özel Gününüze <br/>
              <span className="italic text-gold-500">Özel Lezzetler</span>
            </h3>
            <p className="text-luxury-text/80 font-light leading-relaxed mb-8">
              Usta şeflerimiz tarafından hazırlanan, damak zevkinize uygun Türk ve Dünya mutfağından seçkin menülerle konuklarınızı ağırlayın.
            </p>
            <button className="w-fit text-sm font-semibold tracking-widest uppercase border-b-2 border-forest-900 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
              Tüm Menüleri İncele
            </button>
          </div>
          
          <div className="lg:w-2/3 flex flex-col gap-6">
            {/* Menü Kartı 1 */}
            <div className="group flex flex-col md:flex-row gap-8 items-center bg-luxury-bg p-6 md:p-8 rounded-3xl border border-black/5 hover:border-gold-500/30 transition-colors">
               <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop" alt="Kırmızı Et Menü" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </div>
               <div>
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="text-2xl font-display text-luxury-text">Kırmızı Et Menüleri</h4>
                 </div>
                 <p className="text-luxury-text/60 font-light text-sm leading-relaxed mb-4">Dana rosto, hünkar beğendi, özel soslu antrikot seçenekleri ile zenginleştirilmiş, ara sıcak ve mevsim salata eşliğinde sunulan premium düğün menüsü.</p>
                 <div className="flex flex-wrap gap-2">
                   <span className="text-[10px] font-mono uppercase tracking-wider bg-luxury-bg px-3 py-1 rounded-full text-luxury-text/60 border border-black/5">Ordövr Tabağı</span>
                   <span className="text-[10px] font-mono uppercase tracking-wider bg-luxury-bg px-3 py-1 rounded-full text-luxury-text/60 border border-black/5">Ara Sıcak</span>
                   <span className="text-[10px] font-mono uppercase tracking-wider bg-luxury-bg px-3 py-1 rounded-full text-luxury-text/60 border border-black/5">Düğün Pastası</span>
                 </div>
               </div>
            </div>

            {/* Menü Kartı 2 */}
            <div className="group flex flex-col md:flex-row gap-8 items-center bg-luxury-bg p-6 md:p-8 rounded-3xl border border-black/5 hover:border-gold-500/30 transition-colors">
               <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2070&auto=format&fit=crop" alt="Beyaz Et Menü" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </div>
               <div>
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="text-2xl font-display text-luxury-text">Beyaz Et Menüleri</h4>
                 </div>
                 <p className="text-luxury-text/60 font-light text-sm leading-relaxed mb-4">Piliç topkapı, ızgara tavuk fileto veya bademli piliç seçenekleriyle hazırlanan, hafif ama bir o kadar da lezzetli ana yemek alternatifleri.</p>
                 <div className="flex flex-wrap gap-2">
                   <span className="text-[10px] font-mono uppercase tracking-wider bg-luxury-bg px-3 py-1 rounded-full text-luxury-text/60 border border-black/5">Ordövr Tabağı</span>
                   <span className="text-[10px] font-mono uppercase tracking-wider bg-luxury-bg px-3 py-1 rounded-full text-luxury-text/60 border border-black/5">Ara Sıcak</span>
                   <span className="text-[10px] font-mono uppercase tracking-wider bg-luxury-bg px-3 py-1 rounded-full text-luxury-text/60 border border-black/5">Düğün Pastası</span>
                 </div>
               </div>
            </div>

            {/* Menü Kartı 3 */}
            <div className="group flex flex-col md:flex-row gap-8 items-center bg-luxury-bg p-6 md:p-8 rounded-3xl border border-black/5 hover:border-gold-500/30 transition-colors">
               <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" alt="Kokteyl Menü" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </div>
               <div>
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="text-2xl font-display text-luxury-text">Kokteyl Menüleri</h4>
                 </div>
                 <p className="text-luxury-text/60 font-light text-sm leading-relaxed mb-4">Kurumsal davetler, lansmanlar veya nikah törenleri için ideal; tatlı, tuzlu kanepeler ve özel spesiyallerle zenginleştirilmiş bistro menüsü.</p>
                 <div className="flex flex-wrap gap-2">
                   <span className="text-[10px] font-mono uppercase tracking-wider bg-luxury-bg px-3 py-1 rounded-full text-luxury-text/60 border border-black/5">Sıcak / Soğuk Kanepeler</span>
                   <span className="text-[10px] font-mono uppercase tracking-wider bg-luxury-bg px-3 py-1 rounded-full text-luxury-text/60 border border-black/5">Limitsiz İçecek</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Section */}
      <section id="galeri" className="py-24 px-2 md:px-6 bg-forest-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
           <div>
              <h2 className="text-sm tracking-widest text-gold-400 font-mono uppercase mb-4">Galeri</h2>
              <h3 className="text-4xl md:text-5xl font-display text-white tracking-tight">
                Boğaz Bahçe'den <br/>
                <span className="italic text-gold-400">Kareler</span>
              </h3>
           </div>
           <div className="flex gap-4">
              <button className="text-xs font-semibold tracking-widest uppercase text-white hover:text-gold-400 transition-colors border border-white/20 px-6 py-3 rounded-full hover:border-gold-400">
                 Tüm Galeri
              </button>
           </div>
        </div>

        <GalleryAccordion />
      </section>

      
      {/* İletişim / Rezervasyon Section */}
      <section id="iletisim" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Sol - İçerik & Bilgi */}
          <div className="flex flex-col">
            <h2 className="text-sm tracking-widest text-gold-600 font-mono uppercase mb-4">Rezervasyon</h2>
            <h3 className="text-4xl md:text-5xl font-display text-luxury-text tracking-tight mb-8">
              Hayalinizdeki Günü <br/>
              <span className="italic text-gold-500">Birlikte Planlayalım</span>
            </h3>
            <p className="text-luxury-text/70 font-light leading-relaxed mb-10 max-w-md">
              Lüks, konfor ve kusursuz detaylarla dolu bir etkinlik için formu doldurun. Etkinlik danışmanlarımız en kısa sürede sizinle iletişime geçecektir.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-bg flex items-center justify-center text-gold-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-luxury-text/60 font-mono uppercase tracking-widest mb-1">Bizi Arayın</p>
                  <a href="tel:+905326679661" className="text-lg font-medium text-luxury-text hover:text-gold-600 transition-colors">+90 532 667 96 61</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-bg flex items-center justify-center text-gold-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-luxury-text/60 font-mono uppercase tracking-widest mb-1">E-Posta Gönderin</p>
                  <a href="mailto:info@bogazbahce.com" className="text-lg font-medium text-luxury-text hover:text-gold-600 transition-colors">info@bogazbahce.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ - Form */}
          <div className="bg-luxury-bg p-8 md:p-12 rounded-[2rem] shadow-sm border border-black/5">
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Adınız Soyadınız</label>
                  <input type="text" className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text" placeholder="Örn: Ayşe Yılmaz" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Telefon Numaranız</label>
                  <input type="tel" className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text" placeholder="05XX XXX XX XX" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Etkinlik Türü</label>
                  <select className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text cursor-pointer">
                    <option>Kır Düğünü</option>
                    <option>Kına / Nişan</option>
                    <option>Kurumsal Davet</option>
                    <option>Mezuniyet / Parti</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Tahmini Kişi Sayısı</label>
                  <input type="number" className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text" placeholder="Örn: 250" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Ekstra Talepleriniz</label>
                <textarea rows={3} className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text resize-none" placeholder="Varsa özel isteklerinizi buraya yazabilirsiniz..."></textarea>
              </div>

              <button type="button" className="mt-4 bg-luxury-text text-luxury-bg px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-black/80 transition-all flex items-center justify-center gap-2">
                Teklif İste <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-forest-900 text-white pt-24 pb-8 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
           <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-display tracking-wider font-bold text-white mb-6">Boğaz Bahçe</div>
              <p className="text-luxury-text/50 font-light text-sm max-w-sm leading-relaxed mb-8">
                İstanbul Sarıyer'de boğaza sıfır konumuyla hayatınızın en özel anlarına ev sahipliği yapıyoruz. Lüks, konfor ve doğanın iç içe geçtiği bir deneyim.
              </p>
              <div className="flex items-center gap-4 text-luxury-text/50">
                 {/* Placeholder for social icons */}
                 <a href="#" className="hover:text-gold-400 transition-colors">Instagram</a>
                 <a href="#" className="hover:text-gold-400 transition-colors">Facebook</a>
                 <a href="#" className="hover:text-gold-400 transition-colors">Youtube</a>
              </div>
           </div>

           <div>
              <h4 className="text-gold-400 text-xs font-mono uppercase tracking-widest mb-6">Hızlı Menü</h4>
              <ul className="space-y-4 text-sm text-luxury-text/50 font-light">
                 <li><a href="#kurumsal" className="hover:text-white transition-colors">Kurumsal</a></li>
                 <li><a href="#etkinlikler" className="hover:text-white transition-colors">Etkinlikler</a></li>
                 <li><a href="#menuler" className="hover:text-white transition-colors">Menüler</a></li>
                 <li><a href="#galeri" className="hover:text-white transition-colors">Galeri</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Sanal Tur 360°</a></li>
              </ul>
           </div>

           <div>
              <h4 className="text-gold-400 text-xs font-mono uppercase tracking-widest mb-6">İletişim</h4>
              <ul className="space-y-4 text-sm text-luxury-text/50 font-light">
                 <li className="flex items-start gap-3">
                    <MapPin size={16} className="mt-1 flex-shrink-0 text-gold-400" />
                    <span>Büyükdere Mah. Çayırbaşı Cad. No:46 Sarıyer / İstanbul</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <Phone size={16} className="text-gold-400" />
                    <a href="tel:+905326679661" className="hover:text-white transition-colors">+90 532 667 96 61</a>
                 </li>
                 <li className="flex items-center gap-3">
                    <Mail size={16} className="text-gold-400" />
                    <a href="mailto:info@bogazbahce.com" className="hover:text-white transition-colors">info@bogazbahce.com</a>
                 </li>
              </ul>
           </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-luxury-text/80 font-light">
           <p>Copyright © {new Date().getFullYear()} Boğaz Bahçe. Tüm Hakları Saklıdır.</p>
           <p>Tasarım & Geliştirme: Yüksek Kalite Ajans Standartları</p>
        </div>
      </footer>
    </main>
  );
}
