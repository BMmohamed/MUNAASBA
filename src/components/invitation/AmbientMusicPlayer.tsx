'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AmbientMusicPlayerProps {
  musicUrl?: string;
  theme?: 'gold' | 'minimal' | 'floral' | 'midnight' | 'heritage';
}

export const AmbientMusicPlayer: React.FC<AmbientMusicPlayerProps> = ({
  musicUrl = 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
  theme = 'gold',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.35; // gentle ambient volume
    audioRef.current = audio;

    const onCanPlay = () => setIsReady(true);
    audio.addEventListener('canplaythrough', onCanPlay);

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, [musicUrl]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch {
      // Browser autoplay policy might require explicit gesture
    }
  };

  const themeClasses = {
    gold: 'bg-neutral-900/90 border-amber-500/40 text-amber-300 shadow-amber-500/10',
    minimal: 'bg-stone-50 border-stone-300 text-stone-800 shadow-sm',
    floral: 'bg-white/90 border-rose-300 text-rose-800 shadow-rose-200',
    midnight: 'bg-slate-900/90 border-amber-400/40 text-amber-300 shadow-indigo-950/50',
    heritage: 'bg-amber-950/90 border-amber-700/60 text-amber-200 shadow-amber-950',
  }[theme];

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${themeClasses}`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-4 w-4 shrink-0">
              <span className="w-1 bg-amber-400 rounded-full sound-bar-1" />
              <span className="w-1 bg-amber-400 rounded-full sound-bar-2" />
              <span className="w-1 bg-amber-400 rounded-full sound-bar-3" />
            </div>
            <span className="text-xs font-cairo font-semibold">موسيقى هادئة</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 opacity-75 shrink-0" />
            <span className="text-xs font-cairo opacity-85">تشغيل النغم</span>
          </>
        )}
      </button>
    </div>
  );
};
