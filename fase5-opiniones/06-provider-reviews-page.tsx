/**
 * Provider Reviews Management Page
 * Página para que proveedores gestionen sus opiniones
 *
 * Ubicación: app/(dashboard)/proveedor/opiniones/page.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Navbar } from '@/components/common/08-common-navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Button } from '@/components/ui/01-ui-button';
import { Badge } from '@/components/ui/04-ui-badge';
import { Rating } from '@/components/ui/05-ui-rating';
import { ReviewCard } from '@/components/marketplace/07-marketplace-review-card';
import { RatingDistribution } from './04-rating-distribution';
import {
  getProviderReviews,
  getReviewStats,
} from './02-review-server-actions';

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  createdAt: Date;
  author: {
    name: string;
    avatar?: string;
  };
  providerResponse?: {
    content: string;
    createdAt: Date;
  };
  images?: string[];
  helpful: number;
  notHelpful: number;
}

interface Stats {
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

export default function ProviderReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');

  useEffect(() => {
    loadData();
  }, [sortBy]);

  const loadData = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      // TODO: Usar providerId real del usuario
      const providerId = 'mock-provider-id';

      const [reviewsResult, statsResult] = await Promise.all([
        getProviderReviews(providerId, 1, 20, sortBy),
        getReviewStats(providerId),
      ]);

      if (reviewsResult.success) {
        setReviews(reviewsResult.reviews);
      }

      if (statsResult.success) {
        setStats(statsResult);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = ['Todas', 'Sin respuesta', 'Respondidas'];

  const filteredReviews = reviews.filter((review) => {
    if (selectedTab === 1) return !review.providerResponse;
    if (selectedTab === 2) return review.providerResponse;
    return true;
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Opiniones de clientes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gestiona tus opiniones y responde a los clientes
            </p>
          </div>

          {/* Stats Section */}
          {stats && (
            <div className="mb-8">
              <RatingDistribution
                average={stats.average}
                total={stats.total}
                distribution={stats.distribution}
              />
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTab(idx)}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                    selectedTab === idx
                      ? 'border-black text-black dark:border-white dark:text-white'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                  {tab === 'Sin respuesta' && (
                    <span className="ml-2 text-red-500 font-bold">
                      {reviews.filter((r) => !r.providerResponse).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {filteredReviews.length} opiniones
            </p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="newest">Más recientes</option>
              <option value="rating">Mejor calificadas</option>
              <option value="helpful">Más útiles</option>
            </select>
          </div>

          {/* Reviews List */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedTab === 1
                  ? 'No hay opiniones sin responder'
                  : 'No hay opiniones'}
              </p>
              {selectedTab === 1 && (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Todas tus opiniones han sido respondidas. ¡Buen trabajo!
                </p>
              )}
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-4 pb-4">
                    <ReviewCard
                      review={review}
                      showProviderResponse={true}
                    />

                    {selectedTab === 1 && !review.providerResponse && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-4 w-full"
                      >
                        Responder esta opinión
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
