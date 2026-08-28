'use client';

import { motion } from 'framer-motion';
import { RsvpForm } from '../../landing/RsvpForm';

interface BigDayCardProps {
  onBack: () => void;
  events: any[];
  wishes: any[];
}

export function BigDayCard({ onBack, events, wishes }: BigDayCardProps) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 font-pixel"
    >
      <div className="bg-[#F7F2E6] w-full max-w-3xl h-[88vh] flex flex-col border-[6px] border-[#3e2723] p-6 md:p-8 rounded-xl shadow-[10px_10px_0_#a1887f] relative">
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 bg-[#C8A66B] text-[#3e2723] px-3 py-1 font-bold border-[3px] border-[#3e2723] shadow-[3px_3px_0_#3e2723] hover:bg-[#b59257] z-10"
        >
          X
        </button>
        
        <h2 className="text-xl md:text-2xl text-center mb-6 text-[#3e2723] border-b-[3px] border-[#3e2723] pb-3 uppercase tracking-wider">
          THE BIG DAY
        </h2>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6 font-sans">
          
          {/* Details & Location */}
          <section className="bg-white p-5 border-[3px] border-[#3e2723]/30 rounded-xl shadow-sm">
            <h3 className="font-pixel text-sm md:text-base mb-4 text-center text-[#3e2723] uppercase">Wedding Details</h3>
            
            {events && events.length > 0 ? (
              events.map((event, idx) => (
                <div key={idx} className="mb-4 text-center">
                  <h4 className="font-bold text-lg text-[#3e2723]">{event.title}</h4>
                  <p className="mt-2 text-sm text-[#5d4037]">{new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-[#5d4037] font-semibold">{event.start_time} - {event.end_time || 'Selesai'}</p>
                  <p className="mt-2 text-sm text-[#3e2723] font-medium">{event.location_name}</p>
                  <p className="text-xs text-gray-600 mb-2">{event.location_address}</p>
                  {event.location_map_url && (
                    <a 
                      href={event.location_map_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-2 font-pixel text-xs bg-[#C8A66B] text-[#3e2723] font-bold px-4 py-2 border-[2px] border-[#3e2723] shadow-[3px_3px_0_#3e2723] hover:bg-[#b59257] rounded"
                    >
                      OPEN MAP
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">Details coming soon...</p>
            )}
          </section>

          {/* RSVP Form */}
          <section className="bg-white p-5 border-[3px] border-[#3e2723]/30 rounded-xl shadow-sm">
            <h3 className="font-pixel text-sm md:text-base mb-4 text-center text-[#3e2723] uppercase">RSVP</h3>
            <div className="max-w-md mx-auto">
              <RsvpForm />
            </div>
          </section>

        </div>
      </div>
    </motion.div>
  );
}
