import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PriceCalculator from '@/components/PriceCalculator';
import BodrumRouteMap from '@/components/BodrumRouteMap';
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
    <main className="min-h-screen text-zinc-100 relative selection:bg-[#E5D3B3] selection:text-black pb-16 md:pb-0">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Soft Luxury Hero Section */}
      <Hero />

      {/* 3. Floating Luxury Booking Console */}
      <PriceCalculator />

      {/* 3.1 Bodrum Peninsula Route Map (Restored by User Request) */}
      <BodrumRouteMap />

      {/* --- SECTIONS HIDDEN TO REDUCE CLUTTER ON HOMEPAGE --- 
      <AboutVIP />
      <BentoStats />
      */}

      {/* 5. 3D Glare Fleet Showcase (Maybach, Vito, Sprinter) */}
      <Fleet />

      {/* 7. Bodrum Ultra-Lüks Destinasyon Vitrini (Mandarin, Yalıkavak, Amanruya, Maçakızı) */}
      <LuxuryDestinations />

      {/* 8. Adım Adım First Class Yolculuk Akışı */}
      <StickyScrollExperience />

      {/* --- SECTIONS HIDDEN TO REDUCE CLUTTER ON HOMEPAGE --- 
      <SpotlightServices />
      <TestimonialsMarquee />
      <ParallaxGallery />
      */}

      {/* 10. Lüks Akordiyon SSS & Footer */}
      <FaqAndFooter />

      {/* 11. Mobil Sabit Hızlı Rezervasyon Çubuğu */}
      <StickyMobileBar />
    </main>
  );
}
