/**
 * ReviewCard Component
 * Muestra una opinión/reseña de un cliente
 *
 * Uso:
 * <ReviewCard review={review} />
 * <ReviewCard review={review} showProviderResponse={true} />
 */

import React from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, MapPin } from 'lucide-react';
import { Card, CardContent } from './03-ui-card';
import { Badge } from './04-ui-badge';
import { Rating } from './05-ui-rating';
import { Button } from './01-ui-button';
import { cn } from '../lib/utils/cn';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  createdAt: Date;
  isVerifiedCustomer: boolean;
  helpful: number;
  notHelpful: number;
  author: {
    name: string;
    avatar?: string;
  };
  images?: string[];
  providerResponse?: {
    content: string;
    createdAt: Date;
  };
}

interface ReviewCardProps {
  review: Review;
  showProviderResponse?: boolean;
  onHelpful?: (id: string, helpful: boolean) => void;
}

export function ReviewCard({
  review,
  showProviderResponse = true,
  onHelpful,
}: ReviewCardProps) {
  const [userHelpful, setUserHelpful] = React.useState<boolean | null>(null);

  const handleHelpful = (helpful: boolean) => {
    setUserHelpful(helpful);
    onHelpful?.(review.id, helpful);
  };

  const timeAgo = formatDistanceToNow(new Date(review.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4">
        {/* Header - Author Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            {review.author.avatar && (
              <Image
                src={review.author.avatar}
                alt={review.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {review.author.name}
                </h4>
                {review.isVerifiedCustomer && (
                  <Badge variant="success" size="sm">
                    ✓ Cliente verificado
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {timeAgo}
              </p>
            </div>
          </div>
        </div>

        {/* Rating and Title */}
        <div className="mb-3">
          <Rating value={review.rating} readOnly size="sm" />
          {review.title && (
            <h5 className="font-semibold text-gray-900 dark:text-white mt-2">
              "{review.title}"
            </h5>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {review.content}
        </p>

        {/* Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {review.images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative w-20 h-20"
              >
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}

        {/* Helpful Actions */}
        <div className="flex items-center gap-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            ¿Fue útil?
          </span>
          <button
            onClick={() => handleHelpful(true)}
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors',
              userHelpful === true
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <ThumbsUp size={16} />
            <span>{review.helpful}</span>
          </button>
          <button
            onClick={() => handleHelpful(false)}
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors',
              userHelpful === false
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <ThumbsDown size={16} />
            <span>{review.notHelpful}</span>
          </button>
        </div>

        {/* Provider Response */}
        {showProviderResponse && review.providerResponse && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h6 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-2">
              Respuesta del proveedor
            </h6>
            <p className="text-sm text-blue-800 dark:text-blue-100 leading-relaxed">
              {review.providerResponse.content}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-200 mt-2">
              {formatDistanceToNow(new Date(review.providerResponse.createdAt), {
                addSuffix: true,
                locale: es,
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { Review as ReviewCardReview, ReviewCardProps };
