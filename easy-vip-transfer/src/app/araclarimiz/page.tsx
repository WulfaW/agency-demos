'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Fleet from '@/components/Fleet';
import ParallaxGallery from '@/components/ui/3d-parallax-unfurling-gallery';
import FaqAndFooter from '@/components/FaqAndFooter';
import StickyMobileBar from '@/components/StickyMobileBar';

export default function FleetPage() {
  const { lang } = useLanguage();
  const getTexts = () => {
    switch(lang) {
      case 'EN': return { sub: 'Premium Fleet', title: 'The Exclusive Collection<br/>Shaping Your Journey' };
      case 'RU': return { sub: 'Премиум Автопарк', title: 'Эксклюзивная Коллекция<br/>Для Вашего Путешествия' };
      case 'DE': return { sub: 'Premium-Flotte', title: 'Die exklusive Kollektion<br/>für Ihre Reise' };
      case 'AR': return { sub: 'أسطول فاخر', title: 'المجموعة الحصرية<br/>التي تشكل رحلتك' };
      default: return { sub: '{texts.sub}', title: '<span dangerouslySetInnerHTML={{__html: texts.title}}></span>' };
    }
  };
  const texts = getTexts();

  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 relative selection:bg-[#E5D3B3] selection:text-black pb-16 md:pb-0 pt-24">
      <Navbar />
      
      <div className="pt-10">
        <div className="text-center mb-8">
          <p className="text-sm font-sans tracking-[0.2em] text-[#E5D3B3] uppercase mb-3">{texts.sub}</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white"><span dangerouslySetInnerHTML={{__html: texts.title}}></span></h1>
        </div>
        <Fleet />
      </div>

      <ParallaxGallery />
      <FaqAndFooter />
      <StickyMobileBar />
    </main>
  );
}
