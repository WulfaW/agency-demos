"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, Droplets, Smile, Zap, Heart, Star, Sun, Wind, Feather, Gem, Shield, Scissors } from "lucide-react";
import { Link } from "@/i18n/routing";

// The 4 main highlight services
const mainServices = [
  {
    title: "Cilt Bakımı",
    desc: "Hydrafacial, Dermapen, Kimyasal ve Yeşil Peeling uygulamalarıyla pürüzsüz ve ışıltılı bir cilt.",
    icon: Droplets,
    className: "col-span-12 md:col-span-8 bg-charcoal text-cream row-span-2",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
    light: false
  },
  {
    title: "Lazer Epilasyon",
    desc: "Soprano ICE Platinum buz lazer teknolojisi.",
    icon: Sparkles,
    className: "col-span-12 md:col-span-4 bg-cream text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800&auto=format&fit=crop",
    light: true
  },
  {
    title: "Bölgesel Zayıflama",
    desc: "EMS Body ve G5 Selülit Masajı.",
    icon: Activity,
    className: "col-span-12 md:col-span-4 bg-gold-400 text-charcoal",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop",
    light: true
  },
  {
    title: "Vücut Bakımı",
    desc: "Dövme silme, profesyonel kaş tasarımı ve sir ağda hizmetleri.",
    icon: Smile,
    className: "col-span-12 md:col-span-12 bg-white text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1600&auto=format&fit=crop",
    light: true
  },
];

const detailedServices = [
  {
    title: "Profesyonel Cilt Bakımı", desc: "Derinlemesine temizlik ve yenilenme ile sağlıklı, genç ve ışıltılı bir cilt.", icon: Droplets,
    className: "col-span-12 md:col-span-8 bg-charcoal text-cream",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop", light: false
  },
  {
    title: "Hydrafacial", desc: "Cildi derinlemesine temizler, nemlendirir ve yeniler.", icon: Droplets,
    className: "col-span-12 md:col-span-4 bg-white text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "Ameliyatsız Cilt Gençleştirme", desc: "Modern estetik dünyasında hızla yükselen etkili bir yöntem.", icon: Sparkles,
    className: "col-span-12 md:col-span-4 bg-cream text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "Buz Lazer Epilasyon", desc: "Güzellik ve kişisel bakımda öne çıkan profesyonel kalıcı çözüm.", icon: Zap,
    className: "col-span-12 md:col-span-4 bg-white text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "Erkekler İçin Buz Lazer", desc: "Uzun süreli, konforlu tüy azaltma çözümleri.", icon: Zap,
    className: "col-span-12 md:col-span-4 bg-charcoal text-cream",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop", light: false
  },
  {
    title: "Kimyasal Peeling", desc: "Ölü hücreleri arındırarak cilde genç ve canlı bir görünüm kazandırır.", icon: Sun,
    className: "col-span-12 md:col-span-6 bg-gold-400 text-charcoal",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop", light: true
  },
  {
    title: "Akne Bakımı", desc: "Sivilce ve izlerini azaltarak pürüzsüz ve esnek bir cilt sağlar.", icon: Shield,
    className: "col-span-12 md:col-span-6 bg-cream text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop", light: true
  },
  {
    title: "Yüz Leke Bakımı", desc: "Koyu lekeleri gidererek cilde eşit bir ton kazandırır.", icon: Sun,
    className: "col-span-12 md:col-span-4 bg-white text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1612548493132-84193b2a2de7?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "Derin Cilt Bakımı", desc: "Özel profesyonel bakım yöntemleriyle sağlıklı, genç bir görünüm.", icon: Droplets,
    className: "col-span-12 md:col-span-8 bg-charcoal text-cream",
    img: "https://images.unsplash.com/photo-1531299204812-e6d44d0a1ba5?q=80&w=1200&auto=format&fit=crop", light: false
  },
  {
    title: "İğnesiz Mezoterapi", desc: "Aktif bileşenleri iletmek için mikro akım kullanan ağrısız cilt gençleştirme.", icon: Shield,
    className: "col-span-12 md:col-span-12 bg-cream text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1600&auto=format&fit=crop", light: true
  },
  {
    title: "Yeşil Peeling (Green Peel)", desc: "Ölü hücreleri arındıran doğal ve yenileyici cilt bakımı.", icon: Feather,
    className: "col-span-12 md:col-span-8 bg-charcoal text-cream",
    img: "https://images.unsplash.com/photo-1611145367651-6303b46e4040?q=80&w=1200&auto=format&fit=crop", light: false
  },
  {
    title: "Dermapen", desc: "Mikro iğneleme yöntemiyle cilt yenilenmesini hızlandırır.", icon: Feather,
    className: "col-span-12 md:col-span-4 bg-gold-400 text-charcoal",
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "Hyalüronik Asit Nem Bakımı", desc: "Cildi derinlemesine nemlendirmek için uygulanan özel bakım.", icon: Droplets,
    className: "col-span-12 md:col-span-4 bg-white text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1615397323382-3d719ce41b65?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "Komedon Cilt Bakımı", desc: "Siyah ve beyaz noktaları ortadan kaldırıp gözenekleri temizler.", icon: Shield,
    className: "col-span-12 md:col-span-4 bg-cream text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1608248593842-8eb13042079c?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "Lazerle Tüy Sarartma", desc: "İnce, açık renkli tüyleri lazerle görünmez hale getirin.", icon: Zap,
    className: "col-span-12 md:col-span-4 bg-white text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "EMS Body", desc: "Vücudu şekillendirmeyi ve yağ yakımını hedefleyen etkili yöntem.", icon: Activity,
    className: "col-span-12 md:col-span-6 bg-charcoal text-cream",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop", light: false
  },
  {
    title: "G5 Selülit Masajı", desc: "Özel titreşimli cihazıyla selülit görünümünde azalma.", icon: Activity,
    className: "col-span-12 md:col-span-6 bg-gold-400 text-charcoal",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop", light: true
  },
  {
    title: "İğneli Epilasyon", desc: "Uzun süreli tüy azaltma için ince iğneli kalıcı çözüm.", icon: Zap,
    className: "col-span-12 md:col-span-4 bg-white text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800&auto=format&fit=crop", light: true
  },
  {
    title: "Dövme Silme", desc: "Özel yöntemler kullanılarak istenmeyen kalıcı dövmelerin silinmesi.", icon: Smile,
    className: "col-span-12 md:col-span-8 bg-charcoal text-cream",
    img: "https://images.unsplash.com/photo-1590246814883-578ae10e0517?q=80&w=1200&auto=format&fit=crop", light: false
  },
  {
    title: "Kaş Silme", desc: "İstenmeyen kaş kalıcı makyajını düzeltmek için uygulanan işlem.", icon: Scissors,
    className: "col-span-12 md:col-span-6 bg-cream text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop", light: true
  },
  {
    title: "Profesyonel Kaş Tasarımı", desc: "Yüz hatlarınıza en uygun ideal kaş şeklini belirleme.", icon: Scissors,
    className: "col-span-12 md:col-span-6 bg-white text-charcoal border border-charcoal/10",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop", light: true
  },
  {
    title: "Vücut Bakımı", desc: "Cildi sağlıklı ve canlı tutmak için tasarlanmış profesyonel bakım.", icon: Smile,
    className: "col-span-12 md:col-span-8 bg-charcoal text-cream",
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1200&auto=format&fit=crop", light: false
  },
  {
    title: "Sir Ağda Hizmeti", desc: "İstenmeyen tüylerden arınmak için başarılı ve doğal bir yöntem.", icon: Sun,
    className: "col-span-12 md:col-span-4 bg-gold-400 text-charcoal",
    img: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop", light: true
  },
];

