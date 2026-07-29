/**
 * Checkout Form Component
 * Formulario de pago con Stripe
 *
 * Ubicación: components/payments/checkout-form.tsx
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Button } from '@/components/ui/01-ui-button';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  quoteId: string;
  amount: number;
  currency?: string;
  onSuccess?: () => void;
}

export function CheckoutForm({
  quoteId,
  amount,
  currency = 'CLP',
  onSuccess,
}: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
    setIsLoading(true);
    setStatus('idle');

    try {
      // TODO: Implementar Stripe Elements o Stripe.js
      // TODO: Crear PaymentIntent
      // TODO: Confirmar pago
      // TODO: Manejar respuesta

      setStatus('success');
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Error al procesar el pago');
    } finally {
      setIsLoading(false);
    }
  };

  const formattedAmount = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency,
  }).format(amount);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Confirmar Pago
        </h3>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Resumen */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Monto a pagar:</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formattedAmount}
            </span>
          </div>
        </div>

        {/* Stripe Elements aquí */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 min-h-12 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Elementos de pago de Stripe
          </p>
        </div>

        {/* Messages */}
        {status === 'error' && (
          <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-200">{errorMessage}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
            <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700 dark:text-green-200">
              ¡Pago procesado exitosamente!
            </p>
          </div>
        )}

        {/* Button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading && <Loader2 size={16} className="mr-2 animate-spin" />}
          {isLoading ? 'Procesando...' : `Pagar ${formattedAmount}`}
        </Button>

        {/* Aviso seguridad */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          💳 Tu información de pago es procesada de forma segura por Stripe
        </p>
      </CardContent>
    </Card>
  );
}

export type { CheckoutFormProps };
