'use client';

import React from 'react';
import { InvitationData } from '@/types/invitation';
import { AmbientParticles } from '../common/CalligraphyDecorations';
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
import { formatArabicDateDisplay } from '@/lib/date-utils';
import { Moon, Sparkles, Shirt } from 'lucide-react';
import {
  getFontFamilyClass,
  getFontFamilyStyle,
  getNamesSizeClass,
  getVerseSizeClass,
  getParentsSizeClass,
} from '@/lib/typography-utils';

export const TemplateLuxuryNight: React.FC<{ invitation: InvitationData; isHostView?: boolean }> = ({
  invitation,
  isHostView = false,
}) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);
  const typo = invitation.typography;

  const namesFont = getFontFamilyClass(typo?.namesFontFamily, 'font-ruqaa');
  const verseFont = getFontFamilyClass(typo?.verseFontFamily, 'font-amiri');
  const parentsFont = getFontFamilyClass(typo?.parentsFontFamily, 'font-cairo');

  const namesSize = getNamesSizeClass(typo?.namesSize);
  const verseSize = getVerseSizeClass(typo?.verseSize);
  const parentsSize = getParentsSizeClass(typo?.parentsSize);

  return (
    <div className="relative min-h-screen text-slate-100 font-cairo overflow-x-clip">
      
      {/* Host Mode Indicator Banner */}
      {isHostView && (
        <div className="sticky top-0 z-50 px-4 py-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 text-xs font-bold font-cairo text-center shadow-lg flex items-center justify-center gap-2">
          <span>👑 رابط خاص بأهل الحفل (متابعة إحصائيات وعداد الحضور المباشر)</span>
        </div>
      )}
      
      {/* Slow-Motion Ambient Loop Video & Starry Sky Background */}
      <BackgroundMediaLayer
        templateId="template-4"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      {/* Starry Ambient Particles */}
      <AmbientParticles count={24} color="#fde047" />

      <div className="relative max-w-lg mx-auto px-3 sm:px-4 py-8 sm:py-12 z-10">
        
        {/* Luxury Night Midnight Card - Semi-Transparent Frosted Glass Window */}
        <div className="relative glass-window border-2 border-amber-400/40 rounded-3xl p-6 sm:p-9 shadow-2xl text-center transition-all duration-300">
          
          {/* Subtle Starry Crest */}
          <ScrollReveal delay={0.1}>
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-black/60 border-2 border-amber-400/50 flex items-center justify-center text-amber-300 shadow-xl shadow-amber-400/20">
              <Moon className="w-8 h-8 text-amber-300" />
            </div>
          </ScrollReveal>

          {/* Bismillah Calligraphy */}
          <ScrollReveal delay={0.7}>
            <div className="text-amber-200 font-amiri text-xl font-bold tracking-widest my-2 drop-shadow-md">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </ScrollReveal>

          {/* Quranic Verse - High Contrast & Larger Font */}
          {invitation.toggles.showVerse !== false && invitation.headerVerse && (
            <ScrollReveal delay={1.5}>
              <div className="my-6 p-5 rounded-2xl glass-window-subtle border border-amber-400/35">
                <p
                  className={`${verseSize} ${verseFont} font-bold leading-[2.5] [word-spacing:0.35rem] whitespace-pre-line italic text-contrast-dark`}
                  style={{
                    color: typo?.verseColor || '#fef9c3',
                    ...getFontFamilyStyle(typo?.verseFontFamily),
                  }}
                >
                  &ldquo;{invitation.headerVerse}&rdquo;
                </p>
                {invitation.verseSource && (
                  <span className="text-xs text-amber-300 font-tajawal font-bold mt-2.5 block [word-spacing:0.15rem]">
                    [{invitation.verseSource}]
                  </span>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Parents Introduction - Pure White Text with Generous Line-height */}
          {invitation.toggles.showParents !== false && (
            <ScrollReveal delay={2.3}>
              <div className="my-5 space-y-3 text-contrast-dark">
                <p
                  className={`${parentsSize} ${parentsFont} font-bold leading-[2.3] [word-spacing:0.25rem]`}
                  style={{
                    color: typo?.parentsColor || '#ffffff',
                    ...getFontFamilyStyle(typo?.parentsFontFamily),
                  }}
                >
                  {invitation.groomParents}
                </p>
                <span className="text-xs sm:text-sm text-amber-300 font-black block">• مع •</span>
                <p
                  className={`${parentsSize} ${parentsFont} font-bold leading-[2.3] [word-spacing:0.25rem]`}
                  style={{
                    color: typo?.parentsColor || '#ffffff',
                    ...getFontFamilyStyle(typo?.parentsFontFamily),
                  }}
                >
                  {invitation.brideParents}
                </p>
                <p
                  className="text-xs sm:text-sm font-tajawal mt-3.5 font-medium leading-[2.3] [word-spacing:0.22rem]"
                  style={{ color: typo?.welcomeColor || '#fef08a' }}
                >
                  {invitation.welcomeMessage}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Event Title Badge */}
          <ScrollReveal delay={3.1}>
            <div className="my-6">
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-amber-400/25 text-amber-100 border border-amber-400/50 shadow-md">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{invitation.eventTitle}</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </span>
            </div>
          </ScrollReveal>

          {/* Names in Gold Metallic Shimmer - Large Calligraphy */}
          <ScrollReveal delay={3.9}>
            <div className="my-7 py-6 rounded-3xl glass-window-subtle border border-amber-400/35">
              <h1
                className={`${namesSize} ${namesFont} font-extrabold gold-text-shimmer drop-shadow-2xl tracking-wide`}
                style={{
                  color: typo?.namesColor || '#fde047',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.groomName}
              </h1>
              <div className="text-amber-300 font-amiri text-3xl font-black my-2">
                &
              </div>
              <h2
                className={`${namesSize} ${namesFont} font-extrabold gold-text-shimmer drop-shadow-2xl tracking-wide`}
                style={{
                  color: typo?.namesColor || '#fde047',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.brideName}
              </h2>
            </div>
          </ScrollReveal>

          {/* Date & Time */}
          <ScrollReveal delay={4.7}>
            <div className="my-6 p-5 rounded-2xl glass-window-subtle border border-amber-400/40 text-center shadow-xl">
              <div className="text-amber-200 font-extrabold font-cairo text-xl sm:text-2xl mb-1.5 drop-shadow-sm">
                يوم {invitation.dayOfWeek} • {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
              </div>
              <div className="text-xs sm:text-sm text-slate-200 font-tajawal mt-1 font-semibold">
                الموافق {invitation.eventDateHijri}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-2.5 font-cairo">
                {invitation.timeFormatted}
              </div>
            </div>
          </ScrollReveal>

          {/* Countdown Timer */}
          {invitation.toggles.showCountdown && (
            <ScrollReveal delay={5.5}>
              <CountdownTimer targetDate={invitation.eventDate} theme="midnight" />
            </ScrollReveal>
          )}

          {/* Calendar Auto-add Buttons */}
          {invitation.toggles.showCalendar && (
            <ScrollReveal delay={6.2}>
              <CalendarButtons
                title={`${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`}
                description={`${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`}
                location={`${invitation.venueName}, ${invitation.venueAddress}`}
                startDate={invitation.eventDate}
                theme="midnight"
              />
            </ScrollReveal>
          )}

          {/* Location Details */}
          {invitation.toggles.showLocation && (
            <ScrollReveal delay={6.9}>
              <LocationCard
                venueName={invitation.venueName}
                venueHall={invitation.venueHall}
                venueCity={invitation.venueCity}
                venueAddress={invitation.venueAddress}
                googleMapsUrl={invitation.googleMapsUrl}
                theme="midnight"
              />
            </ScrollReveal>
          )}

          {/* Event Timeline */}
          {invitation.toggles.showTimeline && (
            <ScrollReveal delay={7.6}>
              <TimelineSection items={invitation.timeline} theme="midnight" textColor={typo?.timelineColor} />
            </ScrollReveal>
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <ScrollReveal delay={8.2}>
              <div className="my-5 p-3.5 rounded-xl glass-window-subtle border border-amber-400/30 flex items-center justify-center gap-2 text-xs sm:text-sm font-tajawal text-slate-200 max-w-sm mx-auto font-medium">
                <Shirt className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{invitation.toggles.dressCodeText}</span>
              </div>
            </ScrollReveal>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ScrollReveal delay={8.7}>
              <ChildrenAdvisory
                text={invitation.toggles.childrenAdvisoryText}
                theme="midnight"
              />
            </ScrollReveal>
          )}

          {/* One-tap RSVP Button */}
          {invitation.toggles.showRsvp && (
            <ScrollReveal delay={9.2}>
              <div className="mt-8 pt-4 border-t border-amber-400/30">
                <RsvpButton
                  invitationId={invitation.id}
                  slug={invitation.slug}
                  initialCount={invitation.rsvpCount}
                  theme="midnight"
                  isHostView={isHostView}
                />
              </div>
            </ScrollReveal>
          )}

          {/* Share Action */}
          {invitation.toggles.showShare !== false && (
            <ScrollReveal delay={9.7}>
              <ShareAction
                title={invitation.title}
                slug={invitation.slug}
                groomName={invitation.groomName}
                brideName={invitation.brideName}
                theme="midnight"
              />
            </ScrollReveal>
          )}

          <div className="mt-8 pt-4 border-t border-slate-800 text-center text-xs sm:text-sm text-amber-200 font-tajawal font-medium">
            تكتمل بهجة ليلتنا بحضوركم الراقي ✦
          </div>

        </div>
      </div>

      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer musicUrl={invitation.toggles.musicUrl} theme="midnight" />
      )}
    </div>
  );
};
