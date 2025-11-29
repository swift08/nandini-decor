'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
// Using public assets path for Vercel deployment
const floralThemeImage = '/assets/floral theme.jpeg';

export default function FloralThemeBackground() {

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Floral Theme Image with Enhanced Creative Effects */}
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
            filter: 'brightness(1.05) contrast(1.2) saturate(1.5)',
            mixBlendMode: 'normal',
            objectPosition: 'center right',
          }}
          unoptimized
        />
      </motion.div>

      {/* Creative Parallax Layers for Depth */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(250, 209, 231, 0.1) 50%, transparent 100%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Enhanced Animated Overlay Effects - Subtle to Showcase Flowers */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(250, 209, 231, 0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 70%, rgba(188, 225, 241, 0.18) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(158, 210, 201, 0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 80%, rgba(200, 181, 255, 0.12) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 30%, rgba(250, 209, 231, 0.15) 0%, transparent 60%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Creative Light Rays Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(250, 209, 231, 0.15) 60deg, transparent 120deg, rgba(188, 225, 241, 0.15) 180deg, transparent 240deg, rgba(158, 210, 201, 0.15) 300deg, transparent 360deg)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
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

      {/* Enhanced Floating Floral Petals/Particles - More Creative */}
      {Array.from({ length: 35 }).map((_, i) => {
        // Use stable seed-based values to avoid hydration mismatch
        const seed = i * 0.618033988749895; // Golden ratio for distribution
        const petalSize = ((seed * 15) % 15) + 8;
        const colors = [
          'radial-gradient(circle, rgba(250, 209, 231, 0.95), rgba(250, 209, 231, 0.2))',
          'radial-gradient(circle, rgba(188, 225, 241, 0.95), rgba(188, 225, 241, 0.2))',
          'radial-gradient(circle, rgba(158, 210, 201, 0.95), rgba(158, 210, 201, 0.2))',
          'radial-gradient(circle, rgba(200, 181, 255, 0.95), rgba(200, 181, 255, 0.2))',
        ];
        const left = (seed * 100) % 100;
        const top = ((seed * 1.618) * 100) % 100;
        const duration = 8 + ((seed * 6) % 6);
        const delay = ((seed * 4) % 4);
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute"
            style={{
              width: `${petalSize}px`,
              height: `${petalSize}px`,
              background: colors[i % colors.length],
              left: `${left}%`,
              top: `${top}%`,
              filter: 'blur(2px)',
              opacity: 0.8,
              borderRadius: i % 2 === 0 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%',
            }}
            animate={{
              y: [0, -60, -120, -60, 0],
              x: [0, Math.sin(i) * 40, Math.cos(i) * 30, Math.sin(i) * 40, 0],
              opacity: [0.6, 1, 0.4, 1, 0.6],
              scale: [1, 1.5, 0.8, 1.5, 1],
              rotate: [0, 180, 360, 540, 720],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        );
      })}

      {/* Enhanced Floral Shimmer Effect - More Creative */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 25%, rgba(250, 209, 231, 0.2) 40%, rgba(188, 225, 241, 0.2) 50%, rgba(250, 209, 231, 0.2) 60%, transparent 75%)',
          backgroundSize: '300% 300%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Creative Blooming Circles Effect */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`bloom-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
            background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '250, 209, 231' : '188, 225, 241'}, ${0.15 - i * 0.02}), transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Floral Depth Fog Effect - Subtle */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(250, 209, 231, 0.08) 60%, rgba(188, 225, 241, 0.12) 100%)',
        }}
        animate={{
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Minimal Vignette - Keep Flowers Prominent */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 61, 86, 0.02) 100%)',
        }}
      />
    </div>
  );
}

