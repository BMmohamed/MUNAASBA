'use client';

import React from 'react';
import { InvitationData } from '@/types/invitation';
import { BismillahCalligraphy, AmbientParticles } from '../common/CalligraphyDecorations';
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
import { Crown, Sparkles, Shirt, Heart } from 'lucide-react';
import { formatArabicDateDisplay } from '@/lib/date-utils';
import {
  getFontFamilyClass,
  getFontFamilyStyle,
  getNamesSizeClass,
  getVerseSizeClass,
  getParentsSizeClass,
} from '@/lib/typography-utils';

export const TemplateBaroqueMedallion: React.FC<{ invitation: InvitationData; isHostView?: boolean }> = ({
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
    <div className="relative min-h-screen text-neutral-100 overflow-x-clip font-cairo bg-[#060a12]">
      {/* Background Media */}
      <BackgroundMediaLayer
        templateId="template-8"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      {/* Royal Navy & Amber Shimmering Backlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[550px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />
      <AmbientParticles count={18} color="#fde047" />

      {/* Host Mode Indicator */}
      {isHostView && (
        <div className="sticky top-0 z-50 px-4 py-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 text-xs font-bold font-cairo text-center shadow-lg flex items-center justify-center gap-2">
          <span>👑 رابط خاص بأهل الحفل (متابعة إحصائيات وعداد الحضور المباشر)</span>
        </div>
      )}

      {/* Main Container */}
      <div className="relative max-w-lg mx-auto px-3 sm:px-4 py-8 sm:py-12 z-10">
        
        {/* Regal Baroque Oval Medallion Frame - Double-Bordered Heirloom Silhouette */}
        <div className="relative rounded-[90px] sm:rounded-[110px] bg-gradient-to-b from-[#0b1325]/95 via-[#070b14]/95 to-[#0e1628]/95 border-2 border-amber-300/40 p-5 sm:p-8 shadow-[0_0_60px_rgba(234,179,8,0.18)] backdrop-blur-xl transition-all duration-300">
          
          {/* Inner Double Filigree Contour */}
          <div className="absolute inset-2.5 rounded-[80px] sm:rounded-[100px] border border-amber-400/25 pointer-events-none" />
          <div className="absolute inset-4 rounded-[72px] sm:rounded-[92px] border border-dashed border-amber-300/15 pointer-events-none" />

          {/* Top Royal Crown Emblem & Baroque Filigree */}
          <ScrollReveal delay={0.2}>
            <div className="relative flex items-center justify-center pt-2 pb-4">
              <div className="relative flex flex-col items-center">
                {/* Crown with sparkling aura */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-400/25 to-transparent border-2 border-amber-300/50 flex items-center justify-center shadow-[0_0_25px_rgba(253,224,71,0.4)]">
                  <Crown className="w-8 h-8 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)] animate-pulse" />
                </div>
                {/* Filigree Star Ribbons */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400/60" />
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400/60" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Bismillah Calligraphy */}
          <ScrollReveal delay={0.6}>
            <div className="text-center my-3">
              <BismillahCalligraphy color="#fde047" className="w-56 sm:w-64 h-auto mx-auto drop-shadow-md" />
            </div>
          </ScrollReveal>

          {/* Header Verse / Poetic Header */}
          {invitation.toggles.showVerse !== false && (
            <ScrollReveal delay={1.1}>
              <div className="my-5 px-3 text-center">
                <p
                  className={`${verseFont} ${verseSize} leading-relaxed drop-shadow`}
                  style={{
                    color: typo?.verseColor || '#fef3c7',
                    ...getFontFamilyStyle(typo?.verseFontFamily),
                  }}
                >
                  {invitation.headerVerse}
                </p>
                {invitation.verseSource && (
                  <span className="block mt-1 text-[11px] text-amber-300/80 font-tajawal">
                    — {invitation.verseSource} —
                  </span>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-amber-400/60" />
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
            <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-amber-400/60" />
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
                <span className="text-xs text-amber-300/80 font-tajawal">يتشرفون بدعوتكم لمشاركة</span>
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
                  style={{ color: typo?.welcomeColor || '#fef3c7' }}
                >
                  {invitation.welcomeMessage}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Event Title Badge */}
          <ScrollReveal delay={2.3}>
            <div className="my-4 text-center">
              <span className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-600/30 via-amber-500/30 to-amber-600/30 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold font-cairo shadow-inner tracking-wider">
                {invitation.eventTitle}
              </span>
            </div>
          </ScrollReveal>

          {/* Couple Names inside Royal Baroque Medallion Box */}
          <ScrollReveal delay={2.8}>
            <div className="relative my-7 py-7 px-4 rounded-[55px] bg-gradient-to-b from-amber-500/10 via-[#0d162d]/50 to-amber-500/10 border border-amber-300/35 text-center shadow-[inset_0_0_30px_rgba(253,224,71,0.15)]">
              <h2
                className={`${namesFont} ${namesSize} font-bold leading-tight drop-shadow-md`}
                style={{
                  color: typo?.namesColor || '#fde047',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.groomName}
              </h2>
              <div className="my-2.5 flex items-center justify-center gap-3">
                <span className="w-10 h-[1px] bg-amber-400/40" />
                <span className="text-amber-300 font-ruqaa text-2xl">&</span>
                <span className="w-10 h-[1px] bg-amber-400/40" />
              </div>
              <h2
                className={`${namesFont} ${namesSize} font-bold leading-tight drop-shadow-md`}
                style={{
                  color: typo?.namesColor || '#fde047',
                  ...getFontFamilyStyle(typo?.namesFontFamily),
                }}
              >
                {invitation.brideName}
              </h2>
            </div>
          </ScrollReveal>

          {/* Date & Time Rounded Pill */}
          <ScrollReveal delay={3.5}>
            <div className="my-6 p-4 rounded-3xl bg-neutral-900/80 border border-amber-400/30 text-center max-w-sm mx-auto shadow-md">
              <div className="text-base sm:text-lg font-bold text-amber-300 font-cairo mb-1">
                {dateFormatted.dayName}، {dateFormatted.numericDate}
              </div>
              {invitation.eventDateHijri && (
                <div className="text-xs text-amber-200/80 font-tajawal mb-1">
                  الموافق: {invitation.eventDateHijri}
                </div>
              )}
              <div className="text-xs text-neutral-300 font-tajawal">
                {invitation.timeFormatted}
              </div>
            </div>
          </ScrollReveal>

          {/* Countdown */}
          {invitation.toggles.showCountdown && (
            <ScrollReveal delay={4.2}>
              <CountdownTimer targetDate={invitation.eventDate} theme="midnight" />
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
                theme="midnight"
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
                theme="midnight"
              />
            </ScrollReveal>
          )}

          {/* Timeline */}
          {invitation.toggles.showTimeline && invitation.timeline && invitation.timeline.length > 0 && (
            <ScrollReveal delay={6.2}>
              <TimelineSection items={invitation.timeline} theme="midnight" textColor={typo?.timelineColor} />
            </ScrollReveal>
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <ScrollReveal delay={6.8}>
              <div className="my-5 p-3.5 rounded-2xl bg-slate-900/50 border border-amber-400/30 flex items-center justify-center gap-2 text-xs sm:text-sm font-tajawal text-slate-200 max-w-sm mx-auto font-medium">
                <Shirt className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{invitation.toggles.dressCodeText}</span>
              </div>
            </ScrollReveal>
          )}

          {/* Strict No-Photography Advisory */}
          {invitation.toggles.showNoPhotography && (
            <ScrollReveal delay={7.2}>
              <NoPhotographyAdvisory
                text={invitation.toggles.noPhotographyText}
                theme="midnight"
              />
            </ScrollReveal>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ScrollReveal delay={7.6}>
              <ChildrenAdvisory
                text={invitation.toggles.childrenAdvisoryText}
                theme="midnight"
              />
            </ScrollReveal>
          )}

          {/* RSVP Button */}
          {invitation.toggles.showRsvp && (
            <ScrollReveal delay={8.2}>
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
            <ScrollReveal delay={8.8}>
              <ShareAction
                title={invitation.title}
                slug={invitation.slug}
                groomName={invitation.groomName}
                brideName={invitation.brideName}
                theme="midnight"
              />
            </ScrollReveal>
          )}

          {/* Footer Branding */}
          <FooterContact theme="midnight" />
        </div>
      </div>

      {/* Floating Ambient Music Player */}
      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer
          musicUrl={invitation.toggles.musicUrl}
          theme="midnight"
        />
      )}
    </div>
  );
};
