import { createClient } from '@/lib/supabase-server';
import { getWishes, createWish } from '@/services/wishes';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const wishes = await getWishes(supabase);
    return NextResponse.json(wishes);
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json({ error: 'Failed to fetch wishes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const { guest_name, message } = body;
    
    if (!guest_name || !message) {
      return NextResponse.json({ error: 'guest_name and message are required' }, { status: 400 });
    }
    
    const wish = await createWish(supabase, { guest_name, message });
    return NextResponse.json(wish, { status: 201 });
  } catch (error) {
    console.error('Error creating wish:', error);
    return NextResponse.json({ error: 'Failed to create wish' }, { status: 500 });
  }
}
