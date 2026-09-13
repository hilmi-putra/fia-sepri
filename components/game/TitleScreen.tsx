'use client';

import { motion } from 'framer-motion';

interface TitleScreenProps {
  onStart: () => void;
  guestName?: string;
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  const coverAssets = {
    text: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/text.svg',
    altar: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/altar.svg',
    coins: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/coins.svg',
    heart: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/heart.svg',
    start: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/start-button.png',
    clouds: [
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Clouds3.PNG?updatedAt=1789282180491',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Clouds1.PNG?updatedAt=1789282179898',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Clouds2.PNG?updatedAt=1789282180439',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Clouds4.PNG?updatedAt=1789282179810',
    ],
    islands: [
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%206.svg',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%208.svg',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%202.svg',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%201.svg',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%2011.svg',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%205.svg',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%203.svg',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%209.svg',
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Cover/Cutout%207.svg',
    ],
  };

  return (
    <div className="cover-viewport w-full h-[100dvh] flex items-center justify-center bg-[#2CABFA] relative overflow-hidden select-none font-pixel">
      <div className="cover-stage relative bg-transparent">
        {/* Layer 1: sky and slow-moving cloud parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src={coverAssets.clouds[0]}
            alt=""
            className="cover-cloud absolute top-[4%] left-[-13%] w-[56%]"
            style={{ imageRendering: 'pixelated' }}
            animate={{ x: [0, 18, 0], y: [0, 3, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={coverAssets.clouds[1]}
            alt=""
            className="cover-cloud absolute top-[10%] right-[-13%] w-[62%]"
            style={{ imageRendering: 'pixelated' }}
            animate={{ x: [0, -22, 0], y: [0, -4, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.img
            src={coverAssets.clouds[2]}
            alt=""
            className="cover-cloud absolute top-[42%] left-[-20%] w-[68%]"
            style={{ imageRendering: 'pixelated' }}
            animate={{ x: [0, 26, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.img
            src={coverAssets.clouds[3]}
            alt=""
            className="cover-cloud absolute bottom-[-2%] right-[-19%] w-[76%]"
            style={{ imageRendering: 'pixelated' }}
            animate={{ x: [0, -18, 0], y: [0, -3, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>

        {/* Layer 2: floating islands behind the wedding scene */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.img src={coverAssets.islands[0]} alt="" className="cover-island absolute top-[13%] left-[-7%] w-[25%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.img src={coverAssets.islands[1]} alt="" className="cover-island absolute top-[23%] right-[-9%] w-[29%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }} />
          <motion.img src={coverAssets.islands[2]} alt="" className="cover-island absolute top-[37%] left-[-9%] w-[26%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, 6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          <motion.img src={coverAssets.islands[3]} alt="" className="cover-island absolute top-[42%] right-[-7%] w-[25%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -6, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }} />
          <motion.img src={coverAssets.islands[4]} alt="" className="cover-island absolute bottom-[28%] left-[-11%] w-[29%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, 7, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
          <motion.img src={coverAssets.islands[5]} alt="" className="cover-island absolute bottom-[19%] right-[-10%] w-[31%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -8, 0] }} transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1.7 }} />
          <motion.img src={coverAssets.islands[6]} alt="" className="cover-island absolute bottom-[7%] left-[1%] w-[25%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }} />
          <motion.img src={coverAssets.islands[7]} alt="" className="cover-island absolute bottom-[3%] right-[1%] w-[27%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }} />
          <motion.img src={coverAssets.islands[8]} alt="" className="cover-island absolute top-[31%] left-[36%] w-[18%]" style={{ imageRendering: 'pixelated' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
        </div>

        {/* Layer 3: title, couple altar, HUD, and start control */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <motion.img
            src={coverAssets.coins}
            alt="Forever"
            className="absolute top-[4%] right-[6%] w-[30%]"
            style={{ imageRendering: 'pixelated' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: [0, -3, 0] }}
            transition={{ opacity: { duration: 0.7 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          />
          <motion.img
            src={coverAssets.heart}
            alt="Hearts"
            className="absolute top-[4%] left-[6%] w-[27%]"
            style={{ imageRendering: 'pixelated' }}
            animate={{ y: [0, -3, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={coverAssets.text}
            alt="Wedding Invitation Fia and Sepri"
            className="cover-title absolute top-[13%] left-[8%] z-30 w-[84%]"
            style={{ imageRendering: 'pixelated' }}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: [0, -2, 0], scale: 1 }}
            transition={{ opacity: { duration: 0.8, delay: 0.15 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.8, delay: 0.15 } }}
          />
          <motion.img
            src={coverAssets.altar}
            alt="Fia and Sepri"
            className="cover-altar absolute top-[34%] left-[6%] w-[88%]"
            style={{ imageRendering: 'pixelated' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: [0, -3, 0] }}
            transition={{ opacity: { duration: 0.9, delay: 0.35 }, y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' } }}
          />
          <motion.button
            type="button"
            aria-label="Start wedding invitation"
            className="cover-start absolute bottom-[12%] left-[25%] z-30 w-[50%] pointer-events-auto cursor-pointer outline-none"
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <img src={coverAssets.start} alt="Start" className="w-full h-auto drop-shadow-[0_5px_0_rgba(62,39,35,0.22)]" style={{ imageRendering: 'pixelated' }} />
          </motion.button>
        </div>

      </div>
    </div>
  );
}
