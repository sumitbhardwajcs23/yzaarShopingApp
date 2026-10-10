import type { Metadata, Viewport } from 'next';
import './globals.css';
import AppProviders from '@/components/providers/AppProviders';
import StoreLayoutShell from '@/components/layout/StoreLayoutShell';

export const metadata: Metadata = {
  title: 'Yzaaar — Haute Couture & Bespoke Luxury Fashion',
  description:
    'Fashion Lives Online. Experience handcrafted bespoke tailoring, Italian silk tuxedos, royal bandhgalas, and evening couture at Yzaaar.',
  keywords: [
    'Yzaaar',
    'Haute Couture',
    'Luxury Fashion',
    'Bespoke Tuxedos',
    'Indian Royalty Fashion',
    'Italian Silk',
    'Evening Gowns',
  ],
  authors: [{ name: 'Yzaaar Haute Couture Atelier' }],
  openGraph: {
    title: 'Yzaaar — Fashion Lives Online',
    description: 'Experience bespoke luxury tailoring and couture fashion.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AppProviders>
          <StoreLayoutShell>{children}</StoreLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
