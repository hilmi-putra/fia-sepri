'use client';

import type { Event } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface EventSectionProps {
  events: Event[];
}

export function EventSection({ events }: EventSectionProps) {
  return (
    <section id="events" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h2 className="font-serif text-3xl text-ghibli-blue mb-2">Wedding Events</h2>
        <p className="text-sm text-ghibli-dark/60 font-light">Join us to celebrate our special day</p>
      </motion.div>

      <div className="space-y-8">
        {events.length === 0 ? (
          <p className="text-center text-ghibli-dark/50">No events scheduled yet.</p>
        ) : (
          events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-ghibli-blue/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-ghibli-gold opacity-80" />
              
              <h3 className="font-serif text-2xl text-ghibli-dark mb-6">{event.title}</h3>
              
              <div className="space-y-4 text-sm text-ghibli-dark/80">
                {event.event_date && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-ghibli-blue/10 flex items-center justify-center text-ghibli-blue">
                      <Calendar size={16} />
                    </div>
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                )}
                
                {event.event_date && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-ghibli-blue/10 flex items-center justify-center text-ghibli-blue">
                      <Clock size={16} />
                    </div>
                    <span>{formatTime(event.event_date)} WIB</span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-ghibli-blue/10 flex items-center justify-center text-ghibli-blue shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-ghibli-dark">{event.location}</span>
                      {event.address && <span className="text-xs text-ghibli-dark/60 mt-1 leading-relaxed">{event.address}</span>}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-ghibli-dark/5">
                <a 
                  href="#" 
                  className="block w-full py-3 px-4 bg-ghibli-blue text-white rounded-xl text-center text-sm font-medium hover:bg-ghibli-blue/90 transition-colors shadow-md shadow-ghibli-blue/20"
                >
                  View on Google Maps
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
