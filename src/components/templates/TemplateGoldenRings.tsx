'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Navigation, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  Coffee, 
  Utensils, 
  CameraOff, 
  Baby, 
  Music, 
  Check, 
  X,
  Volume2,
  VolumeX,
  ChevronDown
} from 'lucide-react';
import { InvitationData } from '@/types/invitation';
import { formatArabicDateDisplay, toArabicNumerals } from '@/lib/date-utils';
import {
  getFontFamilyClass,
  getFontFamilyStyle,
  getNamesSizeClass,
  getVerseSizeClass,
  getParentsSizeClass,
} from '@/lib/typography-utils';
import { ScrollReveal } from '../common/ScrollReveal';
import { CountdownTimer } from '../invitation/CountdownTimer';
import { generateGoogleCalendarUrl, downloadAppleIcsFile } from '@/lib/calendar';

export const TemplateGoldenRings: React.FC<{ invitation: InvitationData; isHostView?: boolean }> = ({
  invitation,
  isHostView = false,
}) => {
  const typo = invitation.typography;
  const namesFont = getFontFamilyClass(typo?.namesFontFamily || 'ruqaa');
  const verseFont = getFontFamilyClass(typo?.verseFontFamily || 'amiri');
  const parentsFont = getFontFamilyClass(typo?.parentsFontFamily || 'tajawal');
  const namesSize = getNamesSizeClass(typo?.namesSize || 'xlarge');
  const verseSize = getVerseSizeClass(typo?.verseSize || 'medium');
  const parentsSize = getParentsSizeClass(typo?.parentsSize || 'medium');

  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  // RSVP Form State
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [guestName, setGuestName] = useState('');
  const [companionCount, setCompanionCount] = useState(0);
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setIsSubmittingRsvp(true);
    try {
      await fetch(`/api/invitations/${invitation.slug}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName,
          status: rsvpStatus,
          guestsCount: rsvpStatus === 'yes' ? 1 + companionCount : 0,
          message: guestMessage,
        }),
      });
      setRsvpSubmitted(true);
    } catch {
      setRsvpSubmitted(true);
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const googleUrl = generateGoogleCalendarUrl({
    title: `${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`,
    description: `${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`,
    location: `${invitation.venueName} - ${invitation.venueCity}`,
    startDate: invitation.eventDate,
    durationHours: 4,
  });

  return (
    <div 
      className="relative min-h-screen text-[#f9e7ec] font-tajawal overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at top, #2b0e0a 0%, #170705 60%, #0d0302 100%)',
      }}
      dir="rtl"
    >
      {/* Background Soft Glow & Velvet Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,106,0.18)_0%,transparent_60%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Gentle Light Sparks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <span className="absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />
        <span className="absolute top-[28%] right-[15%] w-2 h-2 rounded-full bg-amber-300 blur-[1px] animate-ping" />
        <span className="absolute top-[55%] left-[22%] w-1 h-1 rounded-full bg-amber-100" />
        <span className="absolute top-[75%] right-[25%] w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
      </div>

      {/* Floating Music Toggle Button */}
      {invitation.toggles.showMusic && (
        <div className="fixed top-5 left-5 z-50">
          <button
            type="button"
            onClick={toggleAudio}
            className="p-3 rounded-full bg-neutral-900/80 border border-amber-400/40 text-amber-300 shadow-xl backdrop-blur-md hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
            title={isPlayingAudio ? 'كتم الموسيقى الهادئة' : 'تشغيل الموسيقى الهادئة'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>
          <audio ref={audioRef} loop src={invitation.coverMusicTrack || '/audio/gentle-piano.mp3'} />
        </div>
      )}

      {/* Main Free-Flowing Content Area (No restrictive outer boxes) */}
      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 py-14 space-y-12 text-center">

        {/* 1. HERO SECTION: Emblem & Free Typography */}
        <header className="space-y-6 pt-4">
          <ScrollReveal delay={0.2}>
            {/* Jewelry Emblem: Interlocking Diamond Rings SVG */}
            <div className="flex justify-center mb-4">
              <div className="relative group cursor-pointer p-4">
                <svg className="w-16 h-16 drop-shadow-[0_4px_16px_rgba(212,175,106,0.4)]" viewBox="0 0 60 60" fill="none">
                  {/* Left Ring */}
                  <circle cx="25" cy="35" r="15" stroke="#d4af6a" strokeWidth="3" fill="none" opacity="0.9" />
                  {/* Right Ring with Solitaire Diamond Top */}
                  <circle cx="37" cy="33" r="15" stroke="#e6c382" strokeWidth="3" fill="none" />
                  {/* Solitaire Diamond Gem */}
                  <polygon points="37,8 43,15 37,21 31,15" fill="#fdf8ed" stroke="#d4af6a" strokeWidth="1.2" />
                  {/* Sparkle Glints */}
                  <line x1="37" y1="2" x2="37" y2="7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="28" y1="12" x2="33" y2="14" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
                  <line x1="41" y1="14" x2="46" y2="12" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-[12px] font-bold text-[#d4af6a] uppercase tracking-[0.25em]">
              Wedding Invitation
            </p>
            <h3 className="text-sm sm:text-base font-bold text-amber-200/90 font-cairo mt-1">
              {invitation.eventTitle}
            </h3>
          </ScrollReveal>

          {/* FREE-FLOWING COUPLE NAMES (Zero framing boxes) */}
          <ScrollReveal delay={0.7}>
            <div className="py-4 space-y-2">
              <h1
                className={`${namesFont} text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-[0_4px_20px_rgba(212,175,106,0.35)]`}
                style={{
                  color: typo?.namesColor || '#f6dfb2',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.groomName}
              </h1>

              <div className="flex items-center justify-center gap-3 py-1">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af6a]/60" />
                <span className="text-[#d4af6a] font-ruqaa text-2xl sm:text-3xl">&</span>
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af6a]/60" />
              </div>

              <h1
                className={`${namesFont} text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-[0_4px_20px_rgba(212,175,106,0.35)]`}
                style={{
                  color: typo?.namesColor || '#f6dfb2',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.brideName}
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1.0}>
            <p className="text-xs sm:text-sm text-[#f9e7ec]/80 font-tajawal max-w-sm mx-auto leading-relaxed">
              يتشرفون بدعوتكم لمشاركتهم بهجة العمر وعقد القران المبارك
            </p>
          </ScrollReveal>

          {/* Scroll Down Cue */}
          <div className="pt-2 flex flex-col items-center gap-1 opacity-70 animate-bounce">
            <span className="text-[10px] tracking-wider text-[#d4af6a]">اسحب للأسفل</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#d4af6a]" />
          </div>
        </header>

        {/* 2. VERSE / دعاء (Pure text floating with jewelry diamonds) */}
        {invitation.toggles.showVerse !== false && (
          <ScrollReveal delay={1.2}>
            <section className="py-6 space-y-3">
              {/* Jewel Flourish Icon */}
              <div className="flex justify-center">
                <svg className="w-6 h-6 text-[#d4af6a]" viewBox="0 0 26 26" fill="none">
                  <polygon points="13,2 24,13 13,24 2,13" stroke="currentColor" strokeWidth="1.5" />
                  <polygon points="13,7 19,13 13,19 7,13" fill="#eec3c9" opacity="0.6" />
                </svg>
              </div>

              <p
                className={`${verseFont} ${verseSize} leading-loose max-w-md mx-auto text-[#fdf6f0] drop-shadow`}
                style={{
                  color: typo?.verseColor || '#fef3c7',
                  ...getFontFamilyStyle(typo?.verseFontFamily),
                }}
              >
                {invitation.headerVerse}
              </p>

              {invitation.verseSource && (
                <span className="text-[11px] text-[#d4af6a]/90 font-tajawal block">
                  — {invitation.verseSource} —
                </span>
              )}
            </section>
          </ScrollReveal>
        )}

        {/* 3. FAMILIES INVITATION (Open dual columns with center wedding jewel) */}
        {invitation.toggles.showParents !== false && (
          <ScrollReveal delay={1.4}>
            <section className="py-6 border-y border-[#d4af6a]/20 space-y-6">
              <h4 className="text-xs font-bold text-[#d4af6a] uppercase tracking-widest">
                دعوة كريمة
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
                {/* Groom's Family */}
                <div className="sm:col-span-5 text-center sm:text-right space-y-1">
                  <span className="text-[11px] text-[#d4af6a]/80 block font-semibold">أهل العريس</span>
                  <p 
                    className={`${parentsFont} ${parentsSize} font-bold text-white`}
                    style={{ ...getFontFamilyStyle(typo?.parentsFontFamily) }}
                  >
                    {invitation.groomParents || 'والدا العريس'}
                  </p>
                </div>

                {/* Center Jewel Icon */}
                <div className="sm:col-span-1 flex justify-center py-2 sm:py-0">
                  <svg className="w-7 h-7 text-[#d4af6a]" viewBox="0 0 26 26" fill="none">
                    <circle cx="13" cy="15" r="7" stroke="#d4af6a" strokeWidth="2" />
                    <polygon points="9,8 13,4 17,8 13,12" fill="#f7dfe4" stroke="#d4af6a" strokeWidth="0.8" />
                  </svg>
                </div>

                {/* Bride's Family */}
                <div className="sm:col-span-5 text-center sm:text-left space-y-1">
                  <span className="text-[11px] text-[#d4af6a]/80 block font-semibold">أهل العروس</span>
                  <p 
                    className={`${parentsFont} ${parentsSize} font-bold text-white`}
                    style={{ ...getFontFamilyStyle(typo?.parentsFontFamily) }}
                  >
                    {invitation.brideParents || 'والدا العروس'}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#f9e7ec]/90 max-w-md mx-auto leading-relaxed pt-2">
                {invitation.welcomeMessage}
              </p>
            </section>
          </ScrollReveal>
        )}

        {/* 4. DATE & TIME (The Authentic Tear-off Calendar Sheet like Halaheel demo-ring) */}
        <ScrollReveal delay={1.6}>
          <section className="py-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold font-ruqaa text-[#d4af6a] flex items-center justify-center gap-2">
              <span>حفظ الموعد</span>
              <span>💍</span>
            </h3>

            {/* Tear-off Calendar Pad Widget */}
            <div className="max-w-[270px] mx-auto rounded-3xl overflow-hidden bg-[#1f0b09]/90 border border-[#d4af6a]/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
              
              {/* Calendar Top Header with Golden Pins */}
              <div className="relative py-3 px-4 bg-gradient-to-r from-[#d4af6a] via-[#e5c07b] to-[#b0546e] text-[#200806] font-bold text-sm text-center shadow-md">
                <span className="absolute -top-1.5 right-1/3 w-2 h-4 rounded bg-white/50 shadow-sm" />
                <span className="absolute -top-1.5 left-1/3 w-2 h-4 rounded bg-white/50 shadow-sm" />
                <span>{dateFormatted.monthName} {dateFormatted.year} م</span>
              </div>

              {/* Calendar Day & Time Body */}
              <div className="p-6 text-center space-y-1">
                <div className="text-sm font-bold text-[#f9e7ec]/80">{dateFormatted.dayName}</div>
                <div className="text-5xl sm:text-6xl font-extrabold font-ruqaa text-[#d4af6a] leading-tight my-1">
                  {toArabicNumerals(dateFormatted.dayNumber)}
                </div>
                {invitation.eventDateHijri && (
                  <div className="text-[11px] text-[#f9e7ec]/70 font-semibold">
                    الموافق {invitation.eventDateHijri}
                  </div>
                )}
                <div className="text-xs font-bold text-[#f9e7ec] pt-2 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#d4af6a]" />
                  <span>{invitation.timeFormatted}</span>
                </div>
              </div>

              {/* Instant Calendar Action Footer */}
              <div className="border-t border-dashed border-[#d4af6a]/40 p-4 bg-black/20 text-center space-y-2.5">
                <p className="text-[11px] font-semibold text-[#f9e7ec]/80">
                  📲 أضف الموعد لتقويم هاتفك بنقرة واحدة
                </p>
                <div className="flex items-center justify-center gap-2">
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d4af6a] bg-white/10 text-[#f9e7ec] text-xs font-bold hover:bg-[#d4af6a] hover:text-[#200806] transition-all"
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      downloadAppleIcsFile({
                        title: `${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`,
                        description: invitation.welcomeMessage,
                        location: `${invitation.venueName} - ${invitation.venueCity}`,
                        startDate: invitation.eventDate,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d4af6a] bg-white/10 text-[#f9e7ec] text-xs font-bold hover:bg-[#d4af6a] hover:text-[#200806] transition-all cursor-pointer"
                  >
                    <span>Apple Calendar</span>
                  </button>
                </div>
              </div>

            </div>
          </section>
        </ScrollReveal>

        {/* 5. COUNTDOWN TIMER */}
        {invitation.toggles.showCountdown && (
          <ScrollReveal delay={1.8}>
            <section className="py-4">
              <CountdownTimer targetDate={invitation.eventDate} theme="gold" />
            </section>
          </ScrollReveal>
        )}

        {/* 6. TIMELINE (Order of Events) */}
        {invitation.timeline && invitation.timeline.length > 0 && (
          <ScrollReveal delay={2.0}>
            <section className="py-6 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-[#d4af6a] uppercase tracking-wider">مراسم الفرح</span>
                <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">الجدول الزمني للحفل</h3>
              </div>

              <div className="relative max-w-sm mx-auto space-y-5 before:absolute before:inset-0 before:right-6 before:w-0.5 before:bg-gradient-to-b before:from-[#d4af6a] before:via-[#d4af6a]/40 before:to-transparent">
                {invitation.timeline.map((item, idx) => (
                  <div key={item.id || idx} className="relative flex items-center gap-4 pr-1">
                    <div className="w-10 h-10 rounded-full border-2 border-[#d4af6a] bg-[#1e0a08] flex items-center justify-center text-[#d4af6a] shadow-lg shrink-0 z-10">
                      {item.icon === 'dinner' ? <Utensils className="w-4 h-4" /> : item.icon === 'coffee' ? <Coffee className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#d4af6a] block">{item.time}</span>
                      <span className="text-sm font-semibold text-white">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* 7. VENUE & LOCATION MAP */}
        {invitation.toggles.showLocation && (
          <ScrollReveal delay={2.2}>
            <section className="py-6 space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-[#d4af6a] uppercase tracking-wider">مكان الحفل</span>
                <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">{invitation.venueName}</h3>
                {invitation.venueHall && (
                  <p className="text-xs text-amber-200/90 font-semibold">{invitation.venueHall}</p>
                )}
                <p className="text-xs text-neutral-300">{invitation.venueCity} {invitation.venueAddress && `• ${invitation.venueAddress}`}</p>
              </div>

              {invitation.googleMapsUrl && (
                <div className="pt-2">
                  <a
                    href={invitation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af6a] to-[#c59e56] text-[#200806] font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>فتح الموقع عبر خرائط Google</span>
                  </a>
                </div>
              )}
            </section>
          </ScrollReveal>
        )}

        {/* 8. KIND ADVISORIES (No Photography & Children) */}
        <ScrollReveal delay={2.4}>
          <section className="py-4 space-y-3">
            {invitation.toggles.showNoPhotography && (
              <div className="flex items-center justify-center gap-2.5 text-xs text-amber-200/90 py-2">
                <CameraOff className="w-4 h-4 text-[#d4af6a] shrink-0" />
                <span>نرجو التكرم بعدم التصوير بالهواتف حفظاً للخصوصية ولكم جزيل الشكر</span>
              </div>
            )}

            {invitation.toggles.showChildrenAdvisory && (
              <div className="flex items-center justify-center gap-2.5 text-xs text-amber-200/90 py-1">
                <Baby className="w-4 h-4 text-[#d4af6a] shrink-0" />
                <span>{invitation.toggles.childrenAdvisoryText || 'جنة الأطفال منازلهم لتكتمل فرحتنا بوجودكم'}</span>
              </div>
            )}
          </section>
        </ScrollReveal>

        {/* 9. RSVP CARD (Frosted Glass Container at bottom) */}
        {invitation.toggles.showRsvp && (
          <ScrollReveal delay={2.6}>
            <section className="pt-4 pb-10">
              <div className="rounded-3xl bg-[#1e0a08]/80 border border-[#d4af6a]/50 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
                
                <div className="space-y-1">
                  <div className="flex justify-center text-[#d4af6a] text-lg">💍</div>
                  <h3 className="text-2xl font-bold font-ruqaa text-[#d4af6a]">تأكيد الحضور</h3>
                  <p className="text-xs text-[#f9e7ec]/70">يسعدنا ويشرفنا معرفة قرار حضوركم لمشاركتنا فرحتنا</p>
                </div>

                {rsvpSubmitted ? (
                  <div className="py-8 space-y-3 text-center animate-fadeIn">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-300 font-cairo">تم تسجيل ردكم بكل سرور</h4>
                    <p className="text-xs text-neutral-300 font-tajawal">شاكرين ومقدرين لكم تواصلكم ومشاركتكم فرحتنا 💍</p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4 text-right">
                    <div>
                      <label className="block text-xs font-bold text-[#d4af6a] mb-1">اسم الضيف الكريم</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="الاسم الثلاثي..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-[#d4af6a]/40 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#d4af6a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#d4af6a] mb-1.5">هل ستشرفنا بالحضور؟</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('yes')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'yes'
                              ? 'bg-[#d4af6a] text-[#200806] border-[#d4af6a] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#f9e7ec] hover:border-[#d4af6a]'
                          }`}
                        >
                          نعم، سأحضر
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('no')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'no'
                              ? 'bg-[#d4af6a] text-[#200806] border-[#d4af6a] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#f9e7ec] hover:border-[#d4af6a]'
                          }`}
                        >
                          أعتذر
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('maybe')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'maybe'
                              ? 'bg-[#d4af6a] text-[#200806] border-[#d4af6a] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#f9e7ec] hover:border-[#d4af6a]'
                          }`}
                        >
                          ربما
                        </button>
                      </div>
                    </div>

                    {rsvpStatus === 'yes' && (
                      <div>
                        <label className="block text-xs font-bold text-[#d4af6a] mb-1">
                          عدد المرافقين (بالإضافة إليك)
                        </label>
                        <div className="flex items-center justify-center gap-4 py-1">
                          <button
                            type="button"
                            onClick={() => setCompanionCount(Math.max(0, companionCount - 1))}
                            className="w-8 h-8 rounded-full border border-[#d4af6a]/50 bg-white/10 text-white font-bold text-base flex items-center justify-center cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-base font-bold text-[#d4af6a] min-w-[24px] text-center">
                            {companionCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCompanionCount(companionCount + 1)}
                            className="w-8 h-8 rounded-full border border-[#d4af6a]/50 bg-white/10 text-white font-bold text-base flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#d4af6a] mb-1">كلمة أو دعوة مباركة للعروسين 💍</label>
                      <textarea
                        rows={2}
                        value={guestMessage}
                        onChange={(e) => setGuestMessage(e.target.value)}
                        placeholder="أطيب التمنيات للعروسين..."
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-[#d4af6a]/40 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#d4af6a]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingRsvp}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4af6a] to-[#c59e56] text-[#200806] font-bold text-sm shadow-xl hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingRsvp ? 'جاري الإرسال...' : 'إرسال تأكيد الحضور'}
                    </button>
                  </form>
                )}

              </div>
            </section>
          </ScrollReveal>
        )}

      </div>
    </div>
  );
};
