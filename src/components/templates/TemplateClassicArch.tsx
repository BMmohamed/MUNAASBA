'use client';

import React from 'react';
import { InvitationData } from '@/types/invitation';
import { BismillahCalligraphy, GoldFlourishDivider, MashrabiyaWatermark, AmbientParticles } from '../common/CalligraphyDecorations';
import { BackgroundMediaLayer } from '../invitation/BackgroundMediaLayer';
import { CountdownTimer } from '../invitation/CountdownTimer';
import { RsvpButton } from '../invitation/RsvpButton';
import { CalendarButtons } from '../invitation/CalendarButtons';
import { LocationCard } from '../invitation/LocationCard';
import { TimelineSection } from '../invitation/TimelineSection';
import { ChildrenAdvisory } from '../invitation/ChildrenAdvisory';
import { ShareAction } from '../invitation/ShareAction';
import { AmbientMusicPlayer } from '../invitation/AmbientMusicPlayer';
import { ScrollReveal } from '../common/ScrollReveal';
import { Sparkles, Shirt } from 'lucide-react';
import { formatArabicDateDisplay } from '@/lib/date-utils';

export const TemplateClassicArch: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  return (
    <div className="relative min-h-screen text-neutral-100 overflow-hidden font-cairo">
      
      {/* Slow-Motion Ambient Loop Video & AI Image Layer */}
      <BackgroundMediaLayer
        templateId="template-1"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      {/* Decorative Overlays */}
      <MashrabiyaWatermark opacity={0.06} color="#d4af37" />
      <AmbientParticles count={16} color="#fde047" />

      {/* Main Invitation Container */}
      <div className="relative max-w-lg mx-auto px-3 sm:px-4 py-8 sm:py-12 z-10">
        
        {/* Exterior Classic Arch Border Frame - Semi-Transparent Frosted Glass Window */}
        <div className="relative glass-window-gold rounded-t-[160px] rounded-b-3xl p-5 sm:p-8 shadow-2xl transition-all duration-300">
          
          {/* Inner Golden Hairline Arch */}
          <div className="relative border border-amber-400/35 rounded-t-[145px] rounded-b-2xl p-4 sm:p-6 text-center">

            {/* Arch Crown Finial Ornament */}
            <ScrollReveal immediate delay={0.05}>
              <div className="w-14 h-14 mx-auto -mt-2 mb-3 flex items-center justify-center text-amber-400">
                <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 drop-shadow-md">
                  <path d="M20 0 L24 14 L38 14 L26 22 L30 36 L20 28 L10 36 L14 22 L2 14 L16 14 Z" fill="#fde047" />
                  <circle cx="20" cy="20" r="4" fill="#041a14" />
                </svg>
              </div>
            </ScrollReveal>

            {/* Bismillah Calligraphy */}
            <ScrollReveal immediate delay={0.1}>
              <BismillahCalligraphy color="#fde047" className="w-64 sm:w-72 h-auto mx-auto my-3 drop-shadow-lg" />
            </ScrollReveal>

            {/* Quranic Verse - Prominent Size & High Readability */}
            {invitation.headerVerse && (
              <ScrollReveal immediate delay={0.15}>
                <div className="my-6 px-5 py-4 rounded-2xl glass-window-subtle border border-amber-400/35">
                  <p className="text-sm sm:text-base font-amiri leading-loose text-amber-100 font-bold italic text-contrast-dark">
                    &ldquo;{invitation.headerVerse}&rdquo;
                  </p>
                  {invitation.verseSource && (
                    <span className="block text-xs font-tajawal text-amber-300 font-bold mt-1.5">
                      [{invitation.verseSource}]
                    </span>
                  )}
                </div>
              </ScrollReveal>
            )}

            <GoldFlourishDivider color="#d4af37" className="w-40 h-6 mx-auto my-4" />

            {/* Parents Announcement - Larger Font & Clear Line Spacing */}
            <ScrollReveal immediate delay={0.2}>
              <div className="my-5 space-y-2.5 text-contrast-dark">
                <p className="text-sm sm:text-base font-tajawal text-white font-bold leading-relaxed">
                  {invitation.groomParents}
                </p>
                <span className="inline-block text-xs sm:text-sm text-amber-300 font-black px-2 py-0.5 rounded-full bg-black/40 border border-amber-400/30">
                  • مع •
                </span>
                <p className="text-sm sm:text-base font-tajawal text-white font-bold leading-relaxed">
                  {invitation.brideParents}
                </p>
                <p className="text-xs sm:text-sm text-amber-100/95 font-tajawal mt-3 leading-relaxed font-medium">
                  {invitation.welcomeMessage}
                </p>
              </div>
            </ScrollReveal>

            {/* Event Title Badge */}
            <ScrollReveal immediate delay={0.25}>
              <div className="my-6">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-100 text-sm sm:text-base font-extrabold tracking-wide shadow-lg backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{invitation.eventTitle}</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            </ScrollReveal>

            {/* Groom & Bride Names - Large Royal Calligraphic Typography */}
            <ScrollReveal immediate delay={0.3}>
              <div className="my-7 py-6 border-y border-amber-400/40 glass-window-subtle rounded-3xl">
                <div className="flex flex-col items-center justify-center gap-2">
                  <h1 className="text-4xl sm:text-6xl font-extrabold font-ruqaa text-amber-200 gold-text-shimmer drop-shadow-xl tracking-wide">
                    {invitation.groomName}
                  </h1>
                  <div className="w-12 h-12 my-1 rounded-full border-2 border-amber-400/60 flex items-center justify-center text-amber-200 font-amiri text-2xl font-black bg-black/70 shadow-lg">
                    &
                  </div>
                  <h2 className="text-4xl sm:text-6xl font-extrabold font-ruqaa text-amber-200 gold-text-shimmer drop-shadow-xl tracking-wide">
                    {invitation.brideName}
                  </h2>
                </div>
              </div>
            </ScrollReveal>

            {/* Date & Day Details Card - Scroll Reveal */}
            <ScrollReveal>
              <div className="my-6 p-5 rounded-2xl glass-window-subtle border border-amber-400/40 text-center shadow-xl">
                <div className="text-amber-200 font-extrabold font-cairo text-xl sm:text-2xl mb-1.5 drop-shadow-sm">
                  يوم {invitation.dayOfWeek}
                </div>
                <div className="text-base sm:text-lg font-tajawal text-white font-bold">
                  {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
                </div>
                <div className="text-xs sm:text-sm text-amber-300 font-tajawal mt-1 font-semibold">
                  الموافق {invitation.eventDateHijri}
                </div>
                <div className="text-sm sm:text-base font-extrabold text-amber-100 mt-2.5 font-cairo">
                  {invitation.timeFormatted}
                </div>
              </div>
            </ScrollReveal>

            {/* Dynamic Countdown Timer - Instant Glass View */}
            {invitation.toggles.showCountdown && (
              <ScrollReveal>
                <CountdownTimer targetDate={invitation.eventDate} theme="gold" />
              </ScrollReveal>
            )}

            {/* Calendar Auto-add Buttons */}
            {invitation.toggles.showCalendar && (
              <ScrollReveal>
                <CalendarButtons
                  title={`${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`}
                  description={`${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`}
                  location={`${invitation.venueName}, ${invitation.venueAddress}`}
                  startDate={invitation.eventDate}
                  theme="gold"
                />
              </ScrollReveal>
            )}

            {/* Google Maps Venue Card */}
            {invitation.toggles.showLocation && (
              <ScrollReveal>
                <LocationCard
                  venueName={invitation.venueName}
                  venueHall={invitation.venueHall}
                  venueCity={invitation.venueCity}
                  venueAddress={invitation.venueAddress}
                  googleMapsUrl={invitation.googleMapsUrl}
                  theme="gold"
                />
              </ScrollReveal>
            )}

            {/* Event Timeline */}
            {invitation.toggles.showTimeline && (
              <ScrollReveal>
                <TimelineSection items={invitation.timeline} theme="gold" />
              </ScrollReveal>
            )}

            {/* Dress Code Notice */}
            {invitation.toggles.showDressCode && (
              <ScrollReveal>
                <div className="my-5 p-3.5 rounded-xl glass-window-subtle border border-amber-400/30 flex items-center justify-center gap-2 text-xs sm:text-sm font-tajawal text-neutral-100 max-w-sm mx-auto font-medium">
                  <Shirt className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{invitation.toggles.dressCodeText}</span>
                </div>
              </ScrollReveal>
            )}

            {/* Children Advisory ("جنة الأطفال منازلهم") */}
            {invitation.toggles.showChildrenAdvisory && (
              <ScrollReveal>
                <ChildrenAdvisory
                  text={invitation.toggles.childrenAdvisoryText}
                  theme="gold"
                />
              </ScrollReveal>
            )}

            {/* Single-tap RSVP Button with Device Locking */}
            {invitation.toggles.showRsvp && (
              <ScrollReveal>
                <div className="mt-8 pt-4 border-t border-amber-400/35">
                  <RsvpButton
                    invitationId={invitation.id}
                    slug={invitation.slug}
                    initialCount={invitation.rsvpCount}
                    theme="gold"
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Share to WhatsApp & Copy Link */}
            <ScrollReveal>
              <ShareAction
                title={invitation.title}
                slug={invitation.slug}
                groomName={invitation.groomName}
                brideName={invitation.brideName}
                theme="gold"
              />
            </ScrollReveal>

            {/* Footer Closing Gratitude */}
            <div className="mt-8 pt-4 border-t border-amber-500/20 text-center">
              <p className="text-sm text-amber-200 font-amiri italic font-bold">
                دامـت أفراحكم بالمسـرّات عامرـة
              </p>
              <div className="text-[11px] text-neutral-400 mt-2 font-tajawal">
                منصة مناسبة • تصميم دعوات إلكترونية تفاعلية
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Background Ambient Audio Player */}
      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer musicUrl={invitation.toggles.musicUrl} theme="gold" />
      )}
    </div>
  );
};
