'use client';

import Link from 'next/link';
import {
  Cross, BookOpen, Flame, Award, Gift, Frame, Shirt,
} from 'lucide-react';
import { categories } from '@/data/categories';
import type { LucideIcon } from 'lucide-react';

// Map category slugs to icons
const iconMap: Record<string, LucideIcon> = {
  tercos: Award,
  crucifixos: Cross,
  biblias: BookOpen,
  'imagens-sacras': Award,
  'velas-incenso': Flame,
  medalhas: Award,
  escapularios: Shirt,
  paramentos: Shirt,
  presentes: Gift,
  'decoracao-sacra': Frame,
};

export default function CategoryIcons() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-2 md:justify-center">
          {categories.map((cat) => {
            const Icon = iconMap[cat.slug] || Gift;
            return (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="flex flex-col items-center gap-2 min-w-[72px] group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-bg-secondary/70 flex items-center justify-center
                  group-hover:bg-gold group-hover:text-white transition-all duration-300 text-gold">
                  <Icon size={28} />
                </div>
                <span className="text-xs md:text-sm text-text-secondary text-center font-medium whitespace-nowrap group-hover:text-gold transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
