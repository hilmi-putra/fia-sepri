'use client';

import { motion } from 'framer-motion';

interface LevelSelectScreenProps {
  onSelectCard: (card: 'storyCard' | 'journeyCard' | 'bigDayCard') => void;
}

export function LevelSelectScreen({ onSelectCard }: LevelSelectScreenProps) {
  const groundGrass = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground1.png";
  const groundDirt = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground3.png";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-start font-pixel relative overflow-hidden bg-[#73B5E5]"
    >
      
      {/* Clouds - positioned to NOT overlap with platform labels */}
      <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="absolute top-[4%] left-[5%] w-28 md:w-40 opacity-90 pointer-events-none z-5" style={{ imageRendering: 'pixelated' }} animate={{ x: [0, 15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="absolute top-[15%] right-[5%] w-24 md:w-32 opacity-85 pointer-events-none z-5" style={{ imageRendering: 'pixelated' }} animate={{ x: [0, -10, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds1.png" alt="Cloud" className="absolute top-[50%] left-[40%] w-36 md:w-48 opacity-80 pointer-events-none z-5" style={{ imageRendering: 'pixelated' }} animate={{ x: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Title - centered at top */}
      <div className="absolute top-[6%] w-full flex flex-col items-center z-40 pointer-events-none">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-[28px] sm:text-4xl md:text-5xl text-center tracking-widest uppercase leading-tight font-bold"
          style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
        >
          PICK A<br/>LAND
        </motion.h1>
      </div>

      {/* Platform 1 (Story) - center-left */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={() => onSelectCard('storyCard')}
        className="absolute top-[25%] left-[15%] sm:left-[20%] flex flex-col items-center z-30 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-white text-[10px] sm:text-xs text-center mb-2 tracking-widest font-bold" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}>Land of<br/>story</p>
        <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/hearts.png" alt="Heart" className="w-6 sm:w-8 h-auto mb-2" style={{ imageRendering: 'pixelated' }} animate={{ y: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/floating2.png" alt="Platform" className="w-[100px] sm:w-[120px] h-auto drop-shadow-lg" style={{ imageRendering: 'pixelated' }} animate={{ y: [-2, 2, -2] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>

      {/* Platform 2 (Journey) - center-right */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={() => onSelectCard('journeyCard')}
        className="absolute top-[38%] right-[15%] sm:right-[20%] flex flex-col items-center z-30 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-white text-[10px] sm:text-xs text-center mb-2 tracking-widest font-bold" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}>Land of our<br/>journey</p>
        <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/hearts.png" alt="Heart" className="w-6 sm:w-8 h-auto mb-2" style={{ imageRendering: 'pixelated' }} animate={{ y: [-5, 5, -5] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/floating1.png" alt="Platform" className="w-[100px] sm:w-[120px] h-auto drop-shadow-lg" style={{ imageRendering: 'pixelated' }} animate={{ y: [2, -2, 2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} />
      </motion.div>

      {/* Platform 3 (Big Day) - center-left, lower */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        onClick={() => onSelectCard('bigDayCard')}
        className="absolute top-[52%] left-[15%] sm:left-[20%] flex flex-col items-center z-30 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-white text-[10px] sm:text-xs text-center mb-2 tracking-widest font-bold" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}>Land the big<br/>day</p>
        <div className="flex gap-2 sm:gap-3 mb-2">
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/coins1.png" alt="Coin" className="w-6 sm:w-8 h-auto" style={{ imageRendering: 'pixelated' }} animate={{ y: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/coins1.png" alt="Coin" className="w-6 sm:w-8 h-auto" style={{ imageRendering: 'pixelated' }} animate={{ y: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
        </div>
        <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/floating1.png" alt="Platform" className="w-[120px] sm:w-[140px] h-auto drop-shadow-lg" style={{ imageRendering: 'pixelated' }} animate={{ y: [-2, 2, -2] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />
      </motion.div>

      {/* Strict Pixel Grid Bottom Stage */}
      <div className="absolute bottom-[32px] w-full h-[300px] pointer-events-none">
        
        {/* Mountains Background */}
        <div className="absolute bottom-[128px] w-full h-[180px] bg-repeat-x bg-bottom z-10" style={{ backgroundImage: 'url("https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/background.png")', backgroundSize: 'auto 100%', imageRendering: 'pixelated' }} />

        {/* Level 0: Continuous Dirt */}
        <div className="absolute bottom-0 w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundDirt}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />
        
        {/* Level 1: Continuous Grass */}
        <div className="absolute bottom-[64px] w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundGrass}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />

        {/* Stage Content Container */}
        <div className="absolute bottom-[128px] left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[172px] z-30">
          
          {/* Characters Center (Groom & Bride) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
            <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/groom&bride2.png" alt="Groom and Bride" className="w-[100px] sm:w-[120px] h-auto drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
          </div>
          
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-0 w-full h-[32px] flex items-center justify-center bg-[#73B5E5] z-50">
        <p className="text-white font-pixel text-[6px] sm:text-[8px] drop-shadow-md tracking-wider">
          Copyright <a href="https://hilmiputra.my.id" target="_blank" rel="noreferrer" className="underline hover:text-gray-200 pointer-events-auto">hilmiputra.my.id</a> 2026
        </p>
      </div>
    </motion.div>
  );
}

