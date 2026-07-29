/**
 * Rating Distribution Component
 * Muestra la distribución de ratings de un proveedor
 *
 * Uso:
 * <RatingDistribution
 *   average={4.5}
 *   total={127}
 *   distribution={{ 5: 85, 4: 32, 3: 8, 2: 2, 1: 0 }}
 * />
 */

'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Rating } from '@/components/ui/05-ui-rating';
import { Card, CardContent } from '@/components/ui/03-ui-card';

interface RatingDistributionProps {
  average: number;
  total: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export function RatingDistribution({
  average,
  total,
  distribution,
}: RatingDistributionProps) {
  const percentages = {
    5: total > 0 ? (distribution[5] / total) * 100 : 0,
    4: total > 0 ? (distribution[4] / total) * 100 : 0,
    3: total > 0 ? (distribution[3] / total) * 100 : 0,
    2: total > 0 ? (distribution[2] / total) * 100 : 0,
    1: total > 0 ? (distribution[1] / total) * 100 : 0,
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-amber-200 dark:border-amber-800/50">
      <CardContent className="pt-6 pb-6">
        {/* Summary */}
        <div className="text-center mb-6 pb-6 border-b border-amber-200 dark:border-amber-800">
          <div className="text-5xl font-bold text-amber-900 dark:text-amber-100 mb-2">
            {average.toFixed(1)}
          </div>
          <Rating value={average} readOnly size="md" />
          <p className="text-sm text-amber-800 dark:text-amber-200 mt-3">
            Basado en <strong>{total}</strong> {total === 1 ? 'opinión' : 'opiniones'}
          </p>
        </div>

        {/* Distribution */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              {/* Rating Label */}
              <div className="w-12 text-sm font-medium text-amber-900 dark:text-amber-100">
                {rating}
                <Star size={14} className="inline ml-1" />
              </div>

              {/* Progress Bar */}
              <div className="flex-1 h-2 bg-amber-200 dark:bg-amber-800/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-400 transition-all duration-300"
                  style={{ width: `${percentages[rating as keyof typeof percentages]}%` }}
                />
              </div>

              {/* Count */}
              <div className="text-right w-12">
                <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  {distribution[rating as keyof typeof distribution]}
                </span>
              </div>

              {/* Percentage */}
              <div className="text-right w-12">
                <span className="text-xs text-amber-700 dark:text-amber-300">
                  {percentages[rating as keyof typeof percentages].toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {total === 0 && (
          <div className="text-center py-8 text-amber-700 dark:text-amber-300">
            <p className="text-sm">No hay opiniones aún</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { RatingDistributionProps };
