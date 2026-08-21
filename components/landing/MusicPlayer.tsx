'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Disc } from 'lucide-react';
import clsx from 'clsx';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/A7X Gunslinger sound.mp3.mpeg');
    audioRef.current.loop = true;
    
    // Auto-play is often blocked by browsers, so we might need user interaction first
    // We'll leave it paused initially to be safe, or try to play and catch error
    const playAttempt = audioRef.current.play();
    if (playAttempt !== undefined) {
      playAttempt.then(() => {
        setIsPlaying(true);
      }).catch(error => {
        // Auto-play prevented
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
      >
        {/* Pulsing glow ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#3a5a78]/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Vinyl disc SVG */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14"
        >
          <svg viewBox="0 0 56 56" className="w-full h-full drop-shadow-lg">
            {/* Outer body - Black */}
            <circle cx="28" cy="28" r="27" fill="#2c2c2c" />
            <circle cx="28" cy="28" r="26" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
            
            {/* Grooves */}
            <circle cx="28" cy="28" r="23" fill="none" stroke="#2a2a2a" strokeWidth="0.3" />
            <circle cx="28" cy="28" r="21" fill="none" stroke="#2a2a2a" strokeWidth="0.3" />
            <circle cx="28" cy="28" r="19" fill="none" stroke="#2a2a2a" strokeWidth="0.3" />
            <circle cx="28" cy="28" r="17" fill="none" stroke="#2a2a2a" strokeWidth="0.3" />
            <circle cx="28" cy="28" r="15" fill="none" stroke="#2a2a2a" strokeWidth="0.3" />
            
            {/* Subtle shine arc */}
            <path d="M 10 20 A 20 20 0 0 1 28 8" fill="none" stroke="white" strokeWidth="0.4" opacity="0.08" />
            
            {/* Label area - Blue Accent */}
            <circle cx="28" cy="28" r="10" fill="#3a5a78" />
            <circle cx="28" cy="28" r="9" fill="#2c445a" />
            
            {/* Label inner ring */}
            <circle cx="28" cy="28" r="7" fill="none" stroke="#4a6a88" strokeWidth="0.5" />
            
            {/* Label text arc */}
            <circle cx="28" cy="28" r="6" fill="none" stroke="#253a4d" strokeWidth="0.3" strokeDasharray="1 2" />
            
            {/* Center hole */}
            <circle cx="28" cy="28" r="2.5" fill="#1a1a1a" />
            <circle cx="28" cy="28" r="1.5" fill="#2c2c2c" stroke="#444" strokeWidth="0.3" />
            
            {/* Tiny highlight on center */}
            <circle cx="27.5" cy="27.2" r="0.5" fill="white" opacity="0.15" />
          </svg>
        </motion.div>

        {/* Play/Pause indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};
