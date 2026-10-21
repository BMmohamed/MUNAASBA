import { NextRequest, NextResponse } from 'next/server';
import { getInvitationBySlug } from '@/lib/invitation-service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const invitation = await getInvitationBySlug(slug);

    if (!invitation) {
      return NextResponse.json(
        { error: 'الدعوة غير موجودة' },
        { status: 404 }
      );
    }

    return NextResponse.json({ invitation });
  } catch (error) {
    console.error('Error fetching invitation:', error);
    return NextResponse.json(
      { error: 'فشل في استرداد بيانات الدعوة' },
      { status: 500 }
    );
  }
}
