'use client';

import { motion } from 'framer-motion';

interface TitleScreenProps {
  onStart: () => void;
  guestName: string;
}

export function TitleScreen({ onStart, guestName }: TitleScreenProps) {
  const groundGrass = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground1.png";
  const groundDirt = "https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/ground3.png";

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-start font-pixel relative overflow-hidden bg-[#73B5E5]">
      
      {/* Top Left Hearts */}
      <div className="absolute top-6 left-6 flex gap-2 z-50">
        <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/hearts.png" alt="Heart" className="w-8 md:w-10 h-auto" style={{ imageRendering: 'pixelated' }} />
        <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/hearts.png" alt="Heart" className="w-8 md:w-10 h-auto" style={{ imageRendering: 'pixelated' }} />
        <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/hearts.png" alt="Heart" className="w-8 md:w-10 h-auto" style={{ imageRendering: 'pixelated' }} />
      </div>

      {/* Floating Clouds */}
      <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds4.png" alt="Cloud" className="absolute top-[10%] left-[8%] w-24 md:w-28 opacity-90 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} animate={{ x: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds5.png" alt="Cloud" className="absolute top-[28%] left-[15%] w-28 md:w-32 opacity-85 pointer-events-none z-10" style={{ imageRendering: 'pixelated' }} animate={{ x: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      
      {/* Unicorn on Cloud */}
      <div className="absolute top-[35%] right-[5%] z-20 pointer-events-none flex flex-col items-center">
        <motion.div animate={{ y: [0, -15, 0], x: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="relative flex flex-col items-center">
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/unicorn.png" alt="Unicorn" className="w-24 md:w-32 relative z-20 top-4" style={{ imageRendering: 'pixelated' }} />
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/clouds1.png" alt="Cloud" className="w-40 md:w-48 relative z-10 -mt-2" style={{ imageRendering: 'pixelated' }} />
        </motion.div>
      </div>

      {/* Flying Birds */}
      <motion.img 
        src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/birds.png?updatedAt=1787986152611" 
        alt="Birds" 
        className="absolute top-[45%] left-[8%] w-16 md:w-20 opacity-90 pointer-events-none z-10" 
        style={{ imageRendering: 'pixelated' }} 
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} 
      />

      {/* Top Section: Title & Start Button */}
      <div className="z-40 flex flex-col items-center w-full px-4 pt-[15vh] pb-0">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-widest mb-6 text-center leading-tight text-white uppercase font-bold" 
          style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
        >
          WEDDING INVITATION<br/>FIA & SEPRI
        </motion.h1>

        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }} className="relative mb-12 cursor-pointer" onClick={onStart}>
          <div className="px-8 py-3 bg-white text-black text-xl sm:text-2xl border-4 border-black rounded-lg hover:bg-gray-100 transition-colors tracking-widest font-bold relative z-20" style={{ boxShadow: "0 4px 0px rgba(0,0,0,0.1)" }}>
            Start
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-black rotate-45 z-10" />
        </motion.div>
      </div>

      {/* Strict Pixel Grid Stage */}
      <div className="absolute bottom-[32px] w-full h-[350px] pointer-events-none">
        
        {/* Mountains Background */}
        <div className="absolute bottom-[128px] w-full h-[180px] bg-repeat-x bg-bottom z-10" style={{ backgroundImage: 'url("https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/background.png")', backgroundSize: 'auto 100%', imageRendering: 'pixelated' }} />
        
        {/* Level 0: Continuous Dirt */}
        <div className="absolute bottom-0 w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundDirt}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />
        
        {/* Level 1: Continuous Grass */}
        <div className="absolute bottom-[64px] w-full h-[64px] bg-repeat-x bg-bottom z-20" style={{ backgroundImage: `url('${groundGrass}')`, backgroundSize: '64px 64px', imageRendering: 'pixelated' }} />

        {/* Center Stage Structure (w=384px corresponds to 6 blocks of 64px) */}
        <div className="absolute bottom-[128px] left-1/2 -translate-x-1/2 w-[384px] h-[256px] z-30">
          
          {/* --- GROUND BLOCKS (Using absolute img tags to guarantee rendering) --- */}
          
          {/* Col 0 (Left Edge) */}
          <img src={groundGrass} className="absolute bottom-0 left-0 w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          
          {/* Col 1 (Inner Left) */}
          <img src={groundDirt} className="absolute bottom-0 left-[64px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          <img src={groundGrass} className="absolute bottom-[64px] left-[64px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          
          {/* Col 2 (Center Left - Under Carpet) */}
          <img src={groundDirt} className="absolute bottom-0 left-[128px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          <img src={groundGrass} className="absolute bottom-[64px] left-[128px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          
          {/* Col 3 (Center Right - Under Carpet) */}
          <img src={groundDirt} className="absolute bottom-0 left-[192px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          <img src={groundGrass} className="absolute bottom-[64px] left-[192px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          
          {/* Col 4 (Inner Right) */}
          <img src={groundDirt} className="absolute bottom-0 left-[256px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          <img src={groundGrass} className="absolute bottom-[64px] left-[256px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />
          
          {/* Col 5 (Right Edge) */}
          <img src={groundGrass} className="absolute bottom-0 left-[320px] w-[64px] h-[64px]" style={{ imageRendering: 'pixelated' }} alt="" />


          {/* --- ITEMS --- */}
          
          {/* Pink Bush (Sits on Col 0) */}
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/flowerspink.png" alt="Pink Bush" className="absolute bottom-[64px] left-[4px] w-[56px] h-auto z-40" style={{ imageRendering: 'pixelated' }} />

          {/* Arcade Machine & Bubble (Sits on Col 1) */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/speechbubble.png" alt="Bubble" className="absolute bottom-[184px] left-[68px] w-[40px] h-auto z-40" style={{ imageRendering: 'pixelated' }} animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/arcade%20machine.png" alt="Arcade" className="absolute bottom-[128px] left-[64px] w-[48px] h-auto z-40" style={{ imageRendering: 'pixelated' }} />

          {/* Cake (Sits on Col 4) */}
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/cake.png" alt="Cake" className="absolute bottom-[128px] left-[272px] w-[56px] h-auto z-40" style={{ imageRendering: 'pixelated' }} />

          {/* White Bush (Sits on Col 5) */}
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/flowerswhite.png" alt="White Bush" className="absolute bottom-[64px] left-[324px] w-[56px] h-auto z-40" style={{ imageRendering: 'pixelated' }} />


          {/* Arch (Spans Col 1 to Col 4, sits behind characters and items) */}
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/wedding%20arch.png" alt="Arch" className="absolute bottom-[128px] left-[72px] w-[240px] h-auto z-30" style={{ imageRendering: 'pixelated' }} />

          {/* Characters (Sit on top of carpet, between arch) */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/groom_characters.png" alt="Groom" className="absolute bottom-[128px] left-[134px] w-[56px] h-auto z-50" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} />
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/bride_characters.png" alt="Bride" className="absolute bottom-[128px] left-[186px] w-[72px] h-auto z-50" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />

          {/* Floating Hearts */}
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/love1.png" alt="Heart" className="absolute bottom-[280px] left-[172px] w-[40px] h-auto z-50" style={{ imageRendering: 'pixelated' }} animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/love2.png" alt="Heart" className="absolute bottom-[300px] left-[140px] w-[24px] h-auto z-50" style={{ imageRendering: 'pixelated' }} animate={{ y: [-2, 4, -2] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
          <motion.img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/love3.png" alt="Heart" className="absolute bottom-[290px] left-[220px] w-[24px] h-auto z-50" style={{ imageRendering: 'pixelated' }} animate={{ y: [-4, 2, -4] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }} />

          {/* Red Carpet (Drapes from Level 3 down to Level 1) */}
          <img src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/redcarpet.png" alt="Carpet" className="absolute bottom-[-16px] left-[112px] w-[160px] h-auto z-50" style={{ imageRendering: 'pixelated' }} />

        </div>
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-0 w-full h-[32px] flex items-center justify-center bg-[#73B5E5] z-50">
        <p className="text-white font-pixel text-[6px] sm:text-[8px] drop-shadow-md tracking-wider">
          Copyright <a href="https://hilmiputra.my.id" target="_blank" rel="noreferrer" className="underline hover:text-gray-200 pointer-events-auto">hilmiputra.my.id</a> 2026
        </p>
      </div>
    </div>
  );
}

