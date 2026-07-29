/**
 * Quote Validations
 * Esquemas Zod para validación de cotizaciones
 *
 * Ubicación: lib/validations/quote-validations.ts
 */

import { z } from 'zod';

// Enum para estados de cotización
export enum QuoteStatus {
  PENDING = 'PENDING',        // Esperando respuesta del proveedor
  SENT = 'SENT',              // Cotización enviada al cliente
  ACCEPTED = 'ACCEPTED',      // Cliente aceptó la cotización
  REJECTED = 'REJECTED',      // Cliente rechazó la cotización
  CANCELLED = 'CANCELLED',    // Cotización cancelada
  COMPLETED = 'COMPLETED',    // Servicio completado
}

// Enum para tipos de cotización
export enum QuoteType {
  REQUEST = 'REQUEST',        // Solicitud de cotización del cliente
  QUOTE = 'QUOTE',            // Cotización formal del proveedor
  PROPOSAL = 'PROPOSAL',      // Propuesta con detalles
}

// Schema: Crear solicitud de cotización (Cliente → Proveedor)
export const createQuoteRequestSchema = z.object({
  providerId: z.string().cuid('ID de proveedor inválido'),
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres'),
  category: z
    .string()
    .min(1, 'Debe seleccionar una categoría'),
  budget: z
    .object({
      min: z.number().positive('El presupuesto mínimo debe ser positivo'),
      max: z.number().positive('El presupuesto máximo debe ser positivo'),
    })
    .refine(
      (data) => data.max >= data.min,
      'El presupuesto máximo debe ser mayor o igual al mínimo'
    )
    .optional(),
  deadline: z
    .string()
    .datetime('Fecha inválida')
    .optional(),
  attachments: z
    .array(z.string().url('URL de archivo inválida'))
    .max(5, 'Máximo 5 archivos'),
  requiresPhysicalVisit: z.boolean().default(false),
  location: z
    .object({
      address: z.string().min(5, 'Dirección inválida'),
      city: z.string().min(2, 'Ciudad inválida'),
      region: z.string().min(2, 'Región inválida'),
    })
    .optional(),
});

export type CreateQuoteRequestInput = z.infer<typeof createQuoteRequestSchema>;

// Schema: Crear cotización (Proveedor → Cliente)
export const createQuoteSchema = z.object({
  quoteRequestId: z.string().cuid('ID de solicitud inválido'),
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  description: z
    .string()
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(3000, 'La descripción no puede exceder 3000 caracteres'),
  amount: z
    .number()
    .positive('El monto debe ser positivo')
    .max(999999999, 'Monto muy grande'),
  currency: z.enum(['CLP', 'USD', 'UYU']).default('CLP'),
  taxIncluded: z.boolean().default(false),
  validUntil: z
    .string()
    .datetime('Fecha inválida'),
  estimatedDuration: z
    .object({
      value: z.number().positive('Duración debe ser positiva'),
      unit: z.enum(['HOURS', 'DAYS', 'WEEKS', 'MONTHS']),
    })
    .optional(),
  deliverables: z
    .array(
      z.object({
        name: z.string().min(1, 'Nombre requerido'),
        description: z.string().optional(),
      })
    )
    .min(1, 'Debe haber al menos un entregable'),
  paymentTerms: z
    .enum(['FULL_UPFRONT', 'HALF_UPFRONT', 'ON_COMPLETION', 'INSTALLMENTS'])
    .default('HALF_UPFRONT'),
  notes: z
    .string()
    .max(1000, 'Notas no pueden exceder 1000 caracteres')
    .optional(),
  attachments: z
    .array(z.string().url('URL de archivo inválida'))
    .max(5, 'Máximo 5 archivos'),
});

export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;

// Schema: Actualizar cotización
export const updateQuoteSchema = z.object({
  quoteId: z.string().cuid('ID de cotización inválido'),
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres')
    .optional(),
  description: z
    .string()
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(3000, 'La descripción no puede exceder 3000 caracteres')
    .optional(),
  amount: z
    .number()
    .positive('El monto debe ser positivo')
    .optional(),
  validUntil: z
    .string()
    .datetime('Fecha inválida')
    .optional(),
  status: z
    .enum(Object.values(QuoteStatus) as [string, ...string[]])
    .optional(),
  notes: z
    .string()
    .max(1000, 'Notas no pueden exceder 1000 caracteres')
    .optional(),
});

export type UpdateQuoteInput = z.infer<typeof updateQuoteSchema>;

// Schema: Responder a cotización (aceptar/rechazar)
export const respondToQuoteSchema = z.object({
  quoteId: z.string().cuid('ID de cotización inválido'),
  status: z.enum(['ACCEPTED', 'REJECTED']),
  message: z
    .string()
    .max(500, 'El mensaje no puede exceder 500 caracteres')
    .optional(),
});

export type RespondToQuoteInput = z.infer<typeof respondToQuoteSchema>;

// Schema: Cambiar estado de cotización
export const updateQuoteStatusSchema = z.object({
  quoteId: z.string().cuid('ID de cotización inválido'),
  status: z.enum(Object.values(QuoteStatus) as [string, ...string[]]),
  reason: z
    .string()
    .max(500, 'Razón no puede exceder 500 caracteres')
    .optional(),
});

export type UpdateQuoteStatusInput = z.infer<typeof updateQuoteStatusSchema>;

// Schema: Agregar comentario a cotización
export const addQuoteCommentSchema = z.object({
  quoteId: z.string().cuid('ID de cotización inválido'),
  content: z
    .string()
    .min(1, 'El comentario no puede estar vacío')
    .max(1000, 'El comentario no puede exceder 1000 caracteres'),
});

export type AddQuoteCommentInput = z.infer<typeof addQuoteCommentSchema>;

// Schema: Buscar cotizaciones
export const searchQuotesSchema = z.object({
  status: z.enum(Object.values(QuoteStatus) as [string, ...string[]]).optional(),
  providerId: z.string().optional(),
  clientId: z.string().optional(),
  sortBy: z.enum(['newest', 'oldest', 'amount_asc', 'amount_desc']).default('newest'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export type SearchQuotesInput = z.infer<typeof searchQuotesSchema>;
