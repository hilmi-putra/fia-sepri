import { createClient } from '@/lib/supabase-server';
import { getGiftRecommendations } from '@/services/gifts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const gifts = await getGiftRecommendations(supabase);
    return NextResponse.json(gifts);
  } catch (error) {
    console.error('Error fetching gift recommendations:', error);
    return NextResponse.json({ error: 'Failed to fetch gift recommendations' }, { status: 500 });
  }
}
