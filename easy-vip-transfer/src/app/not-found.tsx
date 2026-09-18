import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E5D3B3]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
          <Compass className="w-10 h-10 text-[#E5D3B3]" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter mb-4">404</h1>
        <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wide mb-8">
          Aradığınız Rota Bulunamadı
        </p>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-10 leading-relaxed">
          Görünüşe göre VIP aracınız bu koordinatlarda değil. Lütfen ana merkeze dönerek operasyona yeniden başlayın.
        </p>
        
        <Link 
          href="/"
          className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-[#E5D3B3] transition-all duration-300"
        >
          <span>Ana Merkeze Dön</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
