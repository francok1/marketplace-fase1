/**
 * Search Page
 * Página de resultados de búsqueda
 *
 * Ubicación: app/(marketplace)/buscar/page.tsx
 */

'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/common/08-common-navbar';
import { FiltersSidebar } from './02-filters-sidebar';
import { SearchResultsGrid } from './03-search-results-grid';
import { Button } from '@/components/ui/01-ui-button';
import { Menu, X } from 'lucide-react';
import type { SearchFilters, ProviderResult } from './01-search-server-actions';
import { searchProviders } from './01-search-server-actions';

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    city?: string;
    minRating?: string;
    isVerified?: string;
    isPremium?: string;
    sortBy?: string;
    page?: string;
  };
  categories?: any[];
  cities?: any[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [results, setResults] = useState<ProviderResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Get initial results
  React.useEffect(() => {
    const filters: SearchFilters = {
      query: searchParams.get('q') || '',
      category: searchParams.get('category') || '',
      city: searchParams.get('city') || '',
      minRating: searchParams.get('minRating')
        ? parseInt(searchParams.get('minRating')!)
        : 0,
      isVerified: searchParams.get('isVerified') === 'true',
      isPremium: searchParams.get('isPremium') === 'true',
      sortBy: (searchParams.get('sortBy') as any) || 'rating',
      page: 1,
      limit: 20,
    };

    loadResults(filters);
  }, [searchParams]);

  const loadResults = async (filters: SearchFilters) => {
    setIsLoading(true);
    try {
      const data = await searchProviders(filters);
      setResults(data.providers);
      setTotalResults(data.total);
      setCurrentPage(data.page);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async (page: number) => {
    const filters: SearchFilters = {
      query: searchParams.get('q') || '',
      category: searchParams.get('category') || '',
      city: searchParams.get('city') || '',
      minRating: searchParams.get('minRating')
        ? parseInt(searchParams.get('minRating')!)
        : 0,
      isVerified: searchParams.get('isVerified') === 'true',
      isPremium: searchParams.get('isPremium') === 'true',
      sortBy: (searchParams.get('sortBy') as any) || 'rating',
      page,
      limit: 20,
    };

    const data = await searchProviders(filters);
    return data.providers;
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden sticky top-16 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalResults} resultados
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            {isMobileFiltersOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div
              className={`md:col-span-1 ${
                isMobileFiltersOpen ? 'block' : 'hidden md:block'
              }`}
            >
              <FiltersSidebar
                categories={[
                  { id: '1', name: 'Fotógrafos', slug: 'fotografos' },
                  { id: '2', name: 'DJ', slug: 'dj' },
                  { id: '3', name: 'Decoración', slug: 'decoracion' },
                  { id: '4', name: 'Banquetería', slug: 'banqueteria' },
                  { id: '5', name: 'Floristas', slug: 'floristas' },
                  { id: '6', name: 'Pastelería', slug: 'pasteleria' },
                ]}
                cities={[
                  { id: '1', name: 'Santiago', slug: 'santiago' },
                  { id: '2', name: 'Valparaíso', slug: 'valparaiso' },
                  { id: '3', name: 'Concepción', slug: 'concepcion' },
                  { id: '4', name: 'Valdivia', slug: 'valdivia' },
                ]}
                isLoading={isLoading}
              />
            </div>

            {/* Results */}
            <div className="md:col-span-3">
              <SearchResultsGrid
                initialResults={results}
                total={totalResults}
                page={currentPage}
                pages={totalPages}
                onLoadMore={loadMore}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export type { SearchPageProps };
