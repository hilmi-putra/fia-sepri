import type { Couple } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getCouples(supabase: SupabaseClient): Promise<Couple[]> {
  const { data, error } = await supabase
    .from('couples')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getCouple(supabase: SupabaseClient): Promise<Couple | null> {
  const { data, error } = await supabase
    .from('couples')
    .select('*')
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function createCouple(
  supabase: SupabaseClient,
  couple: Omit<Couple, 'id' | 'created_at' | 'updated_at'>
): Promise<Couple> {
  const { data, error } = await supabase
    .from('couples')
    .insert(couple)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCouple(
  supabase: SupabaseClient,
  id: string,
  updates: Partial<Omit<Couple, 'id' | 'created_at'>>
): Promise<Couple> {
  const { data, error } = await supabase
    .from('couples')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
