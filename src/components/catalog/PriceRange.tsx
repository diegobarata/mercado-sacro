'use client';

import { cn } from '@/lib/utils';

interface PriceRangeProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export default function PriceRange({
  min,
  max,
  currentMin,
  currentMax,
  onMinChange,
  onMaxChange,
}: PriceRangeProps) {
  const minPercent = ((currentMin - min) / (max - min)) * 100;
  const maxPercent = ((currentMax - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      {/* Labels */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xs text-text-tertiary">R$</span>
          <input
            type="number"
            value={currentMin}
            onChange={(e) => {
              const val = Math.max(min, Math.min(Number(e.target.value), currentMax - 1));
              onMinChange(val);
            }}
            className="w-20 text-sm border border-border rounded-md px-2 py-1 text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
            min={min}
            max={currentMax - 1}
          />
        </div>
        <span className="text-text-tertiary text-xs">até</span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-text-tertiary">R$</span>
          <input
            type="number"
            value={currentMax}
            onChange={(e) => {
              const val = Math.min(max, Math.max(Number(e.target.value), currentMin + 1));
              onMaxChange(val);
            }}
            className="w-20 text-sm border border-border rounded-md px-2 py-1 text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
            min={currentMin + 1}
            max={max}
          />
        </div>
      </div>

      {/* Dual range slider */}
      <div className="relative h-6 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1.5 bg-bg-tertiary rounded-full" />
        {/* Active track */}
        <div
          className="absolute h-1.5 bg-accent-primary rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={currentMin}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), currentMax - 1);
            onMinChange(val);
          }}
          className={cn(
            'absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2',
            '[&::-webkit-slider-thumb]:border-accent-primary [&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md',
            '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-primary',
            '[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto',
          )}
          style={{ zIndex: currentMin > max - 10 ? 5 : 3 }}
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={currentMax}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), currentMin + 1);
            onMaxChange(val);
          }}
          className={cn(
            'absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2',
            '[&::-webkit-slider-thumb]:border-accent-primary [&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md',
            '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-primary',
            '[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto',
          )}
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  );
}
