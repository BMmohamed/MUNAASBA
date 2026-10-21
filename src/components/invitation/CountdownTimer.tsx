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
  const [countdown, setCountdown] = useState(() => calculateCountdown(targetDate));

  useEffect(() => {
    // Update countdown every second
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (countdown.isExpired) {
    return (
      <div className="my-6 p-4 rounded-2xl bg-amber-500/20 border border-amber-400/50 backdrop-blur-md text-center">
        <div className="text-xl font-bold text-amber-200 font-amiri mb-1 drop-shadow-md">
          ✨ حانت الليلة المباركة ✨
        </div>
        <p className="text-sm text-neutral-100 font-tajawal font-medium">
          أهلاً وسهلاً بكم في ليلة فرحنا، نسعد بوجودكم بيننا
        </p>
      </div>
    );
  }

  // Theme-specific glass styles
  const themeStylesMap = {
    gold: {
      box: 'bg-black/40 border-amber-400/40 text-amber-200 shadow-xl shadow-black/40',
      label: 'text-amber-300 font-bold',
      accent: 'text-amber-100 font-extrabold',
    },
    minimal: {
      box: 'bg-black/40 border-stone-400/40 text-stone-100 shadow-xl shadow-black/40',
      label: 'text-stone-300 font-bold',
      accent: 'text-white font-extrabold',
    },
    floral: {
      box: 'bg-black/40 border-rose-400/40 text-rose-100 shadow-xl shadow-black/40',
      label: 'text-rose-300 font-bold',
      accent: 'text-rose-100 font-extrabold',
    },
    midnight: {
      box: 'bg-black/40 border-amber-400/40 text-amber-100 shadow-xl shadow-black/40',
      label: 'text-amber-300 font-bold',
      accent: 'text-amber-100 font-extrabold',
    },
    heritage: {
      box: 'bg-black/40 border-amber-500/40 text-amber-100 shadow-xl shadow-black/40',
      label: 'text-amber-300 font-bold',
      accent: 'text-amber-50 font-extrabold',
    },
  };
  const themeStyles = themeStylesMap[theme as keyof typeof themeStylesMap] || themeStylesMap.gold;

  const timeBlocks = [
    { label: 'يوم', value: countdown.days },
    { label: 'ساعة', value: countdown.hours },
    { label: 'دقيقة', value: countdown.minutes },
    { label: 'ثانية', value: countdown.seconds },
  ];

  return (
    <div className="my-7">
      <div className="text-center mb-3">
        <span className="text-xs sm:text-sm tracking-wider uppercase font-bold text-amber-200/90 font-tajawal drop-shadow-sm">
          العد التنازلي لليلة العمر
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-sm mx-auto">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 ${themeStyles.box}`}
          >
            <span className={`text-2xl sm:text-3xl font-extrabold font-cairo ${themeStyles.accent}`}>
              {toArabicNumerals(block.value.toString().padStart(2, '0'))}
            </span>
            <span className={`text-xs font-tajawal mt-1 ${themeStyles.label}`}>
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
