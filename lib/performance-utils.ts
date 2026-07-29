/**
 * Utilidades de performance y optimización
 */

/**
 * Debounce para funciones que se ejecutan frecuentemente
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle para funciones que se ejecutan frecuentemente
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Memoización simple para funciones puras
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Detectar conexión lenta y ajustar carga de recursos
 */
export function getConnectionSpeed(): 'slow' | 'fast' | 'unknown' {
  if (typeof navigator === 'undefined') return 'unknown';

  const connection = (navigator as any).connection || (navigator as any).mozConnection;
  if (!connection) return 'unknown';

  const effectiveType = connection.effectiveType;
  return effectiveType === '4g' ? 'fast' : effectiveType === 'slow-2g' || effectiveType === '2g' ? 'slow' : 'fast';
}

/**
 * Lazy load scripts
 */
export function lazyLoadScript(src: string, attributes: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = src;
  script.defer = true;

  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.body.appendChild(script);
}

/**
 * Request Idle Callback para tareas no-críticas
 */
export function scheduleIdleTask(callback: () => void) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback);
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * Medir tiempo de ejecución de una función
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  console.log(`${name} took ${(end - start).toFixed(2)}ms`);
  return result;
}

/**
 * Batch actualizar el DOM
 */
export function batchUpdates(updates: (() => void)[]) {
  if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  } else {
    updates.forEach(update => update());
  }
}
