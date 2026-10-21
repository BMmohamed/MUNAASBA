'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationData } from '@/types/invitation';
import { BackgroundMediaLayer } from '../invitation/BackgroundMediaLayer';
import { CountdownTimer } from '../invitation/CountdownTimer';
import { RsvpButton } from '../invitation/RsvpButton';
import { CalendarButtons } from '../invitation/CalendarButtons';
import { LocationCard } from '../invitation/LocationCard';
import { TimelineSection } from '../invitation/TimelineSection';
import { ChildrenAdvisory } from '../invitation/ChildrenAdvisory';
import { ShareAction } from '../invitation/ShareAction';
import { AmbientMusicPlayer } from '../invitation/AmbientMusicPlayer';
import { formatArabicDateDisplay } from '@/lib/date-utils';
import { Shirt, Sparkles } from 'lucide-react';

export const TemplateModernMinimalist: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  return (
    <div className="relative min-h-screen text-stone-100 font-cairo overflow-hidden">
      
      {/* Slow-Motion Ambient Video Loop & AI Image Background */}
      <BackgroundMediaLayer
        templateId="template-2"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-12 z-10">
        
        {/* Modern Minimalist Editorial Card - High Contrast Deep Charcoal / Obsidian Glass */}
        <div className="relative bg-[#090b0e]/92 border-2 border-stone-700/60 shadow-2xl shadow-black/80 rounded-3xl p-6 sm:p-9 text-center backdrop-blur-xl">
          
          {/* Hairline double inner frame */}
          <div className="absolute inset-3 border border-stone-700/30 rounded-2xl pointer-events-none" />

          {/* Minimalist Botanical Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-amber-400/50 flex items-center justify-center text-amber-200 bg-black/60 shadow-md"
          >
            <span className="font-amiri text-2xl font-bold text-amber-200">
              {invitation.groomName.slice(0, 1)} & {invitation.brideName.slice(0, 1)}
            </span>
          </motion.div>

          {/* Bismillah high-contrast typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-amber-200 font-amiri text-lg font-bold tracking-widest my-2 drop-shadow-sm"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>

          {/* Quranic Verse - Sharp readability */}
          {invitation.headerVerse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="my-5 px-4 py-3.5 bg-black/50 border border-stone-700/60 rounded-xl"
            >
              <p className="text-xs sm:text-sm font-amiri text-amber-100 font-bold leading-relaxed italic text-contrast-dark">
                &ldquo;{invitation.headerVerse}&rdquo;
              </p>
              {invitation.verseSource && (
                <span className="text-[10px] text-amber-300 font-tajawal font-semibold mt-1 block">
                  [{invitation.verseSource}]
                </span>
              )}
            </motion.div>
          )}

          {/* Invitation Intro - Bold White Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="my-4 space-y-2 text-contrast-dark"
          >
            <p className="text-xs sm:text-sm font-tajawal text-white font-bold">
              {invitation.groomParents}
            </p>
            <span className="text-xs text-amber-300 font-bold block">• مع •</span>
            <p className="text-xs sm:text-sm font-tajawal text-white font-bold">
              {invitation.brideParents}
            </p>
            <p className="text-xs text-stone-300 font-tajawal mt-2 font-medium">
              {invitation.welcomeMessage}
            </p>
          </motion.div>

          {/* Event Title Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="my-4"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-stone-800 text-amber-200 border border-amber-400/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{invitation.eventTitle}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </span>
          </motion.div>

          {/* Couple Names - Modern Editorial Serif in High Contrast White & Gold */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="my-6 py-5 border-y border-stone-800 bg-black/40 rounded-2xl"
          >
            <h1 className="text-3xl sm:text-5xl font-bold font-amiri text-white tracking-wide drop-shadow-md">
              {invitation.groomName}
            </h1>
            <div className="text-amber-300 my-1 font-amiri text-2xl font-bold italic">
              و
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-amiri text-white tracking-wide drop-shadow-md">
              {invitation.brideName}
            </h2>
          </motion.div>

          {/* Date & Time Clean High-Contrast Block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="my-5 p-4 rounded-xl bg-black/60 border border-stone-700/60 text-center shadow-md"
          >
            <div className="text-amber-200 font-bold font-cairo text-base">
              يوم {invitation.dayOfWeek} • {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
            </div>
            <div className="text-xs text-stone-300 font-tajawal mt-1 font-medium">
              الموافق {invitation.eventDateHijri}
            </div>
            <div className="text-xs font-bold text-amber-100 mt-2 font-cairo">
              {invitation.timeFormatted}
            </div>
          </motion.div>

          {/* Dynamic Countdown Timer */}
          {invitation.toggles.showCountdown && (
            <CountdownTimer targetDate={invitation.eventDate} theme="gold" />
          )}

          {/* Calendar Auto-add Buttons */}
          {invitation.toggles.showCalendar && (
            <CalendarButtons
              title={`${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`}
              description={`${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`}
              location={`${invitation.venueName}, ${invitation.venueAddress}`}
              startDate={invitation.eventDate}
              theme="gold"
            />
          )}

          {/* Location Details */}
          {invitation.toggles.showLocation && (
            <LocationCard
              venueName={invitation.venueName}
              venueHall={invitation.venueHall}
              venueCity={invitation.venueCity}
              venueAddress={invitation.venueAddress}
              googleMapsUrl={invitation.googleMapsUrl}
              theme="gold"
            />
          )}

          {/* Timeline */}
          {invitation.toggles.showTimeline && (
            <TimelineSection items={invitation.timeline} theme="gold" />
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <div className="my-4 p-3 rounded-xl bg-black/50 border border-stone-700 flex items-center justify-center gap-2 text-xs font-tajawal text-stone-200 max-w-sm mx-auto">
              <Shirt className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{invitation.toggles.dressCodeText}</span>
            </div>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ChildrenAdvisory
              text={invitation.toggles.childrenAdvisoryText}
              theme="gold"
            />
          )}

          {/* One-tap RSVP Button */}
          {invitation.toggles.showRsvp && (
            <div className="mt-7 pt-4 border-t border-stone-800">
              <RsvpButton
                invitationId={invitation.id}
                slug={invitation.slug}
                initialCount={invitation.rsvpCount}
                theme="gold"
              />
            </div>
          )}

          {/* Share Action */}
          <ShareAction
            title={invitation.title}
            slug={invitation.slug}
            groomName={invitation.groomName}
            brideName={invitation.brideName}
            theme="gold"
          />

          <div className="mt-8 pt-4 border-t border-stone-800/80 text-center text-xs text-amber-200/80 font-tajawal font-medium">
            حضوركم شرفٌ وفرحةٌ لقلوبنا
          </div>

        </div>
      </div>

      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer musicUrl={invitation.toggles.musicUrl} theme="gold" />
      )}
    </div>
  );
};
