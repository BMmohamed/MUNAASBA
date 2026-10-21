'use client';

import React, { useState } from 'react';
import { Calendar, Download, Check, Sparkles } from 'lucide-react';
import { downloadAppleIcsFile, generateGoogleCalendarUrl } from '@/lib/calendar';

interface CalendarButtonsProps {
  title: string;
  description: string;
  location: string;
  startDate: string;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const CalendarButtons: React.FC<CalendarButtonsProps> = ({
  title,
  description,
  location,
  startDate,
  theme = 'gold',
}) => {
  const [downloadedApple, setDownloadedApple] = useState(false);

  const googleUrl = generateGoogleCalendarUrl({
    title,
    description,
    location,
    startDate,
    durationHours: 4,
  });

  const handleAppleDownload = () => {
    downloadAppleIcsFile(
      {
        title,
        description,
        location,
        startDate,
        durationHours: 4,
      },
      `${title.replace(/\s+/g, '_')}.ics`
    );
    setDownloadedApple(true);
    setTimeout(() => setDownloadedApple(false), 3500);
  };

  const themeClasses = {
    gold: 'bg-neutral-900/80 hover:bg-neutral-800 text-amber-200 border-amber-500/30 hover:border-amber-400',
    minimal: 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200 hover:border-stone-400',
    floral: 'bg-white/90 hover:bg-rose-50 text-rose-900 border-rose-200 hover:border-rose-300',
    midnight: 'bg-slate-900/90 hover:bg-slate-800 text-amber-200 border-amber-400/30 hover:border-amber-300',
    heritage: 'bg-amber-950/70 hover:bg-amber-900/80 text-amber-100 border-amber-700/50 hover:border-amber-600',
  }[theme];

  return (
    <div className="my-5">
      <div className="text-center mb-2.5">
        <span className="text-xs tracking-wider opacity-75 font-tajawal flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>حفظ الموعد في تقويمك</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 max-w-sm mx-auto">
        {/* Google Calendar Link */}
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-cairo transition-all duration-200 ${themeClasses}`}
        >
          <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
          <span>تقويم Google</span>
        </a>

        {/* Apple Calendar Download */}
        <button
          type="button"
          onClick={handleAppleDownload}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-cairo transition-all duration-200 ${themeClasses}`}
        >
          {downloadedApple ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>تم الحفظ ✓</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-amber-400 shrink-0" />
              <span>تقويم Apple (.ics)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
