'use client';

import React from 'react';
import { Baby } from 'lucide-react';

interface ChildrenAdvisoryProps {
  text?: string;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const ChildrenAdvisory: React.FC<ChildrenAdvisoryProps> = ({
  text = 'جنة الأطفال منازلهم.. نعتذر عن استقبال الأطفال لمشاركتنا فرحة هادئة وراقية.',
  theme = 'gold',
}) => {
  const themeStyles = {
    gold: 'bg-neutral-900/60 border-amber-500/20 text-neutral-300',
    minimal: 'bg-stone-50 border-stone-200 text-stone-600',
    floral: 'bg-rose-50/70 border-rose-200 text-rose-800',
    midnight: 'bg-slate-900/60 border-indigo-500/20 text-slate-300',
    heritage: 'bg-amber-950/40 border-amber-800/40 text-amber-200/90',
  }[theme];

  return (
    <div
      className={`my-6 p-4 rounded-xl border text-center max-w-sm mx-auto transition-all ${themeStyles}`}
    >
      <div className="flex items-center justify-center gap-1.5 mb-1 text-amber-400">
        <Baby className="w-4 h-4" />
        <span className="text-xs font-bold font-cairo">تنويه لطيف</span>
      </div>
      <p className="text-xs leading-relaxed font-tajawal">
        {text}
      </p>
    </div>
  );
};
