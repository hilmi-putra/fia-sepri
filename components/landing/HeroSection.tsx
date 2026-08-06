import type { Couple } from '@/types';
import { formatDate } from '@/lib/utils';

interface HeroSectionProps {
  couple: Couple | null;
  eventDate: string | null;
  guestName?: string;
}

export function HeroSection({ couple, eventDate, guestName }: HeroSectionProps) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content">
        {guestName && (
          <p className="hero-invitation">
            Dear <strong>{guestName}</strong>, you are invited
          </p>
        )}
        <p className="hero-subtitle">The Wedding of</p>
        <h1 className="hero-title">
          {couple?.groom_name ?? 'Sepri'} <span className="hero-ampersand">&</span> {couple?.bride_name ?? 'Fia'}
        </h1>
        {eventDate && (
          <p className="hero-date">{formatDate(eventDate)}</p>
        )}
      </div>
    </section>
  );
}
