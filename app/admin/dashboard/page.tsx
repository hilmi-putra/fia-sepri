export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { ClipboardList, Gift, Heart, Users } from 'lucide-react';
import { AdminNavbar } from '@/components/dashboard/AdminNavbar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import type { GiftPurchase, GiftRecommendation, Rsvp, Wish } from '@/types';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const [
    { data: rsvps },
    { data: wishes },
    { data: purchases },
    { data: gifts },
  ] = await Promise.all([
    supabase.from('rsvps').select('*').order('created_at', { ascending: false }),
    supabase.from('wishes').select('*').order('created_at', { ascending: false }),
    supabase.from('gift_purchases').select('*').order('created_at', { ascending: false }),
    supabase.from('gift_recommendations').select('*'),
  ]);

  const rsvpRows = (rsvps ?? []) as Rsvp[];
  const wishRows = (wishes ?? []) as Wish[];
  const purchaseRows = (purchases ?? []) as GiftPurchase[];
  const giftRows = (gifts ?? []) as GiftRecommendation[];
  const giftNames = new Map(giftRows.map((gift) => [gift.id, gift.name]));
  const totalAttending = rsvpRows
    ?.filter((r) => r.attendance_status === 'will_attend')
    .reduce((sum, r) => sum + (r.total_guest || 1), 0) ?? 0;

  return (
    <>
      <AdminNavbar title="Admin Dashboard" />
      <div className="admin-content">
        <div className="dashboard-intro">
          <div>
            <p className="section-kicker">Overview</p>
            <h2>Good to see you, admin.</h2>
            <p>Here is the latest activity from the Fia &amp; Sepri invitation.</p>
          </div>
          <div className="dashboard-status"><span className="status-dot" /> Live data</div>
        </div>

        <div className="stats-grid">
          <StatsCard label="Total RSVPs" value={rsvpRows.length} icon={<ClipboardList size={21} />} tone="blue" />
          <StatsCard label="Attending Guests" value={totalAttending} icon={<Users size={21} />} tone="green" />
          <StatsCard label="Wishes" value={wishRows.length} icon={<Heart size={21} />} tone="rose" />
          <StatsCard label="Gift Buyers" value={purchaseRows.length} icon={<Gift size={21} />} tone="gold" />
        </div>

        <section className="data-table-container">
          <div className="data-table-header">
            <h2 className="data-table-title">Gift Purchases ({purchaseRows.length})</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Gift</th>
                  <th>WhatsApp</th>
                  <th>Email</th>
                  <th>Qty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {purchaseRows.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center' }}>Belum ada pembelian hadiah.</td></tr>
                ) : purchaseRows.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{purchase.buyer_name}</td>
                    <td>{giftNames.get(purchase.gift_id) ?? 'Hadiah tidak ditemukan'}</td>
                    <td>{purchase.whatsapp_number}</td>
                    <td>{purchase.email ?? '-'}</td>
                    <td>{purchase.quantity}</td>
                    <td>{formatDate(purchase.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="data-table-container">
          <div className="data-table-header">
            <h2 className="data-table-title">RSVP ({rsvpRows.length})</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Guest</th><th>Status</th><th>Guests</th><th>Date</th></tr></thead>
              <tbody>
                {rsvpRows.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center' }}>Belum ada RSVP.</td></tr>
                ) : rsvpRows.map((rsvp) => (
                  <tr key={rsvp.id}>
                    <td>{rsvp.guest_name}</td>
                    <td>{rsvp.attendance_status === 'will_attend' ? 'Hadir' : 'Tidak hadir'}</td>
                    <td>{rsvp.total_guest}</td>
                    <td>{formatDate(rsvp.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="data-table-container">
          <div className="data-table-header">
            <h2 className="data-table-title">Wishes ({wishRows.length})</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Guest</th><th>Message</th><th>Date</th></tr></thead>
              <tbody>
                {wishRows.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center' }}>Belum ada wishes.</td></tr>
                ) : wishRows.map((wish) => (
                  <tr key={wish.id}>
                    <td>{wish.guest_name}</td>
                    <td>{wish.message ?? '-'}</td>
                    <td>{formatDate(wish.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
