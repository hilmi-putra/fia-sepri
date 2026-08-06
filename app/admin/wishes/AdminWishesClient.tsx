'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminNavbar } from '@/components/dashboard/AdminNavbar';
import { DataTable } from '@/components/dashboard/DataTable';
import { AdminWishForm } from '@/components/forms/WishForm';
import { createClient } from '@/lib/supabase';
import type { Wish } from '@/types';
import { truncate } from '@/lib/utils';

export default function AdminWishesClient() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClient();

  const fetchWishes = useCallback(async () => {
    const { data } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });
    setWishes(data ?? []);
  }, [supabase]);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this wish?')) return;
    await supabase.from('wishes').delete().eq('id', id);
    fetchWishes();
  };

  const handleSubmit = async (data: { guest_name: string; message: string }) => {
    await supabase.from('wishes').insert(data);
    setShowForm(false);
    fetchWishes();
  };

  const columns = [
    { key: 'guest_name', header: 'Guest Name' },
    {
      key: 'message',
      header: 'Message',
      render: (item: Wish) => truncate(item.message ?? '', 60),
    },
    {
      key: 'created_at',
      header: 'Date',
      render: (item: Wish) => new Date(item.created_at).toLocaleDateString('id-ID'),
    },
  ];

  return (
    <>
      <AdminNavbar title="Wishes Management" />
      <div className="admin-content">
        {showForm && (
          <AdminWishForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        <DataTable
          title={`Wishes (${wishes.length})`}
          columns={columns}
          data={wishes}
          onAdd={() => setShowForm(true)}
          addLabel="Add Wish"
          renderActions={(item) => (
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          )}
        />
      </div>
    </>
  );
}
