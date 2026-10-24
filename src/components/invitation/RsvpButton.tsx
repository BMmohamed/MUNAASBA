'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  HeartHandshake,
  Loader2,
  Users,
  Plus,
  Minus,
  UserCheck,
  Crown,
  Sparkles,
  Edit3,
  Check,
} from 'lucide-react';
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

  // Host Direct Controls State
  const [isAdjusting, setIsAdjusting] = useState<boolean>(false);
  const [hostAddName, setHostAddName] = useState<string>('');
  const [hostAddCount, setHostAddCount] = useState<number>(1);
  const [showManualSet, setShowManualSet] = useState<boolean>(false);
  const [manualCountInput, setManualCountInput] = useState<string>(String(initialCount));

  useEffect(() => {
    setCount(initialCount);
    setManualCountInput(String(initialCount));
  }, [initialCount]);

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

  // Host Direct Adjustment Handler (+1, -1, +5, +10 or exact)
  const handleHostAdjust = async (options: { delta?: number; exact?: number; label?: string }) => {
    if (isAdjusting) return;
    setIsAdjusting(true);
    setFeedbackMessage(null);

    let nextCount = count;
    if (typeof options.exact === 'number') {
      nextCount = Math.max(0, options.exact);
    } else if (typeof options.delta === 'number') {
      nextCount = Math.max(0, count + options.delta);
    }

    // Optimistic UI update
    setCount(nextCount);
    setManualCountInput(String(nextCount));

    try {
      const res = await fetch(`/api/invitations/${slug}/adjust-rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          delta: options.delta,
          exact: options.exact,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCount(data.newCount);
        setManualCountInput(String(data.newCount));
        if ((options.delta && options.delta > 0) || (options.exact && options.exact > count)) {
          triggerCelebrationConfetti();
        }
        setFeedbackMessage(
          options.label
            ? `تم ${options.label} • إجمالي العداد الآن: (${toArabicNumerals(data.newCount)}) شخص ✓`
            : `تم تحديث العداد إلى: (${toArabicNumerals(data.newCount)}) شخص ✓`
        );
        setTimeout(() => setFeedbackMessage(null), 4000);
      } else {
        throw new Error();
      }
    } catch {
      // Rollback
      setCount(count);
      setFeedbackMessage('تعذر تحديث العداد، يرجى المحاولة ثانية.');
    } finally {
      setIsAdjusting(false);
    }
  };

  // Host Direct Add Specific Guest/Family
  const handleHostAddSpecificGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = hostAddName.trim();
    const countToAdd = Math.max(1, hostAddCount);
    const label = name ? `إضافة (${name} - ${countToAdd} أفراد)` : `إضافة (${countToAdd}) أفراد`;
    await handleHostAdjust({ delta: countToAdd, label });
    setHostAddName('');
    setHostAddCount(1);
  };

  // Host Apply Manual Count
  const handleHostApplyManual = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(manualCountInput, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      await handleHostAdjust({ exact: parsed, label: `تعيين العداد يدوياً إلى (${parsed})` });
      setShowManualSet(false);
    }
  };

  // Regular Guest RSVP Click
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
      cardBg: 'bg-neutral-950/85 border-amber-500/40',
      btnActive: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-black shadow-lg shadow-amber-500/30',
      counterBadge: 'bg-black/75 text-amber-200 border border-amber-400/50 shadow-md',
      stepperBtn: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40',
      accentText: 'text-amber-300',
    },
    minimal: {
      cardBg: 'bg-stone-950/85 border-stone-600/40',
      btnActive: 'bg-gradient-to-r from-stone-100 to-stone-300 hover:from-white hover:to-stone-200 text-stone-950 font-black shadow-lg shadow-black/50',
      counterBadge: 'bg-black/75 text-stone-200 border border-stone-600 shadow-md',
      stepperBtn: 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600',
      accentText: 'text-stone-200',
    },
    floral: {
      cardBg: 'bg-rose-950/75 border-rose-400/40',
      btnActive: 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 hover:from-rose-400 hover:to-pink-400 text-white font-black shadow-lg shadow-rose-950/50',
      counterBadge: 'bg-black/75 text-rose-200 border border-rose-400/50 shadow-md',
      stepperBtn: 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-400/40',
      accentText: 'text-rose-300',
    },
    midnight: {
      cardBg: 'bg-slate-950/85 border-amber-400/40',
      btnActive: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black shadow-lg shadow-amber-400/30',
      counterBadge: 'bg-black/75 text-amber-200 border border-amber-400/50 shadow-md',
      stepperBtn: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40',
      accentText: 'text-amber-300',
    },
    heritage: {
      cardBg: 'bg-amber-950/75 border-amber-600/40',
      btnActive: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-black shadow-lg shadow-amber-950/50',
      counterBadge: 'bg-black/75 text-amber-200 border border-amber-600/50 shadow-md',
      stepperBtn: 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-600/40',
      accentText: 'text-amber-300',
    },
  }[theme];

  return (
    <div className="my-6 px-2 w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4">
        
        {/* ======================================================== */}
        {/* 1. HOST VIEW: Full Direct Counter Management Control Hub */}
        {/* ======================================================== */}
        {isHostView ? (
          <div className={`w-full rounded-3xl p-5 border backdrop-blur-md shadow-2xl space-y-4 ${themeStyles.cardBg}`}>
            
            {/* Host Header Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/25">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-100 font-cairo flex items-center gap-1.5">
                    <span>لوحة تحكم أهل العرس</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      مباشر 🟢
                    </span>
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-tajawal">
                    تحكم فوري بالعداد وزيادة أو إنقاص الحضور مباشرة
                  </p>
                </div>
              </div>

              {/* Toggle manual set input */}
              <button
                type="button"
                onClick={() => setShowManualSet((prev) => !prev)}
                title="تعديل الرقم يدوياً"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* Big Royal Counter Display */}
            <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 text-center relative overflow-hidden">
              <div className="text-xs text-neutral-400 font-tajawal mb-1">
                إجمالي الحضور المؤكدين حالياً
              </div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-black font-cairo text-amber-300 drop-shadow-[0_2px_15px_rgba(251,191,36,0.35)]">
                  {toArabicNumerals(count)}
                </span>
                <span className="text-sm text-neutral-300 font-tajawal font-medium">
                  {count === 1 ? 'ضيف' : count === 2 ? 'ضيفين' : 'ضيوف مؤكدين'}
                </span>
              </div>

              {isAdjusting && (
                <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] text-amber-400 font-tajawal animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>جاري المزامنة...</span>
                </div>
              )}
            </div>

            {/* Optional Manual Count Input Form */}
            {showManualSet && (
              <form
                onSubmit={handleHostApplyManual}
                className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 animate-fadeIn"
              >
                <span className="text-xs text-amber-200 font-tajawal whitespace-nowrap">
                  العدد المباشر:
                </span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={manualCountInput}
                  onChange={(e) => setManualCountInput(e.target.value)}
                  className="w-24 px-2 py-1.5 rounded-lg bg-neutral-900 border border-amber-500/40 text-amber-200 text-center font-bold text-sm focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={isAdjusting}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-all cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>تطبيق</span>
                </button>
              </form>
            )}

            {/* Quick +/- Action Buttons Grid */}
            <div className="space-y-2">
              <div className="text-[11px] font-tajawal text-neutral-400 flex items-center justify-between">
                <span>التحكم السريع في العداد:</span>
                <span className="text-[10px] text-amber-400/80">بنقرة واحدة</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {/* -1 Button */}
                <button
                  type="button"
                  onClick={() => handleHostAdjust({ delta: -1, label: 'إنقاص (١) ضيف' })}
                  disabled={isAdjusting || count <= 0}
                  className="py-2.5 px-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 active:scale-95 text-rose-300 border border-rose-500/30 flex flex-col items-center justify-center font-cairo font-bold text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="flex items-center gap-0.5 text-sm font-black">
                    <Minus className="w-3.5 h-3.5" /> 1
                  </span>
                  <span className="text-[10px] font-tajawal opacity-80">إنقاص ضيف</span>
                </button>

                {/* +1 Button */}
                <button
                  type="button"
                  onClick={() => handleHostAdjust({ delta: 1, label: 'إضافة (١) ضيف' })}
                  disabled={isAdjusting}
                  className="py-2.5 px-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 active:scale-95 text-emerald-300 border border-emerald-500/30 flex flex-col items-center justify-center font-cairo font-bold text-xs transition-all disabled:opacity-30 cursor-pointer"
                >
                  <span className="flex items-center gap-0.5 text-sm font-black">
                    <Plus className="w-3.5 h-3.5" /> 1
                  </span>
                  <span className="text-[10px] font-tajawal opacity-80">إضافة ضيف</span>
                </button>

                {/* +5 Button */}
                <button
                  type="button"
                  onClick={() => handleHostAdjust({ delta: 5, label: 'إضافة (٥) ضيوف' })}
                  disabled={isAdjusting}
                  className="py-2.5 px-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 active:scale-95 text-amber-300 border border-amber-500/30 flex flex-col items-center justify-center font-cairo font-bold text-xs transition-all disabled:opacity-30 cursor-pointer"
                >
                  <span className="flex items-center gap-0.5 text-sm font-black">
                    <Plus className="w-3.5 h-3.5" /> 5
                  </span>
                  <span className="text-[10px] font-tajawal opacity-80">+5 عائلة</span>
                </button>

                {/* +10 Button */}
                <button
                  type="button"
                  onClick={() => handleHostAdjust({ delta: 10, label: 'إضافة (١٠) ضيوف' })}
                  disabled={isAdjusting}
                  className="py-2.5 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 text-amber-200 border border-amber-400/40 flex flex-col items-center justify-center font-cairo font-bold text-xs transition-all disabled:opacity-30 cursor-pointer shadow-sm"
                >
                  <span className="flex items-center gap-0.5 text-sm font-black">
                    <Plus className="w-3.5 h-3.5" /> 10
                  </span>
                  <span className="text-[10px] font-tajawal opacity-80">+10 قرابة</span>
                </button>
              </div>
            </div>

            {/* Direct Add Guest / Family Form */}
            <form onSubmit={handleHostAddSpecificGuest} className="pt-2 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-tajawal text-neutral-300">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>إضافة ضيف أو عائلة بالاسم مباشرة:</span>
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={hostAddName}
                  onChange={(e) => setHostAddName(e.target.value)}
                  placeholder="اسم الضيف / العائلة (مثال: عائلة أبو فهد)"
                  className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-neutral-100 placeholder:text-neutral-500 text-xs font-tajawal focus:outline-none focus:border-amber-400/80 text-right"
                  dir="rtl"
                />

                <div className="flex items-center gap-1 bg-black/40 px-2 rounded-xl border border-white/15">
                  <button
                    type="button"
                    onClick={() => setHostAddCount((prev) => Math.max(1, prev - 1))}
                    disabled={hostAddCount <= 1}
                    className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:text-white disabled:opacity-30"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-amber-300 font-cairo">
                    {toArabicNumerals(hostAddCount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHostAddCount((prev) => Math.min(20, prev + 1))}
                    disabled={hostAddCount >= 20}
                    className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:text-white disabled:opacity-30"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAdjusting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold font-cairo text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة إلى قائمة الحضور وتحديث العداد</span>
              </button>
            </form>

          </div>
        ) : (
          /* ======================================================== */
          /* 2. GUEST VIEW: Standard RSVP Card (Counter is HIDDEN)    */
          /* ======================================================== */
          hasRsvped ? (
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
          )
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
