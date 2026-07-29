/**
 * Review Server Actions
 * Acciones del servidor para gestionar opiniones
 */

'use server';

import { db } from '@/lib/db/client';
import { auth } from '@/lib/auth/config';
import {
  createReviewSchema,
  updateReviewSchema,
  providerResponseSchema,
  markHelpfulSchema,
  type CreateReviewInput,
  type UpdateReviewInput,
  type ProviderResponseInput,
} from './01-review-validations';

/**
 * Crear una nueva opinión
 */
export async function createReview(data: CreateReviewInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error('No autenticado');
    }

    // Validar datos
    const validated = createReviewSchema.parse(data);

    // Verificar que el usuario no tenga ya una opinión para este proveedor
    const existingReview = await db.review.findUnique({
      where: {
        providerId_userId: {
          providerId: validated.providerId,
          userId: session.user.id,
        },
      },
    });

    if (existingReview) {
      throw new Error('Ya has dejado una opinión para este proveedor');
    }

    // Crear opinión
    const review = await db.review.create({
      data: {
        title: validated.title,
        content: validated.content,
        rating: validated.rating,
        providerId: validated.providerId,
        userId: session.user.id,
        status: 'PUBLISHED', // O 'PENDING' si requiere moderación
        images: {
          createMany: {
            data: validated.images.map((url, order) => ({
              url,
              order,
            })),
          },
        },
      },
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
        images: true,
      },
    });

    // Actualizar rating promedio del proveedor
    await updateProviderRating(validated.providerId);

    return {
      success: true,
      message: 'Opinión publicada exitosamente',
      review,
    };
  } catch (error) {
    console.error('Create review error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear opinión',
    };
  }
}

/**
 * Actualizar una opinión
 */
export async function updateReview(data: UpdateReviewInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error('No autenticado');
    }

    // Validar datos
    const validated = updateReviewSchema.parse(data);

    // Verificar que el usuario sea el dueño
    const review = await db.review.findUnique({
      where: { id: validated.reviewId },
    });

    if (!review) {
      throw new Error('Opinión no encontrada');
    }

    if (review.userId !== session.user.id) {
      throw new Error('No tienes permiso para actualizar esta opinión');
    }

    // Actualizar opinión
    const updated = await db.review.update({
      where: { id: validated.reviewId },
      data: {
        ...(validated.title && { title: validated.title }),
        ...(validated.content && { content: validated.content }),
        ...(validated.rating && { rating: validated.rating }),
      },
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Actualizar rating si cambió
    if (validated.rating) {
      await updateProviderRating(review.providerId);
    }

    return {
      success: true,
      message: 'Opinión actualizada exitosamente',
      review: updated,
    };
  } catch (error) {
    console.error('Update review error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar opinión',
    };
  }
}

/**
 * Eliminar una opinión
 */
export async function deleteReview(reviewId: string) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error('No autenticado');
    }

    // Verificar que el usuario sea el dueño
    const review = await db.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new Error('Opinión no encontrada');
    }

    if (review.userId !== session.user.id) {
      throw new Error('No tienes permiso para eliminar esta opinión');
    }

    // Eliminar opinión
    await db.review.delete({
      where: { id: reviewId },
    });

    // Actualizar rating
    await updateProviderRating(review.providerId);

    return {
      success: true,
      message: 'Opinión eliminada exitosamente',
    };
  } catch (error) {
    console.error('Delete review error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar opinión',
    };
  }
}

/**
 * Responder una opinión (solo proveedor)
 */
export async function respondToReview(data: ProviderResponseInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error('No autenticado');
    }

    // Validar datos
    const validated = providerResponseSchema.parse(data);

    // Obtener opinión
    const review = await db.review.findUnique({
      where: { id: validated.reviewId },
      include: {
        provider: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!review) {
      throw new Error('Opinión no encontrada');
    }

    // Verificar que el usuario es el proveedor
    if (review.provider.userId !== session.user.id) {
      throw new Error('Solo el proveedor puede responder');
    }

    // Crear o actualizar respuesta
    const response = await db.providerResponse.upsert({
      where: { reviewId: validated.reviewId },
      update: { content: validated.content },
      create: {
        reviewId: validated.reviewId,
        content: validated.content,
      },
    });

    return {
      success: true,
      message: 'Respuesta publicada exitosamente',
      response,
    };
  } catch (error) {
    console.error('Respond to review error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al responder',
    };
  }
}

/**
 * Marcar opinión como útil/no útil
 */
export async function markReviewHelpful(data: MarkHelpfulInput) {
  try {
    // Validar datos
    const validated = markHelpfulSchema.parse(data);

    // Obtener opinión
    const review = await db.review.findUnique({
      where: { id: validated.reviewId },
    });

    if (!review) {
      throw new Error('Opinión no encontrada');
    }

    // Actualizar contadores
    const updated = await db.review.update({
      where: { id: validated.reviewId },
      data: {
        [validated.helpful ? 'helpful' : 'notHelpful']: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
      helpful: updated.helpful,
      notHelpful: updated.notHelpful,
    };
  } catch (error) {
    console.error('Mark helpful error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al marcar',
    };
  }
}

/**
 * Actualizar rating promedio del proveedor
 */
async function updateProviderRating(providerId: string) {
  try {
    // Calcular promedio y contar opiniones
    const stats = await db.review.aggregate({
      where: {
        providerId,
        status: 'PUBLISHED',
      },
      _avg: {
        rating: true,
      },
      _count: true,
    });

    // Actualizar proveedor
    await db.provider.update({
      where: { id: providerId },
      data: {
        averageRating: stats._avg.rating || 0,
        totalReviews: stats._count || 0,
      },
    });
  } catch (error) {
    console.error('Update provider rating error:', error);
  }
}

/**
 * Obtener opiniones de un proveedor
 */
export async function getProviderReviews(
  providerId: string,
  page: number = 1,
  limit: number = 10,
  sortBy: 'newest' | 'helpful' | 'rating' = 'newest'
) {
  try {
    // Construir orderBy
    let orderBy: any = {};
    switch (sortBy) {
      case 'helpful':
        orderBy = { helpful: 'desc' };
        break;
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
        break;
    }

    // Contar total
    const total = await db.review.count({
      where: {
        providerId,
        status: 'PUBLISHED',
      },
    });

    // Obtener opiniones
    const reviews = await db.review.findMany({
      where: {
        providerId,
        status: 'PUBLISHED',
      },
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
        providerResponse: true,
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      success: true,
      reviews,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Get provider reviews error:', error);
    return {
      success: false,
      reviews: [],
      total: 0,
      page,
      limit,
      pages: 0,
    };
  }
}

/**
 * Obtener estadísticas de opiniones
 */
export async function getReviewStats(providerId: string) {
  try {
    // Contar por rating
    const stats = await db.review.groupBy({
      by: ['rating'],
      where: {
        providerId,
        status: 'PUBLISHED',
      },
      _count: true,
    });

    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    stats.forEach((stat) => {
      distribution[stat.rating as keyof typeof distribution] = stat._count;
    });

    // Calcular promedio
    const avgStats = await db.review.aggregate({
      where: {
        providerId,
        status: 'PUBLISHED',
      },
      _avg: {
        rating: true,
      },
      _count: true,
    });

    return {
      success: true,
      average: avgStats._avg.rating || 0,
      total: avgStats._count || 0,
      distribution,
    };
  } catch (error) {
    console.error('Get review stats error:', error);
    return {
      success: false,
      average: 0,
      total: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }
}
