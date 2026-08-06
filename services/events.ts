import type { Event } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getEvents(supabase: SupabaseClient): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getEvent(supabase: SupabaseClient, id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createEvent(
  supabase: SupabaseClient,
  event: Omit<Event, 'id' | 'created_at'>
): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEvent(
  supabase: SupabaseClient,
  id: string,
  updates: Partial<Omit<Event, 'id' | 'created_at'>>
): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEvent(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
