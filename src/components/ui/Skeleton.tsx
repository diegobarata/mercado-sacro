import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export default function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gold-light',
        {
          'h-4 rounded': variant === 'text',
          'rounded-lg': variant === 'rectangular',
          'rounded-full': variant === 'circular',
        },
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-border p-3 space-y-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="text" className="w-1/3 h-6" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
