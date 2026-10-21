'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
import { formatArabicDateDisplay } from '@/lib/date-utils';
import { Moon, Sparkles, Shirt } from 'lucide-react';

export const TemplateLuxuryNight: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  return (
    <div className="relative min-h-screen text-slate-100 font-cairo overflow-hidden">
      
      {/* Slow-Motion Ambient Loop Video & Starry Sky Background */}
      <BackgroundMediaLayer
        templateId="template-4"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      {/* Starry Ambient Particles */}
      <AmbientParticles count={24} color="#fde047" />

      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-12 z-10">
        
        {/* Luxury Night Midnight Card - Deep Obsidian & Gold Metallic */}
        <div className="relative bg-[#070b14]/92 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-black/90 backdrop-blur-xl text-center">
          
          {/* Subtle Starry Crest */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-14 h-14 mx-auto mb-3 rounded-full bg-black/60 border-2 border-amber-400/50 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-400/20"
          >
            <Moon className="w-7 h-7 text-amber-300" />
          </motion.div>

          {/* Bismillah Calligraphy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-amber-200 font-amiri text-lg font-bold tracking-widest my-2 drop-shadow-md"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>

          {/* Quranic Verse - High Contrast */}
          {invitation.headerVerse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="my-5 p-4 rounded-2xl bg-black/50 border border-amber-400/30 shadow-inner"
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

          {/* Parents Introduction - Pure White Text */}
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
            <p className="text-xs text-slate-300 font-tajawal mt-2 font-medium">
              {invitation.welcomeMessage}
            </p>
          </motion.div>

          {/* Event Title Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="my-4"
          >
            <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-100 border border-amber-400/40 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{invitation.eventTitle}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </span>
          </motion.div>

          {/* Names in Gold Metallic Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="my-6 py-5 rounded-2xl bg-black/50 border border-amber-400/30"
          >
            <h1 className="text-3xl sm:text-5xl font-bold font-ruqaa gold-text-shimmer drop-shadow-xl text-amber-200">
              {invitation.groomName}
            </h1>
            <div className="text-amber-300 font-amiri text-2xl font-bold my-1">
              &
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-ruqaa gold-text-shimmer drop-shadow-xl text-amber-200">
              {invitation.brideName}
            </h2>
          </motion.div>

          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="my-5 p-4 rounded-2xl bg-black/60 border border-amber-400/40 text-center shadow-lg"
          >
            <div className="text-amber-200 font-bold font-cairo text-base">
              يوم {invitation.dayOfWeek} • {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
            </div>
            <div className="text-xs text-slate-300 font-tajawal mt-1 font-medium">
              الموافق {invitation.eventDateHijri}
            </div>
            <div className="text-xs font-bold text-white mt-2 font-cairo">
              {invitation.timeFormatted}
            </div>
          </motion.div>

          {/* Countdown Timer */}
          {invitation.toggles.showCountdown && (
            <CountdownTimer targetDate={invitation.eventDate} theme="midnight" />
          )}

          {/* Calendar Auto-add Buttons */}
          {invitation.toggles.showCalendar && (
            <CalendarButtons
              title={`${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`}
              description={`${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`}
              location={`${invitation.venueName}, ${invitation.venueAddress}`}
              startDate={invitation.eventDate}
              theme="midnight"
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
              theme="midnight"
            />
          )}

          {/* Event Timeline */}
          {invitation.toggles.showTimeline && (
            <TimelineSection items={invitation.timeline} theme="midnight" />
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <div className="my-4 p-3 rounded-xl bg-black/50 border border-amber-400/30 flex items-center justify-center gap-2 text-xs font-tajawal text-slate-200 max-w-sm mx-auto">
              <Shirt className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{invitation.toggles.dressCodeText}</span>
            </div>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ChildrenAdvisory
              text={invitation.toggles.childrenAdvisoryText}
              theme="midnight"
            />
          )}

          {/* One-tap RSVP Button */}
          {invitation.toggles.showRsvp && (
            <div className="mt-7 pt-4 border-t border-amber-400/30">
              <RsvpButton
                invitationId={invitation.id}
                slug={invitation.slug}
                initialCount={invitation.rsvpCount}
                theme="midnight"
              />
            </div>
          )}

          {/* Share Action */}
          <ShareAction
            title={invitation.title}
            slug={invitation.slug}
            groomName={invitation.groomName}
            brideName={invitation.brideName}
            theme="midnight"
          />

          <div className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-amber-300 font-tajawal font-medium">
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
