'use client';

import React from 'react';
import { MapPin, Navigation, Building2 } from 'lucide-react';

interface LocationCardProps {
  venueName: string;
  venueHall?: string;
  venueCity: string;
  venueAddress: string;
  googleMapsUrl: string;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const LocationCard: React.FC<LocationCardProps> = ({
  venueName,
  venueHall,
  venueCity,
  venueAddress,
  googleMapsUrl,
  theme = 'gold',
}) => {
  const themeStyles = {
    gold: {
      card: 'bg-neutral-900/70 border-amber-500/30 text-neutral-100',
      pin: 'bg-amber-500 text-neutral-950',
      btn: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-500/40',
      subtext: 'text-neutral-400',
    },
    minimal: {
      card: 'bg-stone-50 border-stone-200 text-stone-900',
      pin: 'bg-stone-900 text-stone-50',
      btn: 'bg-stone-900 text-stone-50 hover:bg-stone-800 border-stone-900',
      subtext: 'text-stone-500',
    },
    floral: {
      card: 'bg-white/80 border-rose-200 text-rose-950',
      pin: 'bg-rose-500 text-white',
      btn: 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300',
      subtext: 'text-rose-700/80',
    },
    midnight: {
      card: 'bg-slate-900/80 border-amber-400/30 text-slate-100',
      pin: 'bg-amber-400 text-slate-950',
      btn: 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border-amber-400/40',
      subtext: 'text-slate-400',
    },
    heritage: {
      card: 'bg-amber-950/60 border-amber-700/40 text-amber-50',
      pin: 'bg-amber-600 text-amber-950',
      btn: 'bg-amber-800/40 hover:bg-amber-800/60 text-amber-200 border-amber-700',
      subtext: 'text-amber-300/80',
    },
  }[theme];

  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 max-w-sm mx-auto my-5 ${themeStyles.card}`}>
      <div className="flex items-start gap-3.5">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md ${themeStyles.pin}`}>
          <MapPin className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs opacity-75 font-tajawal mb-0.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>مكان الحفل</span>
            <span>•</span>
            <span>{venueCity}</span>
          </div>
          <h3 className="font-bold text-base sm:text-lg font-cairo truncate">
            {venueName}
          </h3>
          {venueHall && (
            <p className="text-xs font-tajawal text-amber-300/90 mt-0.5">
              {venueHall}
            </p>
          )}
          <p className={`text-xs font-tajawal mt-1 line-clamp-2 ${themeStyles.subtext}`}>
            {venueAddress}
          </p>
        </div>
      </div>

      {/* Google Maps CTA */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-bold font-cairo transition-all duration-200 ${themeStyles.btn}`}
      >
        <Navigation className="w-4 h-4 shrink-0" />
        <span>فتح الموقع في خرائط Google</span>
      </a>
    </div>
  );
};
