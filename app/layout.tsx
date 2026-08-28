import type { Metadata } from 'next';
import { Inter, Lora, Press_Start_2P } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-press-start' });

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
    <html lang="id" className={`${inter.variable} ${lora.variable} ${pressStart.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-wedding-neutral text-black">
        {children}
      </body>
    </html>
  );
}
