'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';

export function CoverScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to');

  // prevent scrolling when cover is open (only on mobile)
  useEffect(() => {
    // Check if desktop on mount
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
      document.body.style.overflow = '';
      return;
    }

    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (!containerRef.current) return;

    // Animate out
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        setIsOpen(true);
      }
    });
  };

  if (isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="lg:hidden fixed inset-0 z-50 flex flex-col items-center justify-center bg-ghibli-dark text-white touch-none"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/cover.jpg"
          alt="Cover"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ghibli-dark/90 via-ghibli-dark/30 to-ghibli-dark/80 pointer-events-none" />
      </div>

      <div className="relative z-10 text-center px-6 flex flex-col items-center h-full justify-center w-full pb-20">
        <h2 className="text-sm tracking-[0.3em] uppercase mb-4 font-light text-ghibli-gold drop-shadow-md">The Wedding Of</h2>
        <h1 className="text-6xl font-serif mb-12 drop-shadow-lg">Fia & Sepri</h1>

        {guestName && (
          <div className="mb-8 drop-shadow-md">
            <p className="text-sm mb-2 opacity-90">Dear Mr/Mrs/Ms,</p>
            <p className="text-xl font-bold font-serif">{guestName}</p>
          </div>
        )}

        <button 
          onClick={handleOpen}
          className="mt-8 px-10 py-4 bg-[#3a5a78] hover:bg-[#3a5a78]/90 text-white tracking-[0.2em] uppercase text-xs rounded-none transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 border border-[#3a5a78]/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
            <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
          </svg>
          Open Invitation
        </button>
      </div>
    </div>
  );
}
