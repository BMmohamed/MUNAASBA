'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationData } from '@/types/invitation';
import { MashrabiyaWatermark, GoldFlourishDivider } from '../common/CalligraphyDecorations';
import { CountdownTimer } from '../invitation/CountdownTimer';
import { RsvpButton } from '../invitation/RsvpButton';
import { CalendarButtons } from '../invitation/CalendarButtons';
import { LocationCard } from '../invitation/LocationCard';
import { TimelineSection } from '../invitation/TimelineSection';
import { ChildrenAdvisory } from '../invitation/ChildrenAdvisory';
import { ShareAction } from '../invitation/ShareAction';
import { AmbientMusicPlayer } from '../invitation/AmbientMusicPlayer';
import { formatArabicDateDisplay } from '@/lib/date-utils';
import { Compass, Shirt } from 'lucide-react';

export const TemplateHeritageTraditional: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fbf6ef] via-[#f7ebe0] to-[#ecd9c6] text-amber-950 font-cairo overflow-hidden">
      
      {/* Traditional Mashrabiya Background Watermark */}
      <MashrabiyaWatermark opacity={0.07} color="#a0522d" />

      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-12 z-10">
        
        {/* Heritage Terracotta & Sand Card */}
        <div className="relative bg-[#fffdf9]/95 border-2 border-amber-800/30 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-amber-900/10 backdrop-blur-md text-center">
          
          {/* Traditional Geometric Border Accent */}
          <div className="absolute inset-2 border border-dashed border-amber-700/20 rounded-2xl pointer-events-none" />

          {/* Heritage Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-14 h-14 mx-auto mb-3 rounded-full bg-amber-100 border border-amber-700/30 flex items-center justify-center text-amber-900 shadow-sm"
          >
            <Compass className="w-7 h-7 text-amber-800" />
          </motion.div>

          {/* Bismillah Calligraphy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-amber-900 font-amiri text-lg font-bold tracking-wide my-2"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>

          {/* Poetic Line / Verse */}
          {invitation.headerVerse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="my-5 p-4 rounded-2xl bg-amber-50 border border-amber-700/20"
            >
              <p className="text-xs sm:text-sm font-amiri text-amber-950 leading-relaxed italic whitespace-pre-line">
                &ldquo;{invitation.headerVerse}&rdquo;
              </p>
              {invitation.verseSource && (
                <span className="text-[10px] text-amber-800 font-tajawal mt-1 block">
                  [{invitation.verseSource}]
                </span>
              )}
            </motion.div>
          )}

          <GoldFlourishDivider color="#a0522d" className="w-36 h-5 mx-auto my-3" />

          {/* Parents Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="my-4 space-y-1.5"
          >
            <p className="text-xs font-tajawal text-amber-900 font-medium">
              {invitation.groomParents}
            </p>
            <span className="text-xs text-amber-700 block font-bold">• مع •</span>
            <p className="text-xs font-tajawal text-amber-900 font-medium">
              {invitation.brideParents}
            </p>
            <p className="text-xs text-amber-800/80 font-tajawal mt-2">
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
            <span className="inline-block px-5 py-1.5 rounded-full text-xs font-bold bg-amber-900 text-amber-50 shadow-sm">
              {invitation.eventTitle}
            </span>
          </motion.div>

          {/* Couple Names in Heritage Arabic Calligraphy */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="my-6 py-5 rounded-2xl bg-amber-50/70 border border-amber-700/20"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-ruqaa text-amber-950">
              {invitation.groomName}
            </h1>
            <div className="text-amber-700 font-amiri text-2xl font-bold my-1">
              &
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-ruqaa text-amber-950">
              {invitation.brideName}
            </h2>
          </motion.div>

          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="my-5 p-4 rounded-2xl bg-white border border-amber-700/20 text-center shadow-sm"
          >
            <div className="text-amber-950 font-bold font-cairo text-base">
              يوم {invitation.dayOfWeek} • {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
            </div>
            <div className="text-xs text-amber-800 font-tajawal mt-1">
              الموافق {invitation.eventDateHijri}
            </div>
            <div className="text-xs font-bold text-amber-900 mt-2 font-cairo">
              {invitation.timeFormatted}
            </div>
          </motion.div>

          {/* Countdown Timer */}
          {invitation.toggles.showCountdown && (
            <CountdownTimer targetDate={invitation.eventDate} theme="heritage" />
          )}

          {/* Calendar Auto-add Buttons */}
          {invitation.toggles.showCalendar && (
            <CalendarButtons
              title={`${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`}
              description={`${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`}
              location={`${invitation.venueName}, ${invitation.venueAddress}`}
              startDate={invitation.eventDate}
              theme="heritage"
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
              theme="heritage"
            />
          )}

          {/* Event Timeline */}
          {invitation.toggles.showTimeline && (
            <TimelineSection items={invitation.timeline} theme="heritage" />
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <div className="my-4 p-3 rounded-xl bg-amber-50 border border-amber-700/20 flex items-center justify-center gap-2 text-xs font-tajawal text-amber-900 max-w-sm mx-auto">
              <Shirt className="w-4 h-4 text-amber-800 shrink-0" />
              <span>{invitation.toggles.dressCodeText}</span>
            </div>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ChildrenAdvisory
              text={invitation.toggles.childrenAdvisoryText}
              theme="heritage"
            />
          )}

          {/* One-tap RSVP Button */}
          {invitation.toggles.showRsvp && (
            <div className="mt-7 pt-4 border-t border-amber-700/20">
              <RsvpButton
                invitationId={invitation.id}
                slug={invitation.slug}
                initialCount={invitation.rsvpCount}
                theme="heritage"
              />
            </div>
          )}

          {/* Share Action */}
          <ShareAction
            title={invitation.title}
            slug={invitation.slug}
            groomName={invitation.groomName}
            brideName={invitation.brideName}
            theme="heritage"
          />

          <div className="mt-8 pt-4 border-t border-amber-700/10 text-center text-xs text-amber-800/80 font-tajawal">
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
