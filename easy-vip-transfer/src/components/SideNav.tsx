'use client';

import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Ana Sayfa' },
  { id: 'calculator', label: 'Rezervasyon' },
  { id: 'routes', label: 'Rotalar' },
  { id: 'destinations', label: 'Destinasyonlar' },
  { id: 'experience', label: 'İşleyiş' },
  { id: 'fleet', label: 'Filo' }
];

export default function SideNav() {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      let currentId = 'hero';
      let maxVisibleHeight = 0;
      const windowHeight = window.innerHeight;

      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const visibleHeight = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            currentId = id;
          }
        }
      });
      
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9000] hidden xl:flex flex-col gap-5">
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <div key={id} className="relative group flex items-center justify-end">
            <span 
              className={\bsolute right-8 text-[11px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none \\}
            >
              {label}
            </span>
            <a 
              href={\#\\}
              className="p-2 -mr-2"
              aria-label={label}
            >
              <div 
                className={\w-2 h-2 rounded-full transition-all duration-300 \\}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}
