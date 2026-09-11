import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PriceCalculator from '@/components/PriceCalculator';
import AboutVIP from '@/components/AboutVIP';
import BentoStats from '@/components/BentoStats';
import Fleet from '@/components/Fleet';
import LuxuryDestinations from '@/components/LuxuryDestinations';
import StickyScrollExperience from '@/components/StickyScrollExperience';
import SpotlightServices from '@/components/SpotlightServices';
import TestimonialsMarquee from '@/components/TestimonialsMarquee';
import ParallaxGallery from '@/components/ui/3d-parallax-unfurling-gallery';
import FaqAndFooter from '@/components/FaqAndFooter';
import StickyMobileBar from '@/components/StickyMobileBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 relative selection:bg-[#E5D3B3] selection:text-black pb-16 md:pb-0">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Soft Luxury Hero Section */}
      <Hero />

      {/* 3. Floating Luxury Booking Console */}
      <PriceCalculator />

      {/* 3.5 About VIP Section (Corporate Vision & Standards) */}
      <AboutVIP />

      {/* 4. Luxury Bento Stats Grid (10+ Yıl, 15k+ Transfer, 4.9★, %100 Zamanında) */}
      <BentoStats />

      {/* 5. 3D Glare Fleet Showcase (Maybach, Vito, Sprinter) */}
      <Fleet />

      {/* 7. Bodrum Ultra-Lüks Destinasyon Vitrini (Mandarin, Yalıkavak, Amanruya, Maçakızı) */}
      <LuxuryDestinations />

      {/* 8. Adım Adım First Class Yolculuk Akışı */}
      <StickyScrollExperience />

      {/* 7. Sekmeli & Fare Takip Eden Spotlight Hizmet Kartları */}
      <SpotlightServices />

      {/* 9. Sonsuz Kayan Yorumlar (Infinite Marquee) */}
      <TestimonialsMarquee />

      {/* 9.5. 3D Lüks Galeri */}
      <ParallaxGallery />

      {/* 10. Lüks Akordiyon SSS & Footer */}
      <FaqAndFooter />

      {/* 11. Mobil Sabit Hızlı Rezervasyon Çubuğu */}
      <StickyMobileBar />
    </main>
  );
}
