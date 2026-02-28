'use client';

import { useState } from 'react';
import { ChevronDown, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import PriceRange from './PriceRange';

export interface FilterState {
  priceMin: number;
  priceMax: number;
  materials: string[];
  ratings: number;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableMaterials: string[];
  priceRange: { min: number; max: number };
  resultCount: number;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-text-primary"
      >
        {title}
        <ChevronDown
          size={16}
          className={cn('text-text-tertiary transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && <div className="pt-1">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  availableMaterials,
  priceRange,
  resultCount,
}: FilterSidebarProps) {
  const activeFilterCount =
    (filters.priceMin > priceRange.min || filters.priceMax < priceRange.max ? 1 : 0) +
    filters.materials.length +
    (filters.ratings > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const clearAll = () => {
    onFiltersChange({
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      materials: [],
      ratings: 0,
      inStockOnly: false,
    });
  };

  return (
    <aside className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h2 className="text-base font-semibold text-text-primary">Filtros</h2>
          <p className="text-xs text-text-tertiary mt-0.5">
            {resultCount} produto{resultCount !== 1 ? 's' : ''} encontrado{resultCount !== 1 ? 's' : ''}
          </p>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-accent-primary hover:underline flex items-center gap-1"
          >
            <X size={12} />
            Limpar ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Faixa de Preço">
        <PriceRange
          min={priceRange.min}
          max={priceRange.max}
          currentMin={filters.priceMin}
          currentMax={filters.priceMax}
          onMinChange={(v) => onFiltersChange({ ...filters, priceMin: v })}
          onMaxChange={(v) => onFiltersChange({ ...filters, priceMax: v })}
        />
      </FilterSection>

      {/* Material */}
      {availableMaterials.length > 0 && (
        <FilterSection title="Material">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableMaterials.map((material) => (
              <label key={material} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material)}
                  onChange={() => {
                    const mats = filters.materials.includes(material)
                      ? filters.materials.filter((m) => m !== material)
                      : [...filters.materials, material];
                    onFiltersChange({ ...filters, materials: mats });
                  }}
                  className="w-4 h-4 rounded border-border text-accent-primary focus:ring-accent-primary"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  {material}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Rating */}
      <FilterSection title="Avaliação Mínima">
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                onFiltersChange({ ...filters, ratings: filters.ratings === rating ? 0 : rating })
              }
              className={cn(
                'flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-colors',
                filters.ratings === rating
                  ? 'bg-accent-primary/10 text-accent-primary'
                  : 'text-text-secondary hover:bg-bg-secondary'
              )}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < rating ? 'fill-warning text-warning' : 'text-bg-tertiary'}
                  />
                ))}
              </div>
              <span>& acima</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Disponibilidade">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => onFiltersChange({ ...filters, inStockOnly: !filters.inStockOnly })}
            className="w-4 h-4 rounded border-border text-accent-primary focus:ring-accent-primary"
          />
          <span className="text-sm text-text-secondary">Apenas em estoque</span>
        </label>
      </FilterSection>
    </aside>
  );
}
