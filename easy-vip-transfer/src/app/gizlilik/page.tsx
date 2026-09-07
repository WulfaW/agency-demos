import React from 'react';
import Navbar from '@/components/Navbar';
import FaqAndFooter from '@/components/FaqAndFooter';

export default function Gizlilik() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-100 relative">
      <Navbar />
      <div className="pt-40 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[#E5D3B3] mb-8">Gizlilik Politikası</h1>
        <div className="prose prose-invert prose-zinc max-w-none font-sans font-light text-sm text-zinc-300 space-y-6">
          <p>
            Easy VIP Transfer olarak kullanıcılarımızın gizliliğine ve güvenliğine büyük önem veriyoruz.
            Bu gizlilik politikası, sitemizi ziyaret ettiğinizde ve hizmetlerimizden faydalandığınızda 
            toplanan verilerin nasıl kullanıldığını açıklamaktadır.
          </p>
          <h3 className="text-white text-lg mt-8 mb-4">Veri Toplama ve Kullanım</h3>
          <p>
            Rezervasyon esnasında verdiğiniz bilgiler (ad, telefon, uçuş numarası vb.) tamamen transfer operasyonunun 
            kusursuz gerçekleştirilmesi için kullanılır. Bu bilgiler şoförlerimiz ve operasyon ekibimiz dışında 
            üçüncü şahıslarla asla paylaşılmaz.
          </p>
        </div>
      </div>
      <FaqAndFooter />
    </main>
  );
}
