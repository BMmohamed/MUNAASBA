import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getInvitationBySlug } from '@/lib/invitation-service';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let cachedFont: Buffer | null = null;

function getFontData(): Buffer | null {
  if (cachedFont) return cachedFont;
  try {
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Cairo-Bold.woff');
    if (fs.existsSync(fontPath)) {
      cachedFont = fs.readFileSync(fontPath);
      return cachedFont;
    }
  } catch (e) {
    console.warn('[OG] Failed to read font file:', e);
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || '';

    let invitation = null;
    if (slug) {
      invitation = await getInvitationBySlug(slug);
    }

    const title = invitation?.eventTitle || 'حفل الزفاف المبارك';
    const groomName = invitation?.groomName || 'العريس';
    const brideName = invitation?.brideName || 'العروس';
    const coupleText = `${groomName} و ${brideName}`;
    const venue = invitation ? `${invitation.venueName} - ${invitation.venueCity}` : 'قصر الاحتفالات الملكي';
    const timeInfo = invitation ? `${invitation.dayOfWeek} • ${invitation.timeFormatted}` : 'الساعة 8:00 مساءً';
    const welcome = invitation?.welcomeMessage || 'يتشرفون بدعوتكم لحضور حفل الزفاف ومشاركتهم الفرحة والسرور';

    const templateId = invitation?.templateId || 'template-1';

    // Theme styling matching template colors
    const themes: Record<string, { bg: string; border: string; accent: string; text: string; subText: string }> = {
      'template-1': {
        bg: 'linear-gradient(135deg, #072218 0%, #030f0a 100%)',
        border: '#d4af37',
        accent: '#fbbf24',
        text: '#ffffff',
        subText: '#fef3c7',
      },
      'template-2': {
        bg: 'linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)',
        border: '#a8a29e',
        accent: '#e7e5e4',
        text: '#fafaf9',
        subText: '#d6d3d1',
      },
      'template-3': {
        bg: 'linear-gradient(135deg, #2b111b 0%, #12050b 100%)',
        border: '#fb7185',
        accent: '#fda4af',
        text: '#ffffff',
        subText: '#ffe4e6',
      },
      'template-4': {
        bg: 'linear-gradient(135deg, #091326 0%, #030712 100%)',
        border: '#38bdf8',
        accent: '#bae6fd',
        text: '#ffffff',
        subText: '#e0f2fe',
      },
      'template-5': {
        bg: 'linear-gradient(135deg, #241407 0%, #0d0702 100%)',
        border: '#f59e0b',
        accent: '#fde68a',
        text: '#ffffff',
        subText: '#fef3c7',
      },
    };

    const theme = themes[templateId] || themes['template-1'];

    const fontData = getFontData();
    const fonts = fontData
      ? [
          {
            name: 'Cairo',
            data: fontData,
            style: 'normal' as const,
            weight: 700 as const,
          },
        ]
      : [];

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: theme.bg,
            padding: '45px 65px',
            border: `10px solid ${theme.border}`,
            fontFamily: fontData ? 'Cairo' : 'sans-serif',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: theme.accent,
                letterSpacing: '2px',
              }}
            >
              بسم الله الرحمن الرحيم
            </div>
            <div
              style={{
                fontSize: 20,
                color: theme.accent,
                border: `1px solid ${theme.border}`,
                padding: '6px 26px',
                borderRadius: 40,
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
              }}
            >
              {title}
            </div>
          </div>

          {/* Center Couple Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 54,
                fontWeight: 'bold',
                color: theme.text,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
              }}
            >
              {coupleText}
            </div>
            <div
              style={{
                fontSize: 22,
                color: theme.subText,
                maxWidth: '920px',
                lineHeight: 1.4,
              }}
            >
              {welcome}
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              background: 'rgba(0, 0, 0, 0.55)',
              padding: '16px 36px',
              borderRadius: 18,
              border: `1px solid ${theme.border}`,
              color: theme.subText,
              fontSize: 20,
            }}
          >
            <div style={{ display: 'flex' }}>📍 {venue}</div>
            <div style={{ display: 'flex' }}>📅 {timeInfo}</div>
            <div style={{ display: 'flex', color: '#34d399', fontWeight: 'bold' }}>
              💌 تأكيد الحضور الإلكتروني RSVP
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts,
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
        },
      }
    );
  } catch (error) {
    console.error('[OG] Error generating image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
