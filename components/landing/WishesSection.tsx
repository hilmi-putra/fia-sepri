'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase';
import type { Wish } from '@/types';

interface WishesSectionProps {
  initialWishes: Wish[];
}

export function WishesSection({ initialWishes }: WishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createClient();

  // Real-time subscription for new wishes
  useEffect(() => {
    const channel = supabase
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          setWishes((prev) => [payload.new as Wish, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const { error } = await supabase.from('wishes').insert({
        guest_name: guestName.trim(),
        message: message.trim(),
      });

      if (error) throw error;

      setFeedback({ type: 'success', text: 'Ucapan berhasil dikirim! Terima kasih.' });
      setGuestName('');
      setMessage('');
    } catch {
      setFeedback({ type: 'error', text: 'Gagal mengirim ucapan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="section">
      <div className="container">
        <h2 className="section-title">Wedding Wishes</h2>
        <p className="section-subtitle">Kirimkan doa dan ucapan untuk pengantin</p>

        <form onSubmit={handleSubmit} className="form wishes-form">
          <div className="form-group">
            <label htmlFor="wish-name" className="form-label">Nama</label>
            <input
              id="wish-name"
              type="text"
              className="form-input"
              placeholder="Masukkan nama Anda"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="wish-message" className="form-label">Ucapan</label>
            <textarea
              id="wish-message"
              className="form-input form-textarea"
              placeholder="Tulis ucapan Anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>

          {feedback && (
            <p className={`form-message ${feedback.type}`}>
              {feedback.text}
            </p>
          )}
        </form>

        <div className="wishes-list">
          {wishes.length === 0 ? (
            <p className="text-center text-muted">Belum ada ucapan.</p>
          ) : (
            wishes.map((wish) => (
              <div key={wish.id} className="wish-card">
                <div className="wish-header">
                  <strong className="wish-name">{wish.guest_name}</strong>
                  <span className="wish-date">
                    {new Date(wish.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="wish-message">{wish.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
