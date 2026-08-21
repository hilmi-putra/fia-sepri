'use client';

import type { Couple } from '@/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

interface StorySectionProps {
  couple: Couple | null;
}

export function StorySection({ couple }: StorySectionProps) {
  return (
    <section id="story" className="w-full text-[#3a3a3a] overflow-hidden py-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 mb-12"
      >
        <h2 className={`${dancingScript.className} text-5xl mb-4 text-[#4a463d]`}>Groom & Bride</h2>
        <p className="text-sm opacity-80 font-light max-w-[280px] mx-auto leading-relaxed">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami.
        </p>
      </motion.div>

      <div className="space-y-16 pb-8">
        {/* Groom */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-row items-center w-full"
        >
          <div className="relative w-[55%] h-[280px] rounded-r-[2rem] overflow-hidden shadow-md">
            <Image
              src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-072%201.png?updatedAt=1787235155195"
              alt="Groom"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="w-[45%] px-5 flex flex-col justify-center">
            <h3 className={`${dancingScript.className} text-4xl mb-3 text-[#4a463d]`}>Seprianor</h3>
            <p className="text-[13px] opacity-70 font-light leading-relaxed">
              Putra ke-3 dari 3 bersaudara dari Bapak Jaya & Ibu Kartini.
            </p>
          </div>
        </motion.div>

        {/* Bride */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-row-reverse items-center w-full"
        >
          <div className="relative w-[55%] h-[280px] rounded-l-[2rem] overflow-hidden shadow-md">
            <Image
              src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Fia%20+%20Sepri%20Prewedding-004%201.png?updatedAt=1787235153343"
              alt="Bride"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="w-[45%] px-5 flex flex-col justify-center text-right">
            <h3 className={`${dancingScript.className} text-4xl mb-3 text-[#4a463d]`}>Fia Khoerunnisa</h3>
            <p className="text-[13px] opacity-70 font-light leading-relaxed">
              Putri ke-2 dari 3 bersaudara dari Bapak Rusmana & Ibu Nely Nailan A.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
