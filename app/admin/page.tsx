'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  // Mock stats
  const stats = [
    { label: 'Usuarios Totales', value: '2,430', change: '+15%', icon: '👥' },
    { label: 'Proveedores Verificados', value: '850', change: '+8%', icon: '✅' },
    { label: 'Cotizaciones Este Mes', value: '1,240', change: '+25%', icon: '📋' },
    { label: 'Ingresos (CLP)', value: '$15.3M', change: '+32%', icon: '💰' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Panel de Administración</h1>
          <p className="text-gray-600 text-xl">Bienvenido, Administrador</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <Card key={idx} className="border-0">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-green-600 text-sm font-semibold">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gestión de Usuarios */}
          <Card className="border-0 hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-10">
              <div className="text-5xl mb-6">👥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Usuarios</h3>
              <p className="text-gray-600 mb-6">
                Administra todos los usuarios de la plataforma, permisos y roles.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3">
                  Ver Usuarios
                </Button>
                <p className="text-sm text-gray-600 text-center">Total: 2,430 usuarios activos</p>
              </div>
            </CardContent>
          </Card>

          {/* Gestión de Proveedores */}
          <Card className="border-0 hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-10">
              <div className="text-5xl mb-6">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verificación de Proveedores</h3>
              <p className="text-gray-600 mb-6">
                Revisa y verifica nuevos proveedores que solicitan acceso.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3">
                  Revisar Solicitudes
                </Button>
                <p className="text-sm text-gray-600 text-center">12 pendientes de verificación</p>
              </div>
            </CardContent>
          </Card>

          {/* Moderar Contenido */}
          <Card className="border-0 hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-10">
              <div className="text-5xl mb-6">🛡️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Moderación de Contenido</h3>
              <p className="text-gray-600 mb-6">
                Revisa reseñas, comentarios y contenido reportado.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3">
                  Moderar Contenido
                </Button>
                <p className="text-sm text-gray-600 text-center">5 reportes pendientes</p>
              </div>
            </CardContent>
          </Card>

          {/* Reportes */}
          <Card className="border-0 hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-10">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reportes y Análisis</h3>
              <p className="text-gray-600 mb-6">
                Visualiza estadísticas y métricas de la plataforma.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3">
                  Ver Reportes
                </Button>
                <p className="text-sm text-gray-600 text-center">Datos en tiempo real</p>
              </div>
            </CardContent>
          </Card>

          {/* Gestión de Pagos */}
          <Card className="border-0 hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-10">
              <div className="text-5xl mb-6">💳</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Pagos</h3>
              <p className="text-gray-600 mb-6">
                Revisa transacciones y disputas de pagos.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3">
                  Ver Transacciones
                </Button>
                <p className="text-sm text-gray-600 text-center">3 disputas activas</p>
              </div>
            </CardContent>
          </Card>

          {/* Soporte */}
          <Card className="border-0 hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-10">
              <div className="text-5xl mb-6">💬</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Centro de Soporte</h3>
              <p className="text-gray-600 mb-6">
                Gestiona tickets y solicitudes de soporte de usuarios.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3">
                  Ver Tickets
                </Button>
                <p className="text-sm text-gray-600 text-center">8 tickets sin resolver</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
