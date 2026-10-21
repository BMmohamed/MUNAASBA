'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, HeartHandshake, Loader2, Users } from 'lucide-react';
import { getDeviceFingerprint, hasLocalRsvpRecord, setLocalRsvpRecord } from '@/lib/device-fingerprint';
import { toArabicNumerals } from '@/lib/date-utils';

interface RsvpButtonProps {
  invitationId: string;
  slug: string;
  initialCount: number;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const RsvpButton: React.FC<RsvpButtonProps> = ({
  invitationId,
  slug,
  initialCount,
  theme = 'gold',
}) => {
  const [count, setCount] = useState<number>(initialCount);
  const [hasRsvped, setHasRsvped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if this device has already RSVPed in localStorage
    if (hasLocalRsvpRecord(invitationId)) {
      setHasRsvped(true);
    }
  }, [invitationId]);

  const triggerCelebrationConfetti = () => {
    try {
      // Golden & themed celebratory burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#d4af37', '#f59e0b', '#ec4899', '#ffffff', '#10b981'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d4af37', '#ffd700'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#d4af37', '#ffd700'],
        });
      }, 250);
    } catch {
      // Confetti fallback
    }
  };

  const handleRsvpClick = async () => {
    if (hasRsvped || isLoading) return;

    setIsLoading(true);
    setFeedbackMessage(null);

    try {
      const fingerprint = getDeviceFingerprint();

      const response = await fetch(`/api/invitations/${slug}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fingerprint }),
      });

      const data = await response.json();

      if (data.success) {
        setCount(data.newCount);
        setHasRsvped(true);
        setLocalRsvpRecord(invitationId);
        triggerCelebrationConfetti();
        setFeedbackMessage(data.message || 'تم تأكيد حضورك بنجاح! نتشرف بوجودكم معنا.');
      } else {
        setFeedbackMessage(data.message || 'عذراً، حدث خطأ أثناء تأكيد الحضور.');
      }
    } catch {
      // Offline fallback: optimistic lock
      setCount((prev) => prev + 1);
      setHasRsvped(true);
      setLocalRsvpRecord(invitationId);
      triggerCelebrationConfetti();
      setFeedbackMessage('تم تسجيل حضورك! نتشرف بلقائكم.');
    } finally {
      setIsLoading(false);
    }
  };

  // Button styles based on theme
  const themeStyles = {
    gold: {
      btnActive: 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-neutral-950 shadow-lg shadow-amber-500/25',
      btnDone: 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300',
      counterBadge: 'bg-neutral-900/90 text-amber-200 border-amber-500/30',
    },
    minimal: {
      btnActive: 'bg-stone-900 hover:bg-stone-800 text-stone-50 shadow-md',
      btnDone: 'bg-stone-100 border border-stone-300 text-stone-700',
      counterBadge: 'bg-stone-100 text-stone-700 border-stone-200',
    },
    floral: {
      btnActive: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-200',
      btnDone: 'bg-rose-50 border border-rose-300 text-rose-800',
      counterBadge: 'bg-rose-50 text-rose-900 border-rose-200',
    },
    midnight: {
      btnActive: 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 hover:from-amber-300 hover:to-yellow-100 text-slate-950 shadow-lg shadow-amber-400/20',
      btnDone: 'bg-slate-900/90 border border-amber-400/40 text-amber-300',
      counterBadge: 'bg-slate-900/90 text-amber-200 border-amber-400/30',
    },
    heritage: {
      btnActive: 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-50 shadow-lg shadow-amber-900/30',
      btnDone: 'bg-amber-950 border border-amber-700 text-amber-200',
      counterBadge: 'bg-amber-950/80 text-amber-200 border-amber-800',
    },
  }[theme];

  return (
    <div className="my-6 px-2">
      <div className="flex flex-col items-center justify-center space-y-3">
        {/* RSVP Action Button */}
        <button
          type="button"
          onClick={handleRsvpClick}
          disabled={hasRsvped || isLoading}
          aria-label="تأكيد الحضور"
          className={`w-full max-w-sm py-3.5 px-6 rounded-2xl font-bold font-cairo text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all duration-300 transform active:scale-98 ${
            hasRsvped
              ? `${themeStyles.btnDone} cursor-default`
              : `${themeStyles.btnActive} cursor-pointer hover:scale-[1.02]`
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>جاري تأكيد الحضور...</span>
            </>
          ) : hasRsvped ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>تم تأكيد حضورك بنجاح ✓</span>
            </>
          ) : (
            <>
              <HeartHandshake className="w-5 h-5" />
              <span>سأحضر (تأكيد الحضور)</span>
            </>
          )}
        </button>

        {/* Guest Counter Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-tajawal border backdrop-blur-sm ${themeStyles.counterBadge}`}
        >
          <Users className="w-3.5 h-3.5 opacity-80" />
          <span>عدد الحضور المؤكدين:</span>
          <span className="font-bold text-sm font-cairo">
            {toArabicNumerals(count)}
          </span>
          <span>ضيف</span>
        </div>

        {/* Feedback Alert Toast */}
        {feedbackMessage && (
          <div className="w-full max-w-sm text-center p-3 rounded-xl text-xs font-tajawal bg-amber-500/10 border border-amber-500/30 text-amber-200 animate-fadeIn">
            {feedbackMessage}
          </div>
        )}
      </div>
    </div>
  );
};
