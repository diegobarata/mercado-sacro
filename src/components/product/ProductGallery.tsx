'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  const goTo = (index: number) => {
    setSelectedIndex(((index % images.length) + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative aspect-square bg-bg-secondary rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={currentImage}
            alt={`${productName} - Imagem ${selectedIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://placehold.co/600x600/F0EBE1/4A4A4A?text=${encodeURIComponent(productName)}`;
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
            <span className="bg-white/90 backdrop-blur-sm rounded-full p-2">
              <ZoomIn size={20} className="text-text-secondary" />
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  'relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-md overflow-hidden border-2 transition-colors',
                  idx === selectedIndex
                    ? 'border-gold'
                    : 'border-transparent hover:border-border'
                )}
              >
                <Image
                  src={img}
                  alt={`${productName} - Miniatura ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/100x100/F0EBE1/4A4A4A?text=${idx + 1}`;
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => {
              setLightboxOpen(false);
              setZoomed(false);
            }}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2"
              onClick={() => {
                setLightboxOpen(false);
                setZoomed(false);
              }}
            >
              <X size={28} />
            </button>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 text-white/70 hover:text-white p-2 z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(selectedIndex - 1);
                  }}
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="absolute right-4 text-white/70 hover:text-white p-2 z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(selectedIndex + 1);
                  }}
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Lightbox image */}
            <div
              className={cn(
                'relative w-[90vw] h-[90vh] transition-transform duration-300',
                zoomed && 'scale-150 cursor-zoom-out'
              )}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(!zoomed);
              }}
            >
              <Image
                src={currentImage}
                alt={`${productName} - Imagem ${selectedIndex + 1}`}
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://placehold.co/800x800/F0EBE1/4A4A4A?text=${encodeURIComponent(productName)}`;
                }}
              />
            </div>

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-6 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(idx);
                    }}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-colors',
                      idx === selectedIndex ? 'bg-white' : 'bg-white/40'
                    )}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
