'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  MapPin, 
  PhoneCall, 
  ChevronDown, 
  Clock, 
  ShieldCheck, 
  Mail, 
  Send, 
  Instagram, 
  Facebook, 
  Linkedin 
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';
import { SocialTooltip } from '@/components/SocialTooltip';

// 1. Authentic Official WhatsApp Vector
export const OfficialWhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.235-.244-.587-.493-.507-.677-.517-.175-.01-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.078 2.909 1.229 3.109c.15.2 2.122 3.24 5.14 4.544.718.31 1.278.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.429.251-.702.251-1.304.176-1.43-.075-.125-.276-.201-.577-.351z"/>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.39c1.45.79 3.09 1.21 4.69 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24z"/>
  </svg>
);

// 2. Monochrome Clean Google Maps Vector Pin
export const MonochromeMapsIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

// 3. Instagram Vector
const InstagramIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// 4. Facebook Vector
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// 5. YouTube Vector
const YoutubeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const faqs = [
  {
    q: 'Milas-Bodrum Havalimanı’nda karşılama nasıl yapılıyor?',
    a: 'Uçağınız iniş yaptığı anda canlı radardan takip edilir. İç hatlar veya dış hatlar gelen yolcu kapısında şoförümüz isminizin yazılı olduğu özel tablet/levha ile sizi karşılar, bagajlarınıza yardımcı olarak doğrudan VIP aracınıza eşlik eder.',
  },
  {
    q: 'Uçağım rötar yaparsa ek ücret öder miyim?',
    a: 'Kesinlikle hayır. Uçuş takip sistemimiz sayesinde gecikmeler anlık olarak şoförünüze bildirilir. Uçağınız kaç saat rötar yaparsa yapsın hiçbir ek bekleme ücreti talep edilmez.',
  },
  {
    q: 'Ödemeyi nasıl yapabilirim? Kredi kartı geçerli mi?',
    a: 'Ödemenizi transferiniz tamamlandığında araç içinde şoförümüze nakit (TL, Euro, Dolar, GBP) veya temassız kredi kartı / banka kartı ile güvenle yapabilirsiniz. Ayrıca kurumsal fatura taleplerinizde şirket hesabımıza havale/EFT seçeneği de mevcuttur.',
  },
  {
    q: 'Araçlarınız yasal ve belgeli mi?',
    a: 'Evet. Easy VIP Transfer, T.C. Kültür ve Turizm Bakanlığı ile TÜRSAB A Grubu Seyahat Acentası işletme belgesine ve Ulaştırma Bakanlığı D2 Yetki Belgesine sahiptir. Tüm yolcularımız yolculuk süresince ferdi kaza ve koltuk sigortası kapsamındadır.',
  },
  {
    q: 'Bebek veya çocuk koltuğu temin ediyor musunuz?',
    a: 'Evet, rezervasyon esnasında belirttiğiniz takdirde araçlarımıza Avrupa standartlarına uygun Isofix çocuk ve bebek oto koltuğu tamamen ücretsiz olarak yerleştirilmektedir.',
  },
];

const socialLinks = [
  {
    name: 'WhatsApp VIP',
    icon: OfficialWhatsAppIcon,
    href: `https://wa.me/${CONTACT_INFO.phoneClean}?text=Merhaba,%20Bodrum%20VIP%20transfer%20hakkinda%20bilgi%20almak%20istiyorum.`,
    hoverClass: 'hover:bg-[#25D366] hover:text-black hover:border-[#25D366] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]',
    badge: 'Anında Yanıt'
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    href: 'https://instagram.com/easyviptransfer',
    hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-pink-500 hover:shadow-[0_0_30px_rgba(220,39,67,0.4)]',
    badge: '@easyviptransfer'
  },
  {
    name: 'YouTube',
    icon: YoutubeIcon,
    href: 'https://youtube.com/@easyviptransfer',
    hoverClass: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]',
    badge: 'Filo Videoları'
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
    href: 'https://facebook.com/easyviptransfer',
    hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-[0_0_30px_rgba(24,119,242,0.4)]',
    badge: 'Resmi Sayfa'
  },
  {
    name: 'Google Haritalar',
    icon: MonochromeMapsIcon,
    href: 'https://maps.google.com/?q=Easy+VIP+Transfer+Bodrum',
    hoverClass: 'hover:bg-[#4285F4] hover:text-white hover:border-[#4285F4] hover:shadow-[0_0_30px_rgba(66,133,244,0.4)]',
    badge: '4.9 ★ (120+ Yorum)'
  },
  {
    name: '7/24 Çağrı',
    icon: PhoneCall,
    href: `tel:${CONTACT_INFO.phoneClean}`,
    hoverClass: 'hover:bg-[#E5D3B3] hover:text-black hover:border-[#E5D3B3] hover:shadow-[0_0_25px_rgba(229,211,179,0.4)]',
    badge: 'Doğrudan Ara'
  },
];

import { motion } from 'framer-motion';

