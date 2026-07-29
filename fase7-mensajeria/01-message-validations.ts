/**
 * Message Validations
 * Esquemas Zod para validación de mensajería
 *
 * Ubicación: lib/validations/message-validations.ts
 */

import { z } from 'zod';

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
}

export enum ConversationStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  BLOCKED = 'BLOCKED',
}

// Schema: Enviar mensaje
export const sendMessageSchema = z.object({
  recipientId: z.string().cuid('ID de destinatario inválido'),
  content: z
    .string()
    .min(1, 'El mensaje no puede estar vacío')
    .max(5000, 'El mensaje no puede exceder 5000 caracteres'),
  attachments: z
    .array(z.string().url('URL de archivo inválida'))
    .max(10, 'Máximo 10 archivos')
    .optional(),
  quotedMessageId: z.string().cuid().optional(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;

// Schema: Crear conversación
export const createConversationSchema = z.object({
  participantIds: z
    .array(z.string().cuid())
    .min(2, 'Debe haber al menos 2 participantes'),
  subject: z
    .string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres')
    .optional(),
});

export type CreateConversationInput = z.infer<typeof createConversationSchema>;

// Schema: Buscar mensajes
export const searchMessagesSchema = z.object({
  conversationId: z.string().cuid('ID de conversación inválido'),
  query: z.string().max(100).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(50),
});

export type SearchMessagesInput = z.infer<typeof searchMessagesSchema>;

// Schema: Marcar como leído
export const markAsReadSchema = z.object({
  messageIds: z.array(z.string().cuid()).min(1),
  conversationId: z.string().cuid(),
});

export type MarkAsReadInput = z.infer<typeof markAsReadSchema>;

// Schema: Escribir indicador de escritura
export const setTypingIndicatorSchema = z.object({
  conversationId: z.string().cuid(),
  isTyping: z.boolean(),
});

export type SetTypingIndicatorInput = z.infer<typeof setTypingIndicatorSchema>;

// Schema: Actualizar conversación
export const updateConversationSchema = z.object({
  conversationId: z.string().cuid(),
  status: z.enum(Object.values(ConversationStatus) as [string, ...string[]]).optional(),
  muteNotifications: z.boolean().optional(),
});

export type UpdateConversationInput = z.infer<typeof updateConversationSchema>;
