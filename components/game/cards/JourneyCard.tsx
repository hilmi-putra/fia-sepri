'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface JourneyCardProps {
  onBack: () => void;
  galleries: any[];
}

export function JourneyCard({ onBack, galleries }: JourneyCardProps) {
  // We can use the galleries passed in, or show some placeholders if empty
  const images = galleries && galleries.length > 0 ? galleries : [
    { image_url: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/galleries/placeholder1.jpg', description: 'Prewedding photos' },
    { image_url: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/galleries/placeholder2.jpg', description: 'Momen lucu' },
    { image_url: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/galleries/placeholder3.jpg', description: 'Momen sederhana' },
  ];

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 font-pixel"
    >
      <div className="bg-[#F7F2E6] w-full max-w-3xl h-[85vh] flex flex-col border-[6px] border-[#3e2723] p-6 md:p-8 rounded-xl shadow-[10px_10px_0_#a1887f] relative">
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 bg-[#E7B1A7] text-[#3e2723] px-3 py-1 font-bold border-[3px] border-[#3e2723] shadow-[3px_3px_0_#3e2723] hover:bg-[#d69f95] z-10"
        >
          X
        </button>
        
        <h2 className="text-xl md:text-2xl text-center mb-6 text-[#3e2723] border-b-[3px] border-[#3e2723] pb-3 uppercase tracking-wider">
          OUR JOURNEY
        </h2>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="bg-white p-3 border-[3px] border-[#3e2723]/30 rounded-lg shadow-sm">
              {img.image_url.includes('placeholder') ? (
                 <div className="w-full h-48 bg-[#F7F2E6] flex items-center justify-center border-2 border-dashed border-[#3e2723]/30 rounded">
                   <span className="text-[#5d4037]/60 font-pixel text-xs">{img.description}</span>
                 </div>
              ) : (
                <div className="relative w-full h-48 rounded overflow-hidden">
                  <Image 
                    src={img.image_url} 
                    alt={img.description || `Gallery ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {img.description && (
                <p className="text-center font-sans text-xs mt-2 text-[#5d4037] italic">"{img.description}"</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
