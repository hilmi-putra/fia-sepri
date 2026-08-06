import type { Gallery } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getGalleries(supabase: SupabaseClient): Promise<Gallery[]> {
  const { data, error } = await supabase
    .from('galleries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createGallery(
  supabase: SupabaseClient,
  gallery: Omit<Gallery, 'id' | 'created_at'>
): Promise<Gallery> {
  const { data, error } = await supabase
    .from('galleries')
    .insert(gallery)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateGallery(
  supabase: SupabaseClient,
  id: string,
  updates: Partial<Omit<Gallery, 'id' | 'created_at'>>
): Promise<Gallery> {
  const { data, error } = await supabase
    .from('galleries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteGallery(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase
    .from('galleries')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
