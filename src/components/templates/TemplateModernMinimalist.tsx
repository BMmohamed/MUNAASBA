'use client';

import React from 'react';
import { InvitationData } from '@/types/invitation';
import { BackgroundMediaLayer } from '../invitation/BackgroundMediaLayer';
import { CountdownTimer } from '../invitation/CountdownTimer';
import { RsvpButton } from '../invitation/RsvpButton';
import { CalendarButtons } from '../invitation/CalendarButtons';
import { LocationCard } from '../invitation/LocationCard';
import { TimelineSection } from '../invitation/TimelineSection';
import { ChildrenAdvisory } from '../invitation/ChildrenAdvisory';
import { NoPhotographyAdvisory } from '../invitation/NoPhotographyAdvisory';
import { ShareAction } from '../invitation/ShareAction';
import { FooterContact } from '../invitation/FooterContact';
import { AmbientMusicPlayer } from '../invitation/AmbientMusicPlayer';
import { ScrollReveal } from '../common/ScrollReveal';
import { formatArabicDateDisplay } from '@/lib/date-utils';
import { Shirt, Sparkles } from 'lucide-react';
import {
  getFontFamilyClass,
  getFontFamilyStyle,
  getNamesSizeClass,
  getVerseSizeClass,
  getParentsSizeClass,
} from '@/lib/typography-utils';

