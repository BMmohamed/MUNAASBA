'use client';

import React from 'react';
import { InvitationTemplateId } from '@/types/invitation';

interface BackgroundMediaLayerProps {
  templateId: InvitationTemplateId;
  customVideoUrl?: string;
  customImageUrl?: string;
}

export const BackgroundMediaLayer: React.FC<BackgroundMediaLayerProps> = ({
  templateId,
  customVideoUrl,
  customImageUrl,
}) => {
  // Default AI images per template
  const defaultImages: Record<InvitationTemplateId, string> = {
    'template-1': '/images/backgrounds/bg_classic_arch.jpg',
    'template-2': '/images/backgrounds/bg_modern_minimal.jpg',
    'template-3': '/images/backgrounds/bg_royal_floral.jpg',
    'template-4': '/images/backgrounds/bg_classic_arch.jpg',
    'template-5': '/images/backgrounds/bg_modern_minimal.jpg',
    'template-6': '/images/backgrounds/bg_classic_arch.jpg',
    'template-7': '/images/backgrounds/bg_royal_floral.jpg',
    'template-8': '/images/backgrounds/bg_classic_arch.jpg',
  };

  // High-performance royalty-free slow-motion ambient loop videos
  const defaultVideos: Record<InvitationTemplateId, string> = {
    'template-1': 'https://assets.mixkit.co/videos/preview/mixkit-gold-dust-particles-in-motion-41551-large.mp4',
    'template-2': 'https://assets.mixkit.co/videos/preview/mixkit-white-silk-fabric-in-the-wind-41555-large.mp4',
    'template-3': 'https://assets.mixkit.co/videos/preview/mixkit-pink-petals-falling-slowly-41552-large.mp4',
    'template-4': 'https://assets.mixkit.co/videos/preview/mixkit-particles-in-a-dark-starry-night-41554-large.mp4',
    'template-5': 'https://assets.mixkit.co/videos/preview/mixkit-warm-fire-embers-floating-in-the-night-41553-large.mp4',
    'template-6': 'https://assets.mixkit.co/videos/preview/mixkit-gold-dust-particles-in-motion-41551-large.mp4',
    'template-7': 'https://assets.mixkit.co/videos/preview/mixkit-pink-petals-falling-slowly-41552-large.mp4',
    'template-8': 'https://assets.mixkit.co/videos/preview/mixkit-gold-dust-particles-in-motion-41551-large.mp4',
  };

  const videoSrc = customVideoUrl || defaultVideos[templateId];
  const imageSrc = customImageUrl || defaultImages[templateId];

  // Overlay color gradients for each template to ensure 100% text readability
  const overlayGradients: Record<InvitationTemplateId, string> = {
    'template-1': 'from-black/75 via-[#031812]/80 to-black/90',
    'template-2': 'from-stone-950/75 via-stone-900/65 to-stone-950/85',
    'template-3': 'from-stone-950/75 via-rose-950/65 to-stone-950/85',
    'template-4': 'from-black/80 via-slate-950/75 to-black/90',
    'template-5': 'from-black/75 via-amber-950/75 to-black/90',
    'template-6': 'from-black/80 via-[#1e150a]/80 to-black/90',
    'template-7': 'from-black/80 via-[#200a14]/80 to-black/90',
    'template-8': 'from-black/85 via-[#150a24]/85 to-black/90',
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen min-h-[100dvh] pointer-events-none overflow-hidden z-0"
      style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
    >
      {/* 1. Slow-Motion Ambient Loop Video */}
      {videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={imageSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 pointer-events-none"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* 2. Slow-Motion Ken Burns AI Image - Independent Zoom In & Zoom Out */}
      {imageSrc && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 animate-slow-kenburns pointer-events-none"
          style={{
            backgroundImage: `url('${imageSrc}')`,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
          }}
        />
      )}

      {/* 3. Deep Cinematic Protective Contrast Overlay (Protects text legibility without GPU lag) */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayGradients[templateId]} pointer-events-none`} />

      {/* 4. Fine Vignette around edges */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
    </div>
  );
};
