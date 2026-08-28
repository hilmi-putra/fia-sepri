'use client';

import { motion } from 'framer-motion';
import { Character } from './Character';

interface ReadyScreenProps {
  onReady: () => void;
}

export function ReadyScreen({ onReady }: ReadyScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center font-pixel z-10">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white border-[6px] border-[#3e2723] p-8 rounded-xl shadow-[10px_10px_0_#a1887f] mb-8 relative"
      >
        <div className="flex items-center justify-center gap-1 mb-4">
          {Array(3).fill(0).map((_, i) => (
            <span key={i} className="text-[#DAB2B8] text-base drop-shadow-sm">❤️</span>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl text-[#3e2723] mb-8 tracking-wider uppercase" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
          READY TO PLAY?
        </h2>
        
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReady}
            className="px-6 py-3 bg-[#DAB2B8] text-[#3e2723] font-bold text-sm md:text-base border-[3px] border-[#3e2723] shadow-[4px_4px_0_#3e2723] hover:bg-[#c99ea4] transition-all tracking-wider"
          >
            YES!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReady}
            className="px-6 py-3 bg-[#E7B1A7] text-[#3e2723] font-bold text-sm md:text-base border-[3px] border-[#3e2723] shadow-[4px_4px_0_#3e2723] hover:bg-[#d69f95] transition-all tracking-wider"
          >
            OFC!
          </motion.button>
        </div>
      </motion.div>

      {/* Show the couple character */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <img 
          src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Groom%20&%20Bride%20Character/Groom&Bride.png" 
          alt="Groom and Bride" 
          className="w-32 h-32 object-contain drop-shadow-[0_4px_0_rgba(0,0,0,0.2)]"
          style={{ imageRendering: 'pixelated' }}
        />
      </motion.div>
    </div>
  );
}
