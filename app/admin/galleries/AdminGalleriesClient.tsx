'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminNavbar } from '@/components/dashboard/AdminNavbar';
import { DataTable } from '@/components/dashboard/DataTable';
import { AdminGalleryForm } from '@/components/forms/GalleryForm';
import { createClient } from '@/lib/supabase';
import type { Gallery } from '@/types';

export default function AdminGalleriesClient() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const supabase = createClient();

  const fetchGalleries = useCallback(async () => {
    const { data } = await supabase
      .from('galleries')
      .select('*')
      .order('created_at', { ascending: false });
    setGalleries(data ?? []);
  }, [supabase]);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const handleAdd = () => {
    setEditingGallery(null);
    setShowForm(true);
  };

  const handleEdit = (gallery: Gallery) => {
    setEditingGallery(gallery);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    await supabase.from('galleries').delete().eq('id', id);
    fetchGalleries();
  };

  const handleSubmit = async (data: { image_url: string; caption: string }) => {
    if (editingGallery) {
      await supabase.from('galleries').update(data).eq('id', editingGallery.id);
    } else {
      await supabase.from('galleries').insert(data);
    }
    setShowForm(false);
    setEditingGallery(null);
    fetchGalleries();
  };

  const columns = [
    {
      key: 'image_url',
      header: 'Preview',
      render: (item: Gallery) => (
        <img
          src={item.image_url}
          alt={item.caption ?? ''}
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
        />
      ),
    },
    { key: 'caption', header: 'Caption' },
    {
      key: 'created_at',
      header: 'Date',
      render: (item: Gallery) => new Date(item.created_at).toLocaleDateString('id-ID'),
    },
  ];

  return (
    <>
      <AdminNavbar title="Gallery Management" />
      <div className="admin-content">
        {showForm && (
          <AdminGalleryForm
            gallery={editingGallery}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingGallery(null); }}
          />
        )}

        <DataTable
          title={`Gallery (${galleries.length})`}
          columns={columns}
          data={galleries}
          onAdd={handleAdd}
          addLabel="Add Photo"
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
