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
import { generateGoogleCalendarUrl, downloadAppleIcsFile } from '@/lib/calendar';

export const TemplateBaroqueMedallion: React.FC<{ invitation: InvitationData; isHostView?: boolean }> = ({
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
      className="relative min-h-screen text-[#f8f6f0] font-tajawal overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at top, #141c30 0%, #0a101f 60%, #040810 100%)',
      }}
      dir="rtl"
    >
      {/* Background Soft Champagne & Midnight Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_15%,rgba(194,160,90,0.18)_0%,transparent_65%)]" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Starlight Motes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <span className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />
        <span className="absolute top-[35%] right-[18%] w-1.5 h-1.5 rounded-full bg-blue-200 blur-[1px]" />
        <span className="absolute top-[60%] left-[25%] w-1 h-1 rounded-full bg-amber-100" />
        <span className="absolute top-[80%] right-[30%] w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
      </div>

      {/* Audio Button */}
      {invitation.toggles.showMusic && (
        <div className="fixed top-5 left-5 z-50">
          <button
            type="button"
            onClick={toggleAudio}
            className="p-3 rounded-full bg-neutral-900/80 border border-amber-400/40 text-amber-300 shadow-xl backdrop-blur-md hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
            title={isPlayingAudio ? 'كتم الموسيقى' : 'تشغيل الموسيقى الهادئة'}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-pulse text-amber-300" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>
          <audio ref={audioRef} loop src={invitation.coverMusicTrack || '/audio/piano-romantic-waltz.mp3'} />
        </div>
      )}

      {/* Main Free-Flowing Content Area (No restrictive outer boxes) */}
      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 py-14 space-y-12 text-center">

        {/* 1. HERO SECTION: Swan Elegance & Free Typography */}
        <header className="space-y-6 pt-4">
          <ScrollReveal delay={0.2}>
            {/* Swan & Pearl Floral Dingbat */}
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full border border-[#c2a05a]/50 flex items-center justify-center text-[#c2a05a] text-xl bg-[#c2a05a]/10 shadow-lg">
                &#10086;
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-[12px] font-bold text-[#c2a05a] uppercase tracking-[0.3em]">
              Wedding Invitation • أمسية الفرح
            </p>
            <h3 className="text-sm sm:text-base font-bold text-amber-200/90 font-cairo mt-1">
              {invitation.eventTitle}
            </h3>
          </ScrollReveal>

          {/* FREE-FLOWING COUPLE NAMES (Zero framing boxes) */}
          <ScrollReveal delay={0.7}>
            <div className="py-4 space-y-2">
              <h1
                className={`${namesFont} text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-[0_4px_24px_rgba(194,160,90,0.35)]`}
                style={{
                  color: typo?.namesColor || '#f8f4ea',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.groomName}
              </h1>

              <div className="flex items-center justify-center gap-3 py-1">
                <span className="w-14 h-[1px] bg-gradient-to-r from-transparent to-[#c2a05a]/70" />
                <span className="text-[#c2a05a] font-ruqaa text-2xl sm:text-3xl">&</span>
                <span className="w-14 h-[1px] bg-gradient-to-l from-transparent to-[#c2a05a]/70" />
              </div>

              <h1
                className={`${namesFont} text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-[0_4px_24px_rgba(194,160,90,0.35)]`}
                style={{
                  color: typo?.namesColor || '#f8f4ea',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.brideName}
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1.0}>
            <p className="text-xs sm:text-sm text-[#f8f6f0]/80 font-tajawal max-w-sm mx-auto leading-relaxed">
              يسعدنا ويشرفنا حضوركم لمشاركتنا فرحة العمر في هذه الليلة المباركة
            </p>
          </ScrollReveal>

          {/* Scroll Down Cue */}
          <div className="pt-2 flex flex-col items-center gap-1 opacity-70 animate-bounce">
            <span className="text-[10px] tracking-wider text-[#c2a05a]">اسحب للأسفل</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#c2a05a]" />
          </div>
        </header>

        {/* 2. VERSE / دعاء (Pure text floating with floral flourish) */}
        {invitation.toggles.showVerse !== false && (
          <ScrollReveal delay={1.2}>
            <section className="py-6 space-y-3">
              <div className="flex items-center justify-center gap-3">
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#c2a05a]" />
                <span className="text-[#c2a05a] text-sm">&#10086;</span>
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#c2a05a]" />
              </div>

              <p
                className={`${verseFont} ${verseSize} leading-loose max-w-md mx-auto text-[#fefcf8] drop-shadow`}
                style={{
                  color: typo?.verseColor || '#fef3c7',
                  ...getFontFamilyStyle(typo?.verseFontFamily),
                }}
              >
                {invitation.headerVerse}
              </p>

              {invitation.verseSource && (
                <span className="text-[11px] text-[#c2a05a]/90 font-tajawal block">
                  — {invitation.verseSource} —
                </span>
              )}
            </section>
          </ScrollReveal>
        )}

        {/* 3. FAMILIES INVITATION (Open Editorial Dual Column) */}
        {invitation.toggles.showParents !== false && (
          <ScrollReveal delay={1.4}>
            <section className="py-6 border-y border-[#c2a05a]/20 space-y-6">
              <h4 className="text-xs font-bold text-[#c2a05a] uppercase tracking-widest">
                دعوة الأهل والكرام
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
                {/* Groom's Family */}
                <div className="sm:col-span-5 text-center sm:text-right space-y-1">
                  <span className="text-[11px] text-[#c2a05a]/80 block font-semibold">عائلة العريس</span>
                  <p 
                    className={`${parentsFont} ${parentsSize} font-bold text-white`}
                    style={{ ...getFontFamilyStyle(typo?.parentsFontFamily) }}
                  >
                    {invitation.groomParents || 'والدا العريس'}
                  </p>
                </div>

                {/* Center Pearl Dingbat */}
                <div className="sm:col-span-1 flex justify-center py-2 sm:py-0">
                  <span className="text-[#c2a05a] text-base">&#10070;</span>
                </div>

                {/* Bride's Family */}
                <div className="sm:col-span-5 text-center sm:text-left space-y-1">
                  <span className="text-[11px] text-[#c2a05a]/80 block font-semibold">عائلة العروس</span>
                  <p 
                    className={`${parentsFont} ${parentsSize} font-bold text-white`}
                    style={{ ...getFontFamilyStyle(typo?.parentsFontFamily) }}
                  >
                    {invitation.brideParents || 'والدا العروس'}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#f8f6f0]/90 max-w-md mx-auto leading-relaxed pt-2">
                {invitation.welcomeMessage}
              </p>
            </section>
          </ScrollReveal>
        )}

        {/* 4. DATE & CALENDAR */}
        <ScrollReveal delay={1.6}>
          <section className="py-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#c2a05a] uppercase tracking-wider">
                الموعد المبارك
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">تاريخ وتوقيت الحفل</h3>
            </div>

            <div className="max-w-md mx-auto rounded-3xl p-6 bg-[#0f172a]/80 border border-[#c2a05a]/40 shadow-2xl backdrop-blur-md space-y-4 text-center">
              <div className="text-sm font-bold text-[#c2a05a]">{dateFormatted.dayName}</div>
              <div className="text-3xl sm:text-4xl font-extrabold font-cairo text-white">
                {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
              </div>
              {invitation.eventDateHijri && (
                <div className="text-xs text-amber-200/80 font-tajawal">الموافق {invitation.eventDateHijri}</div>
              )}
              <div className="text-xs font-bold text-neutral-300 flex items-center justify-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#c2a05a]" />
                <span>{invitation.timeFormatted}</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#c2a05a] to-[#a8863f] text-[#0a101f] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-102 transition-all"
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
                  className="py-2.5 px-4 rounded-full border border-[#c2a05a] bg-white/5 text-[#f8f6f0] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#c2a05a] hover:text-[#0a101f] transition-all cursor-pointer"
                >
                  <span>Apple Calendar</span>
                </button>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 5. COUNTDOWN TIMER */}
        {invitation.toggles.showCountdown && (
          <ScrollReveal delay={1.8}>
            <section className="py-4">
              <CountdownTimer targetDate={invitation.eventDate} theme="midnight" />
            </section>
          </ScrollReveal>
        )}

        {/* 6. TIMELINE (Order of Events) */}
        {invitation.timeline && invitation.timeline.length > 0 && (
          <ScrollReveal delay={2.0}>
            <section className="py-6 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-[#c2a05a] uppercase tracking-wider">الترتيب والمراسم</span>
                <h3 className="text-xl sm:text-2xl font-bold font-cairo text-white">الجدول الزمني للحفل</h3>
              </div>

              <div className="relative max-w-sm mx-auto space-y-5 before:absolute before:inset-0 before:right-6 before:w-0.5 before:bg-gradient-to-b before:from-[#c2a05a] before:via-[#c2a05a]/40 before:to-transparent">
                {invitation.timeline.map((item, idx) => (
                  <div key={item.id || idx} className="relative flex items-center gap-4 pr-1">
                    <div className="w-10 h-10 rounded-full border-2 border-[#c2a05a] bg-[#0f172a] flex items-center justify-center text-[#c2a05a] shadow-lg shrink-0 z-10">
                      {item.icon === 'dinner' ? <Utensils className="w-4 h-4" /> : item.icon === 'coffee' ? <Coffee className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#c2a05a] block">{item.time}</span>
                      <span className="text-sm font-semibold text-white">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* 7. VENUE & LOCATION */}
        {invitation.toggles.showLocation && (
          <ScrollReveal delay={2.2}>
            <section className="py-6 space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-[#c2a05a] uppercase tracking-wider">موقع الحفل</span>
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c2a05a] to-[#a8863f] text-[#0a101f] font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>موقع القاعة على خرائط Google</span>
                  </a>
                </div>
              )}
            </section>
          </ScrollReveal>
        )}

        {/* 8. KIND ADVISORIES */}
        <ScrollReveal delay={2.4}>
          <section className="py-4 space-y-3">
            {invitation.toggles.showNoPhotography && (
              <div className="flex items-center justify-center gap-2.5 text-xs text-amber-200/90 py-2">
                <CameraOff className="w-4 h-4 text-[#c2a05a] shrink-0" />
                <span>نرجو التكرم بعدم التصوير بالهواتف حفظاً للخصوصية ولكم جزيل الشكر</span>
              </div>
            )}

            {invitation.toggles.showChildrenAdvisory && (
              <div className="flex items-center justify-center gap-2.5 text-xs text-amber-200/90 py-1">
                <Baby className="w-4 h-4 text-[#c2a05a] shrink-0" />
                <span>{invitation.toggles.childrenAdvisoryText || 'جنة الأطفال منازلهم لتكتمل فرحتنا بوجودكم'}</span>
              </div>
            )}
          </section>
        </ScrollReveal>

        {/* 9. RSVP CARD */}
        {invitation.toggles.showRsvp && (
          <ScrollReveal delay={2.6}>
            <section className="pt-4 pb-10">
              <div className="rounded-3xl bg-[#0f172a]/85 border border-[#c2a05a]/50 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
                
                <div className="space-y-1">
                  <div className="flex justify-center text-[#c2a05a] text-lg">&#10086;</div>
                  <h3 className="text-2xl font-bold font-ruqaa text-[#c2a05a]">تأكيد الحضور</h3>
                  <p className="text-xs text-[#f8f6f0]/70">يسعدنا ويشرفنا معرفة قرار حضوركم لمشاركتنا فرحتنا</p>
                </div>

                {rsvpSubmitted ? (
                  <div className="py-8 space-y-3 text-center animate-fadeIn">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-300 font-cairo">تم تسجيل ردكم بكل سرور</h4>
                    <p className="text-xs text-neutral-300 font-tajawal">أهلاً وسهلاً بكم ونسعد بلقائكم ✦</p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4 text-right">
                    <div>
                      <label className="block text-xs font-bold text-[#c2a05a] mb-1">اسم الضيف الكريم</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="الاسم الكريم..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-[#c2a05a]/40 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#c2a05a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#c2a05a] mb-1.5">هل ستشرفنا بالحضور؟</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('yes')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'yes'
                              ? 'bg-[#c2a05a] text-[#0a101f] border-[#c2a05a] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#f8f6f0] hover:border-[#c2a05a]'
                          }`}
                        >
                          نعم، سأحضر
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('no')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'no'
                              ? 'bg-[#c2a05a] text-[#0a101f] border-[#c2a05a] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#f8f6f0] hover:border-[#c2a05a]'
                          }`}
                        >
                          أعتذر
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpStatus('maybe')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            rsvpStatus === 'maybe'
                              ? 'bg-[#c2a05a] text-[#0a101f] border-[#c2a05a] shadow-md'
                              : 'bg-white/5 border-white/20 text-[#f8f6f0] hover:border-[#c2a05a]'
                          }`}
                        >
                          ربما
                        </button>
                      </div>
                    </div>

                    {rsvpStatus === 'yes' && (
                      <div>
                        <label className="block text-xs font-bold text-[#c2a05a] mb-1">
                          عدد المرافقين (بالإضافة إليك)
                        </label>
                        <div className="flex items-center justify-center gap-4 py-1">
                          <button
                            type="button"
                            onClick={() => setCompanionCount(Math.max(0, companionCount - 1))}
                            className="w-8 h-8 rounded-full border border-[#c2a05a]/50 bg-white/10 text-white font-bold text-base flex items-center justify-center cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-base font-bold text-[#c2a05a] min-w-[24px] text-center">
                            {companionCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCompanionCount(companionCount + 1)}
                            className="w-8 h-8 rounded-full border border-[#c2a05a]/50 bg-white/10 text-white font-bold text-base flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#c2a05a] mb-1">دعوة أو تهنئة للعروسين ✦</label>
                      <textarea
                        rows={2}
                        value={guestMessage}
                        onChange={(e) => setGuestMessage(e.target.value)}
                        placeholder="أصدق التهاني والتبريكات..."
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-[#c2a05a]/40 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#c2a05a]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingRsvp}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-[#c2a05a] to-[#a8863f] text-[#0a101f] font-bold text-sm shadow-xl hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
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
