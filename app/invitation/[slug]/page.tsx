export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase-server';
import { getCouple } from '@/services/couples';
import { getEvents } from '@/services/events';
import { getGalleries } from '@/services/galleries';
import { getWishes } from '@/services/wishes';
import { Navbar } from '@/components/landing/Navbar';
import { GameContainer } from '@/components/game/GameContainer';

interface InvitationPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;
  const guestName = decodeURIComponent(slug).replace(/-/g, ' ');

  const supabase = await createClient();

  const [couple, events, galleries, wishes] = await Promise.all([
    getCouple(supabase).catch(() => null),
    getEvents(supabase).catch(() => []),
    getGalleries(supabase).catch(() => []),
    getWishes(supabase).catch(() => []),
  ]);

  const firstEventDate = events.length > 0 ? events[0].event_date : null;

  return (
    <>
      <Navbar />
      <main>
        <GameContainer 
          guestName={guestName} 
          couple={couple} 
          events={events} 
          galleries={galleries} 
          wishes={wishes} 
        />
      </main>
    </>
  );
}
