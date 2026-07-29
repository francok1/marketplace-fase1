/**
 * Card Component
 * Contenedor flexible para agrupar contenido
 *
 * Uso:
 * <Card>
 *   <Card.Header>
 *     <h2>Título</h2>
 *   </Card.Header>
 *   <Card.Content>Contenido</Card.Content>
 *   <Card.Footer>Acciones</Card.Footer>
 * </Card>
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  variant?: 'default' | 'glass';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default:
        'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
      glass:
        'bg-white/80 dark:bg-gray-900/80 backdrop-blur border border-white/20 dark:border-gray-800/20',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg shadow-sm',
          variantStyles[variant],
          hoverable && 'transition-shadow duration-200 hover:shadow-md',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-800', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  type CardProps,
};
