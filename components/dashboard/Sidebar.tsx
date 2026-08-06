'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/admin/rsvps', icon: '📋', label: 'RSVPs' },
  { href: '/admin/wishes', icon: '💌', label: 'Wishes' },
  { href: '/admin/galleries', icon: '🖼️', label: 'Gallery' },
  { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Link href="/admin/dashboard">🎊 Admin Panel</Link>
      </div>

      <ul className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn('sidebar-link', pathname === item.href && 'active')}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <Link href="/" className="sidebar-link">
          <span className="sidebar-link-icon">🌐</span>
          View Site
        </Link>
      </div>
    </aside>
  );
}
