import type { Event } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';

interface EventSectionProps {
  events: Event[];
}

export function EventSection({ events }: EventSectionProps) {
  return (
    <section id="events" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Wedding Events</h2>
        <div className="events-grid">
          {events.length === 0 ? (
            <p className="text-center text-muted">No events scheduled yet.</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-icon">
                  {event.event_type === 'akad' ? '🕌' : '🎉'}
                </div>
                <h3 className="event-title">{event.title}</h3>
                {event.event_date && (
                  <>
                    <p className="event-date">{formatDate(event.event_date)}</p>
                    <p className="event-time">{formatTime(event.event_date)} WIB</p>
                  </>
                )}
                {event.location && (
                  <p className="event-location">📍 {event.location}</p>
                )}
                {event.address && (
                  <p className="event-address">{event.address}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
