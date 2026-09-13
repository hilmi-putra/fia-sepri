'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Link href="/admin/dashboard" className="sidebar-brand-link">
          <span className="sidebar-brand-mark"><ShieldCheck size={18} strokeWidth={2.2} /></span>
          <span>
            <strong>Fia &amp; Sepri</strong>
            <small>Wedding admin</small>
          </span>
        </Link>
      </div>

      <ul className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn('sidebar-link', pathname === item.href && 'active')}
            >
              <span className="sidebar-link-icon"><item.icon size={18} strokeWidth={2} /></span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <Link href="/" className="sidebar-link">
          <span className="sidebar-link-icon"><ExternalLink size={17} strokeWidth={2} /></span>
          View Site
        </Link>
      </div>
    </aside>
  );
}
