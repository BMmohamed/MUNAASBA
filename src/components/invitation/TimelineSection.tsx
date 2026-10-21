'use client';

import React from 'react';
import { Clock, Coffee, Heart, Cake, UtensilsCrossed, Music } from 'lucide-react';
import { TimelineItem } from '@/types/invitation';

interface TimelineSectionProps {
  items: TimelineItem[];
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'coffee':
      return <Coffee className="w-4 h-4" />;
    case 'ring':
      return <Heart className="w-4 h-4" />;
    case 'cake':
      return <Cake className="w-4 h-4" />;
    case 'dinner':
      return <UtensilsCrossed className="w-4 h-4" />;
    case 'music':
      return <Music className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  items,
  theme = 'gold',
}) => {
  if (!items || items.length === 0) return null;

  const themeStyles = {
    gold: {
      line: 'bg-amber-500/30',
      node: 'bg-neutral-900 border-amber-500/60 text-amber-300 shadow-amber-500/10',
      timeBadge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      label: 'text-neutral-200',
    },
    minimal: {
      line: 'bg-stone-200',
      node: 'bg-stone-50 border-stone-300 text-stone-700',
      timeBadge: 'bg-stone-100 text-stone-700 border-stone-200',
      label: 'text-stone-800',
    },
    floral: {
      line: 'bg-rose-200',
      node: 'bg-white border-rose-300 text-rose-600',
      timeBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      label: 'text-rose-950',
    },
    midnight: {
      line: 'bg-indigo-500/30',
      node: 'bg-slate-900 border-amber-400/50 text-amber-300',
      timeBadge: 'bg-slate-800 text-amber-300 border-amber-400/30',
      label: 'text-slate-200',
    },
    heritage: {
      line: 'bg-amber-700/40',
      node: 'bg-amber-950 border-amber-600 text-amber-200',
      timeBadge: 'bg-amber-900/60 text-amber-200 border-amber-700',
      label: 'text-amber-100',
    },
  }[theme];

  return (
    <div className="my-8 max-w-sm mx-auto px-2">
      <div className="text-center mb-5">
        <span className="text-xs tracking-wider opacity-75 font-tajawal">
          برنامج ومراسم الحفل
        </span>
      </div>
      <div className="relative border-r-2 pr-4 space-y-6" style={{ borderColor: 'rgba(212, 175, 55, 0.25)' }}>
        {items.map((item) => (
          <div key={item.id} className="relative flex items-center justify-between group">
            {/* Timeline bullet icon */}
            <div
              className={`absolute -right-[27px] w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs shadow-md ${themeStyles.node}`}
            >
              {getIcon(item.icon)}
            </div>

            <div className="flex-1 pr-3 flex items-center justify-between">
              <span className={`text-sm font-semibold font-cairo ${themeStyles.label}`}>
                {item.label}
              </span>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-cairo font-bold border ${themeStyles.timeBadge}`}
              >
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
