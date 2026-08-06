import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fia & Sepri — Wedding Invitation',
  description: 'Anda diundang untuk merayakan pernikahan Fia & Sepri. Konfirmasi kehadiran Anda melalui undangan digital ini.',
  keywords: ['wedding', 'invitation', 'fia', 'sepri', 'pernikahan', 'undangan'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
