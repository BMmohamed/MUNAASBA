'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Loader2 } from 'lucide-react';

interface AmbientMusicPlayerProps {
  musicUrl?: string;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const AmbientMusicPlayer: React.FC<AmbientMusicPlayerProps> = ({
  musicUrl = '/audio/wedding-serene.m4a',
  theme = 'gold',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Normalize url: if empty or from blocked CDN (mixkit 403), fallback to local file
  const rawUrl = musicUrl && musicUrl.trim() !== '' ? musicUrl.trim() : '/audio/wedding-serene.m4a';
  const effectiveUrl = rawUrl.includes('assets.mixkit.co') ? '/audio/wedding-serene.m4a' : rawUrl;

  useEffect(() => {
    // If audio already exists and URL is unchanged, keep it
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }

    try {
      const audio = new Audio(effectiveUrl);
      audio.loop = true;
      audio.volume = 0.45;
      audio.preload = 'auto';

      audio.onplay = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      audio.onpause = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };

      audio.onerror = () => {
        console.warn('[AmbientMusicPlayer] Audio error on URL, attempting fallback:', effectiveUrl);
        setIsLoading(false);
        if (effectiveUrl !== '/audio/wedding-serene.m4a') {
          audio.src = '/audio/wedding-serene.m4a';
          audio.load();
        }
      };

      audioRef.current = audio;
    } catch (err) {
      console.error('[AmbientMusicPlayer] Init error:', err);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [effectiveUrl]);

  const togglePlayback = async () => {
    try {
      let audio = audioRef.current;
      if (!audio) {
        audio = new Audio(effectiveUrl);
        audio.loop = true;
        audio.volume = 0.45;
        audioRef.current = audio;
      }

      if (isPlaying || (!audio.paused && !audio.ended)) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.warn('[AmbientMusicPlayer] Playback error, trying fallback local file:', err);
      // Try fallback to local file if external failed
      if (audioRef.current && effectiveUrl !== '/audio/wedding-serene.m4a') {
        try {
          audioRef.current.src = '/audio/wedding-serene.m4a';
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e2) {
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
      }
      setIsLoading(false);
    }
  };

  const themeClasses = {
    gold: 'bg-neutral-900/90 border-amber-500/40 text-amber-300 shadow-amber-500/10 hover:border-amber-400',
    minimal: 'bg-stone-50 border-stone-300 text-stone-800 shadow-sm hover:border-stone-400',
    floral: 'bg-white/90 border-rose-300 text-rose-800 shadow-rose-200 hover:border-rose-400',
    midnight: 'bg-slate-900/90 border-amber-400/40 text-amber-300 shadow-indigo-950/50 hover:border-amber-300',
    heritage: 'bg-amber-950/90 border-amber-700/60 text-amber-200 shadow-amber-950 hover:border-amber-500',
  }[theme];

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ${themeClasses}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
            <span className="text-xs font-cairo font-medium">جاري التحميل...</span>
          </>
        ) : isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-4 w-4 shrink-0">
              <span className="w-1 bg-amber-400 rounded-full sound-bar-1 animate-pulse" />
              <span className="w-1 bg-amber-400 rounded-full sound-bar-2 animate-bounce" />
              <span className="w-1 bg-amber-400 rounded-full sound-bar-3 animate-pulse" />
            </div>
            <span className="text-xs font-cairo font-bold">موسيقى هادئة</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 opacity-75 shrink-0" />
            <span className="text-xs font-cairo opacity-90 font-medium">تشغيل النغم</span>
          </>
        )}
      </button>
    </div>
  );
};
