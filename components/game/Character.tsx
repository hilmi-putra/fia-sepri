'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CharacterProps {
  x: number;
  y: number;
  direction: 'left' | 'right' | 'idle';
  characterType?: 'groom' | 'bride' | 'both';
  isWalking: boolean;
  scale?: number;
}

const BASE_URL = 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/Groom%20&%20Bride%20Character';

export function Character({ x, y, direction, characterType = 'both', isWalking, scale = 1 }: CharacterProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isWalking) {
      setFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 8); // 8 frames (0 to 7)
    }, 100); // 100ms per frame

    return () => clearInterval(interval);
  }, [isWalking]);

  // Determine the correct image source based on state
  let imgSrc = '';
  
  if (isWalking) {
    if (direction === 'left') {
      imgSrc = `${BASE_URL}/walk-left-${frame}.png`;
    } else if (direction === 'right') {
      imgSrc = `${BASE_URL}/walk-right-${frame}.png`;
    } else {
      // Fallback
      imgSrc = `${BASE_URL}/Groom&Bride.png`;
    }
  } else {
    // Idle state
    if (characterType === 'groom') {
      imgSrc = `${BASE_URL}/groom.png`;
    } else if (characterType === 'bride') {
      imgSrc = `${BASE_URL}/bride.png`;
    } else {
      imgSrc = `${BASE_URL}/Groom&Bride.png`;
    }
  }

  return (
    <div 
      className="absolute transition-all duration-75 ease-linear"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        transform: `translate(-50%, -100%) scale(${scale})`, // Anchor at bottom center
        zIndex: Math.floor(y) // Simple depth sorting
      }}
    >
      {/* We use unoptimized Next/Image or standard img for these external URLs to avoid config issues initially */}
      <img 
        src={imgSrc} 
        alt="Character Sprite" 
        className="pixelated drop-shadow-md"
        style={{ imageRendering: 'pixelated' }}
        width={64}
        height={64}
      />
    </div>
  );
}
