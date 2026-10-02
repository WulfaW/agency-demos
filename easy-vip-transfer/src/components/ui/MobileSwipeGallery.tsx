import React from 'react';

const UNSPLASH_IMAGES = [
  "https://static.wixstatic.com/media/7e59bc_a3efef799d9a468dbd76721ac9a8754b~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_a3efef799d9a468dbd76721ac9a8754b~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_ab315091a296415d95c7a5c6b47d6f48~mv2.jpeg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_ab315091a296415d95c7a5c6b47d6f48~mv2.jpeg",
  "https://static.wixstatic.com/media/7e59bc_ce3f66a3333548a1bd3a672365ab4e1e~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_ce3f66a3333548a1bd3a672365ab4e1e~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_9bcabf7adda749dab1e8efb432cba508~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_9bcabf7adda749dab1e8efb432cba508~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_387de9bcef444e70996ff39a12e4ffb1~mv2.jpeg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_387de9bcef444e70996ff39a12e4ffb1~mv2.jpeg",
  "https://static.wixstatic.com/media/7e59bc_38e02b86daf14ffc9fe7827c44c1a431~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_38e02b86daf14ffc9fe7827c44c1a431~mv2.jpg",
];

export default function MobileSwipeGallery() {
  return (
    <div className="md:hidden py-16 w-full overflow-hidden relative border-t border-white/5">
      <div className="text-center mb-8 px-4">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#E5D3B3] uppercase block mb-2">
          VIP Deneyimi
        </span>
        <h2 className="text-3xl font-serif text-white">Lüks Galeri</h2>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 subtle-scrollbar">
        {UNSPLASH_IMAGES.map((src, idx) => (
          <div key={idx} className="shrink-0 w-[85vw] max-w-[320px] h-[240px] snap-center rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
            <img src={src} alt="Gallery image" className="w-full h-full object-cover opacity-80" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
