/**
 * Quote Card Component
 * Componente para mostrar cotizaciones
 *
 * Ubicación: components/marketplace/quote-card.tsx
 */

'use client';

import React from 'react';
import { formatDistanceToNow, formatDate } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Badge } from '@/components/ui/04-ui-badge';
import { Button } from '@/components/ui/01-ui-button';
import { QuoteStatus } from '@/lib/validations/quote-validations';

interface Quote {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  taxIncluded: boolean;
  validUntil: Date;
  status: QuoteStatus;
  estimatedDuration?: {
    value: number;
    unit: string;
  };
  deliverables: Array<{
    name: string;
    description?: string;
  }>;
  paymentTerms: string;
  createdAt: Date;
  provider?: {
    name: string;
    avatar?: string;
  };
  client?: {
    name: string;
    avatar?: string;
  };
}

interface QuoteCardProps {
  quote: Quote;
  onAccept?: () => void;
  onReject?: () => void;
  onViewDetails?: () => void;
  showActions?: boolean;
  isLoading?: boolean;
}

const statusConfig = {
  [QuoteStatus.PENDING]: { color: 'default', icon: AlertCircle, label: 'Pendiente' },
  [QuoteStatus.SENT]: { color: 'default', icon: Clock, label: 'Enviada' },
  [QuoteStatus.ACCEPTED]: { color: 'success', icon: CheckCircle, label: 'Aceptada' },
  [QuoteStatus.REJECTED]: { color: 'error', icon: XCircle, label: 'Rechazada' },
  [QuoteStatus.CANCELLED]: { color: 'error', icon: XCircle, label: 'Cancelada' },
  [QuoteStatus.COMPLETED]: { color: 'success', icon: CheckCircle, label: 'Completada' },
};

const paymentTermsLabels: Record<string, string> = {
  FULL_UPFRONT: '100% por adelantado',
  HALF_UPFRONT: '50/50',
  ON_COMPLETION: 'Al completar',
  INSTALLMENTS: 'Cuotas',
};

const durationUnitLabels: Record<string, string> = {
  HOURS: 'horas',
  DAYS: 'días',
  WEEKS: 'semanas',
  MONTHS: 'meses',
};

export function QuoteCard({
  quote,
  onAccept,
  onReject,
  onViewDetails,
  showActions = true,
  isLoading = false,
}: QuoteCardProps) {
  const statusInfo = statusConfig[quote.status];
  const StatusIcon = statusInfo.icon;

  const isExpired = new Date() > new Date(quote.validUntil);
  const timeUntilExpiry = formatDistanceToNow(new Date(quote.validUntil), {
    addSuffix: true,
    locale: es,
  });

  const formattedAmount = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: quote.currency,
  }).format(quote.amount);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {quote.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Solicitada {formatDistanceToNow(new Date(quote.createdAt), {
                addSuffix: true,
                locale: es
              })}
            </p>
          </div>

          <Badge
            variant={statusInfo.color as any}
            className="flex items-center gap-1 whitespace-nowrap"
          >
            <StatusIcon size={14} />
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Monto y Términos */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Monto
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {formattedAmount}
            </p>
            {quote.taxIncluded && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Incluye IVA
              </p>
            )}
          </div>

          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Pago
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
              {paymentTermsLabels[quote.paymentTerms]}
            </p>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {quote.description}
          </p>
        </div>

        {/* Duración y Disponibilidad */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {quote.estimatedDuration && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {quote.estimatedDuration.value}{' '}
                {durationUnitLabels[quote.estimatedDuration.unit]}
              </span>
            </div>
          )}

          <div className={`flex items-center gap-2 ${isExpired ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
            <AlertCircle size={16} />
            <span>
              {isExpired ? 'Expirada' : `Expira ${timeUntilExpiry}`}
            </span>
          </div>
        </div>

        {/* Entregables */}
        {quote.deliverables.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
              Entregables ({quote.deliverables.length})
            </p>
            <ul className="space-y-1">
              {quote.deliverables.slice(0, 3).map((deliverable, idx) => (
                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                  • {deliverable.name}
                </li>
              ))}
              {quote.deliverables.length > 3 && (
                <li className="text-sm text-gray-500 dark:text-gray-400">
                  + {quote.deliverables.length - 3} más
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Actions */}
        {showActions && (quote.status === QuoteStatus.SENT || quote.status === QuoteStatus.PENDING) && (
          <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={onAccept}
              disabled={isLoading || isExpired}
            >
              Aceptar
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onReject}
              disabled={isLoading}
            >
              Rechazar
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={onViewDetails}
              disabled={isLoading}
            >
              Detalles
            </Button>
          </div>
        )}

        {showActions && [QuoteStatus.ACCEPTED, QuoteStatus.COMPLETED].includes(quote.status) && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={onViewDetails}
            disabled={isLoading}
          >
            Ver Detalles
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export type { QuoteCardProps };
