'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface StoryCardProps {
  onBack: () => void;
  couple: any;
}

export function StoryCard({ onBack, couple }: StoryCardProps) {
  // Using dummy data or couple data if available
  const story = [
    { title: 'First Meeting', desc: 'Awal pertama kali bertemu di sebuah cafe.' },
    { title: 'First Conversation', desc: 'Mulai dekat lewat pesan singkat.' },
    { title: 'Growing Together', desc: 'Perjalanan hubungan melewati banyak hal.' },
    { title: 'The Proposal', desc: 'Menuju keputusan untuk bersama selamanya.' },
    { title: 'The Wedding', desc: 'Akhirnya sampai di hari pernikahan.' },
  ];

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 font-pixel"
    >
      <div className="bg-[#F7F2E6] w-full max-w-2xl max-h-[85vh] overflow-y-auto border-[6px] border-[#3e2723] p-6 md:p-8 rounded-xl shadow-[10px_10px_0_#a1887f] relative custom-scrollbar">
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 bg-[#DAB2B8] text-[#3e2723] px-3 py-1 font-bold border-[3px] border-[#3e2723] shadow-[3px_3px_0_#3e2723] hover:bg-[#c99ea4]"
        >
          X
        </button>
        
        <h2 className="text-xl md:text-2xl text-center mb-6 text-[#3e2723] border-b-[3px] border-[#3e2723] pb-3 uppercase tracking-wider">
          OUR STORY
        </h2>
        
        <div className="space-y-6">
          {story.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start bg-white/70 p-4 border-[3px] border-[#3e2723]/20 rounded-lg shadow-sm">
              <div className="text-[#DAB2B8] text-lg mt-1">❤️</div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-[#3e2723] uppercase">{item.title}</h3>
                <p className="text-xs md:text-sm text-[#5d4037] mt-1 font-sans leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
