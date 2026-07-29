/**
 * Analytics Configuration - FASE 11
 * Configuración de Google Analytics 4 y eventos personalizados
 */

// Google Analytics 4 Configuration
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || '';

// Eventos personalizados
export const ANALYTICS_EVENTS = {
  // Autenticación
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  LOGOUT: 'logout',

  // Marketplace
  SEARCH: 'search',
  VIEW_PROVIDER: 'view_provider',
  ADD_FAVORITE: 'add_favorite',
  REMOVE_FAVORITE: 'remove_favorite',

  // Cotizaciones
  REQUEST_QUOTE: 'request_quote',
  SEND_QUOTE: 'send_quote',
  ACCEPT_QUOTE: 'accept_quote',
  REJECT_QUOTE: 'reject_quote',

  // Opiniones
  SUBMIT_REVIEW: 'submit_review',
  VIEW_REVIEWS: 'view_reviews',

  // Pagos
  INITIATE_PAYMENT: 'initiate_payment',
  COMPLETE_PAYMENT: 'complete_payment',
  FAILED_PAYMENT: 'failed_payment',

  // Mensajería
  SEND_MESSAGE: 'send_message',
  VIEW_CONVERSATION: 'view_conversation',

  // Contratos
  SIGN_CONTRACT: 'sign_contract',
  DOWNLOAD_CONTRACT: 'download_contract',

  // Errores
  PAGE_ERROR: 'page_error',
  API_ERROR: 'api_error',
} as const;

export const trackEvent = (
  eventName: string,
  eventData?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA4_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

export const trackConversion = (value: number, currency: string = 'CLP') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      value: value,
      currency: currency,
    });
  }
};
