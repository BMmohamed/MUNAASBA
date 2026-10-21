'use client';

import React, { useEffect, useState } from 'react';
import { calculateCountdown, toArabicNumerals } from '@/lib/date-utils';

interface CountdownTimerProps {
  targetDate: string;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  theme = 'gold',
}) => {
  const [countdown, setCountdown] = useState(calculateCountdown(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="py-6 flex items-center justify-center">
        <div className="text-sm opacity-60 font-tajawal">جاري تحميل العداد التنازلي...</div>
      </div>
    );
  }

  if (countdown.isExpired) {
    return (
      <div className="my-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-center">
        <div className="text-lg font-bold text-amber-300 font-amiri mb-1">
          ✨ حانت الليلة المباركة ✨
        </div>
        <p className="text-xs text-neutral-300 font-tajawal">
          أهلاً وسهلاً بكم في ليلة فرحنا، نسعد بوجودكم بيننا
        </p>
      </div>
    );
  }

  // Theme-specific styles (All optimized for crystal-clear contrast)
  const themeStyles = {
    gold: {
      box: 'bg-black/60 border-amber-400/50 text-amber-200 shadow-lg shadow-black/40',
      label: 'text-amber-300 font-bold',
      accent: 'text-amber-100 font-extrabold',
    },
    minimal: {
      box: 'bg-black/60 border-stone-600/60 text-stone-100 shadow-lg shadow-black/40',
      label: 'text-stone-300 font-bold',
      accent: 'text-white font-extrabold',
    },
    floral: {
      box: 'bg-black/60 border-rose-400/50 text-rose-100 shadow-lg shadow-black/40',
      label: 'text-rose-300 font-bold',
      accent: 'text-rose-100 font-extrabold',
    },
    midnight: {
      box: 'bg-black/60 border-amber-400/50 text-amber-100 shadow-lg shadow-black/40',
      label: 'text-amber-300 font-bold',
      accent: 'text-amber-100 font-extrabold',
    },
    heritage: {
      box: 'bg-black/60 border-amber-600/50 text-amber-100 shadow-lg shadow-black/40',
      label: 'text-amber-300 font-bold',
      accent: 'text-amber-50 font-extrabold',
    },
  }[theme];

  const timeBlocks = [
    { label: 'يوم', value: countdown.days },
    { label: 'ساعة', value: countdown.hours },
    { label: 'دقيقة', value: countdown.minutes },
    { label: 'ثانية', value: countdown.seconds },
  ];

  return (
    <div className="my-6">
      <div className="text-center mb-3">
        <span className="text-xs tracking-wider uppercase opacity-75 font-tajawal">
          العد التنازلي لليلة العمر
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border backdrop-blur-sm transition-all duration-300 ${themeStyles.box}`}
          >
            <span className={`text-2xl sm:text-3xl font-bold font-cairo ${themeStyles.accent}`}>
              {toArabicNumerals(block.value.toString().padStart(2, '0'))}
            </span>
            <span className={`text-[11px] font-tajawal mt-0.5 ${themeStyles.label}`}>
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
