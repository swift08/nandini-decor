'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloralBackground() {
  const [floralElements, setFloralElements] = useState<Array<{
    id: number;
    size: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
    rotation: number;
    type: number;
  }>>([]);

  // Generate random values only on client to avoid hydration mismatch
  useEffect(() => {
    const elements = Array.from({ length: 40 }).map((_, i) => {
      const seed = i * 0.618033988749895; // Golden ratio for distribution
      return {
        id: i,
        size: ((seed * 120) % 120) + 60,
        left: (seed * 100) % 100,
        top: ((seed * 1.618) * 100) % 100,
        delay: ((seed * 15) % 15),
        duration: ((seed * 25) % 25) + 20,
        rotation: ((seed * 360) % 360),
        type: Math.floor((seed * 3) % 3), // 0: peony, 1: anemone, 2: bud
      };
    });
    setFloralElements(elements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floralElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute opacity-[0.04] md:opacity-[0.06]"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -40, -20, -40, 0],
            x: [0, Math.sin(element.id) * 30, Math.cos(element.id) * 20, Math.sin(element.id) * 30, 0],
            rotate: [element.rotation, element.rotation + 180, element.rotation + 360, element.rotation + 540, element.rotation + 720],
            scale: [1, 1.15, 0.95, 1.1, 1],
            opacity: [0.04, 0.08, 0.06, 0.08, 0.04],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        >
          {element.type === 0 ? (
            // Peony/Rose style bloom
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: 'blur(0.8px)' }}
            >
              <defs>
                <radialGradient id={`gradient-peony-${element.id}`}>
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.7" />
                  <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
                </radialGradient>
                <linearGradient id={`petal-gradient-${element.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {/* Outer petals layer */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 360) / 12;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + Math.cos(rad) * 30;
                const y = 50 + Math.sin(rad) * 30;
                return (
                  <ellipse
                    key={`outer-${i}`}
                    cx={x}
                    cy={y}
                    rx="12"
                    ry="20"
                    fill={`url(#petal-gradient-${element.id})`}
                    opacity="0.4"
                    transform={`rotate(${angle} ${x} ${y})`}
                  />
                );
              })}
              
              {/* Middle petals layer */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + Math.cos(rad) * 20;
                const y = 50 + Math.sin(rad) * 20;
                return (
                  <ellipse
                    key={`mid-${i}`}
                    cx={x}
                    cy={y}
                    rx="10"
                    ry="18"
                    fill={`url(#gradient-peony-${element.id})`}
                    opacity="0.5"
                    transform={`rotate(${angle + 22.5} ${x} ${y})`}
                  />
                );
              })}
              
              {/* Center layers */}
              <circle cx="50" cy="50" r="25" fill={`url(#gradient-peony-${element.id})`} opacity="0.4" />
              <circle cx="50" cy="50" r="18" fill={`url(#gradient-peony-${element.id})`} opacity="0.5" />
              <circle cx="50" cy="50" r="12" fill={`url(#gradient-peony-${element.id})`} opacity="0.6" />
              <circle cx="50" cy="50" r="6" fill="#1e40af" opacity="0.7" />
              
              {/* Leaves */}
              {Array.from({ length: 4 }).map((_, i) => {
                const angle = (i * 90) + 45;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + Math.cos(rad) * 35;
                const y = 50 + Math.sin(rad) * 35;
                return (
                  <ellipse
                    key={`leaf-${i}`}
                    cx={x}
                    cy={y}
                    rx="8"
                    ry="15"
                    fill="#1e3a8a"
                    opacity="0.25"
                    transform={`rotate(${angle + 90} ${x} ${y})`}
                  />
                );
              })}
            </svg>
          ) : element.type === 1 ? (
            // Anemone-style flower
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: 'blur(0.6px)' }}
            >
              <defs>
                <radialGradient id={`gradient-anemone-${element.id}`}>
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              
              {/* Outer ring */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.3" />
              
              {/* Petals */}
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i * 360) / 14;
                const rad = (angle * Math.PI) / 180;
                const x1 = 50 + Math.cos(rad) * 18;
                const y1 = 50 + Math.sin(rad) * 18;
                const x2 = 50 + Math.cos(rad) * 32;
                const y2 = 50 + Math.sin(rad) * 32;
                return (
                  <ellipse
                    key={`petal-${i}`}
                    cx={(x1 + x2) / 2}
                    cy={(y1 + y2) / 2}
                    rx="6"
                    ry="12"
                    fill={`url(#gradient-anemone-${element.id})`}
                    opacity="0.4"
                    transform={`rotate(${angle} ${(x1 + x2) / 2} ${(y1 + y2) / 2})`}
                  />
                );
              })}
              
              {/* Center detail */}
              {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i * 360) / 20;
                const rad = (angle * Math.PI) / 180;
                const x1 = 50 + Math.cos(rad) * 8;
                const y1 = 50 + Math.sin(rad) * 8;
                const x2 = 50 + Math.cos(rad) * 15;
                const y2 = 50 + Math.sin(rad) * 15;
                return (
                  <line
                    key={`stamen-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                );
              })}
              <circle cx="50" cy="50" r="6" fill="#1e40af" opacity="0.5" />
            </svg>
          ) : (
            // Small bud/rose
            <svg
              viewBox="0 0 60 60"
              className="w-full h-full"
              style={{ filter: 'blur(0.5px)' }}
            >
              <defs>
                <radialGradient id={`gradient-bud-${element.id}`}>
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              
              <circle cx="30" cy="30" r="20" fill={`url(#gradient-bud-${element.id})`} opacity="0.4" />
              <circle cx="30" cy="30" r="15" fill={`url(#gradient-bud-${element.id})`} opacity="0.5" />
              <circle cx="30" cy="30" r="10" fill={`url(#gradient-bud-${element.id})`} opacity="0.6" />
              <circle cx="30" cy="30" r="5" fill="#1e40af" opacity="0.7" />
              
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 360) / 6;
                const rad = (angle * Math.PI) / 180;
                const x = 30 + Math.cos(rad) * 12;
                const y = 30 + Math.sin(rad) * 12;
                return (
                  <ellipse
                    key={i}
                    cx={x}
                    cy={y}
                    rx="4"
                    ry="8"
                    fill="#60a5fa"
                    opacity="0.3"
                    transform={`rotate(${angle} ${x} ${y})`}
                  />
                );
              })}
            </svg>
          )}
        </motion.div>
      ))}
      
      {/* Additional floating leaves and stems */}
      {Array.from({ length: 25 }).map((_, i) => {
        const seed = i * 0.618033988749895;
        const left = (seed * 100) % 100;
        const top = ((seed * 1.618) * 100) % 100;
        const width = ((seed * 40) % 40) + 20;
        const height = (((seed * 1.5) * 60) % 60) + 30;
        const duration = ((seed * 18) % 18) + 12;
        const delay = ((seed * 8) % 8);
        
        return (
          <motion.div
            key={`leaf-${i}`}
            className="absolute opacity-[0.02] md:opacity-[0.03]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}px`,
              height: `${height}px`,
            }}
            animate={{
              y: [0, -25, -10, -25, 0],
              x: [0, Math.sin(i * 0.5) * 20, Math.cos(i * 0.3) * 15, Math.sin(i * 0.5) * 20, 0],
              rotate: [0, 15, -10, 15, 0],
              scale: [1, 1.1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          >
          <svg viewBox="0 0 40 60" className="w-full h-full">
            <ellipse cx="20" cy="30" rx="12" ry="25" fill="#1e3a8a" opacity="0.3" />
            <ellipse cx="20" cy="30" rx="8" ry="18" fill="#3b82f6" opacity="0.2" />
            <line x1="20" y1="0" x2="20" y2="15" stroke="#1e40af" strokeWidth="2" opacity="0.2" />
          </svg>
        </motion.div>
        );
      })}
    </div>
  );
}

