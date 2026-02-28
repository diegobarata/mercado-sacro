'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterSidebar, { type FilterState } from './FilterSidebar';

interface MobileFilterSheetProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableMaterials: string[];
  priceRange: { min: number; max: number };
  resultCount: number;
}

export default function MobileFilterSheet({
  filters,
  onFiltersChange,
  availableMaterials,
  priceRange,
  resultCount,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  const activeFilterCount =
    (filters.priceMin > priceRange.min || filters.priceMax < priceRange.max ? 1 : 0) +
    filters.materials.length +
    (filters.ratings > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm bg-white hover:border-accent-primary transition-colors lg:hidden"
      >
        <Filter size={16} />
        <span>Filtros</span>
        {activeFilterCount > 0 && (
          <span className="bg-accent-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Bottom sheet overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[85vh] overflow-y-auto lg:hidden"
            >
              {/* Handle */}
              <div className="flex justify-center py-2">
                <div className="w-10 h-1 bg-bg-tertiary rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
                <h2 className="text-lg font-semibold text-text-primary">Filtros</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-bg-secondary rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filter content */}
              <div className="p-4">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                  availableMaterials={availableMaterials}
                  priceRange={priceRange}
                  resultCount={resultCount}
                />
              </div>

              {/* Apply button */}
              <div className="sticky bottom-0 p-4 bg-white border-t border-border">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full bg-accent-primary text-white py-3 rounded-md text-sm font-medium hover:bg-accent-primary-hover transition-colors"
                >
                  Ver {resultCount} resultado{resultCount !== 1 ? 's' : ''}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
