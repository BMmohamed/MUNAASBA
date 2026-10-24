import { Metadata } from 'next';
import { getInvitationBySlug, getAllInvitations } from '@/lib/invitation-service';
import { DesktopFrameWrapper } from '@/components/invitation/DesktopFrameWrapper';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const invitations = await getAllInvitations();
  return invitations.map((inv) => ({ slug: inv.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    return {
      title: 'دعوة غير موجودة | مناسبة',
      description: 'عذراً، لم يتم العثور على بطاقة الدعوة المطلوبة.',
    };
  }

  const title = `💌 دعوة خاصة: ${invitation.groomName} & ${invitation.brideName}`;
  const description = `يتشرفون بدعوتكم لحضور ${invitation.eventTitle} • ${invitation.venueName} (${invitation.venueCity}) • ${invitation.dayOfWeek} ${invitation.timeFormatted} • اضغط هنا لمشاهدة تفاصيل الدعوة وتأكيد الحضور (RSVP)`;

  const ogImageUrl = `/api/og?slug=${encodeURIComponent(slug)}&v=${encodeURIComponent(invitation.updatedAt || '1')}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ar_SA',
      siteName: 'منصة مناسبة للدعوات الإلكترونية الفاخرة',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${invitation.eventTitle}: ${invitation.groomName} & ${invitation.brideName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function InvitationPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isHostView =
    resolvedSearchParams?.view === 'host' ||
    resolvedSearchParams?.host === 'true' ||
    resolvedSearchParams?.role === 'host';

  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center font-cairo">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 text-2xl font-bold">
          !
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-amber-200 mb-2">
          عذراً، لم يتم العثور على بطاقة الدعوة
        </h1>
        <p className="text-sm text-neutral-400 font-tajawal max-w-md mb-6">
          تأكد من صحة الرابط أو تواصل مع أصحاب الدعوة للحصول على الرابط الصحيح.
        </p>
        <Link
          href="/"
          className="py-2.5 px-6 rounded-xl bg-amber-500 text-neutral-950 font-bold text-sm hover:bg-amber-400 transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return <DesktopFrameWrapper invitation={invitation} isHostView={isHostView} />;
}
