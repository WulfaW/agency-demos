import os

art_collage = """import * as React from 'react';
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
"""
with open('src/components/ui/hero-04-utils/art-collage.tsx', 'w', encoding='utf8') as f:
    f.write(art_collage)

cta_code = """import * as React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface CtaProps {
  ctaEnabled: boolean;
  text: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'link';
  icon?: boolean;
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta.ctaEnabled) return null;

  const baseStyles = 'inline-flex items-center justify-center gap-2 px-8 py-3 text-[15px] font-medium transition-all rounded-full';
  
  const variants = {
    primary: 'bg-luxury-text text-luxury-bg hover:opacity-90 shadow-lg',
    secondary: 'bg-transparent border border-luxury-text text-luxury-text hover:bg-black/5',
    link: 'bg-transparent text-luxury-text hover:text-luxury-text/70 px-4 py-3',
  };

  const Component = cta.href ? 'a' : 'button';

  return (
    <Component
      href={cta.href}
      className={cn(baseStyles, variants[cta.variant || 'primary'])}
    >
      {cta.text}
      {cta.icon && <ArrowRight size={16} />}
    </Component>
  );
}
"""
with open('src/components/ui/hero-04-utils/cta.tsx', 'w', encoding='utf8') as f:
    f.write(cta_code)

with open('src/components/hero-04.tsx', 'r', encoding='utf8') as f:
    hero_code = f.read()

hero_code = hero_code.replace(
    "title: 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display text-forest-900',",
    "title: 'text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-display text-luxury-text font-medium',"
)
hero_code = hero_code.replace(
    "description: 'max-w-md text-sm sm:text-base text-luxury-text/80',",
    "description: 'max-w-md text-base sm:text-lg text-luxury-text/80 mt-4',"
)

with open('src/components/hero-04.tsx', 'w', encoding='utf8') as f:
    f.write(hero_code)
