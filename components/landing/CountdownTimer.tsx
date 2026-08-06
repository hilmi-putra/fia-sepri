'use client';

import { useCountdown } from '@/hooks/useCountdown';

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
    <section className="countdown-section">
      <div className="container">
        <h2 className="section-title">Save The Date</h2>
        <div className="countdown-grid">
          {items.map((item) => (
            <div key={item.label} className="countdown-item">
              <span className="countdown-value">{item.value}</span>
              <span className="countdown-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
