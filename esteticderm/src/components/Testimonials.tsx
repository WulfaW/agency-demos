"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Ayşe Y.",
    service: "Lazer Epilasyon",
    text: "Yıllardır lazer epilasyon için güvenebileceğim bir yer arıyordum. Esteticderm'de Soprano ICE Platinum ile acısız ve harika sonuçlar aldım. Çalışanlar çok güler yüzlü.",
    rating: 5,
  },
  {
    name: "Selin K.",
    service: "Hydrafacial",
    text: "Hydrafacial bakımı sonrasında cildimdeki parlaklığa inanamadım! Tertemiz, ferah ve çok hijyenik bir klinik. Kesinlikle tavsiye ediyorum.",
    rating: 5,
  },
  {
    name: "Zeynep T.",
    service: "G5 Selülit Masajı",
    text: "Bölgesel incelme ve G5 masajı için geldim, henüz 4. seanstayım ama gözle görülür bir fark var. İlgi ve alakaları için tüm ekibe teşekkürler.",
    rating: 5,
  },
  {
    name: "Elif B.",
    service: "Dermapen",
    text: "Dermapen işlemi için Nişantaşı'nda gitmediğim klinik kalmamıştı. Buradaki uzmanlık ve kullanılan ürünlerin kalitesi (Genosys) gerçekten fark yaratıyor.",
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-gold-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Danışan Yorumları</span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight max-w-2xl">
            Sizin Mutluluğunuz <br/><span className="italic text-charcoal/70">Bizim Başarımız</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-cream/50 backdrop-blur-sm p-8 rounded-3xl border border-charcoal/5 relative hover:border-gold-400/30 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gold-400/20" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>
              
              <p className="text-charcoal/80 text-sm leading-relaxed mb-6 min-h-[80px]">
                "{review.text}"
              </p>
              
              <div>
                <h4 className="font-medium text-charcoal">{review.name}</h4>
                <span className="text-xs text-charcoal/50">{review.service}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <a href="https://g.page/r/esteticderm" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-charcoal border-b border-charcoal/20 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
            Tüm Google Yorumlarını Oku
          </a>
        </div>
      </div>
    </section>
  );
}
