'use client';

import { useState, type FormEvent } from 'react';
import type { Gallery } from '@/types';

interface AdminGalleryFormProps {
  gallery?: Gallery | null;
  onSubmit: (data: { image_url: string; caption: string }) => Promise<void>;
  onCancel: () => void;
}

export function AdminGalleryForm({ gallery, onSubmit, onCancel }: AdminGalleryFormProps) {
  const [imageUrl, setImageUrl] = useState(gallery?.image_url ?? '');
  const [caption, setCaption] = useState(gallery?.caption ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ image_url: imageUrl, caption });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form">
      <h3 className="admin-form-title">{gallery ? 'Edit Photo' : 'Add Photo'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input className="form-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." required />
        </div>
        <div className="form-group">
          <label className="form-label">Caption</label>
          <input className="form-input" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Optional caption" />
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
