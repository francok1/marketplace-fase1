// Web Vitals tracking para monitorear performance
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric: any) {
  // En producción, enviar a un servicio de analytics
  if (typeof window !== 'undefined') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });

    // Opcional: Enviar a Vercel Analytics, Google Analytics, etc.
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.rating === 'good' ? metric.value : 0),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}

// Inicializar Web Vitals tracking
if (typeof window !== 'undefined') {
  getCLS(reportWebVitals);
  getFID(reportWebVitals);
  getFCP(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);
}
