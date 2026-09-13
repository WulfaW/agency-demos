import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090A] pt-16 pb-12 text-neutral-400 text-sm">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#C5A880] flex items-center justify-center text-black font-bold text-xs">
              W
            </div>
            <span className="font-bold tracking-tight text-white">WULFA DIGITAL STUDIO</span>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
            Sıradan şablonlar değil; VIP ve yüksek bütçeli işletmeler için özel olarak kodlanan, yüksek dönüşümlü dijital amiral gemileri inşa ediyoruz.
          </p>
          <div className="text-xs font-mono text-neutral-500">
            İstanbul • Bodrum • Londra
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-200 mb-4">Navigasyon</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Giriş</Link></li>
            <li><Link href="/projeler" className="hover:text-white transition-colors">Seçilmiş Projeler</Link></li>
            <li><Link href="/hizmetler" className="hover:text-white transition-colors">Çözümlerimiz</Link></li>
            <li><Link href="/manifesto" className="hover:text-white transition-colors">Anti-Slop Manifestosu</Link></li>
            <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim & Randevu</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-200 mb-4">Doğrudan İletişim</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="https://wa.me/905305673991?text=Merhaba" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                <span>VIP WhatsApp Hattı</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </li>
            <li><span className="text-neutral-500">contact@wulfa.digital</span></li>
            <li className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Yeni Projeler İçin Müsait
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
        <div>© {new Date().getFullYear()} Wulfa Digital Studio. Tüm hakları saklıdır.</div>
        <div>Next.js • Tailwind • Supabase • Zero Template</div>
      </div>
    </footer>
  );
}