'use client';

import { useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase';

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
        total_guest: totalGuest,
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

  return (
    <section id="rsvp" className="section section-alt">
      <div className="container">
        <h2 className="section-title">RSVP</h2>
        <p className="section-subtitle">Konfirmasi kehadiran Anda</p>

        <form onSubmit={handleSubmit} className="form rsvp-form">
          <div className="form-group">
            <label htmlFor="rsvp-name" className="form-label">Nama Lengkap</label>
            <input
              id="rsvp-name"
              type="text"
              className="form-input"
              placeholder="Masukkan nama Anda"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rsvp-status" className="form-label">Kehadiran</label>
            <select
              id="rsvp-status"
              className="form-input"
              value={attendanceStatus}
              onChange={(e) => setAttendanceStatus(e.target.value)}
            >
              <option value="will_attend">Hadir</option>
              <option value="unable_to_attend">Tidak Hadir</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rsvp-guests" className="form-label">Jumlah Tamu</label>
            <input
              id="rsvp-guests"
              type="number"
              className="form-input"
              min={1}
              max={5}
              value={totalGuest}
              onChange={(e) => setTotalGuest(Number(e.target.value))}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Mengirim...' : 'Kirim RSVP'}
          </button>

          {message && (
            <p className={`form-message ${message.type}`}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
