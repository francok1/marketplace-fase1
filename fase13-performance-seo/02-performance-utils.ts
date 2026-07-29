/**
 * Performance Utilities - FASE 13
 * Utilidades para optimización de performance
 */

// Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100, // First Input Delay (ms)
  INP: 200, // Interaction to Next Paint (ms)
  CLS: 0.1, // Cumulative Layout Shift
  TTFB: 600, // Time to First Byte (ms)
};

// Performance monitoring
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function rateWebVital(
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; needsImprovement: number }> =
    {
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      INP: { good: 200, needsImprovement: 500 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      TTFB: { good: 600, needsImprovement: 1200 },
    };

  const threshold = thresholds[name];
  if (!threshold) return 'needs-improvement';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

// Image optimization helpers
export function getOptimizedImageUrl(
  path: string,
  width: number,
  height?: number,
  quality: number = 75
): string {
  const params = new URLSearchParams({
    w: width.toString(),
    q: quality.toString(),
  });

  if (height) {
    params.set('h', height.toString());
  }

  return `${path}?${params.toString()}`;
}

export function getResponsiveImageSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
}

// Code splitting helpers
export const dynamicImportWithFallback = async (
  importFn: () => Promise<any>,
  fallback: any
) => {
  try {
    return await importFn();
  } catch (error) {
    console.error('Failed to load module:', error);
    return fallback;
  }
};

// Cache headers
export function getCacheHeaders(maxAge: number = 3600) {
  return {
    'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
  };
}

// Performance budgets
export const PERFORMANCE_BUDGETS = {
  js: 100, // KB
  css: 50, // KB
  images: 200, // KB per page
  totalSize: 300, // KB
};

// Lighthouse thresholds
export const LIGHTHOUSE_TARGETS = {
  performance: 90,
  accessibility: 90,
  best_practices: 90,
  seo: 90,
};
