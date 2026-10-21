'use client';

import React from 'react';
import { InvitationData } from '@/types/invitation';
import { MashrabiyaWatermark, GoldFlourishDivider } from '../common/CalligraphyDecorations';
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
import { Compass, Shirt, Sparkles } from 'lucide-react';

export const TemplateHeritageTraditional: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  return (
    <div className="relative min-h-screen text-amber-100 font-cairo overflow-x-clip">
      
      {/* Slow-Motion Video Loop & AI Background */}
      <BackgroundMediaLayer
        templateId="template-5"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      {/* Traditional Mashrabiya Background Watermark */}
      <MashrabiyaWatermark opacity={0.06} color="#d4af37" />

      <div className="relative max-w-lg mx-auto px-3 sm:px-4 py-8 sm:py-12 z-10">
        
        {/* Heritage Terracotta & Dark Glass Window Card */}
        <div className="relative glass-window border-2 border-amber-600/50 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-xl text-center transition-all duration-300">
          
          {/* Traditional Geometric Border Accent */}
          <div className="absolute inset-2 border border-dashed border-amber-600/30 rounded-2xl pointer-events-none" />

          {/* Heritage Emblem */}
          <ScrollReveal delay={0.1}>
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-black/60 border-2 border-amber-600/60 flex items-center justify-center text-amber-300 shadow-xl">
              <Compass className="w-8 h-8 text-amber-300" />
            </div>
          </ScrollReveal>

          {/* Bismillah Calligraphy */}
          <ScrollReveal delay={0.5}>
            <div className="text-amber-200 font-amiri text-xl font-bold tracking-wide my-2 drop-shadow-md">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </ScrollReveal>

          {/* Poetic Line / Verse - High Contrast & Larger Font */}
          {invitation.headerVerse && (
            <ScrollReveal delay={0.9}>
              <div className="my-6 p-5 rounded-2xl glass-window-subtle border border-amber-600/40">
                <p className="text-sm sm:text-base font-amiri text-amber-100 font-bold leading-relaxed italic whitespace-pre-line text-contrast-dark">
                  &ldquo;{invitation.headerVerse}&rdquo;
                </p>
                {invitation.verseSource && (
                  <span className="text-xs text-amber-300 font-tajawal font-bold mt-1.5 block">
                    [{invitation.verseSource}]
                  </span>
                )}
              </div>
            </ScrollReveal>
          )}

          <GoldFlourishDivider color="#d4af37" className="w-40 h-6 mx-auto my-4" />

          {/* Parents Introduction - Pure White for 100% Readability */}
          <ScrollReveal delay={1.4}>
            <div className="my-5 space-y-2.5 text-contrast-dark">
              <p className="text-sm sm:text-base font-tajawal text-white font-bold leading-relaxed">
                {invitation.groomParents}
              </p>
              <span className="text-xs sm:text-sm text-amber-300 font-black block">• مع •</span>
              <p className="text-sm sm:text-base font-tajawal text-white font-bold leading-relaxed">
                {invitation.brideParents}
              </p>
              <p className="text-xs sm:text-sm text-amber-100 font-tajawal mt-3 font-medium leading-relaxed">
                {invitation.welcomeMessage}
              </p>
            </div>
          </ScrollReveal>

          {/* Event Title Badge */}
          <ScrollReveal delay={1.9}>
            <div className="my-6">
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-amber-600/30 text-amber-100 border border-amber-500/50 shadow-md backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{invitation.eventTitle}</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </span>
            </div>
          </ScrollReveal>

          {/* Couple Names in Heritage Arabic Calligraphy - Large Amber Gold */}
          <ScrollReveal delay={2.4}>
            <div className="my-7 py-6 rounded-3xl glass-window-subtle border border-amber-600/40">
              <h1 className="text-4xl sm:text-6xl font-extrabold font-ruqaa text-amber-200 drop-shadow-xl tracking-wide">
                {invitation.groomName}
              </h1>
              <div className="text-amber-300 font-amiri text-3xl font-black my-2">
                &
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold font-ruqaa text-amber-200 drop-shadow-xl tracking-wide">
                {invitation.brideName}
              </h2>
            </div>
          </ScrollReveal>

          {/* Date & Time */}
          <ScrollReveal delay={2.9}>
            <div className="my-6 p-5 rounded-2xl glass-window-subtle border border-amber-600/40 text-center shadow-xl">
              <div className="text-amber-200 font-extrabold font-cairo text-xl sm:text-2xl mb-1.5 drop-shadow-sm">
                يوم {invitation.dayOfWeek} • {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
              </div>
              <div className="text-xs sm:text-sm text-amber-200 font-tajawal mt-1 font-semibold">
                الموافق {invitation.eventDateHijri}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-2.5 font-cairo">
                {invitation.timeFormatted}
              </div>
            </div>
          </ScrollReveal>

          {/* Countdown Timer */}
          {invitation.toggles.showCountdown && (
            <ScrollReveal delay={3.4}>
              <CountdownTimer targetDate={invitation.eventDate} theme="heritage" />
            </ScrollReveal>
          )}

          {/* Calendar Auto-add Buttons */}
          {invitation.toggles.showCalendar && (
            <ScrollReveal delay={3.8}>
              <CalendarButtons
                title={`${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`}
                description={`${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`}
                location={`${invitation.venueName}, ${invitation.venueAddress}`}
                startDate={invitation.eventDate}
                theme="heritage"
              />
            </ScrollReveal>
          )}

          {/* Location Details */}
          {invitation.toggles.showLocation && (
            <ScrollReveal delay={4.2}>
              <LocationCard
                venueName={invitation.venueName}
                venueHall={invitation.venueHall}
                venueCity={invitation.venueCity}
                venueAddress={invitation.venueAddress}
                googleMapsUrl={invitation.googleMapsUrl}
                theme="heritage"
              />
            </ScrollReveal>
          )}

          {/* Event Timeline */}
          {invitation.toggles.showTimeline && (
            <ScrollReveal delay={4.6}>
              <TimelineSection items={invitation.timeline} theme="heritage" />
            </ScrollReveal>
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <ScrollReveal delay={5.0}>
              <div className="my-5 p-3.5 rounded-xl glass-window-subtle border border-amber-600/40 flex items-center justify-center gap-2 text-xs sm:text-sm font-tajawal text-amber-100 max-w-sm mx-auto font-medium">
                <Shirt className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{invitation.toggles.dressCodeText}</span>
              </div>
            </ScrollReveal>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ScrollReveal delay={5.3}>
              <ChildrenAdvisory
                text={invitation.toggles.childrenAdvisoryText}
                theme="heritage"
              />
            </ScrollReveal>
          )}

          {/* One-tap RSVP Button */}
          {invitation.toggles.showRsvp && (
            <ScrollReveal delay={5.6}>
              <div className="mt-8 pt-4 border-t border-amber-600/40">
                <RsvpButton
                  invitationId={invitation.id}
                  slug={invitation.slug}
                  initialCount={invitation.rsvpCount}
                  theme="heritage"
                />
              </div>
            </ScrollReveal>
          )}

          {/* Share Action */}
          <ScrollReveal delay={6.0}>
            <ShareAction
              title={invitation.title}
              slug={invitation.slug}
              groomName={invitation.groomName}
              brideName={invitation.brideName}
              theme="heritage"
            />
          </ScrollReveal>

          <div className="mt-8 pt-4 border-t border-amber-700/30 text-center text-xs sm:text-sm text-amber-200 font-tajawal font-medium">
            حياكم الله وبياكم في ديار الكرم والجود
          </div>

        </div>
      </div>

      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer musicUrl={invitation.toggles.musicUrl} theme="heritage" />
      )}
    </div>
  );
};
