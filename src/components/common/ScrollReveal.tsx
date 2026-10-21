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

    // Safety fallback: Ensure content is 100% visible on all mobile devices even if scroll/intersection fails
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    // Scroll listener backup
    const handleScrollBackup = () => {
      if (!elem) return;
      const rect = elem.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + 100) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleScrollBackup);
      }
    };

    window.addEventListener('scroll', handleScrollBackup, { passive: true });

    // Native IntersectionObserver
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              setIsVisible(true);
              observer.unobserve(entry.target);
              window.removeEventListener('scroll', handleScrollBackup);
            }
          });
        },
        {
          rootMargin: '100px 0px 100px 0px',
          threshold: 0,
        }
      );

      observer.observe(elem);

      return () => {
        clearTimeout(safetyTimer);
        window.removeEventListener('scroll', handleScrollBackup);
        observer.disconnect();
      };
    } else {
      setIsVisible(true);
    }

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('scroll', handleScrollBackup);
    };
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
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 pointer-events-none'
      } ${className}`}
      style={{
        transitionDelay: isVisible && delay ? `${delay}s` : '0s',
      }}
    >
      {children}
    </div>
  );
};
