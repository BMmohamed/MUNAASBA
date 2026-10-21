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
import { Flower2, Heart, Shirt } from 'lucide-react';

export const TemplateRoyalFloral: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fff5f6] via-[#fdf0f2] to-[#faf3eb] text-neutral-800 font-cairo overflow-hidden">
      
      {/* Floating Animated Rose Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60 animate-float-slow"
            style={{
              width: `${(i % 3) * 6 + 10}px`,
              height: `${(i % 3) * 4 + 8}px`,
              backgroundColor: i % 2 === 0 ? '#fbcfe8' : '#fda4af',
              top: `${(i * 17) % 95}%`,
              left: `${(i * 29) % 95}%`,
              borderRadius: '50% 20% 50% 20%',
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-12 z-10">
        
        {/* Floral Framed Card */}
        <div className="relative bg-white/90 border border-rose-200/80 rounded-3xl p-6 sm:p-9 shadow-xl shadow-rose-200/40 backdrop-blur-md text-center">
          
          {/* Floral Botanical Wreath Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-16 h-16 mx-auto mb-2 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 shadow-sm"
          >
            <Flower2 className="w-8 h-8 text-rose-400" />
          </motion.div>

          {/* Bismillah Calligraphy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-rose-900 font-amiri text-lg font-bold tracking-wide my-2"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>

          {/* Romantic Quranic Verse / Poetry */}
          {invitation.headerVerse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="my-5 p-4 rounded-2xl bg-rose-50/60 border border-rose-200"
            >
              <p className="text-xs sm:text-sm font-amiri text-rose-950 leading-relaxed italic">
                &ldquo;{invitation.headerVerse}&rdquo;
              </p>
              {invitation.verseSource && (
                <span className="text-[10px] text-rose-600 font-tajawal mt-1 block">
                  [{invitation.verseSource}]
                </span>
              )}
            </motion.div>
          )}

          {/* Parents Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="my-4 space-y-1"
          >
            <p className="text-xs font-tajawal text-neutral-600">
              {invitation.groomParents}
            </p>
            <span className="text-xs text-rose-400 font-bold block">• و •</span>
            <p className="text-xs font-tajawal text-neutral-600">
              {invitation.brideParents}
            </p>
            <p className="text-xs text-neutral-500 font-tajawal mt-2">
              {invitation.welcomeMessage}
            </p>
          </motion.div>

          {/* Event Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="my-4"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{invitation.eventTitle}</span>
            </span>
          </motion.div>

          {/* Bride & Groom Romantic Typography */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="my-6 py-5 rounded-2xl bg-gradient-to-r from-rose-50/50 via-pink-50/80 to-rose-50/50 border border-rose-200"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-ruqaa text-rose-900 drop-shadow-sm">
              {invitation.groomName}
            </h1>
            <div className="text-rose-400 font-amiri text-2xl font-bold my-1">
              &
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-ruqaa text-rose-900 drop-shadow-sm">
              {invitation.brideName}
            </h2>
          </motion.div>

          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="my-5 p-4 rounded-2xl bg-white border border-rose-200 text-center shadow-sm"
          >
            <div className="text-rose-900 font-bold font-cairo text-base">
              يوم {invitation.dayOfWeek} • {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
            </div>
            <div className="text-xs text-rose-700/80 font-tajawal mt-1">
              الموافق {invitation.eventDateHijri}
            </div>
            <div className="text-xs font-bold text-rose-950 mt-2 font-cairo">
              {invitation.timeFormatted}
            </div>
          </motion.div>

          {/* Countdown Timer */}
          {invitation.toggles.showCountdown && (
            <CountdownTimer targetDate={invitation.eventDate} theme="floral" />
          )}

          {/* Calendar Auto-add Buttons */}
          {invitation.toggles.showCalendar && (
            <CalendarButtons
              title={`${invitation.eventTitle} - ${invitation.groomName} & ${invitation.brideName}`}
              description={`${invitation.welcomeMessage}\nالمكان: ${invitation.venueName}`}
              location={`${invitation.venueName}, ${invitation.venueAddress}`}
              startDate={invitation.eventDate}
              theme="floral"
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
              theme="floral"
            />
          )}

          {/* Event Timeline */}
          {invitation.toggles.showTimeline && (
            <TimelineSection items={invitation.timeline} theme="floral" />
          )}

          {/* Dress Code */}
          {invitation.toggles.showDressCode && (
            <div className="my-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center gap-2 text-xs font-tajawal text-rose-800 max-w-sm mx-auto">
              <Shirt className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{invitation.toggles.dressCodeText}</span>
            </div>
          )}

          {/* Children Advisory */}
          {invitation.toggles.showChildrenAdvisory && (
            <ChildrenAdvisory
              text={invitation.toggles.childrenAdvisoryText}
              theme="floral"
            />
          )}

          {/* One-tap RSVP Button */}
          {invitation.toggles.showRsvp && (
            <div className="mt-7 pt-4 border-t border-rose-200">
              <RsvpButton
                invitationId={invitation.id}
                slug={invitation.slug}
                initialCount={invitation.rsvpCount}
                theme="floral"
              />
            </div>
          )}

          {/* Share Action */}
          <ShareAction
            title={invitation.title}
            slug={invitation.slug}
            groomName={invitation.groomName}
            brideName={invitation.brideName}
            theme="floral"
          />

          <div className="mt-8 pt-4 border-t border-rose-100 text-center text-xs text-rose-500 font-tajawal">
            تزهو الأمسية بجميل حضوركم العطر 🌸
          </div>

        </div>
      </div>

      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer musicUrl={invitation.toggles.musicUrl} theme="floral" />
      )}
    </div>
  );
};
