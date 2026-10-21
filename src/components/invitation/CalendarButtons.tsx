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
    gold: 'bg-black/60 hover:bg-black/80 text-amber-200 border-amber-400/50 hover:border-amber-300 font-bold shadow-md',
    minimal: 'bg-black/60 hover:bg-black/80 text-white border-stone-600/70 hover:border-stone-400 font-bold shadow-md',
    floral: 'bg-black/60 hover:bg-black/80 text-rose-200 border-rose-400/50 hover:border-rose-300 font-bold shadow-md',
    midnight: 'bg-black/60 hover:bg-black/80 text-amber-200 border-amber-400/50 hover:border-amber-300 font-bold shadow-md',
    heritage: 'bg-black/60 hover:bg-black/80 text-amber-200 border-amber-600/50 hover:border-amber-400 font-bold shadow-md',
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
