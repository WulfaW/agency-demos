import os

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

kurumsal_idx = content.find('      {/* About Section based on original content */}')
head_content = content[:content.find('export default function Home() {')]

new_hero = """import { Hero04 } from '@/components/hero-04';

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
"""
bottom_content = content[kurumsal_idx:]

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(head_content + new_hero + bottom_content)
