import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'منصة مناسبة | بطاقات ودعوات زفاف إلكترونية فاخرة',
  description: 'منصة احترافية لتصميم وتوزيع بطاقات الدعوة الرقمية الفاخرة لحفلات الزفاف والمناسبات الملكية بأرقى الخطوط العربية والتصاميم التفاعلية.',
  keywords: ['دعوة زفاف إلكترونية', 'كرت زواج رقمي', 'دعوات أعراس تفاعلية', 'تأكيد حضور RSVP', 'دعوات إلكترونية فاخرة'],
  openGraph: {
    title: 'بطاقة دعوة زفاف إلكترونية فاخرة | مناسبة',
    description: 'شارك لحظات الفرح بدعوة إلكترونية تفاعلية راقية وتأكيد حضور مباشر بلمسة واحدة.',
    type: 'website',
    locale: 'ar_SA',
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
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-amber-400/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
