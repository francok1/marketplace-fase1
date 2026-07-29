/**
 * Admin Validations - FASE 10
 * Esquemas Zod para operaciones administrativas
 */

import { z } from 'zod';

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MODERATOR = 'MODERATOR',
  FINANCIAL = 'FINANCIAL',
  SUPPORT = 'SUPPORT',
}

// Schema: Suspender usuario
export const suspendUserSchema = z.object({
  userId: z.string().cuid(),
  reason: z.string().min(10).max(500),
  duration: z.number().positive().optional(), // en días
});

export type SuspendUserInput = z.infer<typeof suspendUserSchema>;

// Schema: Moderar contenido
export const moderateContentSchema = z.object({
  contentId: z.string().cuid(),
  contentType: z.enum(['REVIEW', 'PROFILE', 'IMAGE', 'MESSAGE']),
  action: z.enum(['APPROVE', 'REJECT', 'REMOVE']),
  reason: z.string().max(500).optional(),
});

export type ModerateContentInput = z.infer<typeof moderateContentSchema>;

// Schema: Crear categoría
export const createCategorySchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(200),
  icon: z.string().optional(),
  order: z.number().int().default(0),
  active: z.boolean().default(true),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

// Schema: Reportar estadísticas
export const generateReportSchema = z.object({
  type: z.enum(['USERS', 'REVENUE', 'CONTENT', 'TRANSACTIONS']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  format: z.enum(['PDF', 'CSV', 'JSON']).default('PDF'),
});

export type GenerateReportInput = z.infer<typeof generateReportSchema>;
