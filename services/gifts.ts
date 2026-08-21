import type { GiftRecommendation, GiftPurchase } from '@/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getGiftRecommendations(supabase: SupabaseClient): Promise<GiftRecommendation[]> {
  const { data, error } = await supabase
    .from('gift_recommendations')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function submitGiftPurchase(
  supabase: SupabaseClient,
  purchase: Omit<GiftPurchase, 'id' | 'created_at'>,
  currentTotalBought: number
): Promise<GiftPurchase> {
  // 1. Insert the purchase record
  const { data: newPurchase, error: purchaseError } = await supabase
    .from('gift_purchases')
    .insert(purchase)
    .select()
    .single();
    
  if (purchaseError) throw purchaseError;

  // 2. Update the total_bought in gift_recommendations
  const { error: updateError } = await supabase
    .from('gift_recommendations')
    .update({ total_bought: currentTotalBought + purchase.quantity })
    .eq('id', purchase.gift_id);
    
  if (updateError) throw updateError;

  return newPurchase;
}
