// Prefetch de rutas críticas para mejor UX
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function usePrefetch() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch rutas críticas después de que la página se carga
    const timer = setTimeout(() => {
      // Rutas más visitadas
      router.prefetch('/search');
      router.prefetch('/auth/signin');
      router.prefetch('/auth/signup');
      router.prefetch('/provider/1');
    }, 2000); // Esperar 2 segundos después del load

    return () => clearTimeout(timer);
  }, [router]);
}

// Prefetch inline en componentes específicos
export function PrefetchLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const router = useRouter();

  const handleMouseEnter = () => {
    router.prefetch(href);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
