'use client';

import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = '',
  immediate = false,
}) => {
  // If immediate without explicit delay, start at 0.05s
  const computedDelay = immediate && delay === 0 ? 0.05 : delay;

  return (
    <div
      className={`animate-luxury-reveal ${className}`}
      style={{
        animationDelay: `${computedDelay}s`,
      }}
    >
      {children}
    </div>
  );
};
