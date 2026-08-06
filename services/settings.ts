import type { Setting } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getSettings(supabase: SupabaseClient): Promise<Setting | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateSettings(
  supabase: SupabaseClient,
  id: string,
  updates: Partial<Omit<Setting, 'id' | 'created_at'>>
): Promise<Setting> {
  const { data, error } = await supabase
    .from('settings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function createSettings(
  supabase: SupabaseClient,
  settings: Omit<Setting, 'id' | 'created_at'>
): Promise<Setting> {
  const { data, error } = await supabase
    .from('settings')
    .insert(settings)
    .select()
    .single();
  if (error) throw error;
  return data;
}
