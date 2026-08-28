'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LevelSelectScreenProps {
  onSelectCard: (card: 'storyCard' | 'journeyCard' | 'bigDayCard') => void;
}

// Pixel Heart Icon Component
function PixelHeart({ className = "w-6 h-6", color = "#ffffff" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      <path d="M4 2H7V4H4V2Z" fill={color}/>
      <path d="M9 2H12V4H9V2Z" fill={color}/>
      <path d="M2 4H14V7H2V4Z" fill={color}/>
      <path d="M3 7H13V9H3V7Z" fill={color}/>
      <path d="M4 9H12V11H4V9Z" fill={color}/>
      <path d="M5 11H11V13H5V11Z" fill={color}/>
      <path d="M7 13H9V15H7V13Z" fill={color}/>
      {/* Pixel Outline */}
      <path d="M4 1H7V2H4V1ZM9 1H12V2H9V1ZM7 2H9V4H7V2ZM2 3H4V4H2V3ZM12 3H14V4H12V3ZM1 4H2V7H1V4ZM14 4H15V7H14V4ZM2 7H3V9H2V7ZM13 7H14V9H13V7ZM3 9H4V11H3V9ZM12 9H13V11H12V9ZM4 11H5V13H4V11ZM11 11H12V13H11V11ZM5 13H7V15H5V13ZM9 13H11V15H9V13ZM7 15H9V16H7V15Z" fill="#2A1B18"/>
    </svg>
  );
}

// Pixel Sparkle Component
function PixelSparkle({ className = "w-5 h-5 text-yellow-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
      <rect x="7" y="1" width="2" height="14" />
      <rect x="1" y="7" width="14" height="2" />
      <rect x="4" y="4" width="2" height="2" />
      <rect x="10" y="4" width="2" height="2" />
      <rect x="4" y="10" width="2" height="2" />
      <rect x="10" y="10" width="2" height="2" />
    </svg>
  );
}

