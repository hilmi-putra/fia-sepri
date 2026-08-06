'use client';

import { useState, type FormEvent } from 'react';
import type { Setting } from '@/types';

interface AdminSettingsFormProps {
  settings?: Setting | null;
  onSubmit: (data: { music_url: string; theme_color: string }) => Promise<void>;
}

export function AdminSettingsForm({ settings, onSubmit }: AdminSettingsFormProps) {
  const [musicUrl, setMusicUrl] = useState(settings?.music_url ?? '');
  const [themeColor, setThemeColor] = useState(settings?.theme_color ?? '#1a365d');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback('');
    try {
      await onSubmit({ music_url: musicUrl, theme_color: themeColor });
      setFeedback('Settings saved successfully!');
    } catch {
      setFeedback('Failed to save settings.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form">
      <h3 className="admin-form-title">Theme & Music Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Background Music URL</label>
          <input className="form-input" value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)} placeholder="https://example.com/music.mp3" />
        </div>
        <div className="form-group">
          <label className="form-label">Theme Color</label>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ width: '48px', height: '40px', border: 'none', cursor: 'pointer' }} />
            <input className="form-input" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ flex: 1 }} />
          </div>
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary btn-sm" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
        {feedback && <p className="form-message success" style={{ marginTop: '1rem' }}>{feedback}</p>}
      </form>
    </div>
  );
}
