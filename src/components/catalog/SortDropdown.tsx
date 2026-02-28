'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortOption =
  | 'relevancia'
  | 'menor-preco'
  | 'maior-preco'
  | 'mais-vendidos'
  | 'mais-recentes'
  | 'melhor-avaliados';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'mais-vendidos', label: 'Mais vendidos' },
  { value: 'mais-recentes', label: 'Mais recentes' },
  { value: 'melhor-avaliados', label: 'Melhor avaliados' },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = SORT_OPTIONS.find((o) => o.value === value)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm',
          'bg-white hover:border-accent-primary transition-colors',
          open && 'border-accent-primary'
        )}
      >
        <span className="text-text-tertiary">Ordenar por:</span>
        <span className="font-medium text-text-primary">{selected.label}</span>
        <ChevronDown
          size={16}
          className={cn('text-text-tertiary transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-52 bg-white border border-border rounded-md shadow-lg z-30 py-1">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                'w-full text-left px-3 py-2 text-sm hover:bg-bg-secondary transition-colors',
                option.value === value
                  ? 'text-accent-primary font-medium bg-accent-primary/5'
                  : 'text-text-primary'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
