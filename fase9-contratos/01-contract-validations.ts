/**
 * Contract Validations - FASE 9
 */

import { z } from 'zod';

export enum ContractStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SIGNED = 'SIGNED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
}

export const createContractSchema = z.object({
  quoteId: z.string().cuid(),
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(5000),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  totalAmount: z.number().positive(),
  terms: z.string().max(10000).optional(),
  deliverables: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
  })),
  paymentSchedule: z.array(z.object({
    percentage: z.number().min(0).max(100),
    dueDate: z.string().datetime(),
  })),
});

export type CreateContractInput = z.infer<typeof createContractSchema>;

export const signContractSchema = z.object({
  contractId: z.string().cuid(),
  signature: z.string(),
});

export type SignContractInput = z.infer<typeof signContractSchema>;
