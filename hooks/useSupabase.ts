'use client';

import { useMemo } from 'react';
import { createClient } from '@/lib/supabase';

export function useSupabase() {
  const supabase = useMemo(() => createClient(), []);
  return supabase;
}
