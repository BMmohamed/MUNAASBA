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
      card: 'bg-black/60 border-amber-400/50 text-neutral-100 shadow-xl',
      pin: 'bg-amber-400 text-neutral-950 font-bold',
      btn: 'bg-amber-400/25 hover:bg-amber-400/35 text-amber-200 border-amber-400/50',
      subtext: 'text-neutral-300 font-medium',
    },
    minimal: {
      card: 'bg-black/60 border-stone-600/60 text-stone-100 shadow-xl',
      pin: 'bg-stone-200 text-stone-950 font-bold',
      btn: 'bg-stone-800 hover:bg-stone-700 text-white border-stone-600',
      subtext: 'text-stone-300 font-medium',
    },
    floral: {
      card: 'bg-black/60 border-rose-400/50 text-rose-100 shadow-xl',
      pin: 'bg-rose-400 text-neutral-950 font-bold',
      btn: 'bg-rose-500/25 hover:bg-rose-500/35 text-rose-200 border-rose-400/50',
      subtext: 'text-rose-200 font-medium',
    },
    midnight: {
      card: 'bg-black/60 border-amber-400/50 text-slate-100 shadow-xl',
      pin: 'bg-amber-400 text-slate-950 font-bold',
      btn: 'bg-amber-400/25 hover:bg-amber-400/35 text-amber-200 border-amber-400/50',
      subtext: 'text-slate-300 font-medium',
    },
    heritage: {
      card: 'bg-black/60 border-amber-600/50 text-amber-50 shadow-xl',
      pin: 'bg-amber-500 text-neutral-950 font-bold',
      btn: 'bg-amber-800/50 hover:bg-amber-800/70 text-amber-100 border-amber-600',
      subtext: 'text-amber-200 font-medium',
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
