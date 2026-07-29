/**
 * Filters Sidebar Component
 * Panel de filtros para búsqueda de proveedores
 *
 * Uso:
 * <FiltersSidebar
 *   onFilterChange={handleFilterChange}
 *   categories={categories}
 *   cities={cities}
 * />
 */

'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/01-ui-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Rating } from '@/components/ui/05-ui-rating';
import { cn } from '@/lib/utils/cn';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

interface City {
  id: string;
  name: string;
  slug: string;
}

interface FiltersSidebarProps {
  categories: Category[];
  cities: City[];
  onFilterChange?: (filters: any) => void;
  isLoading?: boolean;
}

export function FiltersSidebar({
  categories,
  cities,
  onFilterChange,
  isLoading = false,
}: FiltersSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    city: true,
    rating: true,
    premium: false,
  });

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    minRating: searchParams.get('minRating') ? parseInt(searchParams.get('minRating')!) : 0,
    isVerified: searchParams.get('isVerified') === 'true',
    isPremium: searchParams.get('isPremium') === 'true',
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = useCallback(
    (newFilters: typeof filters) => {
      setFilters(newFilters);

      // Construir query string
      const params = new URLSearchParams();
      if (newFilters.category) params.set('category', newFilters.category);
      if (newFilters.city) params.set('city', newFilters.city);
      if (newFilters.minRating > 0) params.set('minRating', String(newFilters.minRating));
      if (newFilters.isVerified) params.set('isVerified', 'true');
      if (newFilters.isPremium) params.set('isPremium', 'true');

      // Actualizar URL
      const queryString = params.toString();
      router.push(`/buscar?${queryString}`);

      onFilterChange?.(newFilters);
    },
    [router, onFilterChange]
  );

  const resetFilters = () => {
    setFilters({
      category: '',
      city: '',
      minRating: 0,
      isVerified: false,
      isPremium: false,
    });
    router.push('/buscar');
  };

  const hasActiveFilters =
    filters.category || filters.city || filters.minRating > 0 || filters.isVerified || filters.isPremium;

  return (
    <div className="w-full md:w-64 space-y-4 bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-800 h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3 text-gray-900 dark:text-white font-medium"
        >
          <span>Categoría</span>
          {expandedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.category && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white"
              >
                <input
                  type="checkbox"
                  checked={filters.category === category.slug}
                  onChange={(e) => {
                    handleFilterChange({
                      ...filters,
                      category: e.target.checked ? category.slug : '',
                    });
                  }}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-gray-300"
                />
                {category.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* City Filter */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection('city')}
          className="flex items-center justify-between w-full mb-3 text-gray-900 dark:text-white font-medium"
        >
          <span>Ciudad</span>
          {expandedSections.city ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.city && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cities.map((city) => (
              <label
                key={city.id}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white"
              >
                <input
                  type="checkbox"
                  checked={filters.city === city.slug}
                  onChange={(e) => {
                    handleFilterChange({
                      ...filters,
                      city: e.target.checked ? city.slug : '',
                    });
                  }}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-gray-300"
                />
                {city.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3 text-gray-900 dark:text-white font-medium"
        >
          <span>Calificación</span>
          {expandedSections.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => {
                    handleFilterChange({
                      ...filters,
                      minRating: filters.minRating === rating ? 0 : rating,
                    });
                  }}
                  disabled={isLoading}
                  className="w-4 h-4"
                />
                <Rating value={rating} readOnly size="sm" />
                <span className="text-sm text-gray-600 dark:text-gray-400">& Arriba</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Verified & Premium */}
      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.isVerified}
            onChange={(e) => {
              handleFilterChange({
                ...filters,
                isVerified: e.target.checked,
              });
            }}
            disabled={isLoading}
            className="w-4 h-4 rounded"
          />
          ✓ Solo verificados
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.isPremium}
            onChange={(e) => {
              handleFilterChange({
                ...filters,
                isPremium: e.target.checked,
              });
            }}
            disabled={isLoading}
            className="w-4 h-4 rounded"
          />
          ✨ Solo premium
        </label>
      </div>

      {/* Apply Button */}
      <Button
        variant="primary"
        fullWidth
        disabled={isLoading}
        className="mt-4"
      >
        {isLoading ? 'Buscando...' : 'Aplicar filtros'}
      </Button>
    </div>
  );
}

export type { FiltersSidebarProps };
