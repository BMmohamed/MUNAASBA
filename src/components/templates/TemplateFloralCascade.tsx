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
  Check, 
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
import { FallingPetalsEffect } from '../common/FallingPetalsEffect';
import { generateGoogleCalendarUrl, downloadAppleIcsFile } from '@/lib/calendar';

export const TemplateFloralCascade: React.FC<{ invitation: InvitationData; isHostView?: boolean }> = ({
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
      className="relative min-h-screen text-[#fdf6f0] font-tajawal overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at top, #260c1c 0%, #170712 55%, #0d030a 100%)',
      }}
      dir="rtl"
    >
      {/* 1. Active Jasmine / Rose Petals Raining Down the Screen */}
      <FallingPetalsEffect count={22} variant="blush" />

      {/* Background Scent Glow & Ambient Light */}
      <div className="absolute inset-0 pointer-events-none opacity-45 bg-[radial-gradient(circle_at_50%_15%,rgba(244,196,183,0.22)_0%,transparent_65%)]" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Audio Button */}
      {invitation.toggles.showMusic && (
        <div className="fixed top-5 left-5 z-50">
          <button
            type="button"
            onClick={toggleAudio}
            className="p-3 rounded-full bg-neutral-900/80 border border-rose-400/40 text-rose-300 shadow-xl backdrop-blur-md hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
            title={isPlayingAudio ? 'كتم الموسيقى' : 'تشغيل الموسيقى الهادئة'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-pulse text-rose-300" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>
          <audio ref={audioRef} loop src={invitation.coverMusicTrack || '/audio/piano-clair-de-lune.mp3'} />
        </div>
      )}

      {/* Main Free-Flowing Content Area (No restrictive outer boxes) */}
      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 py-14 space-y-12 text-center">

        {/* 1. HERO SECTION: Roman Laurel Branch & Free Flowing Typography */}
        <header className="space-y-6 pt-4">
          <ScrollReveal delay={0.2}>
            {/* Roman Laurel Branch with Jasmine Blossom SVG */}
            <div className="flex justify-center mb-2">
              <svg className="w-56 h-10 text-[#d8b168]" viewBox="0 0 220 30" fill="none">
                {/* Horizontal Laurel Stems */}
                <path d="M10 15 H88 M132 15 H210" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Laurel Leaves */}
                <ellipse cx="32" cy="11" rx="5" ry="9" stroke="currentColor" strokeWidth="1" fill="#fcefe6" fillOpacity="0.3" transform="rotate(-30 32 11)" />
                <ellipse cx="56" cy="11" rx="5" ry="9" stroke="currentColor" strokeWidth="1" fill="#fcefe6" fillOpacity="0.3" transform="rotate(-30 56 11)" />
                <ellipse cx="78" cy="11" rx="5" ry="9" stroke="currentColor" strokeWidth="1" fill="#fcefe6" fillOpacity="0.3" transform="rotate(-30 78 11)" />
                <ellipse cx="142" cy="11" rx="5" ry="9" stroke="currentColor" strokeWidth="1" fill="#fcefe6" fillOpacity="0.3" transform="rotate(30 142 11)" />
                <ellipse cx="164" cy="11" rx="5" ry="9" stroke="currentColor" strokeWidth="1" fill="#fcefe6" fillOpacity="0.3" transform="rotate(30 164 11)" />
                <ellipse cx="188" cy="11" rx="5" ry="9" stroke="currentColor" strokeWidth="1" fill="#fcefe6" fillOpacity="0.3" transform="rotate(30 188 11)" />
                {/* Center Jasmine Flower */}
                <circle cx="110" cy="15" r="4.5" fill="#f6d892" />
                <circle cx="110" cy="8" r="3.5" fill="#fff" opacity="0.9" />
                <circle cx="117" cy="15" r="3.5" fill="#fff" opacity="0.9" />
                <circle cx="110" cy="22" r="3.5" fill="#fff" opacity="0.9" />
                <circle cx="103" cy="15" r="3.5" fill="#fff" opacity="0.9" />
              </svg>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-[12px] font-bold text-[#d8b168] uppercase tracking-[0.25em]">
              Wedding Invitation • ليلة الياسمين
            </p>
            <h3 className="text-sm sm:text-base font-bold text-rose-200/90 font-cairo mt-1">
              {invitation.eventTitle}
            </h3>
          </ScrollReveal>

          {/* FREE-FLOWING COUPLE NAMES (Zero framing boxes) */}
          <ScrollReveal delay={0.7}>
            <div className="py-4 space-y-2">
              <h1
                className={`${namesFont} text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-[0_4px_24px_rgba(244,196,183,0.35)]`}
                style={{
                  color: typo?.namesColor || '#fcefe6',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.groomName}
              </h1>

              <div className="flex items-center justify-center gap-3 py-1">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d8b168]/60" />
                <span className="text-[#d8b168] font-ruqaa text-2xl sm:text-3xl">&</span>
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d8b168]/60" />
              </div>

              <h1
                className={`${namesFont} text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-[0_4px_24px_rgba(244,196,183,0.35)]`}
                style={{
                  color: typo?.namesColor || '#fcefe6',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.brideName}
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1.0}>
            <p className="text-xs sm:text-sm text-[#fdf6f0]/80 font-tajawal max-w-sm mx-auto leading-relaxed">
              بقلوبٍ يملؤها الفرح وعبق الياسمين، نتشرف بدعوتكم لمشاركتنا أجمل أيام العمر
            </p>
          </ScrollReveal>

          {/* Scroll Down Cue */}
          <div className="pt-2 flex flex-col items-center gap-1 opacity-70 animate-bounce">
            <span className="text-[10px] tracking-wider text-[#d8b168]">اسحب للأسفل</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#d8b168]" />
          </div>
        </header>

        {/* 2. VERSE / دعاء (Pure text floating with jasmine blossom divider) */}
        {invitation.toggles.showVerse !== false && (
          <ScrollReveal delay={1.2}>
            <section className="py-6 space-y-3">
              {/* Jasmine Flower Center Divider */}
              <div className="flex items-center justify-center gap-3">
                <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#d8b168]" />
                <span className="text-sm">✿</span>
                <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#d8b168]" />
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
                <span className="text-[11px] text-[#d8b168]/90 font-tajawal block">
                  — {invitation.verseSource} —
                </span>
              )}
            </section>
          </ScrollReveal>
        )}

        {/* 3. FAMILIES INVITATION (Open Classical Roman Layout) */}
        {invitation.toggles.showParents !== false && (
          <ScrollReveal delay={1.4}>
            <section className="py-6 border-y border-[#d8b168]/20 space-y-6">
              <h4 className="text-xs font-bold text-[#d8b168] uppercase tracking-widest">
                أركان بيوتنا العامرة بالفرح
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
                {/* Groom's Parents */}
                <div className="sm:col-span-5 text-center sm:text-right space-y-1">
                  <span className="text-[11px] text-[#d8b168]/80 block font-semibold">أهل العريس</span>
                  <p 
                    className={`${parentsFont} ${parentsSize} font-bold text-white`}
                    style={{ ...getFontFamilyStyle(typo?.parentsFontFamily) }}
                  >
                    {invitation.groomParents || 'والدا العريس'}
                  </p>
                </div>

                {/* Center Jasmine Heart Icon */}
                <div className="sm:col-span-1 flex justify-center py-2 sm:py-0">
                  <div className="w-8 h-8 rounded-full border border-[#d8b168]/40 flex items-center justify-center text-[#d8b168] bg-rose-500/10">
                    🌿
                  </div>
                </div>

                {/* Bride's Parents */}
                <div className="sm:col-span-5 text-center sm:text-left space-y-1">
                  <span className="text-[11px] text-[#d8b168]/80 block font-semibold">أهل العروس</span>
                  <p 
                    className={`${parentsFont} ${parentsSize} font-bold text-white`}
                    style={{ ...getFontFamilyStyle(typo?.parentsFontFamily) }}
                  >
                    {invitation.brideParents || 'والدا العروس'}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#fdf6f0]/90 max-w-md mx-auto leading-relaxed pt-2">
                {invitation.welcomeMessage}
              </p>
            </section>
          </ScrollReveal>
        )}

        {/* 4. SUNDIAL & COUNTDOWN (الساعة الشمسية الرومانية كما في demo-yasmin) */}
        <ScrollReveal delay={1.6}>
          <section className="py-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#d8b168] uppercase tracking-wider">
                الشمس تحسب لنا الأيام
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">
                حتى موعد لقائنا المبارك
              </h3>
            </div>

            {/* Roman Sundial SVG Dial with Stone Texture & Shadow */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]" viewBox="-120 -120 240 240">
                <defs>
                  <radialGradient id="dialStone" cx="42%" cy="36%" r="74%">
                    <stop offset="0%" stopColor="#2e1423" />
                    <stop offset="70%" stopColor="#1c0a15" />
                    <stop offset="100%" stopColor="#10040c" />
                  </radialGradient>
                </defs>
                {/* Outer Stone Dial */}
                <circle r="114" fill="url(#dialStone)" stroke="#d8b168" strokeWidth="2" />
                <circle r="100" fill="none" stroke="#d8b168" strokeWidth="1" opacity="0.6" />
                <circle r="70" fill="none" stroke="#d8b168" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 5" />
                
                {/* Sundial Numerals Marks */}
                <line x1="0" y1="-100" x2="0" y2="-88" stroke="#d8b168" strokeWidth="2" />
                <line x1="100" y1="0" x2="88" y2="0" stroke="#d8b168" strokeWidth="2" />
                <line x1="0" y1="100" x2="0" y2="88" stroke="#d8b168" strokeWidth="2" />
                <line x1="-100" y1="0" x2="-88" y2="0" stroke="#d8b168" strokeWidth="2" />

                {/* Gnomon Shadow Hand */}
                <path d="M0 0 L-7 -70 L7 -70 Z" fill="#d8b168" opacity="0.85" />
                <circle r="9" fill="#fcefe6" stroke="#d8b168" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Countdown Digits */}
            {invitation.toggles.showCountdown && (
              <CountdownTimer targetDate={invitation.eventDate} theme="floral" />
            )}
          </section>
        </ScrollReveal>

        {/* 5. CLASSICAL TABLET: DATE, TIME & VENUE DETAILS */}
        <ScrollReveal delay={1.8}>
          <section className="py-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#d8b168] uppercase tracking-wider">
                الموعد والمكان
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">تفاصيل المناسبة</h3>
            </div>

            {/* Classical Stone Tablet */}
            <div className="max-w-md mx-auto rounded-3xl p-6 bg-[#210c1a]/80 border border-[#d8b168]/40 shadow-2xl backdrop-blur-md space-y-5 text-right">
              
              {/* Date Row */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full border border-[#d8b168]/50 bg-white/5 flex items-center justify-center text-[#d8b168] shrink-0">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#d8b168]/80 block font-semibold">تاريخ الحفل</span>
                  <p className="text-sm font-bold text-white font-cairo">
                    {dateFormatted.dayName}، {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
                  </p>
                  {invitation.eventDateHijri && (
                    <span className="text-xs text-rose-200/80 block">الموافق: {invitation.eventDateHijri}</span>
                  )}
                  <span className="text-xs text-[#d8b168] block mt-0.5">{invitation.timeFormatted}</span>
                </div>
              </div>

              <div className="h-px bg-[#d8b168]/20" />

              {/* Venue Row */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full border border-[#d8b168]/50 bg-white/5 flex items-center justify-center text-[#d8b168] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#d8b168]/80 block font-semibold">قاعة ومكان المناسبة</span>
                  <p className="text-sm font-bold text-white font-cairo">{invitation.venueName}</p>
                  {invitation.venueHall && (
                    <span className="text-xs text-rose-200/90 block font-semibold">{invitation.venueHall}</span>
                  )}
                  <p className="text-xs text-neutral-300">{invitation.venueCity} {invitation.venueAddress && `• ${invitation.venueAddress}`}</p>
                </div>
              </div>

              {/* Action Buttons: Google Calendar + Google Maps */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                {invitation.googleMapsUrl && (
                  <a
                    href={invitation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#d8b168] to-[#c59a4f] text-[#200806] font-bold text-xs font-cairo flex items-center justify-center gap-1.5 shadow-md hover:scale-102 transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>موقع القاعة على الخريطة</span>
                  </a>
                )}

                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-full border border-[#d8b168] bg-white/5 text-[#fdf6f0] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#d8b168] hover:text-[#200806] transition-all"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>حفظ في التقويم</span>
                </a>
              </div>

            </div>
          </section>
        </ScrollReveal>

        {/* 6. TIMELINE (Order of Events) */}
        {invitation.timeline && invitation.timeline.length > 0 && (
          <ScrollReveal delay={2.0}>
            <section className="py-6 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-[#d8b168] uppercase tracking-wider">برنامج الليلة</span>
                <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">الجدول الزمني للحفل</h3>
              </div>

              <div className="relative max-w-sm mx-auto space-y-5 before:absolute before:inset-0 before:right-6 before:w-0.5 before:bg-gradient-to-b before:from-[#d8b168] before:via-[#d8b168]/40 before:to-transparent">
                {invitation.timeline.map((item, idx) => (
                  <div key={item.id || idx} className="relative flex items-center gap-4 pr-1">
                    <div className="w-10 h-10 rounded-full border-2 border-[#d8b168] bg-[#210c1a] flex items-center justify-center text-[#d8b168] shadow-lg shrink-0 z-10">
                      {item.icon === 'dinner' ? <Utensils className="w-4 h-4" /> : item.icon === 'coffee' ? <Coffee className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#d8b168] block">{item.time}</span>
                      <span className="text-sm font-semibold text-white">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* 7. KIND ADVISORIES (No Photography & Children) */}
        <ScrollReveal delay={2.2}>
          <section className="py-4 space-y-3">
            {invitation.toggles.showNoPhotography && (
              <div className="flex items-center justify-center gap-2.5 text-xs text-rose-200/90 py-2">
                <CameraOff className="w-4 h-4 text-[#d8b168] shrink-0" />
                <span>نرجو التكرم بعدم التصوير بالهواتف حفظاً للخصوصية ولكم جزيل الشكر</span>
              </div>
            )}

            {invitation.toggles.showChildrenAdvisory && (
              <div className="flex items-center justify-center gap-2.5 text-xs text-rose-200/90 py-1">
                <Baby className="w-4 h-4 text-[#d8b168] shrink-0" />
                <span>{invitation.toggles.childrenAdvisoryText || 'جنة الأطفال منازلهم لتكتمل فرحتنا بوجودكم'}</span>
              </div>
            )}
          </section>
        </ScrollReveal>

        {/* 8. RSVP CARD */}
        {invitation.toggles.showRsvp && (
          <ScrollReveal delay={2.4}>
            <section className="pt-4 pb-10">
              <div className="rounded-3xl bg-[#230c1c]/85 border border-[#d8b168]/50 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
                
                <div className="space-y-1">
                  <div className="flex justify-center text-sm">🌸 ✿ 🌸</div>
                  <h3 className="text-2xl font-bold font-ruqaa text-[#d8b168]">تأكيد الحضور</h3>
                  <p className="text-xs text-[#fdf6f0]/70">حضوركم يكتمل به عبق الياسمين وتزهو فرحتنا</p>
                </div>

                {rsvpSubmitted ? (
                  <div className="py-8 space-y-3 text-center animate-fadeIn">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-300 font-cairo">تم تسجيل ردكم بكل سرور</h4>
                    <p className="text-xs text-neutral-300 font-tajawal">أهلاً وسهلاً بكم في ليلة الفرح 🌸</p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4 text-right">
                    <div>
                      <label className="block text-xs font-bold text-[#d8b168] mb-1">اسم الضيف الكريم</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="الاسم الكريم..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-[#d8b168]/40 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#d8b168]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#d8b168] mb-1.5">هل ستشرفنا بالحضور؟</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('yes')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'yes'
                              ? 'bg-[#d8b168] text-[#200806] border-[#d8b168] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#fdf6f0] hover:border-[#d8b168]'
                          }`}
                        >
                          نعم، سأحضر
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('no')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'no'
                              ? 'bg-[#d8b168] text-[#200806] border-[#d8b168] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#fdf6f0] hover:border-[#d8b168]'
                          }`}
                        >
                          أعتذر
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('maybe')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'maybe'
                              ? 'bg-[#d8b168] text-[#200806] border-[#d8b168] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#fdf6f0] hover:border-[#d8b168]'
                          }`}
                        >
                          ربما
                        </button>
                      </div>
                    </div>

                    {rsvpStatus === 'yes' && (
                      <div>
                        <label className="block text-xs font-bold text-[#d8b168] mb-1">
                          عدد المرافقين (بالإضافة إليك)
                        </label>
                        <div className="flex items-center justify-center gap-4 py-1">
                          <button
                            type="button"
                            onClick={() => setCompanionCount(Math.max(0, companionCount - 1))}
                            className="w-8 h-8 rounded-full border border-[#d8b168]/50 bg-white/10 text-white font-bold text-base flex items-center justify-center cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-base font-bold text-[#d8b168] min-w-[24px] text-center">
                            {companionCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCompanionCount(companionCount + 1)}
                            className="w-8 h-8 rounded-full border border-[#d8b168]/50 bg-white/10 text-white font-bold text-base flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#d8b168] mb-1">كلمة أو أمنية للعروسين 🌸</label>
                      <textarea
                        rows={2}
                        value={guestMessage}
                        onChange={(e) => setGuestMessage(e.target.value)}
                        placeholder="بارك الله لهما وبارك عليهما..."
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-[#d8b168]/40 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#d8b168]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingRsvp}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-[#d8b168] to-[#c59a4f] text-[#200806] font-bold text-sm shadow-xl hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
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
