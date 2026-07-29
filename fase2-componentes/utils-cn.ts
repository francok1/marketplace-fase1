/**
 * Utility: cn (classnames)
 * Merge Tailwind CSS classes sin conflictos
 * Basado en clsx + tailwind-merge
 *
 * Uso:
 * cn('px-4 py-2', 'px-8')  // → 'px-8 py-2' (resuelve conflicto)
 * cn('flex', condition && 'hidden')  // → Clases condicionales
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
