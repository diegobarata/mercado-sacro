'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({
  products,
  title = 'Produtos Relacionados',
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-heading font-bold text-text-primary">
          {title}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 border border-border rounded-md hover:bg-bg-secondary transition-colors text-text-secondary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 border border-border rounded-md hover:bg-bg-secondary transition-colors text-text-secondary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-[180px] sm:w-[200px] md:w-[220px] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
