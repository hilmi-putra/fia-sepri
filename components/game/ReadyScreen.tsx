'use client';

import { motion } from 'framer-motion';

interface ReadyScreenProps {
  onReady: () => void;
}

export function ReadyScreen({ onReady }: ReadyScreenProps) {
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
      
      {/* Sky & Background Elements */}
      <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds2.png" alt="Cloud" className="absolute top-[8%] left-[-2%] w-32 md:w-48 opacity-90 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} animate={{ x: [0, 15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds3.png" alt="Cloud" className="absolute top-[25%] right-[2%] w-24 md:w-32 opacity-85 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} animate={{ x: [0, -10, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds1.png" alt="Cloud" className="absolute top-[60%] left-[30%] w-40 md:w-56 opacity-80 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} animate={{ x: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Kiki top right */}
      <motion.img 
        src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/kiki.png" 
        alt="Kiki" 
        className="absolute top-0 right-[-10%] md:right-0 w-[240px] md:w-[320px] pointer-events-none z-20" 
        style={{ imageRendering: 'pixelated' }} 
        animate={{ y: [0, -15, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Title & Buttons */}
      <div className="absolute top-[20%] md:top-[25%] w-full flex flex-col items-center z-40">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-[28px] sm:text-4xl md:text-5xl text-center mb-6 tracking-widest uppercase leading-tight font-bold"
          style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
        >
          READY TO<br/>COME?
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 items-center"
        >
          <motion.button 
            onClick={onReady} 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }} 
            animate={{ scale: [1, 1.06, 1] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="outline-none"
          >
            <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/buttonstart.png" alt="Start" className="w-[100px] sm:w-[120px] h-auto drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
          </motion.button>
          <motion.button 
            onClick={onReady} 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }} 
            animate={{ scale: [1, 1.06, 1] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="outline-none"
          >
            <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/buttongo.png" alt="Go" className="w-[110px] sm:w-[130px] h-auto drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
          </motion.button>
        </motion.div>
      </div>

      {/* Left Floating Platform */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[40%] md:top-[45%] left-[8%] sm:left-[15%] flex flex-col items-center z-30 pointer-events-none"
      >
        <div className="flex gap-3 sm:gap-4 mb-2">
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/coins1.png" alt="Coin" className="w-6 sm:w-8 h-auto" style={{ imageRendering: 'pixelated' }} animate={{ y: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/coins1.png" alt="Coin" className="w-6 sm:w-8 h-auto" style={{ imageRendering: 'pixelated' }} animate={{ y: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
        </div>
        <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/floating1.png" alt="Platform" className="w-[120px] sm:w-[150px] h-auto" style={{ imageRendering: 'pixelated' }} animate={{ y: [-2, 2, -2] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>

      {/* Right Floating Platform */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-[48%] md:top-[52%] right-[8%] sm:right-[15%] flex flex-col items-center z-30 pointer-events-none"
      >
        <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/hearts.png" alt="Heart" className="w-6 sm:w-8 h-auto mb-3" style={{ imageRendering: 'pixelated' }} animate={{ y: [-5, 5, -5] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/floating2.png" alt="Platform" className="w-[100px] sm:w-[120px] h-auto" style={{ imageRendering: 'pixelated' }} animate={{ y: [2, -2, 2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
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
          
          {/* Characters Left (Groom & Bride) */}
          <div className="absolute bottom-0 left-[5%] sm:left-[10%] flex flex-col items-center z-40">
            {/* Speech Bubble */}
            <motion.div 
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: 1, y: [-3, 3, -3] }}
              transition={{ 
                scale: { delay: 0.5, type: 'spring' },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 } 
              }}
              className="mb-3 bg-white border-[3px] border-black px-3 py-2 rounded-xl relative drop-shadow-md origin-bottom"
            >
              <p className="text-black text-[8px] sm:text-[10px] text-center leading-snug font-bold">
                Hello, Sepri & Fia<br/>disini... Selamat<br/>Datang...
              </p>
              {/* Tail pointing down-right */}
              <div className="absolute -bottom-[6px] right-[30%] w-3 h-3 bg-white border-b-[3px] border-r-[3px] border-black rotate-45" />
            </motion.div>

            <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/groom&bride2.png" alt="Groom and Bride" className="w-[100px] sm:w-[120px] h-auto drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
          </div>

          {/* Characters Right (Howl's Moving Castle) */}
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/howlmovingcastle.png" alt="Howl" className="absolute bottom-0 right-[-5%] sm:right-[0%] w-[220px] sm:w-[280px] h-auto z-30" style={{ imageRendering: 'pixelated' }} />
          
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
