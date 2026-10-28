'use client';

import React, { useMemo } from 'react';

interface FallingPetalsEffectProps {
  count?: number;
  variant?: 'rose' | 'blush' | 'gold' | 'mixed';
  opacity?: number;
}

interface PetalData {
  id: number;
  left: number; // percentage 0-100
  duration: number; // seconds
  delay: number; // seconds
  size: number; // px
  rotation: number; // deg
  swayDistance: number; // px
  color1: string;
  color2: string;
  shadowColor: string;
}

export const FallingPetalsEffect: React.FC<FallingPetalsEffectProps> = ({
  count = 24,
  variant = 'mixed',
  opacity = 0.85,
}) => {
  const petals: PetalData[] = useMemo(() => {
    const list: PetalData[] = [];
    const colorSets = {
      rose: [
        { c1: '#fda4af', c2: '#f43f5e', shadow: 'rgba(244, 63, 94, 0.4)' },
        { c1: '#fecdd3', c2: '#fb7185', shadow: 'rgba(251, 113, 133, 0.3)' },
        { c1: '#ffe4e6', c2: '#f43f5e', shadow: 'rgba(244, 63, 94, 0.3)' },
      ],
      blush: [
        { c1: '#fed7aa', c2: '#fb7185', shadow: 'rgba(251, 113, 133, 0.3)' },
        { c1: '#fce7f3', c2: '#f472b6', shadow: 'rgba(244, 114, 182, 0.3)' },
        { c1: '#fef3c7', c2: '#fde047', shadow: 'rgba(253, 224, 71, 0.3)' },
      ],
      gold: [
        { c1: '#fef08a', c2: '#eab308', shadow: 'rgba(234, 179, 8, 0.4)' },
        { c1: '#fde68a', c2: '#ca8a04', shadow: 'rgba(202, 138, 4, 0.3)' },
        { c1: '#fffbeb', c2: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.3)' },
      ],
      mixed: [
        { c1: '#fda4af', c2: '#f43f5e', shadow: 'rgba(244, 63, 94, 0.4)' },
        { c1: '#fecdd3', c2: '#e11d48', shadow: 'rgba(225, 29, 72, 0.35)' },
        { c1: '#ffe4e6', c2: '#fb7185', shadow: 'rgba(251, 113, 133, 0.3)' },
        { c1: '#fef08a', c2: '#d97706', shadow: 'rgba(217, 119, 6, 0.35)' },
        { c1: '#fff1f2', c2: '#fda4af', shadow: 'rgba(253, 164, 175, 0.3)' },
      ],
    }[variant];

    for (let i = 0; i < count; i++) {
      const colors = colorSets[i % colorSets.length];
      list.push({
        id: i,
        left: (i * (100 / count) + (Math.sin(i * 1.7) * 8 + 5)) % 98,
        duration: 7 + (i % 7) * 1.5, // 7s to 16s
        delay: (i * 0.45) % 8, // staggered starts
        size: 16 + (i % 5) * 4, // 16px to 32px
        rotation: (i * 47) % 360,
        swayDistance: 25 + (i % 4) * 15,
        color1: colors.c1,
        color2: colors.c2,
        shadowColor: colors.shadow,
      });
    }
    return list;
  }, [count, variant]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
      style={{ opacity }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          50% {
            transform: translateY(45vh) translateX(var(--sway)) rotate(180deg) scale(1);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) translateX(calc(var(--sway) * -0.6)) rotate(360deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>

      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0 will-change-transform"
          style={
            {
              left: `${petal.left}%`,
              animation: `petalFall ${petal.duration}s cubic-bezier(0.25, 0.1, 0.25, 1) infinite`,
              animationDelay: `${petal.delay}s`,
              '--sway': `${petal.swayDistance}px`,
            } as React.CSSProperties
          }
        >
          {/* Ornate Curved Rose Petal SVG Shape */}
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: `drop-shadow(0 2px 4px ${petal.shadowColor})`,
            }}
          >
            <defs>
              <linearGradient id={`petalGrad-${petal.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={petal.color1} stopOpacity="0.95" />
                <stop offset="100%" stopColor={petal.color2} stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <path
              d="M12 2 C18 6, 23 15, 20 25 C17 30, 7 30, 4 25 C1 15, 6 6, 12 2 Z"
              fill={`url(#petalGrad-${petal.id})`}
            />
            {/* Subtle petal vein line */}
            <path
              d="M12 5 C12.5 12, 12 22, 12 27"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
