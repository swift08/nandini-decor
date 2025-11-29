export default function AnimatedParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => {
        // Use stable seed-based values to avoid hydration mismatch
        const seed = i * 0.618033988749895; // Golden ratio for distribution
        const size = ((seed * 6) % 6) + 2;
        const left = (seed * 100) % 100;
        const duration = ((seed * 10) % 10) + 15;
        const delay = ((seed * 5) % 5);
        
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              bottom: '-10px',
              animation: `particle-float ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
