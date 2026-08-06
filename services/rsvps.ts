import type { Rsvp } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getRsvps(supabase: SupabaseClient): Promise<Rsvp[]> {
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getRsvp(supabase: SupabaseClient, id: string): Promise<Rsvp | null> {
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createRsvp(
  supabase: SupabaseClient,
  rsvp: Omit<Rsvp, 'id' | 'created_at'>
): Promise<Rsvp> {
  const { data, error } = await supabase
    .from('rsvps')
    .insert(rsvp)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateRsvp(
  supabase: SupabaseClient,
  id: string,
  updates: Partial<Omit<Rsvp, 'id' | 'created_at'>>
): Promise<Rsvp> {
  const { data, error } = await supabase
    .from('rsvps')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteRsvp(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase
    .from('rsvps')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
