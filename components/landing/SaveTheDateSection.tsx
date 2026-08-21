'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { motion } from 'framer-motion';
import type { Event } from '@/types';
import { formatTime } from '@/lib/utils';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

interface SaveTheDateSectionProps {
  targetDate: string | null;
  events: Event[];
}

export function SaveTheDateSection({ targetDate, events }: SaveTheDateSectionProps) {
  // If no target date, default to a future date for display
  const { days, hours, minutes, seconds } = useCountdown(targetDate || '2026-12-20T00:00:00');

  const countdownItems = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ];

  return (
    <section className="w-full max-w-lg mx-auto text-center font-serif text-[#4a463d] pb-16">
      
      {/* COUNTDOWN SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className={`${dancingScript.className} text-4xl mb-6`}>Save The Date</h2>
        <div className="flex justify-center items-center gap-6">
          {countdownItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-normal tracking-wide">{item.value}</span>
              <span className="text-[10px] uppercase tracking-widest font-sans mt-2 opacity-70">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ILLUSTRATION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mb-16 opacity-80"
      >
        <Image 
          src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/car.svg" 
          alt="Decoration Icon" 
          width={180} 
          height={180} 
          className="w-48 h-auto"
        />
      </motion.div>

      {/* TIME & PLACE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={`${dancingScript.className} text-3xl md:text-4xl mb-4 leading-tight`}>Waktu dan Tempat Acara</h2>
        
        {/* We use the first event's location if available */}
        {events.length > 0 && events[0].location && (
          <p className="text-xs md:text-sm font-sans font-light opacity-80 max-w-xs mx-auto leading-relaxed mb-10">
            {events[0].location}<br/>
            {events[0].address}
          </p>
        )}

        {/* SCHEDULE */}
        <div className="max-w-sm mx-auto flex flex-col font-sans space-y-4 px-6 text-left">
          {events.map((event, i) => (
            <div key={event.id} className="relative pb-4">
              <div className="flex items-center gap-6">
                <span className="text-xl font-serif min-w-[60px] opacity-90">
                  {event.event_date ? formatTime(event.event_date) : 'TBD'}
                </span>
                <span className="text-sm font-light opacity-80 tracking-wide">
                  {event.title}
                </span>
              </div>
              {i !== events.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 border-b border-dotted border-[#4a463d]/30" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* DRESS CODE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16"
      >
        <h2 className={`${dancingScript.className} text-3xl md:text-4xl mb-4`}>Dress-code</h2>
        <p className="text-[11px] md:text-xs font-sans font-light opacity-80 max-w-[260px] mx-auto leading-relaxed mb-6">
          Kami sangat berharap Anda dapat menyesuaikan dengan dress-code. Ini akan menciptakan suasana khusus pada acara kami.
        </p>
        <div className="flex justify-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#7a815a] shadow-inner" />
          <div className="w-10 h-10 rounded-full bg-[#e8e2d4] shadow-inner" />
          <div className="w-10 h-10 rounded-full bg-[#62697b] shadow-inner" />
          <div className="w-10 h-10 rounded-full bg-[#1c1c1c] shadow-inner" />
        </div>
      </motion.div>

    </section>
  );
}
