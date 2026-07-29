/**
 * Email Configuration - FASE 12
 * Configuración de SendGrid/Mailgun
 */

export enum EmailTemplate {
  // Autenticación
  WELCOME = 'welcome',
  CONFIRM_EMAIL = 'confirm-email',
  RESET_PASSWORD = 'reset-password',
  PASSWORD_CHANGED = 'password-changed',

  // Cotizaciones
  QUOTE_REQUEST = 'quote-request',
  QUOTE_RECEIVED = 'quote-received',
  QUOTE_ACCEPTED = 'quote-accepted',
  QUOTE_REJECTED = 'quote-rejected',

  // Opiniones
  NEW_REVIEW = 'new-review',
  REVIEW_RESPONSE = 'review-response',

  // Mensajería
  NEW_MESSAGE = 'new-message',
  MESSAGE_DIGEST = 'message-digest',

  // Pagos
  PAYMENT_CONFIRMATION = 'payment-confirmation',
  INVOICE = 'invoice',
  REFUND_PROCESSED = 'refund-processed',

  // Contratos
  CONTRACT_READY = 'contract-ready',
  CONTRACT_SIGNED = 'contract-signed',

  // Admin
  DAILY_REPORT = 'daily-report',
  ALERT = 'alert',
}

// Template IDs (SendGrid/Mailgun)
export const TEMPLATE_IDS: Record<EmailTemplate, string> = {
  [EmailTemplate.WELCOME]: 'welcome-template-id',
  [EmailTemplate.CONFIRM_EMAIL]: 'confirm-email-template-id',
  [EmailTemplate.RESET_PASSWORD]: 'reset-password-template-id',
  [EmailTemplate.PASSWORD_CHANGED]: 'password-changed-template-id',
  [EmailTemplate.QUOTE_REQUEST]: 'quote-request-template-id',
  [EmailTemplate.QUOTE_RECEIVED]: 'quote-received-template-id',
  [EmailTemplate.QUOTE_ACCEPTED]: 'quote-accepted-template-id',
  [EmailTemplate.QUOTE_REJECTED]: 'quote-rejected-template-id',
  [EmailTemplate.NEW_REVIEW]: 'new-review-template-id',
  [EmailTemplate.REVIEW_RESPONSE]: 'review-response-template-id',
  [EmailTemplate.NEW_MESSAGE]: 'new-message-template-id',
  [EmailTemplate.MESSAGE_DIGEST]: 'message-digest-template-id',
  [EmailTemplate.PAYMENT_CONFIRMATION]: 'payment-confirmation-template-id',
  [EmailTemplate.INVOICE]: 'invoice-template-id',
  [EmailTemplate.REFUND_PROCESSED]: 'refund-processed-template-id',
  [EmailTemplate.CONTRACT_READY]: 'contract-ready-template-id',
  [EmailTemplate.CONTRACT_SIGNED]: 'contract-signed-template-id',
  [EmailTemplate.DAILY_REPORT]: 'daily-report-template-id',
  [EmailTemplate.ALERT]: 'alert-template-id',
};

// Email Configuration
export const emailConfig = {
  from: process.env.EMAIL_FROM || 'noreply@marketplace.com',
  replyTo: process.env.EMAIL_REPLY_TO || 'support@marketplace.com',
  apiKey: process.env.SENDGRID_API_KEY || '',
};

// Push Notifications
export enum PushNotificationType {
  QUOTE_REQUEST = 'quote_request',
  QUOTE_RECEIVED = 'quote_received',
  NEW_MESSAGE = 'new_message',
  REVIEW_RECEIVED = 'review_received',
  PAYMENT_COMPLETED = 'payment_completed',
}

// Unsubscribe Options
export const unsubscribeOptions = [
  { id: 'marketing', label: 'Emails de marketing' },
  { id: 'weekly_digest', label: 'Resumen semanal' },
  { id: 'notifications', label: 'Notificaciones' },
  { id: 'quotes', label: 'Alertas de cotizaciones' },
  { id: 'messages', label: 'Alertas de mensajes' },
];