export default function BentoServices() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="hizmetler" className="py-24 bg-cream relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Uzmanlık Alanlarımız</span>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">
              Güzelliğinizi Ortaya Çıkaran <br/><span className="italic text-charcoal/70">Ayrıcalıklı Dokunuşlar</span>
            </h2>
          </div>
          {!showAll && (
            <button 
              onClick={() => setShowAll(true)}
              className="hidden md:inline-flex items-center gap-2 border-b border-charcoal pb-1 text-charcoal font-medium hover:text-gold-600 hover:border-gold-600 transition-colors"
            >
              Tüm Uygulamalar
            </button>
          )}
        </div>

        {/* Main 4 Services */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[250px]">
          {mainServices.map((item, i) => {
            const slug = item.title.toLowerCase().replace(/ /g, '-').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ğ/g, 'g').replace(/ç/g, 'c');
            return (
            <Link href={`/hizmetler/${slug}`} key={`main-${i}`} className={`relative group overflow-hidden rounded-3xl p-8 flex flex-col justify-between ${item.className}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="absolute inset-0 z-0 flex flex-col justify-between p-8"
              >
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <div className={`absolute inset-0 z-10 opacity-60 transition-opacity duration-500 group-hover:opacity-40 ${item.light ? 'bg-cream/40' : 'bg-charcoal/60'}`} />
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>

                <div className="relative z-20 pointer-events-none">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 backdrop-blur-md ${item.light ? 'bg-charcoal/5' : 'bg-white/10'}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="relative z-20 pointer-events-none">
                  <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                  <p className={`text-sm md:text-base ${item.light ? 'text-charcoal/70' : 'text-cream/70'} max-w-sm`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          )})}
        </div>

        {/* Detailed Services Expandable */}
        <AnimatePresence>
          {showAll && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="mt-4 md:mt-6 overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[250px]">
                {detailedServices.map((item, i) => {
                  const slug = item.title.toLowerCase().replace(/ /g, '-').replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ğ/g, 'g').replace(/ç/g, 'c');
                  return (
                  <Link href={`/hizmetler/${slug}`} key={`detail-${i}`} className={`relative group overflow-hidden rounded-3xl p-8 flex flex-col justify-between ${item.className}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="absolute inset-0 z-0 flex flex-col justify-between p-8"
                    >
                      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <div className={`absolute inset-0 z-10 opacity-60 transition-opacity duration-500 group-hover:opacity-40 ${item.light ? 'bg-cream/40' : 'bg-charcoal/60'}`} />
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                        />
                      </div>

                      <div className="relative z-20 pointer-events-none">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 backdrop-blur-md ${item.light ? 'bg-charcoal/5' : 'bg-white/10'}`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                      </div>
                      
                      <div className="relative z-20 pointer-events-none">
                        <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                        <p className={`text-sm md:text-base ${item.light ? 'text-charcoal/70' : 'text-cream/70'} max-w-sm`}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                )})}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Button */}
        {!showAll && (
          <div className="mt-8 flex justify-center md:hidden">
            <button 
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-charcoal text-cream rounded-full text-sm font-medium"
            >
              Tüm Uygulamaları Gör
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
