"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const galleryItems = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    title: "Boğazda Gün Batımı",
    description: "Gün batımının eşsiz renkleri altında, boğaza sıfır unutulmaz bir nikah töreni.",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1530103862676-de8892795f5f?q=80&w=2070&auto=format&fit=crop",
    title: "Rustik Masa Düzeni",
    description: "Doğayla iç içe, özenle hazırlanmış ahşap detaylı şık masa konseptleri.",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
    title: "Kır Düğünü Atmosferi",
    description: "Yeşillikler içinde, samimi ve büyüleyici bir kır düğünü deneyimi.",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
    title: "Kurumsal Kokteyl",
    description: "İş dünyasının seçkin isimleri için özel olarak tasarlanmış elit davet alanı.",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop",
    title: "Gelin Yolu",
    description: "Taze çiçeklerle bezenmiş, hayallerinizdeki o kusursuz yürüyüş yolu.",
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    title: "Gece Eğlencesi",
    description: "Boğazın serin esintisinde, profesyonel ses ve ışık sistemleriyle kesintisiz eğlence.",
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1523580494112-071d412157d1?q=80&w=2070&auto=format&fit=crop",
    title: "Lüks İkramlar",
    description: "Usta şeflerimizin ellerinden çıkan, göze ve damağa hitap eden özel sunumlar.",
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop",
    title: "Zarif Dokunuşlar",
    description: "Her köşesinde ayrı bir zarafet barındıran, size özel konsept tasarımlar.",
  },
];

function Gallery({
  items,
  setIndex,
  setOpen,
  index,
}: {
  items: typeof galleryItems;
  setIndex: (index: number) => void;
  setOpen: (open: boolean) => void;
  index: number;
}) {
  return (
    <div className="rounded-md w-full max-w-5xl mx-auto md:gap-2 gap-1 flex pb-12 pt-10 px-4 justify-center">
      {items.map((item, i) => {
        return (
          <motion.img
            key={item.id}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "rounded-2xl shrink-0 object-cover transition-[width] ease-in-out duration-300 cursor-pointer shadow-lg",
              index === i
                ? "w-[120px] sm:w-[180px] md:w-[250px] lg:w-[350px]"
                : "w-[20px] sm:w-[30px] md:w-[40px] lg:w-[60px]",
              "h-[250px] md:h-[350px] lg:h-[450px]"
            )}
            onMouseEnter={() => setIndex(i)}
            onMouseLeave={() => setIndex(i)}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            src={item.url}
            layoutId={`gallery-img-${item.id}`}
          />
        );
      })}
    </div>
  );
}

export function GalleryAccordion() {
  const [index, setIndex] = useState(3);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative w-full overflow-hidden">
      <Gallery
        items={galleryItems}
        index={index}
        setIndex={setIndex}
        setOpen={setOpen}
      />
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl w-full h-full flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()} className="relative max-w-4xl w-full aspect-[4/3] md:aspect-[16/9]">
              <motion.div
                layoutId={`gallery-img-${galleryItems[index].id}`}
                className="w-full h-full rounded-2xl relative cursor-default overflow-hidden shadow-2xl border border-white/10"
              >
                <Image
                  src={galleryItems[index].url}
                  fill
                  alt={galleryItems[index].title}
                  className="rounded-2xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <article className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-3xl md:text-5xl font-display mb-3 text-gold-400"
                  >
                    {galleryItems[index].title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-base md:text-lg text-white/80 max-w-2xl font-light leading-relaxed"
                  >
                    {galleryItems[index].description}
                  </motion.p>
                </article>

                <button 
                  onClick={() => setOpen(false)}
                  className="absolute top-6 right-6 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
