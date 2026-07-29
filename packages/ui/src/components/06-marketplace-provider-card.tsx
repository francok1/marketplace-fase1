/**
 * ProviderCard Component
 * Card de proveedor para mostrar en búsqueda y listados
 *
 * Uso:
 * <ProviderCard provider={provider} />
 * <ProviderCard provider={provider} featured={true} />
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Star } from 'lucide-react';
import { Card, CardContent } from './03-ui-card';
import { Badge } from './04-ui-badge';
import { Rating } from './05-ui-rating';
import { Button } from './01-ui-button';
import { cn } from '../lib/utils/cn';

interface Provider {
  id: string;
  slug: string;
  businessName: string;
  logo?: string;
  coverImage?: string;
  city: string;
  commune?: string;
  averageRating: number;
  totalReviews: number;
  isVerified: boolean;
  isPremium: boolean;
}

interface ProviderCardProps {
  provider: Provider;
  featured?: boolean;
  onFavoriteClick?: (id: string) => void;
  isFavorite?: boolean;
}

export function ProviderCard({
  provider,
  featured = false,
  onFavoriteClick,
  isFavorite = false,
}: ProviderCardProps) {
  return (
    <Link href={`/proveedor/${provider.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
        {/* Cover Image */}
        <div className="relative h-40 bg-gray-200 dark:bg-gray-800 overflow-hidden">
          {provider.coverImage ? (
            <Image
              src={provider.coverImage}
              alt={provider.businessName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800" />
          )}

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {provider.isPremium && (
              <Badge variant="premium" size="sm">
                ✨ Premium
              </Badge>
            )}
            {provider.isVerified && (
              <Badge variant="verified" size="sm">
                ✓ Verificado
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavoriteClick?.(provider.id);
            }}
            className={cn(
              'absolute bottom-3 left-3 p-2 rounded-full transition-all',
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 hover:bg-white'
            )}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <CardContent className="pt-4">
          {/* Logo y Nombre */}
          <div className="flex gap-3 mb-3">
            {provider.logo && (
              <Image
                src={provider.logo}
                alt={provider.businessName}
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {provider.businessName}
              </h3>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                <MapPin size={14} />
                <span className="truncate">
                  {provider.city}
                  {provider.commune && `, ${provider.commune}`}
                </span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <Rating value={provider.averageRating} readOnly size="sm" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {provider.totalReviews} opiniones
            </span>
          </div>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="sm"
            fullWidth
            className="mt-2"
            onClick={(e) => e.preventDefault()}
          >
            Ver perfil
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

export type { Provider as ProviderCardProvider, ProviderCardProps };
