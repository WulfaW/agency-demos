import { Phone, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M23 12s0-3.1-.4-4.6a2.4 2.4 0 0 0-1.7-1.7C19.4 5.3 12 5.3 12 5.3s-7.4 0-8.9.4A2.4 2.4 0 0 0 1.4 7.4C1 8.9 1 12 1 12s0 3.1.4 4.6a2.4 2.4 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.4 2.4 0 0 0 1.7-1.7C23 15.1 23 12 23 12zm-13 3V9l5.2 3z"/></svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 py-16 border-t border-gold-600/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex flex-col mb-6">
              <span className="font-serif text-2xl tracking-wide text-cream font-medium">ESTETICDERM</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500">Istanbul Aesthetic</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              2014 yılından bu yana en son teknoloji ve uzman ellerle güzelliğinizi sanata dönüştürüyoruz.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/esteticdermnisantasi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold-600 hover:border-gold-600 hover:text-charcoal transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@esteticdermnisantas3300" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold-600 hover:border-gold-600 hover:text-charcoal transition-all">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif text-lg text-cream mb-6">Kurumsal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#hakkimizda" className="hover:text-gold-400 transition-colors">Hakkımızda</Link></li>
              <li><Link href="#hizmetler" className="hover:text-gold-400 transition-colors">Hizmetlerimiz</Link></li>
              <li><Link href="#blog" className="hover:text-gold-400 transition-colors">Blog & Duyurular</Link></li>
              <li><Link href="#" className="hover:text-gold-400 transition-colors">Gizlilik Politikası</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif text-lg text-cream mb-6">Hizmetler</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="hover:text-gold-400 cursor-pointer transition-colors">Lazer Epilasyon</span></li>
              <li><span className="hover:text-gold-400 cursor-pointer transition-colors">Hydrafacial & Cilt Bakımı</span></li>
              <li><span className="hover:text-gold-400 cursor-pointer transition-colors">Dermapen Uygulaması</span></li>
              <li><span className="hover:text-gold-400 cursor-pointer transition-colors">Bölgesel Zayıflama (G5)</span></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-serif text-lg text-cream mb-6">İletişim</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-500 mt-1 shrink-0" />
                <a href="tel:+905384824585" className="hover:text-gold-400 transition-colors">+90 538 482 45 85</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-1 shrink-0" />
                <span>İstanbul, Türkiye (Lütfen tam adres için randevu alınız)</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-cream/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Esteticderm Clinic. Tüm Hakları Saklıdır.</p>
          <p className="mt-2 md:mt-0">Tasarım & Altyapı: Lüks Medikal Arayüz</p>
        </div>
      </div>
    </footer>
  );
}
