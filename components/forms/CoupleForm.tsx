'use client';

import { useState, type FormEvent } from 'react';
import type { Couple } from '@/types';

interface AdminCoupleFormProps {
  couple?: Couple | null;
  onSubmit: (data: { groom_name: string; bride_name: string; groom_description: string; bride_description: string }) => Promise<void>;
  onCancel: () => void;
}

export function AdminCoupleForm({ couple, onSubmit, onCancel }: AdminCoupleFormProps) {
  const [groomName, setGroomName] = useState(couple?.groom_name ?? '');
  const [brideName, setBrideName] = useState(couple?.bride_name ?? '');
  const [groomDescription, setGroomDescription] = useState(couple?.groom_description ?? '');
  const [brideDescription, setBrideDescription] = useState(couple?.bride_description ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        groom_name: groomName,
        bride_name: brideName,
        groom_description: groomDescription,
        bride_description: brideDescription,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form">
      <h3 className="admin-form-title">Couple Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Groom Name</label>
          <input className="form-input" value={groomName} onChange={(e) => setGroomName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">Groom Description</label>
          <textarea className="form-input form-textarea" value={groomDescription} onChange={(e) => setGroomDescription(e.target.value)} rows={3} />
        </div>
        <div className="form-group">
          <label className="form-label">Bride Name</label>
          <input className="form-input" value={brideName} onChange={(e) => setBrideName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">Bride Description</label>
          <textarea className="form-input form-textarea" value={brideDescription} onChange={(e) => setBrideDescription(e.target.value)} rows={3} />
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
