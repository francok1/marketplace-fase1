/**
 * Quote Form Component
 * Formulario para que proveedores creen cotizaciones
 *
 * Ubicación: components/marketplace/quote-form.tsx
 */

'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { createQuoteSchema, type CreateQuoteInput } from '@/lib/validations/quote-validations';
import { createQuote } from '@/lib/services/quote-server-actions';
import { Button } from '@/components/ui/01-ui-button';
import { Input } from '@/components/ui/02-ui-input';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { cn } from '@/lib/utils/cn';

interface QuoteFormProps {
  quoteRequestId: string;
  onSuccess?: (quoteId: string) => void;
}

export function QuoteForm({ quoteRequestId, onSuccess }: QuoteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<CreateQuoteInput>({
    resolver: zodResolver(createQuoteSchema),
    defaultValues: {
      quoteRequestId,
      currency: 'CLP',
      taxIncluded: false,
      paymentTerms: 'HALF_UPFRONT',
      deliverables: [{ name: '', description: '' }],
      attachments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'deliverables',
  });

  const onSubmit = async (data: CreateQuoteInput) => {
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      const result = await createQuote(data);

      if (result.success) {
        setSubmitStatus('success');
        reset();

        setTimeout(() => {
          setSubmitStatus('idle');
          onSuccess?.(result.data?.quoteId || '');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const amount = watch('amount');

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Crear Cotización
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Responde a la solicitud con una propuesta detallada
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título de la Cotización
            </label>
            <Input
              {...register('title')}
              placeholder="Ej: Remodelación cocina - Opción Premium"
              className={cn(
                'w-full',
                errors.title && 'border-red-500 focus:ring-red-500'
              )}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción de la Propuesta
            </label>
            <textarea
              {...register('description')}
              placeholder="Describe tu propuesta, metodología, materiales, etc."
              rows={5}
              className={cn(
                'w-full rounded-md border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-900 px-3 py-2 text-sm',
                'text-gray-900 dark:text-white placeholder-gray-500',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'disabled:opacity-50',
                errors.description && 'border-red-500 focus:ring-red-500'
              )}
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Grid: Monto y Moneda */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Monto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Monto
              </label>
              <Input
                {...register('amount', { valueAsNumber: true })}
                type="number"
                placeholder="500000"
                className={cn(
                  'w-full',
                  errors.amount && 'border-red-500 focus:ring-red-500'
                )}
                disabled={isLoading}
              />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
              )}
            </div>

            {/* Moneda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Moneda
              </label>
              <select
                {...register('currency')}
                className={cn(
                  'w-full rounded-md border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-900 px-3 py-2 text-sm',
                  'text-gray-900 dark:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
                disabled={isLoading}
              >
                <option value="CLP">CLP (Peso Chileno)</option>
                <option value="USD">USD (Dólar)</option>
                <option value="UYU">UYU (Peso Uruguayo)</option>
              </select>
            </div>
          </div>

          {/* Impuesto */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('taxIncluded')}
              id="taxIncluded"
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              disabled={isLoading}
            />
            <label
              htmlFor="taxIncluded"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Monto incluye IVA (19%)
            </label>
          </div>

          {/* Fecha Válida */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cotización válida hasta
            </label>
            <Input
              {...register('validUntil')}
              type="datetime-local"
              className="w-full"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Después de esta fecha, la cotización expira
            </p>
          </div>

          {/* Duración Estimada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duración (Valor)
              </label>
              <Input
                {...register('estimatedDuration.value', { valueAsNumber: true })}
                type="number"
                placeholder="7"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Unidad de Tiempo
              </label>
              <select
                {...register('estimatedDuration.unit')}
                className={cn(
                  'w-full rounded-md border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-900 px-3 py-2 text-sm',
                  'text-gray-900 dark:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
                disabled={isLoading}
              >
                <option value="HOURS">Horas</option>
                <option value="DAYS">Días</option>
                <option value="WEEKS">Semanas</option>
                <option value="MONTHS">Meses</option>
              </select>
            </div>
          </div>

          {/* Entregables */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Entregables
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => append({ name: '', description: '' })}
                disabled={isLoading}
              >
                <Plus size={16} className="mr-1" />
                Agregar
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, idx) => (
                <div key={field.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <div className="md:col-span-1">
                      <Input
                        {...register(`deliverables.${idx}.name`)}
                        placeholder="Nombre del entregable"
                        className="w-full"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Input
                        {...register(`deliverables.${idx}.description`)}
                        placeholder="Descripción (opcional)"
                        className="w-full"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(idx)}
                      disabled={isLoading}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {errors.deliverables && (
              <p className="text-sm text-red-500 mt-2">{errors.deliverables.message}</p>
            )}
          </div>

          {/* Términos de Pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Términos de Pago
            </label>
            <select
              {...register('paymentTerms')}
              className={cn(
                'w-full rounded-md border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-900 px-3 py-2 text-sm',
                'text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
              disabled={isLoading}
            >
              <option value="FULL_UPFRONT">100% por adelantado</option>
              <option value="HALF_UPFRONT">50% por adelantado, 50% al completar</option>
              <option value="ON_COMPLETION">100% al completar</option>
              <option value="INSTALLMENTS">Cuotas</option>
            </select>
          </div>

          {/* Notas Adicionales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notas Adicionales
            </label>
            <textarea
              {...register('notes')}
              placeholder="Observaciones, condiciones especiales, etc."
              rows={3}
              className={cn(
                'w-full rounded-md border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-900 px-3 py-2 text-sm',
                'text-gray-900 dark:text-white placeholder-gray-500',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'disabled:opacity-50'
              )}
              disabled={isLoading}
            />
          </div>

          {/* Messages */}
          {submitStatus === 'error' && (
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-200">{errorMessage}</p>
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700 dark:text-green-200">
                ¡Cotización enviada! El cliente la revisará y te contactará.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 size={16} className="mr-2 animate-spin" />}
            {isLoading ? 'Enviando...' : 'Enviar Cotización'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export type { QuoteFormProps };
