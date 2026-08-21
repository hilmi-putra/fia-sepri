'use client';

import { useState, useEffect } from 'react';
import type { Gallery } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

const IMAGES = [
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-079.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-060.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-047.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-047.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-054.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-072.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-066.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/1.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-029.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-090.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-095.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-118.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-010.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-004.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-025.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-112.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-116.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-044.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-102.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-113.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-111.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-104.jpg',
  'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-100.jpg'
];

interface GallerySectionProps {
  galleries: Gallery[]; // Kept for backwards compatibility if needed, but not used.
}

export function GallerySection({ galleries }: GallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  return (
    <section id="gallery" className="w-full text-center text-[#4a463d] overflow-hidden">
      
      {/* HEADERS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 px-6"
      >
        <h3 className={`${dancingScript.className} text-3xl md:text-4xl opacity-90`}>
          Our Moments
        </h3>
        <h2 className="font-serif text-4xl md:text-5xl tracking-widest mt-2 mb-6">
          GALLERY
        </h2>
        <p className="font-sans text-xs md:text-sm font-light opacity-80 max-w-xs mx-auto leading-relaxed">
          Every moment captured is a testament to our journey, carefully curated and flawlessly executed.
        </p>
      </motion.div>

      {/* CAROUSEL SLIDER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-4xl mx-auto aspect-[3/4] sm:aspect-square md:aspect-[4/3] bg-[#e8e2d4] shadow-xl overflow-hidden group"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={IMAGES[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-cover object-center"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION CONTROLS */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/50 transition-colors shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/50 transition-colors shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* PROGRESS INDICATOR */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md text-white text-[10px] tracking-widest px-3 py-1 rounded-full font-sans uppercase">
          {currentIndex + 1} / {IMAGES.length}
        </div>
      </motion.div>

    </section>
  );
}
