"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gold-400/5 blur-[120px]" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-charcoal/5 blur-[120px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-white/50 backdrop-blur-md mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-gold-500" />
          <span className="text-xs uppercase tracking-widest text-charcoal/80 font-medium">Doğallığın En Profesyonel Hali</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-charcoal tracking-tight leading-[1.1] mb-6 max-w-5xl"
        >
          Güzelliğinizi <span className="text-gold-600 italic">Sanata</span> Dönüştürüyoruz.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-charcoal/70 max-w-2xl mb-12 font-light leading-relaxed"
        >
          İstanbul'un kalbinde, en son teknoloji ve uzman ellerle hayalinizdeki görünüme kavuşmanız için size özel, ayrıcalıklı bir estetik deneyimi sunuyoruz.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button className="group relative px-8 py-4 bg-charcoal text-white rounded-full overflow-hidden shadow-2xl hover:shadow-gold-500/20 transition-all duration-300">
            <div className="absolute inset-0 w-full h-full bg-gold-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            <span className="relative flex items-center gap-2 font-medium">
              Randevu Al <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="group px-8 py-4 text-charcoal font-medium flex items-center gap-2 hover:text-gold-600 transition-colors">
            Hizmetlerimizi Keşfedin 
            <span className="w-8 h-[1px] bg-charcoal group-hover:bg-gold-600 transition-colors" />
          </button>
        </motion.div>
      </div>

      {/* Floating Image Elements for Depth */}
      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        className="hidden lg:block absolute top-[20%] left-[5%] w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-2xl rotate-[-5deg]"
      >
        <div className="absolute inset-0 bg-charcoal/20 z-10 mix-blend-overlay" />
        <img 
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1500&auto=format&fit=crop" 
          alt="Aesthetic Detail" 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="hidden lg:block absolute bottom-[10%] right-[5%] w-[350px] h-[450px] rounded-2xl overflow-hidden shadow-2xl rotate-[5deg]"
      >
        <div className="absolute inset-0 bg-gold-500/10 z-10 mix-blend-overlay" />
        <img 
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1500&auto=format&fit=crop" 
          alt="Clinic Environment" 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
        />
      </motion.div>
    </section>
  );
}
