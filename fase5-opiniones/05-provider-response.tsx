/**
 * Provider Response Component
 * Muestra la respuesta del proveedor a una opinión
 *
 * Uso:
 * <ProviderResponse response={response} isEditing={false} />
 */

'use client';

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Edit2, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/03-ui-card';
import { Button } from '@/components/ui/01-ui-button';
import { cn } from '@/lib/utils/cn';

interface Response {
  id: string;
  content: string;
  createdAt: Date;
}

interface ProviderResponseProps {
  response?: Response;
  canEdit?: boolean;
  onEdit?: (content: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading?: boolean;
}

export function ProviderResponse({
  response,
  canEdit = false,
  onEdit,
  onDelete,
  isLoading = false,
}: ProviderResponseProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(response?.content || '');

  if (!response) {
    return null;
  }

  const handleSave = async () => {
    if (!editContent.trim()) return;

    try {
      await onEdit?.(editContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating response:', error);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(response.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">
              Respuesta del proveedor
            </h4>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              {timeAgo}
            </p>
          </div>

          {canEdit && !isEditing && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="p-1 h-auto"
              >
                <Edit2 size={16} className="text-blue-600 dark:text-blue-400" />
              </Button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              className={cn(
                'w-full rounded-md border border-blue-300 dark:border-blue-700',
                'bg-white dark:bg-gray-900 px-3 py-2 text-sm',
                'text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'disabled:opacity-50'
              )}
              disabled={isLoading}
            />

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(response.content);
                }}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                disabled={isLoading || !editContent.trim()}
              >
                Guardar
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-blue-900 dark:text-blue-100 leading-relaxed">
            {response.content}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export type { ProviderResponseProps, Response };
