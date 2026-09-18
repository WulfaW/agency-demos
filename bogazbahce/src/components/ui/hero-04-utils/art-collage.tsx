import * as React from 'react';
import { motion } from 'framer-motion';

interface ArtCollageProps {
  primaryImage: string;
  secondaryImage: string;
  primaryAlt?: string;
  secondaryAlt?: string;
}

export function ArtCollage({
  primaryImage,
  secondaryImage,
  primaryAlt,
  secondaryAlt,
}: ArtCollageProps) {
  return (
    <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] flex items-center justify-center pl-8 md:pl-12">
      {/* Büyük Arka Görsel (Portrait) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="absolute top-[5%] right-[10%] w-[75%] h-[85%] rounded-[2rem] overflow-hidden shadow-2xl z-0"
      >
        <img
          src={secondaryImage}
          alt={secondaryAlt || ''}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Küçük Ön Görsel (Square) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute bottom-0 right-0 w-[45%] aspect-square rounded-[1.5rem] overflow-hidden shadow-2xl z-10 border-[6px] border-luxury-bg"
      >
        <img
          src={primaryImage}
          alt={primaryAlt || ''}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
