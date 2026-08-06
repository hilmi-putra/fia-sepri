'use client';

import { useState, type FormEvent } from 'react';

interface AdminWishFormProps {
  onSubmit: (data: { guest_name: string; message: string }) => Promise<void>;
  onCancel: () => void;
}

export function AdminWishForm({ onSubmit, onCancel }: AdminWishFormProps) {
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ guest_name: guestName, message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form">
      <h3 className="admin-form-title">Add Wish</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Guest Name</label>
          <input className="form-input" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea className="form-input form-textarea" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required />
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary btn-sm" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
