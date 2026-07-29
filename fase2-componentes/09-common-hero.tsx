/**
 * Hero Section Component
 * Sección principal de la home con título y buscador destacado
 *
 * Uso:
 * <HeroSection />
 * <HeroSection title="Encuentra tus proveedores" subtitle="Miles de profesionales listos" />
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { Button } from './01-ui-button';
import { Input } from './02-ui-input';
import { cn } from '@/lib/utils/cn';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title = '¿Qué servicio estás buscando?',
  subtitle = 'Conecta con los mejores proveedores en tu área',
  backgroundImage,
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery);
    if (selectedCity) params.append('city', selectedCity);

    const queryString = params.toString();
    router.push(`/buscar${queryString ? `?${queryString}` : ''}`);
  };

  // Mock cities - en producción vendrían de la BD
  const cities = [
    'Santiago',
    'Valparaíso',
    'Concepción',
    'Valdivia',
    'Coyhaique',
  ];

  return (
    <section
      className={cn(
        'relative py-16 sm:py-24 overflow-hidden',
        'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
        'dark:from-gray-950 dark:via-gray-900 dark:to-black'
      )}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Service Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Servicio
              </label>
              <Input
                type="text"
                placeholder="Fotógrafos, DJ, Decoración..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={18} />}
                className="h-11"
              />
            </div>

            {/* City Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ciudad
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="flex h-11 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-base text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <option value="">Todas las ciudades</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                className="h-11"
              >
                <Search size={20} className="mr-2" />
                Buscar
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Popular:</span>
            {['Fotógrafos', 'DJ', 'Decoración', 'Banquetería', 'Floristas'].map(
              (search) => (
                <button
                  key={search}
                  type="button"
                  onClick={() => {
                    setSearchQuery(search);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {search}
                </button>
              )
            )}
          </div>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              +1.2K
            </div>
            <p className="text-sm sm:text-base text-gray-300">Proveedores</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              +50K
            </div>
            <p className="text-sm sm:text-base text-gray-300">Opiniones</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              4.8⭐
            </div>
            <p className="text-sm sm:text-base text-gray-300">Promedio</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export type { HeroSectionProps };
