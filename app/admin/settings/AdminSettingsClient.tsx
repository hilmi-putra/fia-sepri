'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminNavbar } from '@/components/dashboard/AdminNavbar';
import { AdminCoupleForm } from '@/components/forms/CoupleForm';
import { AdminEventForm } from '@/components/forms/EventForm';
import { AdminSettingsForm } from '@/components/forms/SettingsForm';
import { DataTable } from '@/components/dashboard/DataTable';
import { createClient } from '@/lib/supabase';
import { formatDateTime } from '@/lib/utils';
import type { Couple, Event, Setting } from '@/types';

export default function AdminSettingsClient() {
  const [couple, setCouple] = useState<Couple | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [settings, setSettings] = useState<Setting | null>(null);
  const [showCoupleForm, setShowCoupleForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    const [coupleRes, eventsRes, settingsRes] = await Promise.all([
      supabase.from('couples').select('*').limit(1).single(),
      supabase.from('events').select('*').order('event_date', { ascending: true }),
      supabase.from('settings').select('*').limit(1).single(),
    ]);
    setCouple(coupleRes.data);
    setEvents(eventsRes.data ?? []);
    setSettings(settingsRes.data);
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCoupleSubmit = async (data: { groom_name: string; bride_name: string; groom_description: string; bride_description: string }) => {
    if (couple) {
      await supabase.from('couples').update({ ...data, updated_at: new Date().toISOString() }).eq('id', couple.id);
    } else {
      await supabase.from('couples').insert(data);
    }
    setShowCoupleForm(false);
    fetchData();
  };

  const handleEventSubmit = async (data: { title: string; event_type: string; location: string; address: string; event_date: string }) => {
    if (editingEvent) {
      await supabase.from('events').update(data).eq('id', editingEvent.id);
    } else {
      await supabase.from('events').insert(data);
    }
    setShowEventForm(false);
    setEditingEvent(null);
    fetchData();
  };

  const handleEventDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    fetchData();
  };

  const handleSettingsSubmit = async (data: { music_url: string; theme_color: string }) => {
    if (settings) {
      await supabase.from('settings').update(data).eq('id', settings.id);
    } else {
      await supabase.from('settings').insert(data);
    }
    fetchData();
  };

  const eventColumns = [
    { key: 'title', header: 'Title' },
    { key: 'event_type', header: 'Type' },
    { key: 'location', header: 'Location' },
    {
      key: 'event_date',
      header: 'Date',
      render: (item: Event) => formatDateTime(item.event_date),
    },
  ];

  return (
    <>
      <AdminNavbar title="Settings" />
      <div className="admin-content">
        {/* Couple Settings */}
        <div style={{ marginBottom: '2rem' }}>
          {showCoupleForm ? (
            <AdminCoupleForm
              couple={couple}
              onSubmit={handleCoupleSubmit}
              onCancel={() => setShowCoupleForm(false)}
            />
          ) : (
            <div className="admin-form">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="admin-form-title" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>Couple Info</h3>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowCoupleForm(true)}>Edit</button>
              </div>
              {couple ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>Groom</p>
                    <p>{couple.groom_name}</p>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.875rem' }}>{couple.groom_description}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600 }}>Bride</p>
                    <p>{couple.bride_name}</p>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.875rem' }}>{couple.bride_description}</p>
                  </div>
                </div>
              ) : (
                <p style={{ color: 'var(--color-text-muted)' }}>No couple data yet. Click Edit to add.</p>
              )}
            </div>
          )}
        </div>

        {/* Events */}
        <div style={{ marginBottom: '2rem' }}>
          {showEventForm && (
            <AdminEventForm
              event={editingEvent}
              onSubmit={handleEventSubmit}
              onCancel={() => { setShowEventForm(false); setEditingEvent(null); }}
            />
          )}
          <DataTable
            title="Events"
            columns={eventColumns}
            data={events}
            onAdd={() => { setEditingEvent(null); setShowEventForm(true); }}
            addLabel="Add Event"
            renderActions={(item) => (
              <>
                <button className="btn btn-secondary btn-sm" onClick={() => { setEditingEvent(item); setShowEventForm(true); }}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEventDelete(item.id)}>Delete</button>
              </>
            )}
          />
        </div>

        {/* Theme & Music */}
        <AdminSettingsForm settings={settings} onSubmit={handleSettingsSubmit} />
      </div>
    </>
  );
}
