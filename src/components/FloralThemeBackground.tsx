'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import floralThemeImage from '@/assets/floral theme .jpg';

export default function FloralThemeBackground() {

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Floral Theme Image with Animations */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src={floralThemeImage}
          alt="Floral Theme Background"
          fill
          className="object-cover"
          priority
          quality={95}
          style={{
            filter: 'brightness(0.85) contrast(1.1) saturate(1.3)',
            mixBlendMode: 'normal',
          }}
          unoptimized
        />
      </motion.div>

      {/* Animated Overlay Effects - Floral Theme Colors */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(250, 209, 231, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(188, 225, 241, 0.25) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(158, 210, 201, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(250, 209, 231, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          mixBlendMode: 'soft-light',
        }}
      />
      
      {/* Subtle Floral Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(250, 209, 231, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Floral Petals/Particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            background: i % 3 === 0 
              ? 'radial-gradient(circle, rgba(250, 209, 231, 0.9), rgba(250, 209, 231, 0.3))'
              : i % 3 === 1
              ? 'radial-gradient(circle, rgba(188, 225, 241, 0.9), rgba(188, 225, 241, 0.3))'
              : 'radial-gradient(circle, rgba(158, 210, 201, 0.9), rgba(158, 210, 201, 0.3))',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1.5px)',
            opacity: 0.7,
          }}
          animate={{
            y: [0, -40, -80, -40, 0],
            x: [0, Math.sin(i) * 25, Math.cos(i) * 20, Math.sin(i) * 25, 0],
            opacity: [0.7, 0.9, 0.5, 0.9, 0.7],
            scale: [1, 1.3, 0.9, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Subtle Floral Shimmer Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(250, 209, 231, 0.15) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floral Depth Fog Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(250, 209, 231, 0.15) 60%, rgba(188, 225, 241, 0.25) 100%)',
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Soft Vignette for Focus */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 61, 86, 0.05) 100%)',
        }}
      />
    </div>
  );
}

