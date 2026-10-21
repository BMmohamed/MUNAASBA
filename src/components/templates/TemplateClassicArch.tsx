'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationData } from '@/types/invitation';
import { BismillahCalligraphy, GoldFlourishDivider, MashrabiyaWatermark, AmbientParticles } from '../common/CalligraphyDecorations';
import { BackgroundMediaLayer } from '../invitation/BackgroundMediaLayer';
import { CountdownTimer } from '../invitation/CountdownTimer';
import { RsvpButton } from '../invitation/RsvpButton';
import { CalendarButtons } from '../invitation/CalendarButtons';
import { LocationCard } from '../invitation/LocationCard';
import { TimelineSection } from '../invitation/TimelineSection';
import { ChildrenAdvisory } from '../invitation/ChildrenAdvisory';
import { ShareAction } from '../invitation/ShareAction';
import { AmbientMusicPlayer } from '../invitation/AmbientMusicPlayer';
import { Sparkles, Shirt } from 'lucide-react';
import { formatArabicDateDisplay } from '@/lib/date-utils';

export const TemplateClassicArch: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  const dateFormatted = formatArabicDateDisplay(invitation.eventDate);

  return (
    <div className="relative min-h-screen text-neutral-100 overflow-hidden font-cairo">
      
      {/* Slow-Motion Ambient Loop Video & AI Image Layer */}
      <BackgroundMediaLayer
        templateId="template-1"
        customVideoUrl={invitation.customVideoUrl}
        customImageUrl={invitation.customImageUrl}
      />

      {/* Decorative Overlays */}
      <MashrabiyaWatermark opacity={0.08} color="#d4af37" />
      <AmbientParticles count={16} color="#e5c158" />

      {/* Main Invitation Container */}
      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-12 z-10">
        
        {/* Exterior Classic Arch Border Frame - High Contrast Deep Royal Emerald */}
        <div className="relative border-2 border-amber-400/60 rounded-t-[160px] rounded-b-3xl p-4 sm:p-7 bg-[#021812]/92 backdrop-blur-xl shadow-2xl shadow-black/80">
          
          {/* Inner Golden Hairline Arch */}
          <div className="relative border border-amber-400/40 rounded-t-[145px] rounded-b-2xl p-4 sm:p-6 text-center">

            {/* Arch Crown Finial Ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-12 h-12 mx-auto -mt-2 mb-3 flex items-center justify-center text-amber-400"
            >
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M20 0 L24 14 L38 14 L26 22 L30 36 L20 28 L10 36 L14 22 L2 14 L16 14 Z" fill="#d4af37" />
                <circle cx="20" cy="20" r="4" fill="#041a14" />
              </svg>
            </motion.div>

            {/* Bismillah Calligraphy */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <BismillahCalligraphy color="#fde047" className="w-60 h-auto mx-auto my-2 drop-shadow-md" />
            </motion.div>

            {/* Quranic Verse - Sharp Contrast */}
            {invitation.headerVerse && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="my-5 px-4 py-3.5 rounded-xl bg-black/40 border border-amber-400/30 shadow-inner"
              >
                <p className="text-xs sm:text-sm font-amiri leading-loose text-amber-100 font-bold italic text-contrast-dark">
                  &ldquo;{invitation.headerVerse}&rdquo;
                </p>
                {invitation.verseSource && (
                  <span className="block text-[11px] font-tajawal text-amber-300 font-semibold mt-1">
                    [{invitation.verseSource}]
                  </span>
                )}
              </motion.div>
            )}

            <GoldFlourishDivider color="#d4af37" className="w-36 h-5 mx-auto my-3" />

            {/* Parents Announcement - Crisp White Text for 100% Readability */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="my-4 space-y-2 text-contrast-dark"
            >
              <p className="text-xs sm:text-sm font-tajawal text-white font-semibold leading-relaxed">
                {invitation.groomParents}
              </p>
              <span className="inline-block text-xs text-amber-300 font-bold">• مع •</span>
              <p className="text-xs sm:text-sm font-tajawal text-white font-semibold leading-relaxed">
                {invitation.brideParents}
              </p>
              <p className="text-xs text-amber-100/90 font-tajawal mt-2 font-medium">
                {invitation.welcomeMessage}
              </p>
            </motion.div>

            {/* Event Title Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="my-5"
            >
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/30 via-amber-400/40 to-amber-500/30 border border-amber-400/50 text-amber-100 text-xs sm:text-sm font-bold tracking-wide shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{invitation.eventTitle}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>
            </motion.div>

            {/* Groom & Bride Names - Royal Gold Calligraphy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="my-6 py-5 border-y border-amber-400/30 bg-black/50 rounded-2xl shadow-inner"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <h1 className="text-3xl sm:text-5xl font-bold font-ruqaa text-amber-200 gold-text-shimmer drop-shadow-lg">
                  {invitation.groomName}
                </h1>
                <div className="w-10 h-10 my-1 rounded-full border border-amber-400/50 flex items-center justify-center text-amber-200 font-amiri text-xl font-bold bg-[#021812] shadow-md">
                  &
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold font-ruqaa text-amber-200 gold-text-shimmer drop-shadow-lg">
                  {invitation.brideName}
                </h2>
              </div>
            </motion.div>

            {/* Date & Day Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="my-5 p-4 rounded-2xl bg-black/60 border border-amber-400/40 text-center shadow-lg"
            >
              <div className="text-amber-200 font-bold font-cairo text-lg mb-1 drop-shadow-sm">
                يوم {invitation.dayOfWeek}
              </div>
              <div className="text-sm font-tajawal text-white font-semibold">
                {dateFormatted.dayNumber} {dateFormatted.monthName} {dateFormatted.year} م
              </div>
              <div className="text-xs text-amber-300 font-tajawal mt-0.5 font-medium">
                الموافق {invitation.eventDateHijri}
              </div>
              <div className="text-xs font-bold text-amber-200 mt-2 font-cairo">
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

            {/* Google Maps Venue Card */}
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

            {/* Event Timeline */}
            {invitation.toggles.showTimeline && (
              <TimelineSection items={invitation.timeline} theme="gold" />
            )}

            {/* Dress Code Notice */}
            {invitation.toggles.showDressCode && (
              <div className="my-5 p-3 rounded-xl bg-black/50 border border-amber-400/30 flex items-center justify-center gap-2 text-xs font-tajawal text-neutral-200 max-w-sm mx-auto">
                <Shirt className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{invitation.toggles.dressCodeText}</span>
              </div>
            )}

            {/* Children Advisory ("جنة الأطفال منازلهم") */}
            {invitation.toggles.showChildrenAdvisory && (
              <ChildrenAdvisory
                text={invitation.toggles.childrenAdvisoryText}
                theme="gold"
              />
            )}

            {/* Single-tap RSVP Button with Device Locking */}
            {invitation.toggles.showRsvp && (
              <div className="mt-8 pt-4 border-t border-amber-400/40">
                <RsvpButton
                  invitationId={invitation.id}
                  slug={invitation.slug}
                  initialCount={invitation.rsvpCount}
                  theme="gold"
                />
              </div>
            )}

            {/* Share to WhatsApp & Copy Link */}
            <ShareAction
              title={invitation.title}
              slug={invitation.slug}
              groomName={invitation.groomName}
              brideName={invitation.brideName}
              theme="gold"
            />

            {/* Footer Closing Gratitude */}
            <div className="mt-8 pt-4 border-t border-amber-500/20 text-center">
              <p className="text-xs text-amber-200 font-amiri italic font-bold">
                دامـت أفراحكم بالمسـرّات عامرـة
              </p>
              <div className="text-[10px] text-neutral-400 mt-2 font-tajawal">
                منصة مناسبة • تصميم دعوات إلكترونية تفاعلية
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Background Ambient Audio Player */}
      {invitation.toggles.showMusic && (
        <AmbientMusicPlayer musicUrl={invitation.toggles.musicUrl} theme="gold" />
      )}
    </div>
  );
};
