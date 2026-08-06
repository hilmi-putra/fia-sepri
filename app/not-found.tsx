import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div>
        <h1 style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
          404
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>
          Halaman tidak ditemukan.
        </p>
        <Link
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            borderRadius: '8px',
            fontWeight: 600,
          }}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
