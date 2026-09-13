import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PriceCalculator from '@/components/PriceCalculator';
import StickyScrollExperience from '@/components/StickyScrollExperience';
import FaqAndFooter from '@/components/FaqAndFooter';
import StickyMobileBar from '@/components/StickyMobileBar';

export default function Home() {
  return (
    <main className="min-h-screen text-zinc-100 relative selection:bg-[#E5D3B3] selection:text-black pb-16 md:pb-0">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Soft Luxury Hero Section */}
      <Hero />

      {/* 3. Floating Luxury Booking Console */}
      <PriceCalculator />

      {/* 4. Adım Adım First Class Yolculuk Akışı */}
      <StickyScrollExperience />

      {/* 5. Lüks Akordiyon SSS & Footer */}
      <FaqAndFooter />

      {/* 6. Mobil Sabit Hızlı Rezervasyon Çubuğu */}
      <StickyMobileBar />
    </main>
  );
}
