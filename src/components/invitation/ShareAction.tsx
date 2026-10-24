'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle } from 'lucide-react';

interface ShareActionProps {
  title: string;
  slug: string;
  groomName: string;
  brideName: string;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
  updatedAt?: string;
}

export const ShareAction: React.FC<ShareActionProps> = ({
  title,
  slug,
  groomName,
  brideName,
  theme = 'gold',
  updatedAt,
}) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    const versionParam = updatedAt ? `?v=${new Date(updatedAt).getTime().toString(36)}` : '';
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/d/${slug}${versionParam}`;
    }
    return `https://munaasba.vercel.app/d/${slug}${versionParam}`;
  };

  const shareText = `✨ *دعوة خاصة لحضور ${title}* ✨

"وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"

يتشرف أهل العروسين بدعوتكم الكريمة لمشاركتهم الفرحة والسرور بمناسبة زفاف:
💍 *${groomName} & ${brideName}* 💍

يسعدنا ويشرفنا حضوركم، لتفاصيل الموعد والموقع وتأكيد الحضور (RSVP) تفضلوا بالدخول عبر الرابط:
${getShareUrl()}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `دعوة زفاف مبارك: ${groomName} & ${brideName}`,
          url: getShareUrl(),
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const themeClasses = {
    gold: 'bg-neutral-900/80 text-amber-200 border-amber-500/30 hover:border-amber-400',
    minimal: 'bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400',
    floral: 'bg-white/90 text-rose-900 border-rose-200 hover:border-rose-300',
    midnight: 'bg-slate-900/90 text-amber-200 border-amber-400/30 hover:border-amber-300',
    heritage: 'bg-amber-950/70 text-amber-100 border-amber-700/50 hover:border-amber-600',
  }[theme];

  return (
    <div className="my-6 max-w-sm mx-auto px-2">
      <div className="flex items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={handleWhatsApp}
          className={`flex-1 py-2.5 px-3 rounded-xl border flex items-center justify-center gap-1.5 text-xs sm:text-sm font-cairo transition-all duration-200 ${themeClasses}`}
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>مشاركة عبر واتساب</span>
        </button>

        <button
          type="button"
          onClick={handleNativeShare}
          className={`py-2.5 px-3.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs sm:text-sm font-cairo transition-all duration-200 ${themeClasses}`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>تم النسخ ✓</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>مشاركة الرابط</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
