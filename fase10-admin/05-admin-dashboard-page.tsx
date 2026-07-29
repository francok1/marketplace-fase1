/**
 * Admin Dashboard Page - FASE 10
 * Ubicación: app/(dashboard)/admin/page.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Navbar } from '@/components/common/08-common-navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Button } from '@/components/ui/01-ui-button';
import { StatsCard } from './03-stats-card';
import { UsersTable } from './04-users-table';
import { getDashboardStats, getAdminUsers } from '@/lib/services/admin-server-actions';
import { Users, DollarSign, FileText, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsResult, usersResult] = await Promise.all([
        getDashboardStats(),
        getAdminUsers(1),
      ]);

      if (statsResult.success) {
        setStats(statsResult.data);
      }

      if (usersResult.success) {
        setUsers(usersResult.data?.users || []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Panel Administrativo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Gestiona tu plataforma desde aquí
            </p>
          </div>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatsCard
                title="Usuarios Totales"
                value={stats.totalUsers}
                change={12}
                icon={<Users size={24} />}
                color="blue"
              />
              <StatsCard
                title="Proveedores"
                value={stats.totalProviders}
                change={8}
                icon={<TrendingUp size={24} />}
                color="green"
              />
              <StatsCard
                title="Ingresos"
                value={`$${(stats.totalRevenue / 1000).toFixed(0)}K`}
                change={24}
                icon={<DollarSign size={24} />}
                color="purple"
              />
              <StatsCard
                title="Cotizaciones"
                value={stats.totalQuotes}
                change={-5}
                icon={<FileText size={24} />}
                color="orange"
              />
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
              <Button variant="primary" className="border-b-2 border-blue-500">
                Usuarios
              </Button>
              <Button variant="ghost">Moderación</Button>
              <Button variant="ghost">Reportes</Button>
              <Button variant="ghost">Categorías</Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Gestión de Usuarios
            </h2>
            <UsersTable users={users} isLoading={isLoading} />
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Actividad Reciente
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  No hay actividad reciente
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
