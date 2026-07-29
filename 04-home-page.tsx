/**
 * Home Page
 * Página de inicio del marketplace
 *
 * Ubicación: app/(marketplace)/page.tsx
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '@/components/common/09-common-hero';
import { ProviderCard } from '@/components/marketplace/06-marketplace-provider-card';
import { ReviewCard } from '@/components/marketplace/07-marketplace-review-card';
import { Button } from '@/components/ui/01-ui-button';
import { Card, CardContent } from '@/components/ui/03-ui-card';
import { Badge } from '@/components/ui/04-ui-badge';
import {
  getFeaturedProviders,
  getPopularCategories,
} from './01-search-server-actions';

export const metadata = {
  title: 'Marketplace - Encuentra los mejores servicios',
  description: 'Conecta con proveedores de servicios profesionales en tu área',
  openGraph: {
    title: 'Marketplace - Encuentra los mejores servicios',
    description: 'Conecta con proveedores de servicios profesionales en tu área',
    url: 'https://marketplace.com',
    type: 'website',
  },
};

export default async function HomePage() {
  const [featuredProviders, categories] = await Promise.all([
    getFeaturedProviders(6),
    getPopularCategories(8),
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categorías populares
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explora nuestras principales categorías de servicios
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/buscar?category=${category.slug}`}
              >
                <Card hoverable className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <CardContent className="space-y-2">
                    {category.icon && (
                      <div className="text-3xl">{category.icon}</div>
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {category.providersCount} proveedores
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/categorias">
              <Button variant="outline" size="lg">
                Ver todas las categorías
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="premium">✨ Destacados</Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Proveedores premium
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Los mejores profesionales según calificación y opiniones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/buscar?isPremium=true">
              <Button variant="primary" size="lg">
                Ver todos los proveedores premium
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tres sencillos pasos para encontrar el proveedor perfecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Busca',
                description:
                  'Encuentra proveedores por categoría, ubicación y calificación',
                icon: '🔍',
              },
              {
                step: '02',
                title: 'Compara',
                description:
                  'Revisa perfiles, galerías y opiniones de otros clientes',
                icon: '⭐',
              },
              {
                step: '03',
                title: 'Contrata',
                description:
                  'Solicita cotizaciones y contacta directamente con el proveedor',
                icon: '✅',
              },
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    Paso {item.step}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-black dark:from-gray-950 dark:to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '1.2K+', label: 'Proveedores' },
              { number: '50K+', label: 'Opiniones' },
              { number: '4.8⭐', label: 'Promedio' },
              { number: '99%', label: 'Satisfacción' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl sm:text-4xl font-bold mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Eres un proveedor?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Únete a miles de profesionales que crecen con nosotros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=provider">
              <Button variant="primary" size="lg">
                Crear cuenta de proveedor
              </Button>
            </Link>
            <Link href="/como-funciona">
              <Button variant="outline" size="lg">
                Más información
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
