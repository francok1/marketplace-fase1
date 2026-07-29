/**
 * Search Results Grid Component
 * Grid de resultados con paginación e infinite scroll
 *
 * Uso:
 * <SearchResultsGrid results={results} onLoadMore={handleLoadMore} />
 */

'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ProviderCard } from '@/components/marketplace/06-marketplace-provider-card';
import { Button } from '@/components/ui/01-ui-button';
import { Loader } from 'lucide-react';
import type { ProviderResult } from './01-search-server-actions';

interface SearchResultsGridProps {
  initialResults: ProviderResult[];
  total: number;
  page: number;
  pages: number;
  onLoadMore?: (page: number) => Promise<ProviderResult[]>;
  isLoading?: boolean;
}

export function SearchResultsGrid({
  initialResults,
  total,
  page,
  pages,
  onLoadMore,
  isLoading = false,
}: SearchResultsGridProps) {
  const [providers, setProviders] = useState<ProviderResult[]>(initialResults);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const observerTarget = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          currentPage < pages &&
          !isLoadingMore &&
          onLoadMore
        ) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [currentPage, pages, isLoadingMore, onLoadMore]);

  const handleLoadMore = useCallback(async () => {
    if (!onLoadMore || currentPage >= pages) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const newProviders = await onLoadMore(nextPage);
      setProviders((prev) => [...prev, ...newProviders]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more providers:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, pages, onLoadMore]);

  const handleFavoriteClick = (id: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });

    // TODO: Llamar a API para guardar favorito
  };

  // Empty state
  if (providers.length === 0 && !isLoading) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No se encontraron proveedores
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Intenta con diferentes filtros o palabras clave
          </p>
          <Button variant="primary">Limpiar filtros</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results info */}
      {providers.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando <strong>{providers.length}</strong> de <strong>{total}</strong> proveedores
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Results grid */}
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onFavoriteClick={handleFavoriteClick}
                isFavorite={favorites.has(provider.id)}
              />
            ))}
          </div>

          {/* Infinite scroll trigger */}
          <div ref={observerTarget} className="pt-6 flex justify-center">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Loader size={20} className="animate-spin" />
                Cargando más...
              </div>
            )}
          </div>

          {/* Load more button (fallback) */}
          {!isLoadingMore && currentPage < pages && (
            <div className="flex justify-center pt-6">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                Cargar más
              </Button>
            </div>
          )}

          {/* End message */}
          {currentPage >= pages && providers.length > 0 && (
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 py-6">
              No hay más proveedores
            </div>
          )}
        </>
      )}
    </div>
  );
}

export type { SearchResultsGridProps };
