/**
 * Rating Component
 * Sistema de 5 estrellas para calificaciones
 *
 * Uso:
 * <Rating value={4} readOnly />
 * <Rating value={3} onChange={setRating} interactive />
 * <Rating value={4.5} decimals count={5} />
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils/cn';

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  onChange?: (value: number) => void;
  interactive?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  decimals?: boolean;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value = 0,
      onChange,
      interactive = false,
      readOnly = true,
      size = 'md',
      count = 5,
      decimals = false,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const displayValue = hoverValue !== null ? hoverValue : value;

    const handleClick = (index: number) => {
      if (interactive && !readOnly && onChange) {
        onChange(index + 1);
      }
    };

    const handleMouseEnter = (index: number) => {
      if (interactive && !readOnly) {
        setHoverValue(index + 1);
      }
    };

    const handleMouseLeave = () => {
      if (interactive && !readOnly) {
        setHoverValue(null);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, index) => {
          const filled = index < Math.floor(displayValue);
          const partial =
            decimals &&
            index === Math.floor(displayValue) &&
            displayValue % 1 !== 0;

          return (
            <div
              key={index}
              className={cn(
                'relative',
                interactive && !readOnly && 'cursor-pointer'
              )}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background star */}
              <Star
                className={cn(
                  sizeMap[size],
                  'text-gray-300 dark:text-gray-600'
                )}
              />

              {/* Filled star */}
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{
                  width: partial ? '50%' : filled ? '100%' : '0%',
                }}
              >
                <Star
                  className={cn(
                    sizeMap[size],
                    'text-amber-400 dark:text-amber-500 fill-current'
                  )}
                />
              </div>
            </div>
          );
        })}

        {/* Display text */}
        {displayValue > 0 && (
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {displayValue.toFixed(decimals && displayValue % 1 !== 0 ? 1 : 0)}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export { Rating, type RatingProps };
