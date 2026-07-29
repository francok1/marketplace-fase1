/**
 * Review Validations
 * Esquemas Zod para validar opiniones, respuestas y reportes
 */

import { z } from 'zod';

// ============================================================================
// CREATE REVIEW
// ============================================================================
export const createReviewSchema = z.object({
  providerId: z.string().cuid('ID de proveedor inválido'),

  title: z
    .string()
    .min(5, 'Título mínimo 5 caracteres')
    .max(100, 'Título máximo 100 caracteres'),

  content: z
    .string()
    .min(10, 'Opinión mínima 10 caracteres')
    .max(2000, 'Opinión máxima 2000 caracteres'),

  rating: z
    .number()
    .min(1, 'Rating mínimo 1')
    .max(5, 'Rating máximo 5')
    .int('Rating debe ser entero'),

  images: z
    .array(z.string().url('URL de imagen inválida'))
    .max(5, 'Máximo 5 imágenes')
    .optional()
    .default([]),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

// ============================================================================
// UPDATE REVIEW
// ============================================================================
export const updateReviewSchema = z.object({
  reviewId: z.string().cuid('ID de opinión inválido'),

  title: z
    .string()
    .min(5, 'Título mínimo 5 caracteres')
    .max(100, 'Título máximo 100 caracteres')
    .optional(),

  content: z
    .string()
    .min(10, 'Opinión mínima 10 caracteres')
    .max(2000, 'Opinión máxima 2000 caracteres')
    .optional(),

  rating: z
    .number()
    .min(1, 'Rating mínimo 1')
    .max(5, 'Rating máximo 5')
    .int('Rating debe ser entero')
    .optional(),

  images: z
    .array(z.string().url('URL de imagen inválida'))
    .max(5, 'Máximo 5 imágenes')
    .optional(),
});

export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

// ============================================================================
// DELETE REVIEW
// ============================================================================
export const deleteReviewSchema = z.object({
  reviewId: z.string().cuid('ID de opinión inválido'),
});

export type DeleteReviewInput = z.infer<typeof deleteReviewSchema>;

// ============================================================================
// PROVIDER RESPONSE
// ============================================================================
export const providerResponseSchema = z.object({
  reviewId: z.string().cuid('ID de opinión inválido'),

  content: z
    .string()
    .min(10, 'Respuesta mínima 10 caracteres')
    .max(1000, 'Respuesta máxima 1000 caracteres'),
});

export type ProviderResponseInput = z.infer<typeof providerResponseSchema>;

// ============================================================================
// UPDATE RESPONSE
// ============================================================================
export const updateResponseSchema = z.object({
  responseId: z.string().cuid('ID de respuesta inválido'),

  content: z
    .string()
    .min(10, 'Respuesta mínima 10 caracteres')
    .max(1000, 'Respuesta máxima 1000 caracteres'),
});

export type UpdateResponseInput = z.infer<typeof updateResponseSchema>;

// ============================================================================
// DELETE RESPONSE
// ============================================================================
export const deleteResponseSchema = z.object({
  responseId: z.string().cuid('ID de respuesta inválido'),
});

export type DeleteResponseInput = z.infer<typeof deleteResponseSchema>;

// ============================================================================
// MARK HELPFUL
// ============================================================================
export const markHelpfulSchema = z.object({
  reviewId: z.string().cuid('ID de opinión inválido'),
  helpful: z.boolean('Debe ser true o false'),
});

export type MarkHelpfulInput = z.infer<typeof markHelpfulSchema>;

// ============================================================================
// REPORT REVIEW
// ============================================================================
export const reportReviewSchema = z.object({
  reviewId: z.string().cuid('ID de opinión inválido'),

  reason: z.enum([
    'INAPPROPRIATE',
    'FAKE',
    'HARASSMENT',
    'SPAM',
    'UNAUTHORIZED',
    'OTHER',
  ]),

  description: z
    .string()
    .min(10, 'Descripción mínima 10 caracteres')
    .max(500, 'Descripción máxima 500 caracteres')
    .optional(),
});

export type ReportReviewInput = z.infer<typeof reportReviewSchema>;

// ============================================================================
// ADMIN ACTIONS
// ============================================================================
export const moderateReviewSchema = z.object({
  reviewId: z.string().cuid('ID de opinión inválido'),

  status: z.enum(['PUBLISHED', 'HIDDEN', 'DELETED']),

  reason: z
    .string()
    .min(10, 'Razón mínima 10 caracteres')
    .optional(),
});

export type ModerateReviewInput = z.infer<typeof moderateReviewSchema>;
