"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "lazer",
    name: "Lazer Epilasyon",
    services: [
      "Buz Lazer Epilasyon",
      "Erkekler İçin Buz Lazer Epilasyon",
      "Lazerle Tüy Sarartma",
      "İğneli Epilasyon"
    ]
  },
  {
    id: "cilt",
    name: "Cilt Bakımı",
    services: [
      "Hydrafacial",
      "Profesyonel Cilt Bakımı",
      "Derin Cilt Bakımı",
      "Hyalüronik Asit Nem Bakımı",
      "Komedon Cilt Bakımı",
      "Akne Bakımı",
      "Yüz Leke Bakımı",
      "İğnesiz Mezoterapi",
      "Ameliyatsız Cilt Gençleştirme",
      "Dermapen",
      "Kimyasal Peeling",
      "Yeşil Peeling (Green Peel)"
    ]
  },
  {
    id: "bolgesel",
    name: "Bölgesel Zayıflama",
    services: [
      "EMS Body",
      "G5 Selülit Masajı"
    ]
  },
  {
    id: "vucut",
    name: "Vücut Bakımı",
    services: [
      "Vücut Bakımı",
      "Dövme Silme",
      "Kaş Silme",
      "Profesyonel Kaş Tasarımı",
      "Sir Ağda Hizmeti"
    ]
  }
];

export default function AllServices() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Tüm Uygulamalarımız</span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">
            İhtiyacınıza Özel <span className="italic text-charcoal/70">Çözümler</span>
          </h2>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex justify-center gap-4 mb-12 border-b border-charcoal/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-lg font-medium tracking-wide transition-all px-4 py-2 relative ${
                activeCategory === cat.id ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal/70"
              }`}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-gold-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown (Simplified for small screens) */}
        <div className="md:hidden mb-12">
          <select 
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full p-4 text-lg bg-cream border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-gold-500/50 appearance-none font-serif"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Services List */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
            >
              {currentCategory?.services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-center justify-between py-4 border-b border-charcoal/5 cursor-pointer hover:border-gold-400 transition-colors"
                >
                  <span className="text-lg text-charcoal/80 group-hover:text-charcoal font-medium transition-colors">
                    {service}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gold-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
