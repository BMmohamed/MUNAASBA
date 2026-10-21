'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationData } from '@/types/invitation';
import { CountdownTimer } from '../invitation/CountdownTimer';
import { RsvpButton } from '../invitation/RsvpButton';
import { CalendarButtons } from '../invitation/CalendarButtons';
import { LocationCard } from '../invitation/LocationCard';
import { TimelineSection } from '../invitation/TimelineSection';
import { ChildrenAdvisory } from '../invitation/ChildrenAdvisory';
import { ShareAction } from '../invitation/ShareAction';
import { AmbientMusicPlayer } from '../invitation/AmbientMusicPlayer';
import { formatArabicDateDisplay } from '@/lib/date-utils';
import { Shirt } from 'lucide-react';

export const TemplateModernMinimalist: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-stone-800 font-cairo overflow-hidden">
      {/* Subtle fine grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#b8860b 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-12 z-10">
        
        {/* Editorial Minimalist Card Frame */}
        <div className="relative bg-white border border-stone-200 shadow-xl shadow-stone-200/50 rounded-2xl p-6 sm:p-9 text-center">
          
          {/* Hairline double inner frame */}
          <div className="absolute inset-3 border border-stone-100 rounded-xl pointer-events-none" />

          {/* Minimalist Botanical Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full border border-stone-300 flex items-center justify-center text-stone-700 bg-stone-50"
          >
            <span className="font-amiri text-2xl font-bold text-stone-800">
              {invitation.groomName.slice(0, 1)} & {invitation.brideName.slice(0, 1)}
            </span>
          </motion.div>

          {/* Bismillah minimal typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-stone-500 font-amiri text-base tracking-widest my-2"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>

          {/* Quranic Verse */}
          {invitation.headerVerse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="my-5 px-4 py-3 bg-stone-50 border-y border-stone-200/60"
            >
              <p className="text-xs sm:text-sm font-amiri text-stone-600 leading-relaxed">
                &ldquo;{invitation.headerVerse}&rdquo;
              </p>
              {invitation.verseSource && (
                <span className="text-[10px] text-stone-400 font-tajawal mt-1 block">
                  [{invitation.verseSource}]
                </span>
              )}
            </motion.div>
          )}

          {/* Invitation Intro */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="my-4 space-y-1.5"
          >
            <p className="text-xs font-tajawal text-stone-600 font-medium">
              {invitation.groomParents}
            </p>
            <span className="text-xs text-stone-400 block">• مع •</span>
            <p className="text-xs font-tajawal text-stone-600 font-medium">
              {invitation.brideParents}
            </p>
            <p className="text-xs text-stone-500 font-tajawal mt-2">
              {invitation.welcomeMessage}
            </p>
          </motion.div>

          {/* Event Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="my-4"
          >
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-100 text-stone-700 border border-stone-200">
              {invitation.eventTitle}
            </span>
          </motion.div>

          {/* Couple Names - Modern Editorial Style */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="my-6 py-5 border-y border-stone-200"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-amiri text-stone-900 tracking-wide">
              {invitation.groomName}
            </h1>
            <div className="text-stone-400 my-1 font-amiri text-xl italic">
              و
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-amiri text-stone-900 tracking-wide">
              {invitation.brideName}
            </h2>
          </motion.div>

          {/* Date & Time Clean Block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="my-5 p-4 rounded-xl bg-stone-50 border border-stone-200 text-center"
          >
            <div className="text-stone-900 font-bold font-cairo text-base">
              يوم {invitation.dayOfWeek} • {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
            </div>
            <div className="text-xs text-stone-500 font-tajawal mt-1">
              الموافق {invitation.eventDateHijri}
            </div>
            <div className="text-xs font-semibold text-stone-700 mt-2 font-cairo">
              {invitation.timeFormatted}
            </div>
          </motion.div>

          {/* Dynamic Countdown Timer */}
          {invitation.toggles.showCountdown && (
            <CountdownTimer targetDate={invitation.eventDate} theme="minimal" />
          )}

          {/* Calendar Auto-add Buttons */}
          {invitation.toggles.showCalendar && (
            <CalendarButtons
              title={`${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`}
              description={`${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`}
              location={`${invitation.venueName}, ${invitation.venueAddress}`}
              startDate={invitation.eventDate}
              theme="minimal"
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
              theme="minimal"
            />
          )}

          {/* Timeline */}
          {invitation.toggles.showTimeline && (
            <TimelineSection items={invitation.timeline} theme="minimal" />
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <div className="my-4 p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center gap-2 text-xs font-tajawal text-stone-600 max-w-sm mx-auto">
              <Shirt className="w-4 h-4 text-stone-500 shrink-0" />
              <span>{invitation.toggles.dressCodeText}</span>
            </div>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ChildrenAdvisory
              text={invitation.toggles.childrenAdvisoryText}
              theme="minimal"
            />
          )}

          {/* One-tap RSVP Button */}
          {invitation.toggles.showRsvp && (
            <div className="mt-7 pt-4 border-t border-stone-200">
              <RsvpButton
                invitationId={invitation.id}
                slug={invitation.slug}
                initialCount={invitation.rsvpCount}
                theme="minimal"
              />
            </div>
          )}

          {/* Share Action */}
          <ShareAction
            title={invitation.title}
            slug={invitation.slug}
            groomName={invitation.groomName}
            brideName={invitation.brideName}
            theme="minimal"
          />

          <div className="mt-8 pt-4 border-t border-stone-100 text-center text-xs text-stone-400 font-tajawal">
            حضوركم شرفٌ وفرحةٌ لقلوبنا
          </div>

        </div>
      </div>

      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer musicUrl={invitation.toggles.musicUrl} theme="minimal" />
      )}
    </div>
  );
};
