/**
 * Users Management Table - FASE 10
 */

'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { MoreVertical, Shield, Ban, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/03-ui-card';
import { Badge } from '@/components/ui/04-ui-badge';
import { Button } from '@/components/ui/01-ui-button';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'PROVIDER' | 'CLIENT';
  status: 'ACTIVE' | 'SUSPENDED' | 'BLOCKED';
  joinedAt: Date;
  lastLogin?: Date;
}

interface UsersTableProps {
  users: User[];
  onSuspend?: (userId: string) => void;
  onEmail?: (userId: string) => void;
  isLoading?: boolean;
}

const roleLabels: Record<string, string> = {
  ADMIN: 'Administrador',
  PROVIDER: 'Proveedor',
  CLIENT: 'Cliente',
};

const statusColors: Record<string, any> = {
  ACTIVE: 'success',
  SUSPENDED: 'warning',
  BLOCKED: 'error',
};

export function UsersTable({
  users,
  onSuspend,
  onEmail,
  isLoading = false,
}: UsersTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Usuario
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Rol
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Estado
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Última actividad
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-600 dark:text-gray-400">
                    No hay usuarios
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="default">
                        {roleLabels[user.role]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusColors[user.status] as any}>
                        {user.status === 'ACTIVE' && 'Activo'}
                        {user.status === 'SUSPENDED' && 'Suspendido'}
                        {user.status === 'BLOCKED' && 'Bloqueado'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                      {user.lastLogin
                        ? formatDistanceToNow(new Date(user.lastLogin), {
                            addSuffix: true,
                            locale: es,
                          })
                        : 'Nunca'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.role !== 'ADMIN' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSuspend?.(user.id)}
                            disabled={isLoading}
                            title="Suspender usuario"
                          >
                            <Ban size={16} />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEmail?.(user.id)}
                          disabled={isLoading}
                          title="Enviar email"
                        >
                          <Mail size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" disabled={isLoading}>
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export type { UsersTableProps };
