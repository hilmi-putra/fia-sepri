import { createClient } from '@/lib/supabase-server';
import { deleteWish } from '@/services/wishes';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    await deleteWish(supabase, id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Wish deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting wish:', error);
    return NextResponse.json(
      { error: 'Failed to delete wish' }, 
      { status: 500 }
    );
  }
}