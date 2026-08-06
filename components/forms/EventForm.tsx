'use client';

import { useState, type FormEvent } from 'react';
import type { Event } from '@/types';

interface AdminEventFormProps {
  event?: Event | null;
  onSubmit: (data: { title: string; event_type: string; location: string; address: string; event_date: string }) => Promise<void>;
  onCancel: () => void;
}

export function AdminEventForm({ event, onSubmit, onCancel }: AdminEventFormProps) {
  const [title, setTitle] = useState(event?.title ?? '');
  const [eventType, setEventType] = useState(event?.event_type ?? 'akad');
  const [location, setLocation] = useState(event?.location ?? '');
  const [address, setAddress] = useState(event?.address ?? '');
  const [eventDate, setEventDate] = useState(
    event?.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        title,
        event_type: eventType,
        location,
        address,
        event_date: eventDate ? new Date(eventDate).toISOString() : '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form">
      <h3 className="admin-form-title">{event ? 'Edit Event' : 'Add Event'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">Event Type</label>
          <select className="form-input" value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="akad">Akad Nikah</option>
            <option value="resepsi">Resepsi</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input className="form-input" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Date & Time</label>
          <input className="form-input" type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
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
