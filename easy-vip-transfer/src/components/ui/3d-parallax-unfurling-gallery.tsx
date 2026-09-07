'use client';

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop", // Maybach interior
  "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop", // Mercedes steering wheel
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop", // Bodrum luxury
  "https://images.unsplash.com/photo-1617814065607-4340d118dc8a?q=80&w=1200&auto=format&fit=crop", // Marina
  "https://images.unsplash.com/photo-1550614000-4b95d4ed798a?q=80&w=1200&auto=format&fit=crop", // Chauffeur
  "https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?q=80&w=1200&auto=format&fit=crop", // Luxury watch / steering
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop", // Luxury Van
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop", // Luxury car exterior
  "https://cdn.21st.dev/assets/mirror/61/6154958e9df110914005256ff2319d43a2c2e0fc8bb54e9f8bce7b91fdce5df1.jpg",
  "https://cdn.21st.dev/assets/mirror/6d/6db92aff3c02cce69e2c672a6dd4e99cbf5c55d68fbf08c460527e6c7c5b64ba.jpg",
  "https://cdn.21st.dev/assets/mirror/42/42ad2d0680dba697d578434e5af5620c7ab1c7c55bc36cec3b55eec8b7a79cbf.jpg",
  "https://cdn.21st.dev/assets/mirror/cd/cd3dc09b1bbed97cfc879e2c5e62fdbc68dc4070b6105e476410d70e31d1e459.jpg",
];

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex-shrink-0 bg-[#111] transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative will-change-transform backface-hidden preserve-3d rounded-xl overflow-hidden">
      <img
        src={src}
        alt="Gallery Asset"
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};

export default function ParallaxGallery()  {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    const col1Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 0);
    const col2Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 1);
    const col3Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 2);
    const col4Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, []);

  // Use the window as the scroll container since this will be part of a larger page, not full screen wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Banner animations
  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["4px", "0px"]);

  // 3D Matrix animations
  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  // Track columns parallax animations
  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

  return (
    <div className="w-full bg-[#030303]">
      <section
        ref={containerRef}
        className="relative w-full h-[400vh] bg-[#030303] text-white font-sans selection:bg-[#E5D3B3] selection:text-black"
      >
        <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
          
          {/* Section Title overlaying the animation */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
             <span className="text-[10px] font-mono tracking-[0.25em] text-[#E5D3B3] uppercase block mb-3">
               VIP Deneyimi
             </span>
             <h2 className="text-4xl md:text-5xl font-serif text-white">Lüks Galeri</h2>
          </div>

          <motion.div
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: bannerRadius,
              borderWidth: bannerBorderWidth,
              borderColor: "rgba(255,255,255,0.05)",
            }}
            className="relative bg-black overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d"
          >
            <div
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              style={{ perspective: "1000px" }}
            >
              {/* Ambient Shadow Box Masking */}
              <div className="absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(0,0,0,1),inset_0_-100px_150px_-50px_rgba(0,0,0,1)]" />
              <div className="absolute inset-0 z-20 shadow-[inset_150px_0_150px_-50px_rgba(0,0,0,1),inset_-150px_0_150px_-50px_rgba(0,0,0,1)]" />

              {/* Parallax Image Grid Matrix */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  rotateZ,
                  z: translateZ,
                  transformStyle: "preserve-3d",
                }}
                className="flex gap-4 md:gap-6 justify-center items-center w-[120vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
              >
                <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col1.map((src, index) => (
                    <ImageCard key={`col1-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col2.map((src, index) => (
                    <ImageCard key={`col2-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol3 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col3.map((src, index) => (
                    <ImageCard key={`col3-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol4 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col4.map((src, index) => (
                    <ImageCard key={`col4-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
