'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (provider: 'google' | 'facebook' | 'apple') => {
    setLoading(true);
    await signIn(provider, { callbackUrl });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Tarjeta */}
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">💍</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">clubnovios</h1>
            <p className="text-gray-600 text-lg">Inicia sesión para planificar tu boda</p>
          </div>

          {/* Botones de OAuth */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleSignIn('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              <span className="text-2xl">🔍</span>
              Continuar con Google
            </button>

            <button
              onClick={() => handleSignIn('facebook')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              <span className="text-2xl">📘</span>
              Continuar con Facebook
            </button>

            <button
              onClick={() => handleSignIn('apple')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-50"
            >
              <span className="text-2xl">🍎</span>
              Continuar con Apple
            </button>
          </div>

          {/* Divisor */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">O</span>
            </div>
          </div>

          {/* Email Sign In */}
          <form className="space-y-4 mb-8">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none text-gray-900"
              />
            </div>

            <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-4 text-lg font-semibold">
              Continuar con Email
            </Button>
          </form>

          {/* Link a signup */}
          <div className="text-center">
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => router.push('/auth/signup')}
                className="text-yellow-600 font-semibold hover:text-yellow-700 transition"
              >
                Regístrate aquí
              </button>
            </p>
          </div>

          {/* Términos */}
          <div className="mt-10 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>
              Al continuar, aceptas nuestros{' '}
              <a href="/legal/terms" className="text-yellow-600 hover:underline">
                Términos de Servicio
              </a>{' '}
              y{' '}
              <a href="/legal/privacy" className="text-yellow-600 hover:underline">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="text-center mt-10 text-gray-600">
          <p className="text-sm">✨ Conecta con proveedores premium para tu boda</p>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <SignInForm />
    </Suspense>
  );
}
