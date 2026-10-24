import { NextRequest, NextResponse } from 'next/server';
import { adjustRsvpCount } from '@/lib/invitation-service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const delta = typeof body?.delta === 'number' ? body.delta : undefined;
    const exact = typeof body?.exact === 'number' ? body.exact : undefined;

    const result = await adjustRsvpCount(slug, { delta, exact });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in adjust-rsvp route:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في الخادم أثناء تعديل العداد', newCount: 0 },
      { status: 500 }
    );
  }
}
