'use client';

import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { memo, useCallback } from 'react';

const NavbarComponent = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // Usar useCallback para evitar re-renders innecesarios
  const handleLogoClick = useCallback(() => router.push('/'), [router]);
  const handleSearchClick = useCallback(() => router.push('/search'), [router]);
  const handleDashboardClick = useCallback(() => router.push('/dashboard'), [router]);
  const handleSignInClick = useCallback(() => router.push('/auth/signin'), [router]);
  const handleSignUpClick = useCallback(() => router.push('/auth/signup'), [router]);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-opacity-95 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo clickeable */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 active:opacity-60 transition-all duration-200 cursor-pointer group"
        >
          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">💍</span>
          <div>
            <div className="text-2xl font-bold text-gray-900">clubnovios</div>
            <div className="text-xs text-gray-500 font-light">Encuentra tu boda perfecta</div>
          </div>
        </button>

        {/* Menu derecho */}
        <div className="flex gap-3 items-center">
          <button
            onClick={handleSearchClick}
            className="px-6 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Para Novios
          </button>

          {session ? (
            <>
              <button
                onClick={handleDashboardClick}
                className="px-6 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Mi Cuenta
              </button>
              <button
                onClick={() => signOut()}
                className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 hover:shadow-lg transition-all duration-200"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignInClick}
                className="px-6 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={handleSignUpClick}
                className="px-6 py-2.5 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl text-sm font-semibold hover:from-yellow-700 hover:to-yellow-800 hover:shadow-lg transition-all duration-200"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Memoizar el componente para evitar re-renders innecesarios
export const Navbar = memo(NavbarComponent);
