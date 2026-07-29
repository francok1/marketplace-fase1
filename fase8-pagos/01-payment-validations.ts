/**
 * Payment Validations
 * Esquemas Zod para pagos con Stripe
 *
 * Ubicación: lib/validations/payment-validations.ts
 */

import { z } from 'zod';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  WALLET = 'WALLET',
}

// Schema: Crear intención de pago
export const createPaymentIntentSchema = z.object({
  quoteId: z.string().cuid('ID de cotización inválido'),
  amount: z.number().positive('Monto debe ser positivo'),
  currency: z.enum(['CLP', 'USD']).default('CLP'),
  description: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
});

export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;

// Schema: Confirmar pago
export const confirmPaymentSchema = z.object({
  paymentIntentId: z.string(),
  paymentMethodId: z.string().optional(),
});

export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;

// Schema: Procesar reembolso
export const processRefundSchema = z.object({
  paymentId: z.string(),
  reason: z.string().max(500),
  amount: z.number().positive().optional(),
});

export type ProcessRefundInput = z.infer<typeof processRefundSchema>;

// Schema: Guardar método de pago
export const savePaymentMethodSchema = z.object({
  stripePaymentMethodId: z.string(),
  isDefault: z.boolean().default(false),
  label: z.string().max(50).optional(),
});

export type SavePaymentMethodInput = z.infer<typeof savePaymentMethodSchema>;
