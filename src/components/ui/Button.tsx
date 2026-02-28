'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'sale';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // Variants
            'bg-gold text-white hover:bg-gold-hover focus:ring-gold':
              variant === 'primary',
            'bg-bg-secondary text-text-primary hover:bg-gold-light focus:ring-gold':
              variant === 'secondary',
            'border-2 border-gold text-gold hover:bg-gold hover:text-white focus:ring-gold':
              variant === 'outline',
            'text-text-secondary hover:text-text-primary hover:bg-bg-secondary focus:ring-gold':
              variant === 'ghost',
            'bg-burgundy text-white hover:bg-burgundy/90 focus:ring-burgundy':
              variant === 'sale',
            // Sizes
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-5 py-2.5 text-base': size === 'md',
            'px-8 py-3.5 text-lg': size === 'lg',
            // Full width
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
