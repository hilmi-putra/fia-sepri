'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { GiftRecommendations } from './GiftRecommendations';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

const BANKS = [
  { id: 'bca', name: 'BCA', acc: '1234567890', holder: 'Sepri' },
  { id: 'bni', name: 'BNI', acc: '0987654321', holder: 'Fia' }
];

export function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedBankId, setSelectedBankId] = useState('bca');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedBank = BANKS.find(b => b.id === selectedBankId) || BANKS[0];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="gift" className="relative w-full text-[#4a463d]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <h2 className={`${dancingScript.className} text-4xl mb-4`}>Wedding Gift</h2>
        <p className="text-[11px] md:text-xs font-sans font-light opacity-80 max-w-[280px] mx-auto leading-relaxed">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
          Namun jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital.
        </p>
      </motion.div>

      <div className="max-w-[320px] mx-auto">
        {/* Custom Dropdown for Bank Selection */}
        <div className="relative mb-6 z-20">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-[#eae4d3] text-[#4a463d] py-3.5 px-6 rounded-full text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-[#7a815a]/50 cursor-pointer transition-all border-0"
          >
            <span>{selectedBank.name} - a.n. {selectedBank.holder}</span>
            <ChevronDown size={18} className={`transition-transform duration-300 opacity-60 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#eae4d3] rounded-2xl overflow-hidden shadow-xl z-50 border border-[#4a463d]/10"
              >
                {BANKS.map(bank => (
                  <button
                    key={bank.id}
                    onClick={() => {
                      setSelectedBankId(bank.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3.5 text-sm font-medium transition-colors hover:bg-[#dcd4c0] ${
                      selectedBankId === bank.id ? 'bg-[#dcd4c0] text-[#4a463d]' : 'text-[#4a463d]/80'
                    }`}
                  >
                    {bank.name} - a.n. {bank.holder}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ticket-style Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#6b4e41] text-[#f7f5f0] rounded-xl p-8 pt-10 shadow-lg flex flex-col items-start overflow-hidden"
        >
          {/* Top semi-circle cutout */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#faf6f0]" />

          {/* Books background decoration */}
          <div className="absolute -right-6 -bottom-6 opacity-30 pointer-events-none w-[180px] h-[180px]">
             <Image 
               src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/books.png"
               alt="Books"
               fill
               className="object-contain"
             />
          </div>

          <div className="relative z-10 w-full">
            <h3 className={`${dancingScript.className} text-4xl mb-6 tracking-wide`}>
              {selectedBank.name}
            </h3>
            
            <p className="font-mono text-xl md:text-2xl tracking-widest mb-1 font-medium">
              {selectedBank.acc}
            </p>
            <p className="text-xs md:text-sm opacity-80 mb-8 font-light uppercase tracking-wider">
              A.N. {selectedBank.holder}
            </p>
            
            <button 
              onClick={() => copyToClipboard(selectedBank.acc)}
              className="w-full flex items-center justify-center gap-2 text-xs md:text-sm font-medium transition-all py-3.5 px-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 active:scale-95 shadow-sm"
            >
              {copied === selectedBank.acc ? (
                <span className="flex items-center gap-2">Tersalin!</span>
              ) : (
                <><Copy size={16} /> Salin Nomor Rekening</>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="mt-12">
        <GiftRecommendations />
      </div>
    </section>
  );
}
