/**
 * Search Server Actions
 * Acciones del servidor para buscar proveedores
 *
 * Uso:
 * const results = await searchProviders({ query: 'fotógrafos', city: 'Santiago' });
 */

'use server';

import { db } from '@/lib/db/client';
import { Prisma } from '@prisma/client';

export interface SearchFilters {
  query?: string;
  city?: string;
  category?: string;
  minRating?: number;
  maxPrice?: number;
  isVerified?: boolean;
  isPremium?: boolean;
  sortBy?: 'rating' | 'reviews' | 'visits' | 'newest';
  page?: number;
  limit?: number;
}

export interface ProviderResult {
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
  totalViews: number;
}

export interface SearchResults {
  providers: ProviderResult[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Buscar proveedores con filtros
 */
export async function searchProviders(
  filters: SearchFilters
): Promise<SearchResults> {
  try {
    const {
      query = '',
      city,
      category,
      minRating = 0,
      maxPrice,
      isVerified = false,
      isPremium = false,
      sortBy = 'rating',
      page = 1,
      limit = 20,
    } = filters;

    // Construir where clause
    const where: Prisma.ProviderWhereInput = {
      status: 'ACTIVE',
      isVerified: isVerified || undefined,
      isPremium: isPremium || undefined,
      averageRating: {
        gte: minRating,
      },
    };

    // Filtro por ciudad
    if (city) {
      where.city = {
        is: {
          slug: city,
        },
      };
    }

    // Filtro por categoría
    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category,
          },
        },
      };
    }

    // Filtro por búsqueda de texto
    if (query.trim()) {
      where.OR = [
        {
          businessName: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          businessDescription: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Construir orderBy
    let orderBy: Prisma.ProviderOrderByWithRelationInput = {};

    switch (sortBy) {
      case 'rating':
        orderBy = { averageRating: 'desc' };
        break;
      case 'reviews':
        orderBy = { totalReviews: 'desc' };
        break;
      case 'visits':
        orderBy = { totalViews: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
    }

    // Contar total
    const total = await db.provider.count({ where });

    // Obtener resultados
    const providers = await db.provider.findMany({
      where,
      select: {
        id: true,
        slug: true,
        businessName: true,
        logo: true,
        coverImage: true,
        city: {
          select: {
            name: true,
            slug: true,
          },
        },
        commune: true,
        averageRating: true,
        totalReviews: true,
        isVerified: true,
        isPremium: true,
        totalViews: true,
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    // Mapear resultados
    const mappedProviders: ProviderResult[] = providers.map((p) => ({
      id: p.id,
      slug: p.slug,
      businessName: p.businessName,
      logo: p.logo,
      coverImage: p.coverImage,
      city: p.city.name,
      commune: p.commune,
      averageRating: p.averageRating,
      totalReviews: p.totalReviews,
      isVerified: p.isVerified,
      isPremium: p.isPremium,
      totalViews: p.totalViews,
    }));

    return {
      providers: mappedProviders,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Error al buscar proveedores');
  }
}

/**
 * Obtener proveedores destacados (para home)
 */
export async function getFeaturedProviders(
  limit: number = 6
): Promise<ProviderResult[]> {
  try {
    const providers = await db.provider.findMany({
      where: {
        status: 'ACTIVE',
        isPremium: true,
      },
      select: {
        id: true,
        slug: true,
        businessName: true,
        logo: true,
        coverImage: true,
        city: {
          select: {
            name: true,
            slug: true,
          },
        },
        commune: true,
        averageRating: true,
        totalReviews: true,
        isVerified: true,
        isPremium: true,
        totalViews: true,
      },
      orderBy: { averageRating: 'desc' },
      take: limit,
    });

    return providers.map((p) => ({
      id: p.id,
      slug: p.slug,
      businessName: p.businessName,
      logo: p.logo,
      coverImage: p.coverImage,
      city: p.city.name,
      commune: p.commune,
      averageRating: p.averageRating,
      totalReviews: p.totalReviews,
      isVerified: p.isVerified,
      isPremium: p.isPremium,
      totalViews: p.totalViews,
    }));
  } catch (error) {
    console.error('Featured providers error:', error);
    return [];
  }
}

/**
 * Obtener categorías populares
 */
export async function getPopularCategories(limit: number = 8) {
  try {
    const categories = await db.category.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
        color: true,
        _count: {
          select: {
            providers: true,
          },
        },
      },
      orderBy: {
        providers: {
          _count: 'desc',
        },
      },
      take: limit,
    });

    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      color: c.color,
      providersCount: c._count.providers,
    }));
  } catch (error) {
    console.error('Popular categories error:', error);
    return [];
  }
}

/**
 * Obtener ciudades
 */
export async function getCities() {
  try {
    const cities = await db.city.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: { name: 'asc' },
    });

    return cities;
  } catch (error) {
    console.error('Cities error:', error);
    return [];
  }
}

/**
 * Obtener perfil de proveedor
 */
export async function getProviderBySlug(slug: string) {
  try {
    const provider = await db.provider.findUnique({
      where: { slug },
      include: {
        city: true,
        categories: {
          include: {
            category: true,
          },
        },
        services: true,
        gallery: {
          orderBy: { order: 'asc' },
        },
        videos: {
          orderBy: { order: 'asc' },
        },
        schedule: true,
        reviews: {
          where: { status: 'PUBLISHED' },
          include: {
            author: {
              select: {
                name: true,
                avatar: true,
              },
            },
            providerResponse: true,
            images: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        awards: true,
      },
    });

    if (!provider) {
      return null;
    }

    // Incrementar vista
    await db.provider.update({
      where: { id: provider.id },
      data: { totalViews: { increment: 1 } },
    });

    return provider;
  } catch (error) {
    console.error('Provider error:', error);
    return null;
  }
}

/**
 * Obtener todas las opiniones de un proveedor
 */
export async function getProviderReviews(
  providerId: string,
  page: number = 1,
  limit: number = 10
) {
  try {
    const total = await db.review.count({
      where: { providerId, status: 'PUBLISHED' },
    });

    const reviews = await db.review.findMany({
      where: { providerId, status: 'PUBLISHED' },
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
        providerResponse: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      reviews,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Reviews error:', error);
    return { reviews: [], total: 0, page, limit, pages: 0 };
  }
}
