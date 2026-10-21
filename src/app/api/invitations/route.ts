import { NextRequest, NextResponse } from 'next/server';
import { getAllInvitations, createInvitation } from '@/lib/invitation-service';

export async function GET() {
  try {
    const list = await getAllInvitations();
    return NextResponse.json({ invitations: list });
  } catch (error) {
    console.error('Error fetching invitations list:', error);
    return NextResponse.json({ error: 'فشل في جلب الدعوات' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const created = await createInvitation(body);
    return NextResponse.json({ success: true, invitation: created });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json({ error: 'فشل في إنشاء الدعوة' }, { status: 500 });
  }
}
