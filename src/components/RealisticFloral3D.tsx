'use client';

import { motion } from 'framer-motion';

export default function RealisticFloral3D() {
  // Keep only the 3D animation structure without flower images
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-[2]"
      style={{
        perspective: '3000px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* 3D Animation Effects - No flower images, just effects */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(188, 225, 241, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(188, 225, 241, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(188, 225, 241, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(188, 225, 241, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          mixBlendMode: 'overlay',
        }}
      />

      {/* 3D Depth Lighting Effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147, 197, 253, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.02) 100%)
          `,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
