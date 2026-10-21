'use client';

import React, { useState } from 'react';
import { Smartphone, Monitor, QrCode, Sparkles } from 'lucide-react';
import { InvitationData } from '@/types/invitation';
import { TemplateRenderer } from '../templates/TemplateRenderer';

export const DesktopFrameWrapper: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const [viewMode, setViewMode] = useState<'phone' | 'full'>('phone');
  const [showQr, setShowQr] = useState<boolean>(false);

  // Background ambiance theme colors (deep luxury backdrop)
  const themeBg = {
    'template-1': 'bg-[#020b08]',
    'template-2': 'bg-[#08090a]',
    'template-3': 'bg-[#0d0509]',
    'template-4': 'bg-[#03060c]',
    'template-5': 'bg-[#0e0704]',
  }[invitation.templateId] || 'bg-neutral-950';

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.href : `https://munaasaba.vercel.app/d/${invitation.slug}`
  )}`;

  return (
    <div className={`relative min-h-screen ${themeBg} flex flex-col items-center justify-start`}>
      
      {/* Desktop Top Toolbar (Only shown on larger screens md+) */}
      <aside aria-label="أدوات العرض" className="hidden md:flex items-center justify-between w-full max-w-4xl py-3 px-6 my-2 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-neutral-200 text-xs font-cairo shadow-lg z-30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-amber-300">{invitation.title}</span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400">معاينة تفاعلية</span>
        </div>

        <div className="flex items-center gap-3">
          {/* QR Code toggle */}
          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>مسح الرمز بالجوال</span>
          </button>

          {/* View mode toggle */}
          <div className="flex items-center bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
            <button
              type="button"
              onClick={() => setViewMode('phone')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                viewMode === 'phone'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>إطار الجوال</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('full')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                viewMode === 'full'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>ملء الشاشة</span>
            </button>
          </div>
        </div>
      </aside>

      {/* QR Modal Dropdown on Desktop */}
      {showQr && (
        <div className="hidden md:flex flex-col items-center fixed top-20 right-10 p-5 rounded-2xl bg-neutral-900 border border-amber-500/30 shadow-2xl z-50 text-center animate-fadeIn">
          <p className="text-xs text-amber-200 font-cairo mb-3">
            امسح الرمز لفتح الدعوة في هاتفك
          </p>
          <div className="bg-white p-2 rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrImageUrl} alt="QR Code" width={160} height={160} className="rounded" />
          </div>
          <button
            type="button"
            onClick={() => setShowQr(false)}
            className="mt-3 text-[11px] text-neutral-400 hover:text-neutral-200 underline"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Content Container */}
      <main className="w-full flex justify-center items-start">
        <div
          className={`w-full relative transition-all duration-300 ${
            viewMode === 'phone'
              ? 'max-w-md my-0 md:my-6 md:rounded-[40px] md:border-[10px] md:border-neutral-900 md:shadow-2xl md:shadow-black/70'
              : 'max-w-full'
          }`}
        >
          <TemplateRenderer invitation={invitation} />
        </div>
      </main>

    </div>
  );
};
