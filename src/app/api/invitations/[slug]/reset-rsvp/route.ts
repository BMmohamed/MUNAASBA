import { NextRequest, NextResponse } from 'next/server';
import { resetRsvpCount } from '@/lib/invitation-service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const success = await resetRsvpCount(slug);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error resetting RSVP:', error);
    return NextResponse.json({ success: false, error: 'فشل في إعادة ضبط العداد' }, { status: 500 });
  }
}
