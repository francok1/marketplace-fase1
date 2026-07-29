/**
 * useAnalytics Hook - FASE 11
 * Hook para tracking de eventos
 */

'use client';

import { useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  trackEvent,
  trackPageView,
  ANALYTICS_EVENTS,
} from '@/lib/analytics/analytics-config';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    trackPageView(pathname, document.title);
  }, [pathname]);

  // Track custom events
  const trackSearch = useCallback((query: string, category?: string) => {
    trackEvent(ANALYTICS_EVENTS.SEARCH, {
      search_term: query,
      category: category,
    });
  }, []);

  const trackProviderView = useCallback((providerId: string, name?: string) => {
    trackEvent(ANALYTICS_EVENTS.VIEW_PROVIDER, {
      provider_id: providerId,
      provider_name: name,
    });
  }, []);

  const trackFavorite = useCallback(
    (providerId: string, action: 'add' | 'remove') => {
      trackEvent(
        action === 'add'
          ? ANALYTICS_EVENTS.ADD_FAVORITE
          : ANALYTICS_EVENTS.REMOVE_FAVORITE,
        {
          provider_id: providerId,
        }
      );
    },
    []
  );

  const trackQuoteRequest = useCallback((quoteId: string, amount: number) => {
    trackEvent(ANALYTICS_EVENTS.REQUEST_QUOTE, {
      quote_id: quoteId,
      amount: amount,
    });
  }, []);

  const trackReview = useCallback((providerId: string, rating: number) => {
    trackEvent(ANALYTICS_EVENTS.SUBMIT_REVIEW, {
      provider_id: providerId,
      rating: rating,
    });
  }, []);

  const trackPayment = useCallback(
    (amount: number, status: 'initiated' | 'completed' | 'failed') => {
      const eventMap = {
        initiated: ANALYTICS_EVENTS.INITIATE_PAYMENT,
        completed: ANALYTICS_EVENTS.COMPLETE_PAYMENT,
        failed: ANALYTICS_EVENTS.FAILED_PAYMENT,
      };

      trackEvent(eventMap[status], {
        amount: amount,
      });
    },
    []
  );

  return {
    trackSearch,
    trackProviderView,
    trackFavorite,
    trackQuoteRequest,
    trackReview,
    trackPayment,
  };
}
