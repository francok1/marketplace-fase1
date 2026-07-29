'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'couple' | 'provider' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (provider: 'google' | 'facebook' | 'apple') => {
    setLoading(true);
    const callbackUrl = userType ? `/onboarding?type=${userType}` : '/onboarding';
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
            <p className="text-gray-600 text-lg">Crea tu cuenta</p>
          </div>

          {/* Selección de tipo de usuario */}
          {!userType ? (
            <div className="space-y-4 mb-8">
              <div className="text-center mb-8">
                <p className="text-gray-700 font-semibold mb-6">¿Qué tipo de cuenta deseas crear?</p>
              </div>

              <button
                onClick={() => setUserType('couple')}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-yellow-600 hover:bg-yellow-50 transition text-center"
              >
                <div className="text-4xl mb-3">👰</div>
                <p className="font-bold text-gray-900 text-lg">Soy Pareja</p>
                <p className="text-gray-600 text-sm mt-2">Estoy planeando mi boda</p>
              </button>

              <button
                onClick={() => setUserType('provider')}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-yellow-600 hover:bg-yellow-50 transition text-center"
              >
                <div className="text-4xl mb-3">💼</div>
                <p className="font-bold text-gray-900 text-lg">Soy Proveedor</p>
                <p className="text-gray-600 text-sm mt-2">Ofrezco servicios para bodas</p>
              </button>
            </div>
          ) : (
            <>
              {/* Botones de OAuth */}
              <div className="space-y-4 mb-8">
                <div className="text-center mb-6">
                  <p className="text-gray-700 font-semibold">
                    Registrarte como {userType === 'couple' ? 'Pareja' : 'Proveedor'}
                  </p>
                </div>

                <button
                  onClick={() => handleSignUp('google')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                >
                  <span className="text-2xl">🔍</span>
                  Google
                </button>

                <button
                  onClick={() => handleSignUp('facebook')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <span className="text-2xl">📘</span>
                  Facebook
                </button>

                <button
                  onClick={() => handleSignUp('apple')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-50"
                >
                  <span className="text-2xl">🍎</span>
                  Apple
                </button>
              </div>

              {/* Botón para cambiar */}
              <button
                onClick={() => setUserType(null)}
                className="w-full text-yellow-600 font-semibold hover:text-yellow-700 transition py-2"
              >
                Cambiar tipo de cuenta
              </button>
            </>
          )}

          {/* Link a signin */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => router.push('/auth/signin')}
                className="text-yellow-600 font-semibold hover:text-yellow-700 transition"
              >
                Inicia sesión
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
      </div>
    </main>
  );
}
