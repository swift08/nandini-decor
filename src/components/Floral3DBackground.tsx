'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Floral3DBackgroundProps {
  images: string[];
  intensity?: 'light' | 'medium' | 'strong';
  className?: string;
}

export default function Floral3DBackground({ 
  images, 
  intensity = 'medium',
  className = ''
}: Floral3DBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const opacityMap = {
    light: { primary: 0.35, secondary: 0.2, overlay: 0.75 },
    medium: { primary: 0.4, secondary: 0.25, overlay: 0.8 },
    strong: { primary: 0.5, secondary: 0.3, overlay: 0.7 },
  };

  const opacity = opacityMap[intensity];
  // Use index-based selection instead of random to avoid hydration mismatch
  const primaryImage = images[0] || '';
  const secondaryImage = images.length > 1 ? images[1] : (images[0] || '');
  const tertiaryImage = images.length > 2 ? images[2] : (images[0] || '');

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary Floral Background Layer */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          filter: 'blur(1px)',
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      >
        <Image
          src={primaryImage}
          alt="Floral background"
          fill
          className="object-cover"
          quality={85}
          unoptimized
          priority={false}
          style={{ opacity: opacity.primary }}
        />
      </motion.div>

      {/* Secondary Floral Layer with Parallax */}
      {secondaryImage && (
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1.1, 1.15, 1.1],
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, -1, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{
            filter: 'blur(2px)',
            mixBlendMode: 'overlay',
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
          }}
        >
          <Image
            src={secondaryImage}
            alt="Floral overlay"
            fill
            className="object-cover"
            quality={70}
            unoptimized
            priority={false}
            style={{ opacity: opacity.secondary }}
          />
        </motion.div>
      )}

      {/* Tertiary Layer for Depth */}
      {tertiaryImage && (
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1.05, 1.12, 1.05],
            x: [0, -25, 0],
            y: [0, 25, 0],
            rotate: [0, 0.5, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          style={{
            filter: 'blur(3px)',
            mixBlendMode: 'soft-light',
            transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
          }}
        >
          <Image
            src={tertiaryImage}
            alt="Floral depth"
            fill
            className="object-cover"
            quality={60}
            unoptimized
            priority={false}
            style={{ opacity: opacity.secondary * 0.7 }}
          />
        </motion.div>
      )}

      {/* 3D Shining Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${15 + (i % 4) * 20}px`,
            height: `${15 + (i % 4) * 20}px`,
            background: `radial-gradient(circle, rgba(255, 255, 255, ${0.4 - (i % 3) * 0.1}) 0%, rgba(250, 209, 231, ${0.3 - (i % 3) * 0.08}) 40%, transparent 70%)`,
            left: `${(i * 8.33) % 100}%`,
            top: `${(i * 7.5) % 100}%`,
            filter: 'blur(6px)',
            boxShadow: `0 0 ${20 + i * 5}px rgba(250, 209, 231, 0.5)`,
          }}
          animate={{
            y: [0, -40 + i * 5, 0],
            x: [0, 30 - i * 3, 0],
            scale: [1, 1.3 + (i % 2) * 0.2, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 10 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* 3D Shining Light Beams */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute"
          style={{
            width: '2px',
            height: '200%',
            background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${0.3 + i * 0.05}), transparent)`,
            left: `${15 + i * 15}%`,
            top: '-50%',
            transform: `rotate(${i * 15}deg)`,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${30 + i * 5}px rgba(188, 225, 241, 0.6)`,
          }}
          animate={{
            y: [0, 1500, 0],
            opacity: [0, 0.6, 0],
            scaleX: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Floating Floral Petals Effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute"
          style={{
            width: `${30 + (i % 3) * 15}px`,
            height: `${30 + (i % 3) * 15}px`,
            background: `radial-gradient(ellipse, rgba(250, 209, 231, ${0.4 - i * 0.03}) 0%, rgba(188, 225, 241, ${0.3 - i * 0.02}) 50%, transparent 100%)`,
            borderRadius: '50% 0 50% 50%',
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 10) % 100}%`,
            filter: 'blur(4px)',
            transform: `rotate(${i * 45}deg)`,
          }}
          animate={{
            y: [0, -60 + i * 8, 0],
            x: [0, 40 - i * 5, 0],
            rotate: [i * 45, i * 45 + 180, i * 45 + 360],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Gradient Overlay for Text Readability - Subtle */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom, 
            rgba(255, 255, 255, ${opacity.overlay}) 0%, 
            rgba(255, 255, 255, ${opacity.overlay * 0.85}) 30%,
            rgba(255, 255, 255, ${opacity.overlay * 0.9}) 50%,
            rgba(255, 255, 255, ${opacity.overlay * 0.85}) 70%,
            rgba(255, 255, 255, ${opacity.overlay}) 100%
          )`,
        }}
      />

      {/* Additional Shimmer Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          )`,
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

