import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'لم يتم تحديد أي ملف صوتي لرفعه' },
        { status: 400 }
      );
    }

    // Check file size (limit to 25MB)
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'حجم الملف الصوتي كبير جداً (الحد الأقصى 25 ميجابايت)' },
        { status: 400 }
      );
    }

    // Extract and sanitize extension
    const originalName = file.name || 'audio.mp3';
    const extMatch = originalName.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'mp3';

    const allowedExtensions = ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'opus'];
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json(
        {
          success: false,
          error: 'نوع الملف غير مدعوم. الصيغ المدعومة هي: MP3, WAV, M4A, AAC, OGG',
        },
        { status: 400 }
      );
    }

    // Generate safe unique filename
    const safeBaseName = originalName
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const fileName = `${Date.now()}-${safeBaseName || 'audio'}.${ext}`;

    const audioDir = path.join(process.cwd(), 'public', 'audio');
    await mkdir(audioDir, { recursive: true });

    const filePath = path.join(audioDir, fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(filePath, buffer);

    const publicUrl = `/audio/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      size: file.size,
      message: 'تم رفع الملف الصوتي بنجاح!',
    });
  } catch (error: any) {
    console.error('Audio upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'حدث خطأ أثناء رفع الملف الصوتي' },
      { status: 500 }
    );
  }
}
