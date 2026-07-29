/**
 * Hook: useTheme
 * Maneja el tema (light/dark mode) de la aplicación
 * Persiste en localStorage y respeta preferencias del sistema
 *
 * Uso:
 * const { theme, toggleTheme, setTheme } = useTheme();
 */

'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Lee el tema guardado o detecta preferencia del sistema
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = stored || (prefersDark ? 'dark' : 'light');
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (nextTheme: Theme) => {
    const html = document.documentElement;

    if (nextTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem('theme', nextTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  };

  return {
    theme: isMounted ? theme : 'system',
    toggleTheme,
    setTheme,
    isMounted,
  };
}

export type { Theme };
