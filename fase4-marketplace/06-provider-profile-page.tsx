/**
 * Provider Profile Page
 * Página pública de perfil del proveedor
 *
 * Ubicación: app/(marketplace)/proveedor/[slug]/page.tsx
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Heart,
  Share2,
  Flag,
} from 'lucide-react';
import { Navbar } from '@/components/common/08-common-navbar';
import { Button } from '@/components/ui/01-ui-button';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Badge } from '@/components/ui/04-ui-badge';
import { Rating } from '@/components/ui/05-ui-rating';
import { ReviewCard } from '@/components/marketplace/07-marketplace-review-card';
import { getProviderBySlug, getProviderReviews } from './01-search-server-actions';

interface ProviderProfilePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProviderProfilePageProps) {
  const provider = await getProviderBySlug(params.slug);

  if (!provider) {
    return {
      title: 'Proveedor no encontrado',
    };
  }

  return {
    title: `${provider.businessName} - Marketplace`,
    description: provider.businessDescription || `Conoce a ${provider.businessName}`,
    openGraph: {
      title: `${provider.businessName} - Marketplace`,
      description: provider.businessDescription,
      images: provider.coverImage
        ? [{ url: provider.coverImage }]
        : [],
    },
  };
}

export default async function ProviderProfilePage({
  params,
}: ProviderProfilePageProps) {
  const [provider, reviewsData] = await Promise.all([
    getProviderBySlug(params.slug),
    getProviderReviews(params.slug, 1, 5),
  ]);

  if (!provider) {
    notFound();
  }

  const ratingDistribution = {
    5: provider.reviews.filter((r) => r.rating === 5).length,
    4: provider.reviews.filter((r) => r.rating === 4).length,
    3: provider.reviews.filter((r) => r.rating === 3).length,
    2: provider.reviews.filter((r) => r.rating === 2).length,
    1: provider.reviews.filter((r) => r.rating === 1).length,
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white dark:bg-gray-950">
        {/* Cover Section */}
        <div className="relative h-48 sm:h-64 bg-gray-200 dark:bg-gray-800 overflow-hidden">
          {provider.coverImage && (
            <Image
              src={provider.coverImage}
              alt={provider.businessName}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 mb-8">
          {/* Header Card */}
          <Card className="overflow-hidden">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Logo */}
                {provider.logo && (
                  <Image
                    src={provider.logo}
                    alt={provider.businessName}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover flex-shrink-0"
                  />
                )}

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {provider.businessName}
                      </h1>
                      <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                        <MapPin size={18} />
                        <span>
                          {provider.city.name}
                          {provider.commune && `, ${provider.commune}`}
                        </span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2">
                      {provider.isVerified && (
                        <Badge variant="verified">✓ Verificado</Badge>
                      )}
                      {provider.isPremium && (
                        <Badge variant="premium">✨ Premium</Badge>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-4">
                    <Rating value={provider.averageRating} readOnly />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {provider.totalReviews} opiniones
                    </span>
                  </div>

                  {/* Description */}
                  {provider.businessDescription && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {provider.businessDescription}
                    </p>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary">Solicitar cotización</Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageCircle size={18} />
                      Enviar mensaje
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Heart size={18} />
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Share2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              {provider.gallery.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Galería
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {provider.gallery.slice(0, 4).map((image, idx) => (
                      <div
                        key={image.id}
                        className="relative h-48 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image.image}
                          alt={image.title || `Foto ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                  {provider.gallery.length > 4 && (
                    <Button variant="outline" className="mt-4">
                      Ver más fotos ({provider.gallery.length})
                    </Button>
                  )}
                </section>
              )}

              {/* Services */}
              {provider.services.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Servicios
                  </h2>
                  <div className="space-y-3">
                    {provider.services.map((service) => (
                      <Card key={service.id}>
                        <CardContent className="pt-4 pb-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {service.name}
                          </h3>
                          {service.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {service.description}
                            </p>
                          )}
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {service.duration && <span>{service.duration}</span>}
                            </div>
                            {service.price && (
                              <span className="font-bold text-gray-900 dark:text-white">
                                ${service.price}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Reviews */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Opiniones ({provider.totalReviews})
                </h2>

                {/* Rating Distribution */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                      {provider.averageRating.toFixed(1)}
                    </p>
                    <Rating value={provider.averageRating} readOnly />
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="w-12 text-sm">{rating}★</span>
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400"
                            style={{
                              width: `${
                                provider.totalReviews > 0
                                  ? (ratingDistribution[rating as keyof typeof ratingDistribution] /
                                      provider.totalReviews) *
                                    100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                        <span className="w-12 text-sm text-gray-600 dark:text-gray-400">
                          {ratingDistribution[rating as keyof typeof ratingDistribution]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {provider.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>

                {provider.totalReviews > 5 && (
                  <Button variant="outline" fullWidth className="mt-6">
                    Ver todas las opiniones
                  </Button>
                )}
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    Contacto
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {provider.phone && (
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Phone size={18} />
                      <span>{provider.phone}</span>
                    </a>
                  )}

                  {provider.email && (
                    <a
                      href={`mailto:${provider.email}`}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Mail size={18} />
                      <span>{provider.email}</span>
                    </a>
                  )}

                  {provider.website && (
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Globe size={18} />
                      <span>Sitio web</span>
                    </a>
                  )}

                  {provider.whatsapp && (
                    <a
                      href={`https://wa.me/${provider.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </CardContent>
              </Card>

              {/* Schedule Card */}
              {provider.schedule && (
                <Card>
                  <CardHeader>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      Horarios
                    </h3>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <p>Lunes a Viernes: 9:00 - 18:00</p>
                    <p>Sábado: 10:00 - 14:00</p>
                    <p>Domingo: Cerrado</p>
                  </CardContent>
                </Card>
              )}

              {/* Report Button */}
              <Button
                variant="ghost"
                fullWidth
                className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400"
              >
                <Flag size={18} />
                Reportar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export type { ProviderProfilePageProps };
