import { createClient } from '@/lib/supabase-server';
import { getRsvps, createRsvp } from '@/services/rsvps';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const rsvps = await getRsvps(supabase);
    return NextResponse.json(rsvps);
  } catch (error) {
    console.error('Error fetching rsvps:', error);
    return NextResponse.json({ error: 'Failed to fetch rsvps' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const { guest_name, attendance_status, total_guest } = body;
    
    if (!guest_name || !attendance_status) {
      return NextResponse.json({ error: 'guest_name and attendance_status are required' }, { status: 400 });
    }
    
    const rsvp = await createRsvp(supabase, { 
      guest_name, 
      attendance_status,
      total_guest: total_guest || 1
    });
    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    console.error('Error creating rsvp:', error);
    return NextResponse.json({ error: 'Failed to create rsvp' }, { status: 500 });
  }
}
