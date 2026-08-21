'use client';

import { useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

export function RsvpForm() {
  const [guestName, setGuestName] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('will_attend');
  const [totalGuest, setTotalGuest] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('rsvps').insert({
        guest_name: guestName.trim(),
        attendance_status: attendanceStatus,
        total_guest: attendanceStatus === 'will_attend' ? totalGuest : 0,
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'RSVP berhasil dikirim! Terima kasih.' });
      setGuestName('');
      setAttendanceStatus('will_attend');
      setTotalGuest(1);
    } catch {
      setMessage({ type: 'error', text: 'Gagal mengirim RSVP. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Using a custom dark blue color for the minimalist design
  const blueColor = '#3a5a78';

  return (
    <section id="rsvp" className="relative w-full max-w-md mx-auto px-6 py-10 text-[#4a463d]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className={`${dancingScript.className} text-5xl mb-4`} style={{ color: blueColor }}>
          Konfirmasi Kehadiran
        </h2>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit} 
        className="space-y-8"
      >
        {/* Name Input */}
        <div>
          <input
            type="text"
            className="w-full bg-transparent border-b border-[#3a5a78]/40 focus:border-[#3a5a78] px-2 py-3 text-sm focus:outline-none transition-colors placeholder:text-[#3a5a78]/50"
            placeholder="Nama Lengkap"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>

        {/* Custom Checkboxes for Attendance */}
        <div className="space-y-4 pt-2">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className={`w-5 h-5 flex items-center justify-center border transition-colors ${attendanceStatus === 'will_attend' ? 'border-[#3a5a78] bg-[#3a5a78]' : 'border-[#3a5a78]/40'}`}>
               {attendanceStatus === 'will_attend' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
            <span className="text-sm text-[#4a463d]">Ya, Saya Hadir</span>
            <input 
              type="radio" 
              name="attendance" 
              value="will_attend" 
              checked={attendanceStatus === 'will_attend'} 
              onChange={() => setAttendanceStatus('will_attend')} 
              className="hidden" 
            />
          </label>
          
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className={`w-5 h-5 flex items-center justify-center border transition-colors ${attendanceStatus === 'unable_to_attend' ? 'border-[#3a5a78] bg-[#3a5a78]' : 'border-[#3a5a78]/40'}`}>
               {attendanceStatus === 'unable_to_attend' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
            <span className="text-sm text-[#4a463d]">Maaf, Tidak Bisa Hadir</span>
            <input 
              type="radio" 
              name="attendance" 
              value="unable_to_attend" 
              checked={attendanceStatus === 'unable_to_attend'} 
              onChange={() => setAttendanceStatus('unable_to_attend')} 
              className="hidden" 
            />
          </label>
        </div>

        {/* Number of Guests (Only show if attending) */}
        {attendanceStatus === 'will_attend' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-2"
          >
            <p className="text-[10px] uppercase tracking-widest text-[#3a5a78]/60 mb-3">Jumlah Tamu</p>
            <div className="flex items-center justify-center gap-6 border-b border-[#3a5a78]/40 pb-4">
              <button
                type="button"
                onClick={() => setTotalGuest(prev => Math.max(1, prev - 1))}
                disabled={totalGuest <= 1}
                className="w-10 h-10 flex items-center justify-center border border-[#3a5a78]/40 text-[#3a5a78] text-xl font-light hover:bg-[#3a5a78]/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                −
              </button>
              <span className="text-2xl font-serif w-8 text-center" style={{ color: '#3a5a78' }}>
                {totalGuest}
              </span>
              <button
                type="button"
                onClick={() => setTotalGuest(prev => Math.min(3, prev + 1))}
                disabled={totalGuest >= 3}
                className="w-10 h-10 flex items-center justify-center border border-[#3a5a78]/40 text-[#3a5a78] text-xl font-light hover:bg-[#3a5a78]/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                +
              </button>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-4 text-white text-sm tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: blueColor }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim'}
        </button>

        {/* Status Message */}
        {message && (
          <p className={`text-center text-sm p-3 border mt-4 ${message.type === 'success' ? 'border-[#3a5a78] text-[#3a5a78]' : 'border-red-400 text-red-500'}`}>
            {message.text}
          </p>
        )}
      </motion.form>
    </section>
  );
}
