'use client';

import { useState, useEffect, useRef, useCallback, useMemo, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase';
import type { Wish } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Dancing_Script } from 'next/font/google';
import { Trash2 } from 'lucide-react';

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

interface WishesSectionProps {
  initialWishes: Wish[];
}

export function WishesSection({ initialWishes }: WishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Wish | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = useMemo(() => createClient(), []);
  const blueColor = '#3a5a78';

  // Real-time subscription for new wishes
  useEffect(() => {
    const channel = supabase
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          setWishes((prev) => {
            if (prev.some(w => w.id === payload.new.id)) return prev;
            return [payload.new as Wish, ...prev];
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'wishes' },
        (payload) => {
          setWishes((prev) => prev.filter(w => w.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || wishes.length === 0) return;

    let animationId: number;
    let scrollSpeed = 0.5; // pixels per frame

    const autoScroll = () => {
      if (!isPaused && container) {
        container.scrollTop += scrollSpeed;
        // Reset to top when reaching the bottom
        if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
          container.scrollTop = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, [wishes, isPaused]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const { data, error } = await supabase.from('wishes').insert({
        guest_name: guestName.trim(),
        message: message.trim(),
      }).select().single();

      if (error) throw error;

      if (data) {
        setWishes(prev => {
          if (prev.some(w => w.id === data.id)) return prev;
          return [data as Wish, ...prev];
        });
      }

      setFeedback({ type: 'success', text: 'Ucapan berhasil dikirim! Terima kasih.' });
      setGuestName('');
      setMessage('');
      
      // Scroll to top to show the new wish
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    } catch {
      setFeedback({ type: 'error', text: 'Gagal mengirim ucapan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      const { error } = await supabase.from('wishes').delete().eq('id', deleteTarget.id);
      if (error) throw error;
      setWishes(prev => prev.filter(w => w.id !== deleteTarget.id));
    } catch {
      console.error('Failed to delete wish');
    } finally {
      setDeleteTarget(null);
    }
  }, [supabase, deleteTarget]);

  return (
    <section id="wishes" className="relative w-full max-w-md mx-auto px-6 py-10 text-[#4a463d]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className={`${dancingScript.className} text-5xl mb-4`} style={{ color: blueColor }}>
          Wedding Wishes
        </h2>
        <p className="text-sm opacity-60 font-light">Kirimkan doa dan ucapan untuk pengantin</p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit} 
        className="space-y-8 mb-12"
      >
        <div>
          <input
            type="text"
            className="w-full bg-transparent border-b border-[#3a5a78]/40 focus:border-[#3a5a78] px-2 py-3 text-sm focus:outline-none transition-colors placeholder:text-[#3a5a78]/50"
            placeholder="Nama Anda"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>

        <div>
          <textarea
            className="w-full bg-transparent border-b border-[#3a5a78]/40 focus:border-[#3a5a78] px-2 py-3 text-sm focus:outline-none transition-colors placeholder:text-[#3a5a78]/50 min-h-[100px] resize-none"
            placeholder="Tulis ucapan Anda..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-4 text-white text-sm tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: blueColor }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
        </button>

        {feedback && (
          <p className={`text-center text-sm p-3 border mt-4 ${feedback.type === 'success' ? 'border-[#3a5a78] text-[#3a5a78]' : 'border-red-400 text-red-500'}`}>
            {feedback.text}
          </p>
        )}
      </motion.form>

      {/* Wishes List - fixed height, auto-scroll, pause on hover */}
      <div 
        ref={scrollRef}
        className="max-w-md mx-auto h-[320px] overflow-y-auto pr-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .wishes-scroll::-webkit-scrollbar { display: none; }
        `}} />
        {wishes.length === 0 ? (
          <p className="text-center opacity-50 text-sm italic">Belum ada ucapan. Jadilah yang pertama!</p>
        ) : (
          <div className="space-y-0 wishes-scroll">
            <AnimatePresence>
              {wishes.map((wish) => (
                <motion.div 
                  key={wish.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="py-4 border-b border-[#3a5a78]/10 group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <strong className="font-serif text-lg" style={{ color: blueColor }}>{wish.guest_name}</strong>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] opacity-40 uppercase tracking-wider" suppressHydrationWarning>
                        {new Date(wish.created_at).toLocaleDateString('id-ID')}
                      </span>
                      <button
                        onClick={() => setDeleteTarget(wish)}
                        className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity text-red-400 hover:text-red-500"
                        title="Hapus ucapan"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed italic">&ldquo;{wish.message}&rdquo;</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF6F0] p-6 w-full max-w-xs text-center"
            >
              <p className="text-sm text-[#4a463d] mb-1 font-medium">Hapus ucapan dari</p>
              <p className="font-serif text-lg mb-4" style={{ color: blueColor }}>{deleteTarget.guest_name}?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 text-xs uppercase tracking-widest border border-[#3a5a78]/30 text-[#4a463d] hover:bg-[#3a5a78]/5 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 text-xs uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

