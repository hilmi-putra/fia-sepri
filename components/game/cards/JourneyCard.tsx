'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface JourneyCardProps {
  onBack: () => void;
  galleries?: any[];
}

const PREWEDDING_PHOTOS = [
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-079.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-060.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-047.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-054.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-072.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-066.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/1.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-029.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-090.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-095.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-118.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-010.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-004.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-025.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-112.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-116.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-044.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-102.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-113.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-111.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-104.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Prewedding-100.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/main%20cover.jpg",
  "https://ik.imagekit.io/udvvrj1o2/fia&sepri/cover.jpg"
];

export function JourneyCard({ onBack }: JourneyCardProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  
  const groundGrass = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground1.png";
  const groundDirt = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground3.png";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col items-center bg-[#73B5E5] font-pixel overflow-y-auto custom-scrollbar"
    >
      <button 
        onClick={onBack}
        className="fixed top-4 right-4 z-50 bg-[#C83B25] text-[#EFEABF] px-3 py-2 text-xs rounded border-[3px] border-[#3e2723] shadow-[3px_3px_0_#3e2723] hover:bg-[#a9311e] active:translate-y-1 active:shadow-[1px_1px_0_#3e2723]"
      >
        BACK
      </button>

      {/* Sky & Background Elements */}
      <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="absolute top-[2%] left-[-2%] w-24 md:w-32 opacity-90 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} />
      <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="absolute top-[8%] right-[2%] w-20 md:w-28 opacity-85 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} />
      
      <div className="w-full max-w-3xl pt-12 pb-12 px-4 z-20 flex flex-col items-center">
        
        {/* Title Group */}
        <div className="relative w-full flex flex-col items-center mb-16">
          <h1 className="text-white text-2xl sm:text-3xl text-center tracking-widest uppercase leading-tight font-bold drop-shadow-md z-10">
            LAND OF<br/>OUR<br/>JOURNEY
          </h1>
          
          {/* Heart & Platform (Left side) */}
          <div className="absolute -bottom-16 left-[10%] sm:left-[20%] flex flex-col items-center">
            <motion.img 
              src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/hearts.png" 
              alt="Heart" 
              className="w-6 mb-1" 
              style={{ imageRendering: 'pixelated' }} 
              animate={{ y: [-3, 3, -3] }} 
              transition={{ duration: 2, repeat: Infinity }} 
            />
            <img 
              src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/floating2.png" 
              alt="Platform" 
              className="w-16 drop-shadow" 
              style={{ imageRendering: 'pixelated' }} 
            />
          </div>
        </div>

        {/* Masonry Photo Gallery Container */}
        <div className="w-full relative mt-8">
          
          {/* Floating Characters */}
          {/* Totoro sitting on top right photo */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/totoro.png" alt="Totoro" className="absolute -top-[30px] right-[5%] w-16 sm:w-24 z-20 pointer-events-none drop-shadow-md" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity }} />
          
          {/* Unicorn overlapping columns */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/unicorn.png?updatedAt=1787988081298" alt="Unicorn" className="absolute top-[200px] left-[25%] w-20 sm:w-28 z-20 pointer-events-none drop-shadow-md" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} />
          
          {/* Kiki flying on right */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/kiki.png" alt="Kiki" className="absolute top-[500px] right-[-2%] w-32 sm:w-40 z-20 pointer-events-none drop-shadow-md" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }} />
          
          {/* Luffy 1 */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/luffygear5+.png" alt="Luffy" className="absolute top-[800px] left-[2%] w-16 sm:w-24 z-20 pointer-events-none drop-shadow-md" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity }} />
          
          {/* Naruto */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/naruto.png" alt="Naruto" className="absolute top-[1200px] left-[45%] w-16 sm:w-20 z-20 pointer-events-none drop-shadow-md" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }} />
          
          {/* Luffy 2 */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/luffygear5.png" alt="Luffy 2" className="absolute top-[1600px] right-[10%] w-14 sm:w-20 z-20 pointer-events-none drop-shadow-md" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} />

          <div className="w-full columns-2 md:columns-3 gap-4 space-y-4">
            {PREWEDDING_PHOTOS.map((url, idx) => (
              <motion.div 
                layoutId={`img-container-${url}`}
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedImg(url)}
                className="break-inside-avoid relative overflow-hidden border-[4px] border-[#5BA4D9] shadow-[4px_4px_0_#5BA4D9] bg-[#EBEEEF] p-2 cursor-pointer hover:scale-[1.02] active:scale-95 transition-transform"
              >
                <motion.img layoutId={`img-${url}`} src={url} alt={`Gallery ${idx}`} className="w-full h-auto object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox / Zoom View */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              layoutId={`img-container-${selectedImg}`}
              className="relative max-w-full max-h-full border-[6px] border-[#5BA4D9] shadow-[8px_8px_0_#5BA4D9] bg-[#EBEEEF] p-3 md:p-4"
            >
              <motion.img 
                layoutId={`img-${selectedImg}`}
                src={selectedImg} 
                alt="Selected" 
                className="w-auto h-auto max-w-full max-h-[80vh] object-contain" 
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImg(null);
                }}
                className="absolute -top-4 -right-4 bg-[#C83B25] text-[#EFEABF] w-10 h-10 flex items-center justify-center text-lg rounded-full border-[3px] border-[#3e2723] shadow-[2px_2px_0_#3e2723] hover:bg-[#a9311e]"
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strict Pixel Grid Bottom Stage - Relative to flow at the end */}
      <div className="relative w-full h-[300px] pointer-events-none z-10 mt-auto flex-shrink-0">
        <div className="absolute bottom-[128px] w-full h-[180px] bg-repeat-x bg-bottom z-10" style={{ backgroundImage: 'url("https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/background.png")', backgroundSize: 'auto 100%', imageRendering: 'pixelated' }} />
        <div className="absolute bottom-0 w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundDirt}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />
        <div className="absolute bottom-[64px] w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundGrass}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />
        <div className="absolute bottom-[128px] left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[172px] z-30">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
            <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/groom&bride2.png" alt="Groom and Bride" className="w-[100px] sm:w-[120px] h-auto drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="w-full flex items-center justify-center py-4 bg-[#73B5E5] z-20 flex-shrink-0">
        <p className="text-white font-pixel text-[6px] sm:text-[8px] drop-shadow-md tracking-wider">
          Copyright <a href="https://hilmiputra.my.id" target="_blank" rel="noreferrer" className="underline hover:text-gray-200 pointer-events-auto">hilmiputra.my.id</a> 2026
        </p>
      </div>
    </motion.div>
  );
}
