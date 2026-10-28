'use client';

import React from 'react';
import { InvitationData } from '@/types/invitation';
import { BismillahCalligraphy } from '../common/CalligraphyDecorations';
import { BackgroundMediaLayer } from '../invitation/BackgroundMediaLayer';
import { FallingPetalsEffect } from '../common/FallingPetalsEffect';
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
import { Flower2, Heart, Shirt, Sparkles } from 'lucide-react';
import { formatArabicDateDisplay } from '@/lib/date-utils';
import {
  getFontFamilyClass,
  getFontFamilyStyle,
  getNamesSizeClass,
  getVerseSizeClass,
  getParentsSizeClass,
} from '@/lib/typography-utils';

export const TemplateFloralCascade: React.FC<{ invitation: InvitationData; isHostView?: boolean }> = ({
  invitation,
  isHostView = false,
}) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);
  const typo = invitation.typography;

  const namesFont = getFontFamilyClass(typo?.namesFontFamily, 'font-ruqaa');
  const verseFont = getFontFamilyClass(typo?.verseFontFamily, 'font-amiri');
  const parentsFont = getFontFamilyClass(typo?.parentsFontFamily, 'font-tajawal');

  const namesSize = getNamesSizeClass(typo?.namesSize);
  const verseSize = getVerseSizeClass(typo?.verseSize);
  const parentsSize = getParentsSizeClass(typo?.parentsSize);

  return (
    <div className="relative min-h-screen text-rose-50 overflow-x-clip font-cairo bg-[#0f0409]">
      {/* Background Media Layer */}
      <BackgroundMediaLayer
        templateId="template-7"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      {/* Raining Flower Petals Ambient Effect (أمطار الزهور والورود المتساقطة) */}
      <FallingPetalsEffect variant="mixed" count={28} opacity={0.9} />

      {/* Romantic Pink & Rose Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-rose-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Host Mode Indicator */}
      {isHostView && (
        <div className="sticky top-0 z-50 px-4 py-2 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white text-xs font-bold font-cairo text-center shadow-lg flex items-center justify-center gap-2">
          <span>🌸 رابط خاص بأهل الحفل (متابعة إحصائيات وعداد الحضور المباشر)</span>
        </div>
      )}

      {/* Main Invitation Container */}
      <div className="relative max-w-lg mx-auto px-3 sm:px-4 py-8 sm:py-12 z-10">
        
        {/* Organic Floral Scallop Silhouette (No rigid square boxes) */}
        <div className="relative rounded-t-[160px] rounded-b-[55px] bg-gradient-to-b from-[#240c17]/90 via-[#16060e]/95 to-[#200a14]/95 border-2 border-rose-300/40 p-5 sm:p-8 shadow-[0_0_60px_rgba(244,63,94,0.18)] backdrop-blur-xl transition-all duration-300">
          
          {/* Inner Botanical Contour */}
          <div className="absolute inset-2.5 rounded-t-[148px] rounded-b-[45px] border border-rose-400/25 pointer-events-none" />

          {/* Top Blooming Floral Crown & Wreath Ornament */}
          <ScrollReveal delay={0.2}>
            <div className="relative flex items-center justify-center pt-2 pb-4">
              <div className="relative flex items-center justify-center">
                {/* Glowing Wreath Ring */}
                <div className="w-20 h-20 rounded-full border-2 border-rose-300/60 bg-gradient-to-b from-rose-500/20 to-transparent flex items-center justify-center shadow-[0_0_25px_rgba(251,113,133,0.35)]">
                  <Flower2 className="w-10 h-10 text-rose-300 animate-pulse drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                </div>
                {/* Floating floral accents on left and right */}
                <div className="absolute -left-3 top-1 text-rose-300/80">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="absolute -right-3 top-1 text-rose-300/80">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Bismillah Calligraphy */}
          <ScrollReveal delay={0.6}>
            <div className="text-center my-3">
              <BismillahCalligraphy color="#fda4af" className="w-56 sm:w-64 h-auto mx-auto drop-shadow-md" />
            </div>
          </ScrollReveal>

          {/* Header Verse / Poetic Verse */}
          {invitation.toggles.showVerse !== false && (
            <ScrollReveal delay={1.1}>
              <div className="my-5 px-3 text-center">
                <p
                  className={`${verseFont} ${verseSize} leading-relaxed drop-shadow`}
                  style={{
                    color: typo?.verseColor || '#ffe4e6',
                    ...getFontFamilyStyle(typo?.verseFontFamily),
                  }}
                >
                  {invitation.headerVerse}
                </p>
                {invitation.verseSource && (
                  <span className="block mt-1 text-[11px] text-rose-300/80 font-tajawal">
                    — {invitation.verseSource} —
                  </span>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Floral Vine Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-rose-400/60" />
            <Flower2 className="w-3.5 h-3.5 text-rose-400" />
            <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-rose-400/60" />
          </div>

          {/* Parents & Welcome */}
          {invitation.toggles.showParents !== false && (
            <ScrollReveal delay={1.8}>
              <div className="text-center my-4 space-y-1">
                <p
                  className={`${parentsFont} ${parentsSize} font-semibold`}
                  style={{
                    color: typo?.parentsColor || '#ffffff',
                    ...getFontFamilyStyle(typo?.parentsFontFamily),
                  }}
                >
                  {invitation.groomParents}
                </p>
                <span className="text-xs text-rose-300/80 font-tajawal">يسرهم ويسعدهم دعوة الأحبة لمشاركة</span>
                <p
                  className={`${parentsFont} ${parentsSize} font-semibold`}
                  style={{
                    color: typo?.parentsColor || '#ffffff',
                    ...getFontFamilyStyle(typo?.parentsFontFamily),
                  }}
                >
                  {invitation.brideParents}
                </p>
                <p
                  className="text-xs sm:text-sm pt-2 max-w-sm mx-auto font-tajawal leading-relaxed"
                  style={{ color: typo?.welcomeColor || '#ffe4e6' }}
                >
                  {invitation.welcomeMessage}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Event Title Badge */}
          <ScrollReveal delay={2.3}>
            <div className="my-4 text-center">
              <span className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-rose-700/30 via-rose-500/30 to-rose-700/30 border border-rose-300/40 text-rose-200 text-xs sm:text-sm font-bold font-cairo shadow-inner tracking-wider">
                {invitation.eventTitle}
              </span>
            </div>
          </ScrollReveal>

          {/* Couple Names in Floral Curved Cartouche */}
          <ScrollReveal delay={2.8}>
            <div className="relative my-7 py-7 px-4 rounded-[65px] bg-gradient-to-b from-rose-500/10 via-rose-950/30 to-rose-500/10 border border-rose-300/35 text-center shadow-[inset_0_0_30px_rgba(244,63,94,0.14)]">
              <h2
                className={`${namesFont} ${namesSize} font-bold leading-tight drop-shadow-md`}
                style={{
                  color: typo?.namesColor || '#fecdd3',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.groomName}
              </h2>
              <div className="my-2.5 flex items-center justify-center gap-3">
                <span className="w-10 h-[1px] bg-rose-400/40" />
                <span className="text-rose-300 font-ruqaa text-2xl">&</span>
                <span className="w-10 h-[1px] bg-rose-400/40" />
              </div>
              <h2
                className={`${namesFont} ${namesSize} font-bold leading-tight drop-shadow-md`}
                style={{
                  color: typo?.namesColor || '#fecdd3',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.brideName}
              </h2>
            </div>
          </ScrollReveal>

          {/* Date & Time Oval Badge */}
          <ScrollReveal delay={3.5}>
            <div className="my-6 p-4 rounded-3xl bg-neutral-900/80 border border-rose-400/30 text-center max-w-sm mx-auto shadow-md">
              <div className="text-base sm:text-lg font-bold text-rose-300 font-cairo mb-1">
                {dateFormatted.dayName}، {dateFormatted.numericDate}
              </div>
              {invitation.eventDateHijri && (
                <div className="text-xs text-rose-200/80 font-tajawal mb-1">
                  الموافق: {invitation.eventDateHijri}
                </div>
              )}
              <div className="text-xs text-rose-100/90 font-tajawal">
                {invitation.timeFormatted}
              </div>
            </div>
          </ScrollReveal>

          {/* Countdown */}
          {invitation.toggles.showCountdown && (
            <ScrollReveal delay={4.2}>
              <CountdownTimer targetDate={invitation.eventDate} theme="floral" />
            </ScrollReveal>
          )}

          {/* Calendar */}
          {invitation.toggles.showCalendar && (
            <ScrollReveal delay={4.8}>
              <CalendarButtons
                title={invitation.title}
                description={invitation.welcomeMessage}
                location={`${invitation.venueName} - ${invitation.venueCity}`}
                startDate={invitation.eventDate}
                theme="floral"
              />
            </ScrollReveal>
          )}

          {/* Location */}
          {invitation.toggles.showLocation && (
            <ScrollReveal delay={5.5}>
              <LocationCard
                venueName={invitation.venueName}
                venueHall={invitation.venueHall}
                venueCity={invitation.venueCity}
                venueAddress={invitation.venueAddress}
                googleMapsUrl={invitation.googleMapsUrl}
                theme="floral"
              />
            </ScrollReveal>
          )}

          {/* Timeline */}
          {invitation.toggles.showTimeline && invitation.timeline && invitation.timeline.length > 0 && (
            <ScrollReveal delay={6.2}>
              <TimelineSection items={invitation.timeline} theme="floral" textColor={typo?.timelineColor} />
            </ScrollReveal>
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <ScrollReveal delay={6.8}>
              <div className="my-5 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-400/30 flex items-center justify-center gap-2 text-xs sm:text-sm font-tajawal text-rose-100 max-w-sm mx-auto font-medium">
                <Shirt className="w-4 h-4 text-rose-300 shrink-0" />
                <span>{invitation.toggles.dressCodeText}</span>
              </div>
            </ScrollReveal>
          )}

          {/* Strict No-Photography Advisory */}
          {invitation.toggles.showNoPhotography && (
            <ScrollReveal delay={7.2}>
              <NoPhotographyAdvisory
                text={invitation.toggles.noPhotographyText}
                theme="floral"
              />
            </ScrollReveal>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ScrollReveal delay={7.6}>
              <ChildrenAdvisory
                text={invitation.toggles.childrenAdvisoryText}
                theme="floral"
              />
            </ScrollReveal>
          )}

          {/* RSVP Button */}
          {invitation.toggles.showRsvp && (
            <ScrollReveal delay={8.2}>
              <div className="mt-8 pt-4 border-t border-rose-400/35">
                <RsvpButton
                  invitationId={invitation.id}
                  slug={invitation.slug}
                  initialCount={invitation.rsvpCount}
                  theme="floral"
                  isHostView={isHostView}
                />
              </div>
            </ScrollReveal>
          )}

          {/* Share Action */}
          {invitation.toggles.showShare !== false && (
            <ScrollReveal delay={8.8}>
              <ShareAction
                title={invitation.title}
                slug={invitation.slug}
                groomName={invitation.groomName}
                brideName={invitation.brideName}
                theme="floral"
              />
            </ScrollReveal>
          )}

          {/* Footer Branding */}
          <FooterContact theme="floral" />
        </div>
      </div>

      {/* Floating Ambient Music Player */}
      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer
          musicUrl={invitation.toggles.musicUrl}
          theme="floral"
        />
      )}
    </div>
  );
};
