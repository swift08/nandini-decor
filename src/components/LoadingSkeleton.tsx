'use client';

export default function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white via-pink-50/30 to-blue-50/30 backdrop-blur-sm flex items-center justify-center">
      {/* Premium Loading Animation */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-20 h-20 border-4 border-pink-200/30 border-t-pink-400 rounded-full animate-spin-slow"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full animate-pulse-scale"></div>
        </div>
        
        {/* Floating petals */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-pink-300/60 rounded-full animate-float-delay-1"></div>
        <div className="absolute -top-1 -right-3 w-3 h-3 bg-blue-300/60 rounded-full animate-float-delay-2"></div>
        <div className="absolute -bottom-2 -left-1 w-3.5 h-3.5 bg-pink-200/60 rounded-full animate-float-delay-3"></div>
        <div className="absolute -bottom-1 -right-2 w-4 h-4 bg-blue-200/60 rounded-full animate-float-delay-4"></div>
      </div>
      
      {/* Loading text */}
      <div className="absolute bottom-32">
        <p className="text-lg font-elegant text-gray-600 animate-pulse">Loading elegance...</p>
      </div>
    </div>
  );
}