export default function FaqAndFooter() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <footer id="faq" className="w-full relative z-10 border-t border-white/5 bg-[#030303]">
      
      {/* 1. FAQ Section */}
      <div className="py-28 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#E5D3B3] uppercase block mb-3">
            Merak Edilenler
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-zinc-400 font-sans tracking-widest uppercase text-xs leading-relaxed">
            Bodrum VIP transfer hizmetimizle ilgili tüm yasal ve operasyonel detaylar.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="backdrop-blur-xl bg-[#0a0a0a]/80 border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base md:text-lg text-white">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#E5D3B3] text-black' : 'bg-white/5 text-zinc-400'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm font-sans text-zinc-400 font-light leading-relaxed border-t border-white/5 mt-2 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Brand-Colored Social Channels Strip with Clean Monochrome Map Pin */}
      <div className="border-t border-white/10 py-12 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            Bizi Sosyal Medyada Takip Edin & Canlı İletişime Geçin
          </span>
        </div>

        <div className="flex justify-center">
          <SocialTooltip
            items={[
              {
                href: `https://wa.me/${CONTACT_INFO.phoneClean}`,
                ariaLabel: 'WhatsApp VIP',
                tooltip: 'WhatsApp VIP',
                svgUrl: 'https://cdn.simpleicons.org/whatsapp/ffffff',
                color: '#25D366'
              },
              {
                href: 'https://instagram.com/easyviptransfer',
                ariaLabel: 'Instagram',
                tooltip: 'Instagram',
                svgUrl: 'https://cdn.simpleicons.org/instagram/ffffff',
                color: '#E4405F'
              },
              {
                href: 'https://youtube.com/@easyviptransfer',
                ariaLabel: 'YouTube',
                tooltip: 'YouTube',
                svgUrl: 'https://cdn.simpleicons.org/youtube/ffffff',
                color: '#FF0000'
              },
              {
                href: 'https://facebook.com/easyviptransfer',
                ariaLabel: 'Facebook',
                tooltip: 'Facebook',
                svgUrl: 'https://cdn.simpleicons.org/facebook/ffffff',
                color: '#1877F2'
              },
              {
                href: 'https://maps.google.com/?q=Easy+VIP+Transfer+Bodrum',
                ariaLabel: 'Google Haritalar',
                tooltip: 'Haritalar',
                svgUrl: 'https://cdn.simpleicons.org/googlemaps/ffffff',
                color: '#4285F4'
              },
              {
                href: `tel:${CONTACT_INFO.phoneClean}`,
                ariaLabel: '7/24 Çağrı',
                tooltip: 'Hemen Ara',
                svgUrl: 'https://cdn.simpleicons.org/phone/ffffff',
                color: '#E5D3B3'
              }
            ]}
          />
        </div>
      </div>

      {/* 3. Main Luxury Footer Bar */}
      <div className="border-t border-white/10 py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Newsletter & Brand */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <div className="text-lg font-sans font-bold tracking-[0.15em] text-white mb-2">
                EASY VIP <span className="text-[#E5D3B3] font-medium">BODRUM</span>
              </div>
              <p className="text-xs font-sans text-zinc-400 font-light leading-relaxed">
                Bodrum Yarımadası ve Ege koylarında 7/24 kesintisiz VIP transfer.
              </p>
            </div>
            
            <div className="relative">
              <h4 className="text-[11px] font-sans font-bold tracking-widest text-zinc-100 uppercase mb-3">E-Bülten Kayıt</h4>
              <form className="relative flex items-center">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full bg-[#050505] border border-white/10 rounded-full py-2.5 pl-4 pr-10 text-xs text-white focus:outline-none focus:border-[#E5D3B3]/50 transition-colors"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 bottom-1 aspect-square rounded-full bg-[#E5D3B3] text-black flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5 -ml-0.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Hızlı Linkler */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-sans font-bold tracking-widest text-zinc-100 uppercase">Hızlı Linkler</h4>
            <nav className="space-y-2.5 text-[13px] font-sans font-medium text-zinc-400">
              <a href="#fleet" className="block hover:text-[#E5D3B3] transition-colors">Araç Filomuz</a>
              <a href="#services" className="block hover:text-[#E5D3B3] transition-colors">Ayrıcalıklar</a>
              <a href="#destinations" className="block hover:text-[#E5D3B3] transition-colors">Popüler Rotalar</a>
              <a href="#calculator" className="block hover:text-[#E5D3B3] transition-colors">Fiyat Hesapla</a>
              <a href="/admin" className="block hover:text-white transition-colors">Yönetici Paneli</a>
            </nav>
          </div>

          {/* Col 3: İletişim */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-sans font-bold tracking-widest text-zinc-100 uppercase">İletişim</h4>
            <address className="space-y-2.5 text-[13px] font-sans font-medium text-zinc-400 not-italic">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>Yalıkavak Marina, Bodrum</span>
              </div>
              <a href={`tel:${CONTACT_INFO.phoneClean}`} className="flex items-center gap-2 hover:text-[#E5D3B3] transition-colors">
                <PhoneCall className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <a href={`https://wa.me/${CONTACT_INFO.phoneClean}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
                <OfficialWhatsAppIcon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>WhatsApp VIP Operasyon</span>
              </a>
            </address>
          </div>

          {/* Col 4: Sosyal Medya & Belgeler */}
          <div className="space-y-6">
            <div>
              <h4 className="text-[11px] font-sans font-bold tracking-widest text-zinc-100 uppercase mb-4">Takip Edin</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] font-sans font-bold tracking-widest text-zinc-100 uppercase">Resmi Belgeler</h4>
              <div className="flex flex-col gap-2">
                <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#050505] text-[10px] font-sans font-semibold text-zinc-300">
                  <span className="text-[#E5D3B3]">TÜRSAB</span>
                  <span className="text-zinc-600">|</span> 
                  <span>No: 11428</span>
                </div>
                <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#050505] text-[10px] font-sans font-semibold text-zinc-300">
                  <span>D2 Taşıma Belgeli</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>
            © 2026 Easy VIP Transfer. Tüm hakları saklıdır.
          </p>
          <nav className="flex gap-4">
            <a href="/gizlilik" className="hover:text-zinc-300 transition-colors">Gizlilik Politikası</a>
            <a href="/kvkk" className="hover:text-zinc-300 transition-colors">KVKK Metni</a>
            <a href="/sartlar" className="hover:text-zinc-300 transition-colors">Şartlar & Koşullar</a>
          </nav>
        </div>
      </div>

    </footer>
  );
}
