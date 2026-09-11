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
  "https://static.wixstatic.com/media/7e59bc_a3efef799d9a468dbd76721ac9a8754b~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_a3efef799d9a468dbd76721ac9a8754b~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_ab315091a296415d95c7a5c6b47d6f48~mv2.jpeg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_ab315091a296415d95c7a5c6b47d6f48~mv2.jpeg",
  "https://static.wixstatic.com/media/7e59bc_ce3f66a3333548a1bd3a672365ab4e1e~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_ce3f66a3333548a1bd3a672365ab4e1e~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_9bcabf7adda749dab1e8efb432cba508~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_9bcabf7adda749dab1e8efb432cba508~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_387de9bcef444e70996ff39a12e4ffb1~mv2.jpeg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_387de9bcef444e70996ff39a12e4ffb1~mv2.jpeg",
  "https://static.wixstatic.com/media/7e59bc_38e02b86daf14ffc9fe7827c44c1a431~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_38e02b86daf14ffc9fe7827c44c1a431~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_f9df606622794e8486a8baa9a6524818~mv2.jpeg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_f9df606622794e8486a8baa9a6524818~mv2.jpeg",
  "https://static.wixstatic.com/media/7e59bc_6398cf38f81e465d8ab29ba9a7172773~mv2.jpeg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_6398cf38f81e465d8ab29ba9a7172773~mv2.jpeg",
  "https://static.wixstatic.com/media/7e59bc_7c787bbe114e49cfa3eafe887cb84483~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_7c787bbe114e49cfa3eafe887cb84483~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_b54d01dc3b8a4fa0906333fa3b05228b~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_b54d01dc3b8a4fa0906333fa3b05228b~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_0db920749e5e4a5e8f1c0bb430707dc9~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_0db920749e5e4a5e8f1c0bb430707dc9~mv2.jpg",
  "https://static.wixstatic.com/media/7e59bc_db01bf03ea114adeabc4cd9334d9e4de~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7e59bc_db01bf03ea114adeabc4cd9334d9e4de~mv2.jpg",
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
