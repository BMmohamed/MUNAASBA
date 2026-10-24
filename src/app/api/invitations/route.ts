import { NextRequest, NextResponse } from 'next/server';
import { getAllInvitations, createInvitation, updateInvitation, deleteInvitation } from '@/lib/invitation-service';

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
    if (body.id) {
      const updated = await updateInvitation(body.id, body);
      if (updated) {
        return NextResponse.json({ success: true, invitation: updated });
      }
    }
    const created = await createInvitation(body);
    return NextResponse.json({ success: true, invitation: created });
  } catch (error) {
    console.error('Error saving invitation:', error);
    return NextResponse.json({ error: 'فشل في حفظ الدعوة' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'معرف كرت الدعوة مطلوب' }, { status: 400 });
    }
    const success = await deleteInvitation(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting invitation:', error);
    return NextResponse.json({ error: 'فشل في حذف كرت الدعوة' }, { status: 500 });
  }
}
