import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'novo' | 'promoção' | 'mais vendido' | 'frete grátis' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide',
        {
          'bg-gold-light text-text-secondary': variant === 'default',
          'bg-sacred-green text-white': variant === 'novo' || variant === 'frete grátis' || variant === 'success',
          'bg-burgundy text-white': variant === 'promoção',
          'bg-gold text-white': variant === 'mais vendido',
          'bg-warning text-white': variant === 'warning',
          'bg-error text-white': variant === 'error',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
