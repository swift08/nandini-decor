'use client';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gold transition-colors p-2"
        aria-label="Close"
      >
        <X size={32} />
      </button>
      
      <button
        onClick={onPrev}
        className="absolute left-4 text-white hover:text-gold transition-colors p-2"
        aria-label="Previous"
      >
        <ChevronLeft size={48} />
      </button>
      
      <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
        <Image
          src={encodeURI(images[currentIndex])}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          className="object-contain"
          unoptimized
          onError={(e) => {
            if (process.env.NODE_ENV === 'development') {
              console.error('Lightbox image failed to load:', images[currentIndex]);
            }
          }}
        />
      </div>
      
      <button
        onClick={onNext}
        className="absolute right-4 text-white hover:text-gold transition-colors p-2"
        aria-label="Next"
      >
        <ChevronRight size={48} />
      </button>
      
      <div className="absolute bottom-4 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
