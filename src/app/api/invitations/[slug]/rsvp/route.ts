import { NextRequest, NextResponse } from 'next/server';
import { registerRsvp } from '@/lib/invitation-service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    let fingerprint = '';
    let guestCount = 1;
    let guestName = '';

    try {
      const body = await request.json();
      fingerprint = body?.fingerprint || '';
      guestCount = Math.max(1, Math.min(20, Number(body?.guestCount) || 1));
      guestName = (body?.guestName || '').trim();
    } catch {
      // Body was either empty or text
    }

    if (!fingerprint) {
      return NextResponse.json(
        { success: false, message: 'معرّف الجهاز مفقود', newCount: 0 },
        { status: 400 }
      );
    }

    const result = await registerRsvp(slug, fingerprint, guestCount, guestName);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in RSVP route:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في الخادم أثناء تسجيل الحضور', newCount: 0 },
      { status: 500 }
    );
  }
}
