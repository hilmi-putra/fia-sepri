'use client';

import { useState, type FormEvent } from 'react';
import type { Rsvp } from '@/types';

interface AdminRsvpFormProps {
  rsvp?: Rsvp | null;
  onSubmit: (data: { guest_name: string; attendance_status: string; total_guest: number }) => Promise<void>;
  onCancel: () => void;
}

export function AdminRsvpForm({ rsvp, onSubmit, onCancel }: AdminRsvpFormProps) {
  const [guestName, setGuestName] = useState(rsvp?.guest_name ?? '');
  const [attendanceStatus, setAttendanceStatus] = useState(rsvp?.attendance_status ?? 'will_attend');
  const [totalGuest, setTotalGuest] = useState(rsvp?.total_guest ?? 1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ guest_name: guestName, attendance_status: attendanceStatus, total_guest: totalGuest });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form">
      <h3 className="admin-form-title">{rsvp ? 'Edit RSVP' : 'Add RSVP'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Guest Name</label>
          <input className="form-input" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">Attendance Status</label>
          <select className="form-input" value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
            <option value="will_attend">Will Attend</option>
            <option value="unable_to_attend">Unable to Attend</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Total Guests</label>
          <input className="form-input" type="number" min={1} max={10} value={totalGuest} onChange={(e) => setTotalGuest(Number(e.target.value))} />
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
