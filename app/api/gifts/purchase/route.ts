import { createClient } from '@/lib/supabase-server';
import { submitGiftPurchase } from '@/services/gifts';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const gift_id = body.gift_id;
    const buyer_name = (body.buyer_name && body.buyer_name.trim()) ? body.buyer_name.trim() : 'Tamu';
    const whatsapp_number = (body.whatsapp_number && body.whatsapp_number.trim()) ? body.whatsapp_number.trim() : '-';
    const email = body.email || null;
    const quantity = body.quantity || 1;
    let current_total_bought = body.current_total_bought;
    
    if (!gift_id) {
      return NextResponse.json({ 
        error: 'gift_id is required' 
      }, { status: 400 });
    }

    if (current_total_bought === undefined) {
      const { data: giftData } = await supabase
        .from('gift_recommendations')
        .select('total_bought')
        .eq('id', gift_id)
        .single();
      current_total_bought = giftData?.total_bought ?? 0;
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
