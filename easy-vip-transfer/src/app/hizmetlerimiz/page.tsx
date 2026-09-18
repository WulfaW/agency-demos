'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import SpotlightServices from '@/components/SpotlightServices';
import ComparisonSection from '@/components/ComparisonSection';
import StickyScrollExperience from '@/components/StickyScrollExperience';
import FaqAndFooter from '@/components/FaqAndFooter';
import StickyMobileBar from '@/components/StickyMobileBar';

export default function ServicesPage() {
  const { lang } = useLanguage();
  const getTexts = () => {
    switch(lang) {
      case 'EN': return { sub: 'VIP PRIVILEGES', title: 'Personalized Luxury Beyond Limits' };
      case 'RU': return { sub: 'VIP-ПРИВИЛЕГИИ', title: 'Персонализированная Роскошь Без Границ' };
      case 'DE': return { sub: 'VIP-PRIVILEGIEN', title: 'Personalisierter Luxus Ohne Grenzen' };
      case 'AR': return { sub: 'امتيازات كبار الشخصيات', title: 'فخامة مخصصة تتجاوز الحدود' };
      default: return { sub: 'VIP HİZMETLERİMİZ', title: 'Sınırları Aşan Kişiselleştirilmiş Lüks' };
    }
  };
  const texts = getTexts();

  return (
    <main className="min-h-screen bg-transparent text-zinc-100 relative selection:bg-[#E5D3B3] selection:text-black pb-16 md:pb-0 pt-24">
      <Navbar />
      
      <div className="pt-10">
        <div className="text-center mb-16">
          <p className="text-sm font-sans tracking-[0.2em] text-[#E5D3B3] uppercase mb-3">{texts.sub}</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">{texts.title}</h1>
        </div>
        
        <SpotlightServices />
      </div>

      <ComparisonSection />
      
      <FaqAndFooter />
      <StickyMobileBar />
    </main>
  );
}
