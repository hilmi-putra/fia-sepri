'use client';

import { motion } from 'framer-motion';

interface TitleScreenProps {
  onStart: () => void;
  guestName?: string;
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-[#40A6F0] relative overflow-hidden select-none font-pixel">
      {/* Responsive Aspect-Ratio Locked Container for bg.svg (1063x1480) */}
      <div className="relative h-full max-h-[100dvh] aspect-[1063/1480] max-w-[100vw] flex items-center justify-center overflow-hidden">
        
        {/* Full Background Vector Artwork */}
        <img 
          src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/bg.svg" 
          alt="Wedding Invitation Fia & Sepri" 
          className="w-full h-full object-contain pointer-events-none"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Animated Start Button — centered exactly with the red carpet altar */}
        <motion.div
          className="absolute left-1/2 -ml-[18%] bottom-[10%] w-[36%] max-w-[210px] cursor-pointer z-30 flex items-center justify-center"
          onClick={onStart}
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.04, 1]
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <img 
            src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/start-button.png" 
            alt="Start" 
            className="w-full h-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:brightness-105 transition-all"
            style={{ imageRendering: 'pixelated' }}
          />
        </motion.div>

      </div>
    </div>
  );
}
