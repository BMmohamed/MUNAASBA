import { NextResponse } from 'next/server';
import { getSupabaseAdmin, getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  const configured = isSupabaseConfigured();

  if (!configured) {
    return NextResponse.json({
      configured: false,
      connected: false,
      message: 'بيانات اعتماد Supabase غير متوفرة في .env.local',
    });
  }

  try {
    const client = getSupabaseAdmin() || getSupabase();
    if (!client) {
      return NextResponse.json({
        configured: true,
        connected: false,
        message: 'تعذر إنشاء عميل Supabase',
      });
    }

    const { count, error } = await client
      .from('invitations')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({
        configured: true,
        connected: false,
        message: `خطأ في الاتصال بقاعدة البيانات: ${error.message}`,
        details: error,
      });
    }

    return NextResponse.json({
      configured: true,
      connected: true,
      invitationsCount: count || 0,
      message: 'الاتصال بقاعدة بيانات Supabase يعمل بنجاح!',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'خطأ غير متوقع';
    return NextResponse.json({
      configured: true,
      connected: false,
      message: `استثناء أثناء فحص الاتصال: ${errorMessage}`,
    });
  }
}
