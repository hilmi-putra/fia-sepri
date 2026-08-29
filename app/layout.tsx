import type { Metadata } from 'next';
import { Inter, Lora, Press_Start_2P } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-press-start' });

export const metadata: Metadata = {
  title: 'Fia & Sepri — Wedding Invitation',
  description:
    'Dengan penuh kebahagiaan, Fia & Sepri mengundang Anda untuk menjadi bagian dari momen istimewa dalam perjalanan cinta kami. Kehadiran dan doa terbaik Anda akan menjadi kebahagiaan yang sangat berarti bagi kami.',
  keywords: [
    'wedding',
    'invitation',
    'fia',
    'sepri',
    'pernikahan',
    'undangan',
  ],
  openGraph: {
    title: 'Fia & Sepri — Wedding Invitation',
    description:
      'Dengan penuh kebahagiaan, Fia & Sepri mengundang Anda untuk menjadi bagian dari momen istimewa dalam perjalanan cinta kami. Mari hadir dan rayakan hari bahagia kami bersama.',
    url: 'https://fia-sepri.vercel.app/',
    siteName: 'Fia & Sepri Wedding',
    images: [
      {
        url: 'https://ik.imagekit.io/udvvrj1o2/fia&sepri/cover.jpg?updatedAt=1787319156324',
        width: 1200,
        height: 630,
        alt: 'Fia & Sepri Wedding Cover',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fia & Sepri — Wedding Invitation',
    description:
      'Dengan penuh kebahagiaan, Fia & Sepri mengundang Anda untuk menjadi bagian dari momen istimewa dalam perjalanan cinta kami. Kehadiran dan doa terbaik Anda akan menjadi kebahagiaan yang sangat berarti bagi kami.',
    images: [
      'https://ik.imagekit.io/udvvrj1o2/fia&sepri/cover.jpg?updatedAt=1787319156324',
    ],
  },
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
