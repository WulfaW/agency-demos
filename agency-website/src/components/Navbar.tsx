import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4">
      <nav className="glass-panel w-full max-w-6xl rounded-full px-6 py-3 flex items-center justify-between shadow-2xl transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C5A880] to-[#F3E5AB] flex items-center justify-center text-black font-bold text-sm tracking-tighter">
            W
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-sm text-white flex items-center gap-1.5">
              WULFA DIGITAL
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-neutral-400">STUDIO</span>
            </span>
          </div>
        </Link>

        {/* 5 Core Routes Navigation */}
        <div className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide uppercase text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            Giriş
          </Link>
          <Link href="/projeler" className="hover:text-white transition-colors">
            Projeler
          </Link>
          <Link href="/hizmetler" className="hover:text-white transition-colors">
            Hizmetler
          </Link>
          <Link href="/manifesto" className="hover:text-white transition-colors">
            Manifesto
          </Link>
          <Link href="/iletisim" className="hover:text-white transition-colors">
            İletişim
          </Link>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/iletisim"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-md group"
          >
            <span>Keşif Randevusu</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </nav>
    </header>
  );
}