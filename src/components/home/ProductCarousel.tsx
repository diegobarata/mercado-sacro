'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import type { Product } from '@/types';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  viewAllLabel?: string;
}

export default function ProductCarousel({
  title,
  products,
  viewAllLink,
  viewAllLabel = 'Ver todos →',
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="text-sm text-accent-primary hover:text-accent-primary-hover font-medium transition-colors hidden md:block"
              >
                {viewAllLabel}
              </Link>
            )}
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full border border-border hover:bg-bg-secondary transition-colors"
              aria-label="Scroll esquerda"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full border border-border hover:bg-bg-secondary transition-colors"
              aria-label="Scroll direita"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Products carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[200px] w-[200px] md:min-w-[240px] md:w-[240px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        {viewAllLink && (
          <div className="mt-4 text-center md:hidden">
            <Link
              href={viewAllLink}
              className="text-sm text-accent-primary hover:text-accent-primary-hover font-medium"
            >
              {viewAllLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
