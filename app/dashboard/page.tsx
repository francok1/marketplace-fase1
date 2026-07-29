'use client';

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'Usuario'}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Bienvenido, {session.user?.name}
                </h1>
                <p className="text-gray-600 text-lg">{session.user?.email}</p>
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-3"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mi Perfil */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Mi Perfil</h2>
            <p className="text-gray-600 mb-6">Completa tu información personal</p>
            <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700">
              Editar Perfil
            </Button>
          </div>

          {/* Mis Cotizaciones */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Mis Cotizaciones</h2>
            <p className="text-gray-600 mb-6">Ver y gestionar tus solicitudes</p>
            <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700">
              Ver Cotizaciones
            </Button>
          </div>

          {/* Mensajes */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Mensajes</h2>
            <p className="text-gray-600 mb-6">Comunícate con proveedores</p>
            <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700">
              Ir a Mensajes
            </Button>
          </div>

          {/* Favoritos */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="text-4xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Favoritos</h2>
            <p className="text-gray-600 mb-6">Tus proveedores guardados</p>
            <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700">
              Ver Favoritos
            </Button>
          </div>

          {/* Búsqueda */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Buscar</h2>
            <p className="text-gray-600 mb-6">Encuentra nuevos proveedores</p>
            <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700">
              Buscar Ahora
            </Button>
          </div>

          {/* Configuración */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Configuración</h2>
            <p className="text-gray-600 mb-6">Ajusta tus preferencias</p>
            <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700">
              Configuración
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
