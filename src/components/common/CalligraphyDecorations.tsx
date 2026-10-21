'use client';

import React from 'react';

// Bismillah Calligraphy in pristine vector SVG
export const BismillahCalligraphy: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-48 h-auto mx-auto my-3',
  color = '#d4af37',
}) => (
  <div className={className} aria-label="بسم الله الرحمن الرحيم">
    <svg viewBox="0 0 400 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <path
        d="M200 45 C 190 25, 210 25, 200 15 C 195 28, 180 30, 170 20 C 160 35, 140 25, 130 35 C 120 20, 100 30, 90 25 C 80 40, 60 30, 50 45 C 70 45, 80 55, 95 45 C 110 50, 120 40, 135 50 C 150 45, 160 55, 175 45 C 190 55, 200 45, 200 45 Z"
        fill={color}
        opacity="0.2"
      />
      {/* Ornate Arabic Calligraphy Typography rendering */}
      <text
        x="50%"
        y="58"
        textAnchor="middle"
        fill={color}
        className="font-amiri font-bold"
        style={{ fontSize: '38px', letterSpacing: '1px' }}
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </text>
    </svg>
  </div>
);

// Luxury Ornamental Divider
export const GoldFlourishDivider: React.FC<{ color?: string; className?: string }> = ({
  color = '#d4af37',
  className = 'w-36 h-6 mx-auto my-4',
}) => (
  <div className={className}>
    <svg viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 12 H75" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <path d="M125 12 H190" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="100" cy="12" r="3.5" fill={color} />
      <polygon points="90,12 85,9 85,15" fill={color} opacity="0.8" />
      <polygon points="110,12 115,9 115,15" fill={color} opacity="0.8" />
    </svg>
  </div>
);

// Islamic Arch Outline for Template 1 (Bab Al-Farah)
export const IslamicArchFrame: React.FC<{
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
}> = ({ children, accentColor = '#d4af37', className = '' }) => (
  <div className={`relative ${className}`}>
    {/* Top decorative arch shape */}
    <div className="relative overflow-hidden rounded-t-[140px] border-t-2 border-x-2 pt-8 px-4" style={{ borderColor: accentColor }}>
      {/* Arch crown ornamentation */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
          <path d="M24 0 L30 12 L48 12 L34 18 L38 24 L24 16 L10 24 L14 18 L0 12 L18 12 Z" fill={accentColor} opacity="0.85" />
        </svg>
      </div>
      {children}
    </div>
  </div>
);

// Mashrabiya Geometric Pattern Background
export const MashrabiyaWatermark: React.FC<{ opacity?: number; color?: string }> = ({
  opacity = 0.05,
  color = '#d4af37',
}) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage: `radial-gradient(circle at 50% 50%, ${color} 1px, transparent 1px), radial-gradient(circle at 0% 0%, ${color} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
    }}
  />
);

// Floating ambient particles for luxury night and classic arch
export const AmbientParticles: React.FC<{ count?: number; color?: string }> = ({
  count = 12,
  color = '#d4af37',
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-star"
          style={{
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`,
            backgroundColor: color,
            top: `${(i * 19) % 100}%`,
            left: `${(i * 23) % 100}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2.5 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
};
