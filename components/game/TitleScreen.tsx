'use client';

import { motion } from 'framer-motion';

interface TitleScreenProps {
  onStart: () => void;
  guestName: string;
}

export function TitleScreen({ onStart, guestName }: TitleScreenProps) {
  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center font-pixel relative overflow-hidden bg-[#F7F2E6] text-[#3e2723]"
      style={{
        backgroundImage: "linear-gradient(to right, #e8dcc8 1px, transparent 1px), linear-gradient(to bottom, #e8dcc8 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        backgroundPosition: "center center"
      }}
    >
      <div className="z-10 flex flex-col items-center w-full max-w-md px-4 mt-8">
        
        <p className="text-[10px] md:text-[12px] uppercase mb-8 tracking-widest text-[#5d4037]">
          {guestName && guestName !== 'guest' ? `PLAYER 1: ${guestName}` : 'WEDDING ARCADE'}
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-widest mb-4 text-center leading-none text-[#3e2723]" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}>
          WEDDING.
        </h1>
        
        <p className="text-[10px] md:text-[12px] uppercase mb-12 tracking-widest text-[#5d4037]">
          PIXEL GAME ARCADE
        </p>

        <div className="border-[2px] border-[#3e2723] text-[#3e2723] px-3 py-1 mb-16 text-[8px] md:text-[10px] uppercase font-bold tracking-wider">
          © 2024 FIA & SEPRI STUDIO.
        </div>

        <p className="text-[10px] md:text-[12px] mb-4 text-center uppercase tracking-widest text-[#5d4037]">
          CAN I WALK WITH U UNTIL THE END ?
        </p>

        {/* Speech Bubble Area */}
        <div className="relative w-full max-w-[320px] flex flex-col items-center">
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-full bg-white border-[6px] border-[#3e2723] rounded-xl p-8 relative shadow-[10px_10px_0_#a1887f]"
          >
            {/* The Text inside the bubble: Sepri & Fia */}
            <div className="flex flex-col items-center justify-center space-y-2 leading-none">
              <span className="text-4xl md:text-5xl text-[#5d4037] uppercase">SEPRI</span>
              <span className="text-2xl md:text-3xl text-[#5d4037] uppercase">&</span>
              <span className="text-4xl md:text-5xl text-[#5d4037] uppercase">FIA</span>
            </div>

            {/* Bubble Tail */}
            <div className="absolute -bottom-8 left-12 w-0 h-0 
              border-l-[10px] border-l-transparent 
              border-r-[30px] border-r-transparent 
              border-t-[30px] border-t-white" 
              style={{ filter: "drop-shadow(4px 4px 0 #a1887f) drop-shadow(-6px 0px 0 #3e2723) drop-shadow(0px 6px 0 #3e2723)" }} 
            />
          </motion.div>

          {/* Character overlapping the bottom of the speech bubble */}
          <div className="relative -mt-6 z-20">
            <img 
              src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Groom%20&%20Bride%20Character/Groom&Bride.png" 
              alt="Groom and Bride Pixel Art" 
              className="w-32 h-32 object-contain drop-shadow-[0_4px_0_rgba(0,0,0,0.2)]"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mt-6 px-10 py-4 bg-[#DAB2B8] text-white text-xl md:text-2xl border-[4px] border-[#3e2723] shadow-[6px_6px_0_#3e2723] hover:bg-[#c99ea4] transition-colors tracking-widest uppercase font-bold"
        >
          START
        </motion.button>

      </div>
    </div>
  );
}
