/**
 * SEO Metadata Configuration - FASE 13
 * Configuración de metadatos para SEO
 */

import { Metadata } from 'next';

// Base metadata
export const baseMetadata: Metadata = {
  title: 'Marketplace - Conecta con los mejores proveedores',
  description:
    'Plataforma de servicios profesionales. Busca y conecta con proveedores verificados en tu área.',
  keywords:
    'servicios, proveedores, cotizaciones, profesionales, marketplace',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Marketplace',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@marketplace',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

// Metadata para página de búsqueda
export function getSearchMetadata(query: string, category?: string): Metadata {
  const title = category
    ? `${category} - Buscar Proveedores | Marketplace`
    : `Buscar Proveedores | Marketplace`;

  const description = category
    ? `Encuentra los mejores proveedores de ${category} en tu área. Cotizaciones gratis y sin compromiso.`
    : 'Busca entre miles de proveedores verificados y obtén cotizaciones al instante.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/search?q=${query}`,
    },
  };
}

// Metadata para perfil de proveedor
export function getProviderMetadata(
  name: string,
  description: string,
  image?: string
): Metadata {
  const title = `${name} | Marketplace`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'business.business',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/providers/${name}`,
      images: image
        ? [
            {
              url: image,
              width: 400,
              height: 300,
              alt: name,
            },
          ]
        : undefined,
    },
  };
}

// Structured Data (Schema.org)
export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Marketplace',
  description:
    'Plataforma de servicios profesionales para conectar clientes con proveedores',
  url: process.env.NEXT_PUBLIC_APP_URL,
  telephone: '+56 9 XXXX XXXX',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CL',
  },
  sameAs: [
    'https://facebook.com/marketplace',
    'https://twitter.com/marketplace',
    'https://instagram.com/marketplace',
  ],
};

export const providerSchema = (
  name: string,
  rating: number,
  reviewCount: number,
  address: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: rating,
    reviewCount: reviewCount,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: address,
    addressCountry: 'CL',
  },
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
