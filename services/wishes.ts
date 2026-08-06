import type { Wish } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getWishes(supabase: SupabaseClient): Promise<Wish[]> {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createWish(
  supabase: SupabaseClient,
  wish: Omit<Wish, 'id' | 'created_at'>
): Promise<Wish> {
  const { data, error } = await supabase
    .from('wishes')
    .insert(wish)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteWish(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase
    .from('wishes')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
