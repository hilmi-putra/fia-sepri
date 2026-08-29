export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase-server';
import { getCouple } from '@/services/couples';
import { getEvents } from '@/services/events';
import { getGalleries } from '@/services/galleries';
import { getWishes } from '@/services/wishes';
import { GameContainer } from '@/components/game/GameContainer';

export default async function HomePage() {
  const supabase = await createClient();

  const [couple, events, galleries, wishes] = await Promise.all([
    getCouple(supabase).catch(() => null),
    getEvents(supabase).catch(() => []),
    getGalleries(supabase).catch(() => []),
    getWishes(supabase).catch(() => []),
  ]);

  // Guest name can be empty or 'Tamu' for the root page
  const guestName = 'Guest'; 

  return (
    <main>
      <GameContainer 
        guestName={guestName} 
        couple={couple} 
        events={events} 
        galleries={galleries} 
        wishes={wishes} 
      />
    </main>
  );
}