export const TemplateModernMinimalist: React.FC<{ invitation: InvitationData; isHostView?: boolean }> = ({
  invitation,
  isHostView = false,
}) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);
  const typo = invitation.typography;

  const namesFont = getFontFamilyClass(typo?.namesFontFamily, 'font-cairo');
  const verseFont = getFontFamilyClass(typo?.verseFontFamily, 'font-amiri');
  const parentsFont = getFontFamilyClass(typo?.parentsFontFamily, 'font-tajawal');

  const namesSize = getNamesSizeClass(typo?.namesSize);
  const verseSize = getVerseSizeClass(typo?.verseSize);
  const parentsSize = getParentsSizeClass(typo?.parentsSize);

  return (
    <div className="relative min-h-screen text-stone-100 font-cairo overflow-x-clip">
      
      {/* Host Mode Indicator Banner */}
      {isHostView && (
        <div className="sticky top-0 z-50 px-4 py-2 bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 text-stone-100 text-xs font-bold font-cairo text-center shadow-lg flex items-center justify-center gap-2">
          <span>👑 رابط خاص بأهل الحفل (متابعة إحصائيات وعداد الحضور المباشر)</span>
        </div>
      )}
      
      {/* Slow-Motion Ambient Video Loop & AI Image Background */}
      <BackgroundMediaLayer
        templateId="template-2"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      <div className="relative max-w-lg mx-auto px-3 sm:px-4 py-8 sm:py-12 z-10">
        
        {/* Modern Minimalist Editorial Card - Frosted Glass Window */}
        <div className="relative glass-window shadow-2xl rounded-3xl p-6 sm:p-9 text-center transition-all duration-300">
          
          {/* Hairline double inner frame */}
          <div className="absolute inset-3 border border-white/15 rounded-2xl pointer-events-none" />

          {/* Minimalist Botanical Monogram */}
          <ScrollReveal delay={0.1}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-amber-400/50 flex items-center justify-center text-amber-200 bg-black/60 shadow-lg">
              <span className="font-amiri text-2xl font-bold text-amber-200">
                {invitation.groomName.slice(0, 1)} & {invitation.brideName.slice(0, 1)}
              </span>
            </div>
          </ScrollReveal>

          {/* Bismillah high-contrast typography */}
          <ScrollReveal delay={0.7}>
            <div className="text-amber-200 font-amiri text-xl font-bold tracking-widest my-2 drop-shadow-md">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </ScrollReveal>

          {/* Quranic Verse - Prominent Size & Sharp Readability */}
          {invitation.toggles.showVerse !== false && invitation.headerVerse && (
            <ScrollReveal delay={1.5}>
              <div className="my-6 px-5 py-5 bg-black/45 border border-stone-600/60 rounded-2xl glass-window-subtle">
                <p
                  className={`${verseSize} ${verseFont} font-bold leading-[2.5] [word-spacing:0.35rem] whitespace-pre-line italic text-contrast-dark`}
                  style={{
                    color: typo?.verseColor || '#fef3c7',
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

          {/* Invitation Intro - Bold White Text with Generous Spacing */}
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
                  style={{ color: typo?.welcomeColor || '#e7e5e4' }}
                >
                  {invitation.welcomeMessage}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Event Title Badge */}
          <ScrollReveal delay={3.1}>
            <div className="my-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold tracking-wider bg-black/50 text-amber-200 border border-amber-400/50 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{invitation.eventTitle}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </span>
            </div>
          </ScrollReveal>

          {/* Couple Names - Modern Editorial Serif in High Contrast White & Gold */}
          <ScrollReveal delay={3.9}>
            <div className="my-7 py-6 border-y border-stone-700/60 glass-window-subtle rounded-3xl">
              <h1
                className={`${namesSize} ${namesFont} font-extrabold tracking-wide drop-shadow-xl`}
                style={{
                  color: typo?.namesColor || '#ffffff',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.groomName}
              </h1>
              <div className="text-amber-300 my-2 font-amiri text-3xl font-black italic">
                و
              </div>
              <h2
                className={`${namesSize} ${namesFont} font-extrabold tracking-wide drop-shadow-xl`}
                style={{
                  color: typo?.namesColor || '#ffffff',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.brideName}
              </h2>
            </div>
          </ScrollReveal>

          {/* Date & Time Clean High-Contrast Block */}
          <ScrollReveal delay={4.7}>
            <div className="my-6 p-5 rounded-2xl glass-window-subtle border border-stone-600/60 text-center shadow-xl">
              <div className="text-amber-200 font-extrabold font-cairo text-xl sm:text-2xl mb-1.5 drop-shadow-sm">
                يوم {invitation.dayOfWeek} • {dateFormatted.numericDate}
              </div>
              <div className="text-xs sm:text-sm text-stone-200 font-tajawal mt-1 font-semibold">
                الموافق {invitation.eventDateHijri}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-amber-100 mt-2.5 font-cairo">
                {invitation.timeFormatted}
              </div>
            </div>
          </ScrollReveal>

          {/* Dynamic Countdown Timer */}
          {invitation.toggles.showCountdown && (
            <ScrollReveal delay={5.5}>
              <CountdownTimer targetDate={invitation.eventDate} theme="minimal" />
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
                theme="minimal"
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
                theme="minimal"
              />
            </ScrollReveal>
          )}

          {/* Timeline */}
          {invitation.toggles.showTimeline && (
            <ScrollReveal delay={7.6}>
              <TimelineSection items={invitation.timeline} theme="minimal" textColor={typo?.timelineColor} />
            </ScrollReveal>
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <ScrollReveal delay={8.2}>
              <div className="my-5 p-3.5 rounded-xl glass-window-subtle border border-stone-600/50 flex items-center justify-center gap-2 text-xs sm:text-sm font-tajawal text-stone-100 max-w-sm mx-auto font-medium">
                <Shirt className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{invitation.toggles.dressCodeText}</span>
              </div>
            </ScrollReveal>
          )}

          {/* Strict No-Photography / Privacy Warning */}
          {invitation.toggles.showNoPhotography && (
            <ScrollReveal delay={8.5}>
              <NoPhotographyAdvisory
                text={invitation.toggles.noPhotographyText}
                theme="minimal"
              />
            </ScrollReveal>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ScrollReveal delay={8.7}>
              <ChildrenAdvisory
                text={invitation.toggles.childrenAdvisoryText}
                theme="minimal"
              />
            </ScrollReveal>
          )}

          {/* One-tap RSVP Button */}
          {invitation.toggles.showRsvp && (
            <ScrollReveal delay={9.2}>
              <div className="mt-8 pt-4 border-t border-stone-700/50">
                <RsvpButton
                  invitationId={invitation.id}
                  slug={invitation.slug}
                  initialCount={invitation.rsvpCount}
                  theme="minimal"
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
                theme="minimal"
                updatedAt={invitation.updatedAt}
              />
            </ScrollReveal>
          )}

          <div className="mt-8 pt-4 border-t border-stone-800/80 text-center text-xs text-amber-200/90 font-tajawal font-medium">
            حضوركم شرفٌ وفرحةٌ لقلوبنا
          </div>

          <FooterContact theme="minimal" />

        </div>
      </div>

      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer musicUrl={invitation.toggles.musicUrl} theme="minimal" />
      )}
    </div>
  );
};
