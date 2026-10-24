'use client';

import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

interface FooterContactProps {
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const FooterContact: React.FC<FooterContactProps> = ({ theme = 'gold' }) => {
  const rawNumber = '+963986408149';
  const cleanNumber = '963986408149';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'السلام عليكم، أود الاستفسار عن تصميم بطاقة دعوة إلكترونية فاخرة'
  )}`;

  const themeConfig = {
    gold: {
      border: 'border-amber-500/20',
      badge: 'bg-amber-500/10 text-amber-200 border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50',
      titleColor: 'text-amber-200/90',
      subColor: 'text-neutral-400',
    },
    floral: {
      border: 'border-rose-400/20',
      badge: 'bg-rose-500/10 text-rose-200 border-rose-400/30 hover:bg-rose-500/20 hover:border-rose-400/50',
      titleColor: 'text-rose-200/90',
      subColor: 'text-rose-300/60',
    },
    minimal: {
      border: 'border-stone-800',
      badge: 'bg-stone-800/80 text-stone-200 border-stone-700 hover:bg-stone-700 hover:border-stone-600',
      titleColor: 'text-stone-300',
      subColor: 'text-stone-400',
    },
    midnight: {
      border: 'border-slate-800',
      badge: 'bg-slate-800/70 text-slate-200 border-slate-700 hover:bg-slate-700/80 hover:border-slate-600',
      titleColor: 'text-slate-300',
      subColor: 'text-slate-400',
    },
    heritage: {
      border: 'border-amber-700/30',
      badge: 'bg-amber-950/40 text-amber-200 border-amber-700/40 hover:bg-amber-900/40 hover:border-amber-600/50',
      titleColor: 'text-amber-200/90',
      subColor: 'text-neutral-400',
    },
  }[theme];

  return (
    <footer className={`mt-8 pt-5 border-t ${themeConfig.border} text-center space-y-3`}>
      <div className="flex items-center justify-center gap-1.5 text-xs font-tajawal">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
        <span className={themeConfig.titleColor}>
          إن أردت إنشاء بطاقة دعوة إلكترونية فاخرة لمناسبتك:
        </span>
      </div>

      <div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs font-cairo font-bold transition-all duration-300 shadow-md group ${themeConfig.badge}`}
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="font-tajawal text-xs text-neutral-300">
            تواصل واتساب:
          </span>
          <span dir="ltr" className="font-mono tracking-wider text-xs font-bold">
            {rawNumber}
          </span>
        </a>
      </div>

      <div className={`text-[10px] font-tajawal ${themeConfig.subColor}`}>
        منصة مناسبة • تصميم دعوات إلكترونية تفاعلية فاخرة
      </div>
    </footer>
  );
};