// Pixel Envelope Artwork Component
function PixelEnvelope({ 
  isOpen, 
  color = "#D94B58", 
  darkColor = "#B03440", 
  lightColor = "#E86370" 
}: { 
  isOpen: boolean; 
  color?: string; 
  darkColor?: string; 
  lightColor?: string; 
}) {
  return (
    <div className="relative w-44 h-32 flex items-center justify-center select-none">
      
      {/* Sparkles on Open */}
      {isOpen && (
        <>
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-3 -left-3 text-[#fcd34d]"
          >
            <PixelSparkle className="w-5 h-5" />
          </motion.div>
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute -top-4 -right-2 text-[#fcd34d]"
          >
            <PixelSparkle className="w-6 h-6" />
          </motion.div>
        </>
      )}

      <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[4px_6px_0_#2A1B18]" style={{ imageRendering: 'pixelated' }}>
        
        {/* Envelope Outer Border / Background */}
        <rect x="10" y="30" width="120" height="65" rx="3" fill="#2A1B18" />
        <rect x="14" y="34" width="112" height="57" fill={color} />

        {/* Interior Paper when Opened */}
        {isOpen && (
          <g>
            <rect x="24" y="10" width="92" height="50" rx="2" fill="#2A1B18" />
            <rect x="28" y="14" width="84" height="42" fill="#FFFDF8" />
            {/* Letter Lines */}
            <rect x="36" y="24" width="45" height="4" fill={darkColor} />
            <rect x="36" y="32" width="68" height="3" fill="#A1887F" />
            <rect x="36" y="38" width="60" height="3" fill="#A1887F" />
            <rect x="36" y="44" width="35" height="3" fill="#A1887F" />
            {/* Small Heart on Letter */}
            <circle cx="95" cy="25" r="5" fill={color} />
          </g>
        )}

        {/* Envelope Left & Right Folds */}
        <polygon points="14,34 70,66 14,91" fill={darkColor} />
        <polygon points="126,34 70,66 126,91" fill={darkColor} />
        <polygon points="14,91 70,62 126,91" fill={lightColor} />

        {/* Envelope Fold Outlines */}
        <line x1="14" y1="34" x2="70" y2="66" stroke="#2A1B18" strokeWidth="4" />
        <line x1="126" y1="34" x2="70" y2="66" stroke="#2A1B18" strokeWidth="4" />
        <line x1="14" y1="91" x2="70" y2="62" stroke="#2A1B18" strokeWidth="3" />
        <line x1="126" y1="91" x2="70" y2="62" stroke="#2A1B18" strokeWidth="3" />

        {/* Top Flap Closed vs Open */}
        {!isOpen ? (
          <g>
            {/* Closed Top Flap */}
            <polygon points="14,34 70,68 126,34" fill={color} />
            <line x1="14" y1="34" x2="70" y2="68" stroke="#2A1B18" strokeWidth="4" strokeLinecap="round" />
            <line x1="126" y1="34" x2="70" y2="68" stroke="#2A1B18" strokeWidth="4" strokeLinecap="round" />

            {/* Dotted Stitching along flap */}
            <line x1="20" y1="34" x2="70" y2="64" stroke="#2A1B18" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="120" y1="34" x2="70" y2="64" stroke="#2A1B18" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

            {/* Flap Heart Seal */}
            <g transform="translate(62, 54)">
              <rect x="-8" y="-8" width="16" height="16" fill="#FFFDF8" rx="2" stroke="#2A1B18" strokeWidth="2" />
              <path d="M-5,-4 H-2 V-2 H-5 Z M1,-4 H4 V-2 H1 Z M-6,-2 H5 V1 H-6 Z M-5,1 H4 V3 H-5 Z M-4,3 H3 V5 H-4 Z M-2,5 H1 V7 H-2 Z" fill="#D94B58" />
            </g>
          </g>
        ) : (
          <g>
            {/* Open Top Flap Pointing Up */}
            <polygon points="14,34 70,4 126,34" fill={lightColor} />
            <line x1="14" y1="34" x2="70" y2="4" stroke="#2A1B18" strokeWidth="4" strokeLinecap="round" />
            <line x1="126" y1="34" x2="70" y2="4" stroke="#2A1B18" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function LevelSelectScreen({ onSelectCard }: LevelSelectScreenProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const CARDS = [
    { 
      id: 'storyCard' as const, 
      label: 'CARD 1',
      title: 'OUR STORY', 
      desc: 'First Meeting to The Wedding',
      color: '#D94B58',
      darkColor: '#B03440',
      lightColor: '#E86370',
    },
    { 
      id: 'journeyCard' as const, 
      label: 'CARD 2',
      title: 'OUR JOURNEY', 
      desc: 'Prewedding & Memories',
      color: '#E07A5F',
      darkColor: '#C45B42',
      lightColor: '#EA937B',
    },
    { 
      id: 'bigDayCard' as const, 
      label: 'CARD 3',
      title: 'THE BIG DAY', 
      desc: 'Wedding Details & RSVP',
      color: '#C8A66B',
      darkColor: '#A88349',
      lightColor: '#D8BC86',
    },
  ];

  return (
    <div className="w-full h-full relative overflow-y-auto custom-scrollbar p-4 py-6 md:py-12 flex flex-col items-center justify-center font-pixel z-10">
      
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6 md:mb-12"
      >
        <p className="text-[10px] md:text-xs text-[#5d4037] uppercase tracking-widest mb-2">
          SELECT AN ENVELOPE
        </p>
        <h2 
          className="text-2xl md:text-4xl text-[#3e2723] uppercase tracking-wider font-bold"
          style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.12)" }}
        >
          PICK A CARD!
        </h2>
        <div className="w-20 h-[3px] bg-[#3e2723] mx-auto mt-3 rounded-full opacity-30" />
      </motion.div>

      {/* Responsive Envelopes Layout: Row on Desktop, Column on Mobile */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 pb-8">
        {CARDS.map((card, idx) => {
          const isHovered = hoveredCard === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.4 }}
              whileHover={{ scale: 1.06, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard(card.id)}
              onClick={() => onSelectCard(card.id)}
              className="flex flex-col items-center cursor-pointer group relative w-full max-w-[240px]"
            >
              {/* "CLICK TO OPEN" Tooltip Banner above card when hovered */}
              <div className="h-7 flex items-center justify-center mb-1">
                {isHovered ? (
                  <motion.span 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] md:text-xs text-[#3e2723] font-bold tracking-widest bg-[#FFFDF8] px-3 py-1 border-[2px] border-[#3e2723] shadow-[2px_2px_0_#3e2723] rounded-full animate-bounce whitespace-nowrap"
                  >
                    CLICK TO OPEN ✨
                  </motion.span>
                ) : (
                  <span className="text-[10px] text-transparent select-none">•</span>
                )}
              </div>

              {/* Pixel Art Envelope */}
              <div className="transition-transform duration-200">
                <PixelEnvelope 
                  isOpen={isHovered}
                  color={card.color}
                  darkColor={card.darkColor}
                  lightColor={card.lightColor}
                />
              </div>

              {/* Envelope Label & Title */}
              <div className="flex flex-col items-center mt-3 text-center">
                <span 
                  className="text-base md:text-lg font-bold text-[#3e2723] tracking-widest uppercase"
                  style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
                >
                  {card.label}
                </span>
                <span className="text-xs md:text-sm text-[#5d4037] font-bold tracking-wider uppercase mt-0.5">
                  {card.title}
                </span>
                <span className="text-[10px] text-[#5d4037]/80 font-sans mt-0.5 max-w-[200px] leading-tight">
                  {card.desc}
                </span>
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

