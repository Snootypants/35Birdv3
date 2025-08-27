'use client';
import { useEffect, useRef } from 'react';

export default function SplashBackground() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    let cleanup: undefined | (() => void);

    // Temporarily disable splash-cursor until reactbits is available
    root.classList.add('bg-hero-poster');

    const onVis = () => {
      if (document.hidden && typeof cleanup === 'function') {
        cleanup();
        cleanup = undefined;
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full -z-10 opacity-30"
      aria-hidden="true"
    />
  );
}