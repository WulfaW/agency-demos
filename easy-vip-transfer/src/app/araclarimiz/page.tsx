import React from 'react';
import Navbar from '@/components/Navbar';
import Fleet from '@/components/Fleet';
import ParallaxGallery from '@/components/ui/3d-parallax-unfurling-gallery';
import FaqAndFooter from '@/components/FaqAndFooter';
import StickyMobileBar from '@/components/StickyMobileBar';

export default function FleetPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 relative selection:bg-[#E5D3B3] selection:text-black pb-16 md:pb-0 pt-24">
      <Navbar />
      
      <div className="pt-10">
        <div className="text-center mb-8">
          <p className="text-sm font-sans tracking-[0.2em] text-[#E5D3B3] uppercase mb-3">Premium Araç Filomuz</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">Yolculuğunuzu Şekillendiren<br/>Özel Koleksiyon</h1>
        </div>
        <Fleet />
      </div>

      <ParallaxGallery />
      <FaqAndFooter />
      <StickyMobileBar />
    </main>
  );
}
