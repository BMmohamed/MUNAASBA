'use client';

import React from 'react';
import { CameraOff, VideoOff, ShieldAlert } from 'lucide-react';

interface NoPhotographyAdvisoryProps {
  text?: string;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const NoPhotographyAdvisory: React.FC<NoPhotographyAdvisoryProps> = ({
  text = 'نهيب بالسادة الحضور الكرام ونؤكد بشدة على الامتناع التام عن رفع الهواتف المحمولة للتصوير أو التقاط مقاطع الفيديو، حفظاً لخصوصية الحفل وأهله. شاكرين لكم طيب تعاونكم وتفهمكم الراقي.',
  theme = 'gold',
}) => {
  const themeStyles = {
    gold: {
      wrapper: 'bg-gradient-to-b from-amber-950/40 via-neutral-900/80 to-amber-950/40 border-amber-500/40 shadow-lg shadow-amber-950/30 text-neutral-200',
      badge: 'bg-amber-500/15 border-amber-400/40 text-amber-300',
      iconBox: 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30',
      title: 'text-amber-200',
      body: 'text-neutral-300',
      accentGlow: 'bg-amber-400/10',
    },
    minimal: {
      wrapper: 'bg-stone-900/80 border-stone-700/60 shadow-lg shadow-black/20 text-stone-200',
      badge: 'bg-stone-800 border-stone-600 text-stone-300',
      iconBox: 'bg-stone-800 text-stone-200 ring-1 ring-stone-600',
      title: 'text-stone-100',
      body: 'text-stone-300',
      accentGlow: 'bg-stone-500/10',
    },
    floral: {
      wrapper: 'bg-gradient-to-b from-rose-950/40 via-neutral-900/80 to-rose-950/40 border-rose-400/40 shadow-lg shadow-rose-950/30 text-rose-100',
      badge: 'bg-rose-500/15 border-rose-400/40 text-rose-300',
      iconBox: 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/30',
      title: 'text-rose-200',
      body: 'text-rose-100/90',
      accentGlow: 'bg-rose-400/10',
    },
    midnight: {
      wrapper: 'bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950/60 border-indigo-400/35 shadow-lg shadow-indigo-950/40 text-slate-200',
      badge: 'bg-indigo-500/15 border-indigo-400/40 text-indigo-300',
      iconBox: 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30',
      title: 'text-indigo-200',
      body: 'text-slate-300',
      accentGlow: 'bg-indigo-400/10',
    },
    heritage: {
      wrapper: 'bg-gradient-to-b from-amber-950/50 via-stone-900/80 to-amber-950/50 border-amber-600/45 shadow-lg shadow-amber-950/40 text-amber-100',
      badge: 'bg-amber-600/20 border-amber-500/40 text-amber-300',
      iconBox: 'bg-amber-600/25 text-amber-300 ring-1 ring-amber-500/30',
      title: 'text-amber-200',
      body: 'text-amber-100/90',
      accentGlow: 'bg-amber-500/10',
    },
  }[theme];

  return (
    <div
      className={`relative my-6 p-4 sm:p-5 rounded-2xl border backdrop-blur-md text-center max-w-sm mx-auto overflow-hidden transition-all duration-300 ${themeStyles.wrapper}`}
      dir="rtl"
    >
      {/* Decorative ambient subtle glow */}
      <div
        className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none ${themeStyles.accentGlow}`}
      />
      <div
        className={`absolute -bottom-12 -left-12 w-28 h-28 rounded-full blur-2xl pointer-events-none ${themeStyles.accentGlow}`}
      />

      <div className="relative z-10 space-y-2.5">
        {/* Top Badges & Icons */}
        <div className="flex items-center justify-center gap-2">
          <div className={`p-2 rounded-xl flex items-center justify-center ${themeStyles.iconBox}`}>
            <CameraOff className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          </div>
          <div className={`p-2 rounded-xl flex items-center justify-center ${themeStyles.iconBox}`}>
            <VideoOff className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          </div>
        </div>

        {/* Warning Badge / Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold font-cairo border shadow-sm mx-auto">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span className={themeStyles.title}>تنبيه هام: يُمنع التصوير منعاً باتاً</span>
        </div>

        {/* Strong Warning Body */}
        <p className={`text-xs sm:text-[13px] leading-relaxed font-tajawal font-medium px-1 ${themeStyles.body}`}>
          {text}
        </p>

        {/* Polite note */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-neutral-400 font-tajawal">
          <span>خصوصية تامة للحفل ولحظاته الخاصة 🚫📱</span>
        </div>
      </div>
    </div>
  );
};
