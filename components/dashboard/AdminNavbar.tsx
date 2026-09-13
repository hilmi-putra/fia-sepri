'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase';

interface AdminNavbarProps {
  title: string;
}

export function AdminNavbar({ title }: AdminNavbarProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="admin-navbar">
      <h1 className="admin-navbar-title">{title}</h1>
      <button className="btn btn-secondary btn-sm admin-logout" onClick={handleLogout}>
        <LogOut size={16} strokeWidth={2} />
        <span>Logout</span>
      </button>
    </header>
  );
}
