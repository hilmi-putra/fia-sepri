'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { getGiftRecommendations } from '@/services/gifts';
import type { GiftRecommendation } from '@/types';
import { GiftDetailModal } from './GiftDetailModal';
import { Dancing_Script } from 'next/font/google';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

export function GiftRecommendations() {
  const [recommendations, setRecommendations] = useState<GiftRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<GiftRecommendation | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const data = await getGiftRecommendations(supabase);
        setRecommendations(data);
      } catch (error) {
        console.error('Failed to load gift recommendations:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRecommendations();
  }, [supabase]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="w-8 h-8 border-4 border-[#7a815a]/30 border-t-[#7a815a] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; 
  }

  return (
    <section className="mt-20 relative w-full z-20">
      <div className="max-w-4xl mx-auto px-4 mb-4 text-center">
        <h3 className={`${dancingScript.className} text-4xl text-[#4a463d] mb-4`}>
          Gift Recommendations
        </h3>
        <p className="text-[11px] md:text-xs font-sans font-light opacity-80 max-w-[280px] mx-auto leading-relaxed text-[#4a463d]">
          Bila Anda ingin memberikan kado fisik secara langsung, berikut adalah beberapa barang yang kami butuhkan untuk menempuh hidup baru.
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto">
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-[#f7f5f0] text-[#4a463d] p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-[#f7f5f0] text-[#4a463d] p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <ChevronRight size={24} />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 px-16 py-16 w-full hide-scrollbar items-center" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />

          {recommendations.map((gift, index) => {
            const remaining = Math.max(0, gift.total_needed - gift.total_bought);
            
            // Format price to something shorter like 2.5M if possible, otherwise normal
            const formattedPrice = gift.price >= 1000000 
              ? `${(gift.price / 1000000).toFixed(1).replace('.0', '')}M` 
              : `${(gift.price / 1000).toFixed(0)}K`;

            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex-shrink-0 snap-center w-[280px] h-[360px]"
              >
                {/* Back Shadow Card */}
                <div className="absolute top-4 left-4 right-0 bottom-0 bg-[#7a815a] rounded-3xl" />
                
                {/* Main Card */}
                <div className="absolute top-0 left-0 right-4 bottom-4 bg-[#e8e2d4] rounded-3xl flex flex-col justify-between border-2 border-white/20 overflow-visible p-6">
                  
                  {/* Floating Price Pill (Top Right) */}
                  <div className="absolute -top-3 -right-3 bg-[#7a815a] text-[#f7f5f0] px-4 py-1.5 rounded-full text-xs font-bold shadow-md rotate-3 z-20 border-2 border-[#e8e2d4]">
                    IDR {formattedPrice}
                  </div>

                  {/* Floating Decor Circle (Left Edge) */}
                  <div className="absolute top-1/3 -left-4 bg-[#b56a4a] text-white p-2 rounded-full shadow-md z-20 border-2 border-[#e8e2d4]">
                    <Gift size={16} />
                  </div>

                  {/* Cursive Title */}
                  <h4 
                    className={`${dancingScript.className} text-5xl text-[#7a815a] drop-shadow-sm absolute -top-10 left-4 z-10 w-full overflow-hidden text-ellipsis whitespace-nowrap`}
                  >
                    {gift.name}
                  </h4>

                  {/* Content (Image + Remaining) */}
                  <div className="mt-10 flex-1 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#7a815a]/20 shadow-inner mb-4 bg-white/50 relative">
                      {gift.image_url ? (
                        <img src={gift.image_url} alt={gift.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-30"><Gift size={32} /></div>
                      )}
                    </div>
                    <p className="text-sm font-sans font-medium text-[#7a815a] uppercase tracking-widest text-center">
                      <span className="text-[#4a463d]">{remaining}</span> ITEMS LEFT
                    </p>
                  </div>

                  {/* Bottom Button Container (Brown Pill) */}
                  <div className="w-full bg-[#954a37] rounded-full p-1.5 flex items-center justify-between shadow-inner mt-2 z-10">
                    <button 
                      onClick={() => setSelectedGift(gift)}
                      disabled={remaining === 0}
                      className="bg-[#e8e2d4] text-[#954a37] px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold hover:bg-white transition-colors uppercase tracking-wider disabled:opacity-50"
                    >
                      {remaining === 0 ? 'Funded' : 'Gift Details'}
                    </button>
                    <div className="flex gap-1.5 pr-4 opacity-70">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e8e2d4]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e8e2d4]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e8e2d4]" />
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedGift && (
        <GiftDetailModal 
          gift={selectedGift} 
          onClose={() => setSelectedGift(null)} 
          onPurchaseSuccess={() => {
            setLoading(true);
            getGiftRecommendations(supabase).then(setRecommendations).finally(() => setLoading(false));
            setSelectedGift(null);
          }}
        />
      )}
    </section>
  );
}
