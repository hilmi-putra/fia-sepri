export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase-server';
import { AdminNavbar } from '@/components/dashboard/AdminNavbar';
import { StatsCard } from '@/components/dashboard/StatsCard';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: rsvpCount },
    { count: wishCount },
    { count: galleryCount },
    { data: rsvps },
  ] = await Promise.all([
    supabase.from('rsvps').select('*', { count: 'exact', head: true }),
    supabase.from('wishes').select('*', { count: 'exact', head: true }),
    supabase.from('galleries').select('*', { count: 'exact', head: true }),
    supabase.from('rsvps').select('total_guest, attendance_status'),
  ]);

  const totalAttending = rsvps
    ?.filter((r) => r.attendance_status === 'will_attend')
    .reduce((sum, r) => sum + (r.total_guest || 1), 0) ?? 0;

  return (
    <>
      <AdminNavbar title="Dashboard" />
      <div className="admin-content">
        <div className="stats-grid">
          <StatsCard label="Total RSVPs" value={rsvpCount ?? 0} icon="📋" />
          <StatsCard label="Attending Guests" value={totalAttending} icon="✅" />
          <StatsCard label="Wishes" value={wishCount ?? 0} icon="💌" />
          <StatsCard label="Gallery Photos" value={galleryCount ?? 0} icon="🖼️" />
        </div>
      </div>
    </>
  );
}
