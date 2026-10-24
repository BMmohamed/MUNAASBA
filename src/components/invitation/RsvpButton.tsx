'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, HeartHandshake, Loader2, Users, Plus, Minus, UserCheck } from 'lucide-react';
import { getDeviceFingerprint, hasLocalRsvpRecord, setLocalRsvpRecord } from '@/lib/device-fingerprint';
import { toArabicNumerals } from '@/lib/date-utils';

interface RsvpButtonProps {
  invitationId: string;
  slug: string;
  initialCount: number;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
  isHostView?: boolean;
}

export const RsvpButton: React.FC<RsvpButtonProps> = ({
  invitationId,
  slug,
  initialCount,
  theme = 'gold',
  isHostView = false,
}) => {
  const [count, setCount] = useState<number>(initialCount);
  const [hasRsvped, setHasRsvped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>('');

  useEffect(() => {
    // Check if this device has already RSVPed in localStorage
    if (hasLocalRsvpRecord(invitationId)) {
      setHasRsvped(true);
    }
  }, [invitationId]);

  const triggerCelebrationConfetti = () => {
    try {
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
        body: JSON.stringify({
          fingerprint,
          guestCount,
          guestName: guestName.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCount(data.newCount);
        setHasRsvped(true);
        setLocalRsvpRecord(invitationId);
        triggerCelebrationConfetti();
        const suffix = guestCount > 1 ? ` لـ (${toArabicNumerals(guestCount)}) أفراد` : '';
        setFeedbackMessage(data.message || `تم تأكيد حضوركم${suffix} بنجاح! نتشرف بوجودكم معنا.`);
      } else {
        setFeedbackMessage(data.message || 'عذراً، حدث خطأ أثناء تأكيد الحضور.');
      }
    } catch {
      // Offline fallback: optimistic lock
      setCount((prev) => prev + guestCount);
      setHasRsvped(true);
      setLocalRsvpRecord(invitationId);
      triggerCelebrationConfetti();
      setFeedbackMessage('تم تسجيل حضوركم! نتشرف بلقائكم.');
    } finally {
      setIsLoading(false);
    }
  };

  // Button styles based on theme
  const themeStyles = {
    gold: {
      cardBg: 'bg-neutral-950/80 border-amber-500/35',
      btnActive: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-black shadow-lg shadow-amber-500/30',
      btnDone: 'bg-emerald-950/90 border-2 border-emerald-400 text-emerald-300 font-bold',
      counterBadge: 'bg-black/70 text-amber-200 border border-amber-400/50 shadow-md',
      stepperBtn: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40',
      accentText: 'text-amber-300',
    },
    minimal: {
      cardBg: 'bg-stone-950/80 border-stone-600/40',
      btnActive: 'bg-gradient-to-r from-stone-100 to-stone-300 hover:from-white hover:to-stone-200 text-stone-950 font-black shadow-lg shadow-black/50',
      btnDone: 'bg-stone-900 border-2 border-stone-500 text-stone-200 font-bold',
      counterBadge: 'bg-black/70 text-stone-200 border border-stone-600 shadow-md',
      stepperBtn: 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600',
      accentText: 'text-stone-200',
    },
    floral: {
      cardBg: 'bg-rose-950/70 border-rose-400/40',
      btnActive: 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 hover:from-rose-400 hover:to-pink-400 text-white font-black shadow-lg shadow-rose-950/50',
      btnDone: 'bg-rose-950/90 border-2 border-rose-400 text-rose-200 font-bold',
      counterBadge: 'bg-black/70 text-rose-200 border border-rose-400/50 shadow-md',
      stepperBtn: 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-400/40',
      accentText: 'text-rose-300',
    },
    midnight: {
      cardBg: 'bg-slate-950/80 border-amber-400/35',
      btnActive: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black shadow-lg shadow-amber-400/30',
      btnDone: 'bg-slate-900 border-2 border-amber-400 text-amber-200 font-bold',
      counterBadge: 'bg-black/70 text-amber-200 border border-amber-400/50 shadow-md',
      stepperBtn: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40',
      accentText: 'text-amber-300',
    },
    heritage: {
      cardBg: 'bg-amber-950/70 border-amber-600/40',
      btnActive: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-black shadow-lg shadow-amber-950/50',
      btnDone: 'bg-amber-950/90 border-2 border-amber-500 text-amber-200 font-bold',
      counterBadge: 'bg-black/70 text-amber-200 border border-amber-600/50 shadow-md',
      stepperBtn: 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-600/40',
      accentText: 'text-amber-300',
    },
  }[theme];

  return (
    <div className="my-6 px-2 w-full max-w-sm mx-auto">
      <div className="flex flex-col items-center justify-center space-y-3">
        
        {/* Host Live Counter (ONLY shown if isHostView is true) */}
        {isHostView && (
          <div
            className={`w-full p-3 rounded-2xl flex items-center justify-between border ${themeStyles.counterBadge}`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold font-cairo">إجمالي الحضور المؤكدين:</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-black text-lg font-cairo text-amber-300">
                {toArabicNumerals(count)}
              </span>
              <span className="text-[11px] text-neutral-400 font-tajawal">شخص</span>
            </div>
          </div>
        )}

        {/* Guest RSVP Confirmation State */}
        {hasRsvped ? (
          <div className="w-full p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/50 text-center space-y-2 animate-fadeIn shadow-xl">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-emerald-200 font-cairo">
              تم تأكيد حضوركم بنجاح ✓
            </h4>
            <p className="text-xs text-emerald-300/90 font-tajawal leading-relaxed">
              لقد سجلتم حضوركم في قائمة المدعوين. نسعد ونشرف بلقائكم في هذه الليلة المباركة.
            </p>
          </div>
        ) : (
          /* Interactive RSVP Card with Guest Count Stepper */
          <div className={`w-full rounded-2xl p-4 border backdrop-blur-md shadow-2xl space-y-3.5 ${themeStyles.cardBg}`}>
            
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-neutral-200 font-cairo flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>تأكيد الحضور (RSVP)</span>
              </span>
              <span className="text-[11px] text-neutral-400 font-tajawal">
                بلمسة واحدة
              </span>
            </div>

            {/* Guest Count Stepper Row */}
            <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/5">
              <span className="text-xs font-medium text-neutral-300 font-tajawal">
                عدد الأفراد الحاضرين:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                  disabled={guestCount <= 1 || isLoading}
                  aria-label="إنقاص عدد الحضور"
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${themeStyles.stepperBtn}`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="min-w-[48px] text-center">
                  <span className={`font-black text-base font-cairo ${themeStyles.accentText}`}>
                    {toArabicNumerals(guestCount)}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-tajawal mr-1">
                    {guestCount === 1 ? 'فرد' : guestCount === 2 ? 'فردين' : 'أفراد'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestCount((prev) => Math.min(15, prev + 1))}
                  disabled={guestCount >= 15 || isLoading}
                  aria-label="زيادة عدد الحضور"
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${themeStyles.stepperBtn}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Optional Guest Name / Family Name */}
            <div>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="اسم الضيف / العائلة (اختياري - مثال: أم محمد)"
                className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-neutral-100 placeholder:text-neutral-500 text-xs font-tajawal focus:outline-none focus:border-amber-400/70 text-right transition-colors"
                dir="rtl"
              />
            </div>

            {/* Action RSVP Confirmation Button */}
            <button
              type="button"
              onClick={handleRsvpClick}
              disabled={isLoading}
              aria-label="تأكيد الحضور"
              className={`w-full py-3 px-5 rounded-xl font-bold font-cairo text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-98 cursor-pointer ${themeStyles.btnActive}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري تسجيل الحضور...</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>
                    سأحضر {guestCount > 1 ? `(${toArabicNumerals(guestCount)} أفراد)` : ''}
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Feedback Alert Toast */}
        {feedbackMessage && (
          <div className="w-full text-center p-3 rounded-xl text-xs font-tajawal bg-amber-500/10 border border-amber-500/30 text-amber-200 animate-fadeIn">
            {feedbackMessage}
          </div>
        )}

      </div>
    </div>
  );
};
