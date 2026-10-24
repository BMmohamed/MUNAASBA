import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`)
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://munaasaba.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'منصة مناسبة | بطاقات ودعوات زفاف إلكترونية فاخرة',
  description: 'منصة احترافية لتصميم وتوزيع بطاقات الدعوة الرقمية الفاخرة لحفلات الزفاف والمناسبات الملكية بأرقى الخطوط العربية والتصاميم التفاعلية.',
  keywords: ['دعوة زفاف إلكترونية', 'كرت زواج رقمي', 'دعوات أعراس تفاعلية', 'تأكيد حضور RSVP', 'دعوات إلكترونية فاخرة'],
  openGraph: {
    title: 'بطاقة دعوة زفاف إلكترونية فاخرة | مناسبة',
    description: 'شارك لحظات الفرح بدعوة إلكترونية تفاعلية راقية وتأكيد حضور مباشر بلمسة واحدة.',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'منصة مناسبة للدعوات الإلكترونية الفاخرة',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-amber-400/30 selection:text-amber-200">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
