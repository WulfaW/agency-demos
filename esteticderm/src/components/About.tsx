"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "Alma Laser Soprano ICE Platinum Teknolojisi",
  "Genosys & PH FORMULA Profesyonel Ürünleri",
  "2014'ten Bugüne Uzman Kadro",
  "Modern, Hijyenik ve Konforlu Ortam"
];

export default function About() {
  return (
    <section id="hakkimizda" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop" 
                alt="Esteticderm Clinic" 
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="absolute -bottom-10 -right-10 w-2/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop" 
                alt="Clinic Detail" 
                className="w-full h-auto object-cover aspect-square"
              />
            </motion.div>
            
            {/* Background Blob */}
            <div className="absolute -top-10 -left-10 w-full h-full bg-gold-400/10 rounded-full blur-3xl z-0" />
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Hakkımızda</span>
              <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight mb-6">
                İstanbul'un <span className="italic">Yüksek Standartlı</span> Güzellik Kliniği
              </h2>
              
              <div className="space-y-6 text-charcoal/70 font-light leading-relaxed text-lg mb-8">
                <p>
                  2014 yılında kurulan Esteticderm Kliniği, hayalinizdeki güzelliğe ulaşmanıza yardımcı olmak için en son teknolojileri uzman ellerle birleştiren seçkin bir merkezdir.
                </p>
                <p>
                  Her danışanımız için benzersiz bir deneyim sunarak, modern, hijyenik ve konforlu bir ortamda en yenilikçi uygulamaları gerçekleştiriyoruz. Lazer epilasyondan profesyonel cilt bakımına, bölgesel incelmeden dövme silmeye kadar geniş bir yelpazede çözümler üretiyoruz.
                </p>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {features.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 bg-gold-400/20 p-1 rounded-full">
                      <Check className="w-4 h-4 text-gold-600" />
                    </div>
                    <span className="text-charcoal/80 font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="px-8 py-4 bg-charcoal text-cream rounded-full hover:bg-gold-600 transition-all duration-300 shadow-xl hover:shadow-gold-500/20"
              >
                Daha Fazla Bilgi
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
