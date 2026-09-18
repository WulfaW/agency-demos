import * as React from 'react';
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
