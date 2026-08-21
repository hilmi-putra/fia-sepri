'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const items = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ];

  return (
    <section className="text-center bg-ghibli-blue/10 rounded-[2rem] py-12 px-6 shadow-sm border border-ghibli-blue/20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-serif text-3xl text-ghibli-blue mb-8">Save The Date</h2>
        
        <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
          {items.map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-ghibli-blue/5"
            >
              <span className="text-2xl font-serif text-ghibli-dark">{item.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-ghibli-dark/60 mt-1">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
