'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean; // For top hero items visible at the top of the mobile screen
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = '',
  immediate = false,
}) => {
  const [isVisible, setIsVisible] = useState(immediate);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) {
      setIsVisible(true);
      return;
    }

    const elem = domRef.current;
    if (!elem) return;

    let observer: IntersectionObserver | null = null;

    const cleanup = () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('touchmove', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };

    const checkVisibility = () => {
      if (!elem) return;
      const rect = elem.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger animation when the element enters the viewport zone (top < 88% of screen and bottom > 0)
      if (rect.top < windowHeight * 0.88 && rect.bottom > 0) {
        setIsVisible(true);
        cleanup();
      }
    };

    // Passive event listeners for fluid mobile scrolling
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('touchmove', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    // IntersectionObserver in tandem for modern browsers
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              cleanup();
            }
          });
        },
        {
          rootMargin: '0px 0px -10% 0px',
          threshold: 0,
        }
      );
      observer.observe(elem);
    }

    // Initial check on mount in case already in viewport zone
    checkVisibility();

    return cleanup;
  }, [immediate]);

  if (immediate) {
    return (
      <div
        className={`animate-entrance ${className}`}
        style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
