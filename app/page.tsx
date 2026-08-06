export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase-server';
import { getCouple } from '@/services/couples';
import { getEvents } from '@/services/events';
import { getGalleries } from '@/services/galleries';
import { getWishes } from '@/services/wishes';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { StorySection } from '@/components/landing/StorySection';
import { EventSection } from '@/components/landing/EventSection';
import { CountdownTimer } from '@/components/landing/CountdownTimer';
import { GallerySection } from '@/components/landing/GallerySection';
import { RsvpForm } from '@/components/landing/RsvpForm';
import { WishesSection } from '@/components/landing/WishesSection';
import { GiftSection } from '@/components/landing/GiftSection';
import { Footer } from '@/components/landing/Footer';

export default async function HomePage() {
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
        <HeroSection couple={couple} eventDate={firstEventDate} />
        <StorySection couple={couple} />
        <EventSection events={events} />
        {firstEventDate && <CountdownTimer targetDate={firstEventDate} />}
        <GallerySection galleries={galleries} />
        <RsvpForm />
        <WishesSection initialWishes={wishes} />
        <GiftSection />
      </main>
      <Footer />
    </>
  );
}
