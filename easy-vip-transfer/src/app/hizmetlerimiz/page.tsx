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
      case 'EN': return { sub: 'Privileges', title: 'Our Exclusive VIP Services' };
      case 'RU': return { sub: 'Привилегии', title: 'Эксклюзивные VIP-Услуги' };
      case 'DE': return { sub: 'Privilegien', title: 'Unsere Exklusiven VIP-Dienste' };
      case 'AR': return { sub: 'الامتيازات', title: 'خدماتنا الحصرية لكبار الشخصيات' };
      default: return { sub: '{texts.sub}', title: '{texts.title}' };
    }
  };
  const texts = getTexts();

  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 relative selection:bg-[#E5D3B3] selection:text-black pb-16 md:pb-0 pt-24">
      <Navbar />
      
      <div className="pt-10">
        <div className="text-center mb-16">
          <p className="text-sm font-sans tracking-[0.2em] text-[#E5D3B3] uppercase mb-3">VIP Hizmetlerimiz</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">Sınırları Aşan<br/>Kişiselleştirilmiş Lüks</h1>
        </div>
        
        <SpotlightServices />
      </div>

      <div className="mt-24">
        <StickyScrollExperience />
      </div>

      <ComparisonSection />
      
      <FaqAndFooter />
      <StickyMobileBar />
    </main>
  );
}
