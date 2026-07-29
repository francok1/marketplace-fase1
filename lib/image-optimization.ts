// Optimizaciones de imágenes y assets

/**
 * Generar srcset optimizado para imágenes responsivas
 */
export function generateImageSrcSet(
  baseUrl: string,
  sizes: number[] = [320, 640, 1024, 1280, 1920]
) {
  return sizes.map(size => `${baseUrl}?w=${size}&q=75 ${size}w`).join(', ');
}

/**
 * Generar URL optimizada para Cloudinary
 */
export function getOptimizedImageUrl(url: string, options = {}) {
  const {
    width = 800,
    height = 600,
    quality = 75,
    format = 'auto',
  } = options as any;

  if (!url.includes('cloudinary')) {
    return url;
  }

  // Insertar transformaciones en la URL de Cloudinary
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    const transformations = `w_${width},h_${height},c_fill,q_${quality},f_${format}`;
    return `${parts[0]}/upload/${transformations}/${parts[1]}`;
  }

  return url;
}

/**
 * Lazy load images con Intersection Observer
 */
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Preload imágenes críticas
 */
export function preloadImage(src: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Defer off-screen images
 */
export function deferOffscreenImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.loading) {
      img.loading = 'lazy';
    }
  });
}
