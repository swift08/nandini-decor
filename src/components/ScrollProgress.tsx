'use client';

import { useState, useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200/20 z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-pink-400 via-blue-400 to-pink-400 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}

