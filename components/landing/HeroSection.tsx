'use client';

import { useEffect, useRef } from 'react';
import type { Couple } from '@/types';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import gsap from 'gsap';

interface HeroSectionProps {
  couple: Couple | null;
  eventDate: string | null;
  guestName?: string;
}

export function HeroSection({ couple, eventDate, guestName }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.hero-anim'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // helper to format date as DD | MM | YYYY
  const formattedNumericDate = eventDate ? (() => {
    const d = new Date(eventDate);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day} | ${month} | ${year}`;
  })() : '20 | 12 | 2026';

  return (
    <section ref={containerRef} id="hero" className="relative h-[100dvh] w-full flex flex-col justify-between text-[#e6dfcc] text-center pt-16 pb-12 overflow-hidden shadow-xl font-serif">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/main%20cover.jpg"
          alt="Hero Image"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradient overlays to ensure text readability at top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 px-6 flex flex-col items-center pt-8">
        <p className="hero-anim text-2xl tracking-wide mb-1 font-medium drop-shadow-md">Wedding Day</p>
        <p className="hero-anim text-lg tracking-[0.2em] mb-6 drop-shadow-md">
          {formattedNumericDate}
        </p>

        <h1 className="hero-anim text-5xl md:text-6xl font-normal drop-shadow-lg">
          {couple?.groom_name ?? 'Sepri'} & {couple?.bride_name ?? 'Fia'}
        </h1>
      </div>

      <div className="relative z-10 px-8 text-sm md:text-base leading-relaxed max-w-sm mx-auto hero-anim drop-shadow-md mt-auto font-sans font-light">
        {guestName && (
          <p className="mb-2 font-medium">Dear {guestName},</p>
        )}
        <p className="opacity-90">Dengan penuh suka cita, kami mengundang Anda untuk merayakan momen awal lembaran baru kehidupan kami.</p>
      </div>
    </section>
  );
}
