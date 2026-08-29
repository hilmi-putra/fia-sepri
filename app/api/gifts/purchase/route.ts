import { createClient } from '@/lib/supabase-server';
import { submitGiftPurchase } from '@/services/gifts';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const { gift_id, buyer_name, whatsapp_number, email, quantity, current_total_bought } = body;
    
    if (!gift_id || !buyer_name || !whatsapp_number || !quantity || current_total_bought === undefined) {
      return NextResponse.json({ 
        error: 'gift_id, buyer_name, whatsapp_number, quantity, and current_total_bought are required' 
      }, { status: 400 });
    }
    
    const purchase = await submitGiftPurchase(
      supabase, 
      { gift_id, buyer_name, whatsapp_number, email, quantity },
      current_total_bought
    );
    
    return NextResponse.json(purchase, { status: 201 });
  } catch (error) {
    console.error('Error creating gift purchase:', error);
    return NextResponse.json({ error: 'Failed to create gift purchase' }, { status: 500 });
  }
}
