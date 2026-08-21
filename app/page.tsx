export const dynamic = 'force-dynamic';

import Image from 'next/image';
import { createClient } from '@/lib/supabase-server';
import { getCouple } from '@/services/couples';
import { getEvents } from '@/services/events';
import { getGalleries } from '@/services/galleries';
import { getWishes } from '@/services/wishes';

import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { StorySection } from '@/components/landing/StorySection';
import { SaveTheDateSection } from '@/components/landing/SaveTheDateSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { RsvpForm } from '@/components/landing/RsvpForm';
import { WishesSection } from '@/components/landing/WishesSection';
import { GiftSection } from '@/components/landing/GiftSection';
import { Footer } from '@/components/landing/Footer';
import { MusicPlayer } from '@/components/landing/MusicPlayer';
import { PageFoldWrapper } from '@/components/landing/PageFoldWrapper';
import { CoverScreen } from '@/components/landing/CoverScreen';

import { Suspense } from 'react';

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
      <Suspense fallback={null}>
        <CoverScreen />
      </Suspense>
      <div className="flex h-screen w-full overflow-hidden bg-ghibli-cream text-ghibli-dark font-sans">
        {/* LEFT SIDE: Fixed Image for Desktop */}
      <div className="hidden lg:block flex-1 relative h-full bg-ghibli-dark z-10">
        <Image
          src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/cover.jpg"
          alt="Fia & Sepri"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        {/* Overlay gradient for aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-ghibli-dark/80 via-transparent to-ghibli-dark/30 pointer-events-none" />
        
        {/* Title overlay on image */}
        <div className="absolute bottom-12 left-12 text-white pointer-events-none drop-shadow-lg">
          <h2 className="text-[11px] tracking-[0.4em] uppercase mb-4 font-medium text-[#d8b76c] drop-shadow-md">The Wedding Of</h2>
          <h1 className="text-6xl md:text-7xl font-serif text-white drop-shadow-lg">Fia & Sepri</h1>
        </div>
      </div>

      {/* RIGHT SIDE: Scrollable Content Wrapper */}
      <div className="w-full lg:w-[500px] shrink-0 h-full overflow-y-auto overflow-x-hidden relative scroll-smooth hide-scrollbar bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.15)] z-20">
        {/* Inner Mobile-sized Container */}
        <main className="w-full relative bg-white">
          <PageFoldWrapper>
            <HeroSection couple={couple} eventDate={firstEventDate} />
            
            <div className="py-16 min-h-screen flex flex-col justify-center items-center bg-[#faf6f0] shadow-sm overflow-hidden">
              <StorySection couple={couple} />
            </div>

            <div className="py-16 min-h-screen flex flex-col justify-center items-center bg-[#faf6f0] shadow-sm overflow-hidden">
              <SaveTheDateSection targetDate={firstEventDate} events={events} />
            </div>

            <div className="py-16 min-h-screen flex flex-col justify-center items-center bg-[#faf6f0] shadow-sm overflow-hidden">
              <GallerySection galleries={galleries} />
            </div>

            <div className="px-6 py-24 flex flex-col items-center bg-[#faf6f0] shadow-sm">
              <GiftSection />
            </div>

            <div className="px-6 py-12 min-h-screen flex flex-col justify-center items-center bg-[#faf6f0] shadow-sm">
              <RsvpForm />
            </div>

            <div className="px-6 py-12 min-h-screen flex flex-col justify-center items-center bg-[#faf6f0] shadow-sm pb-24">
              <WishesSection initialWishes={wishes} />
            </div>

            <div className="min-h-screen flex flex-col justify-end bg-white">
              <Footer />
            </div>
          </PageFoldWrapper>
        </main>

        <MusicPlayer />
      </div>
    </div>
    </>
  );
}
