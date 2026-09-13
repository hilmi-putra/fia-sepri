import type { ReactNode } from 'react';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  tone?: 'blue' | 'green' | 'rose' | 'gold';
}

export function StatsCard({ label, value, icon, tone = 'blue' }: StatsCardProps) {
  return (
    <div className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-top">
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
        </div>
        <span className="stat-icon">{icon}</span>
      </div>
    </div>
  );
}
