'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminNavbar } from '@/components/dashboard/AdminNavbar';
import { DataTable } from '@/components/dashboard/DataTable';
import { AdminRsvpForm } from '@/components/forms/RsvpForm';
import { createClient } from '@/lib/supabase';
import type { Rsvp } from '@/types';

export default function AdminRsvpsClient() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRsvp, setEditingRsvp] = useState<Rsvp | null>(null);
  const supabase = createClient();

  const fetchRsvps = useCallback(async () => {
    const { data } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });
    setRsvps(data ?? []);
  }, [supabase]);

  useEffect(() => {
    fetchRsvps();
  }, [fetchRsvps]);

  const handleAdd = () => {
    setEditingRsvp(null);
    setShowForm(true);
  };

  const handleEdit = (rsvp: Rsvp) => {
    setEditingRsvp(rsvp);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this RSVP?')) return;
    await supabase.from('rsvps').delete().eq('id', id);
    fetchRsvps();
  };

  const handleSubmit = async (data: { guest_name: string; attendance_status: string; total_guest: number }) => {
    if (editingRsvp) {
      await supabase.from('rsvps').update(data).eq('id', editingRsvp.id);
    } else {
      await supabase.from('rsvps').insert(data);
    }
    setShowForm(false);
    setEditingRsvp(null);
    fetchRsvps();
  };

  const columns = [
    { key: 'guest_name', header: 'Guest Name' },
    {
      key: 'attendance_status',
      header: 'Status',
      render: (item: Rsvp) => (
        <span style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 600,
          backgroundColor: item.attendance_status === 'will_attend' ? '#f0fff4' : '#fff5f5',
          color: item.attendance_status === 'will_attend' ? '#38a169' : '#e53e3e',
        }}>
          {item.attendance_status === 'will_attend' ? 'Attending' : 'Not Attending'}
        </span>
      ),
    },
    { key: 'total_guest', header: 'Guests' },
    {
      key: 'created_at',
      header: 'Date',
      render: (item: Rsvp) => new Date(item.created_at).toLocaleDateString('id-ID'),
    },
  ];

  return (
    <>
      <AdminNavbar title="RSVP Management" />
      <div className="admin-content">
        {showForm && (
          <AdminRsvpForm
            rsvp={editingRsvp}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingRsvp(null); }}
          />
        )}

        <DataTable
          title={`RSVPs (${rsvps.length})`}
          columns={columns}
          data={rsvps}
          onAdd={handleAdd}
          addLabel="Add RSVP"
          renderActions={(item) => (
            <>
              <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
            </>
          )}
        />
      </div>
    </>
  );
}
