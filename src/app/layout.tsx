import type { Metadata } from 'next';
import { IBM_Plex_Sans, Lato } from 'next/font/google';
import './globals.css';

import GlobalLoader from '@/components/GlobalLoader'; // ⬅️ Tambahkan ini

// Body → IBM Plex Sans
const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// Heading → Lato
const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Laptimize',
  description: 'Website metode AHP pemilihan laptop terbaik',
  icons: {
    icon: '/laptop.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${ibmPlexSans.variable} ${lato.variable}`}>
      <body className='antialiased relative '>
        <GlobalLoader /> {/* ⬅️ Ini loader-nya */}
        <main>{children}</main>
      </body>
    </html>
  );
}
