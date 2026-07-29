/**
 * Badge Component
 * Etiqueta pequeña para categorías, estados, etc
 *
 * Uso:
 * <Badge>Nuevo</Badge>
 * <Badge variant="success">Verificado</Badge>
 * <Badge variant="premium">Premium</Badge>
 */

import React from 'react';
import { cn } from '../lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'premium' | 'verified';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
  success: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
  warning: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
  error: 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100',
  premium: 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 dark:from-amber-900 dark:to-amber-800 dark:text-amber-100',
  verified: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
};

const sizes = {
  sm: 'px-2 py-1 text-xs font-medium rounded',
  md: 'px-3 py-1.5 text-sm font-medium rounded-md',
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, type BadgeProps };
