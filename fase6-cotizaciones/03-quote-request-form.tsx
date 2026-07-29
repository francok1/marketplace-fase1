/**
 * Quote Request Form Component
 * Formulario para que clientes soliciten cotizaciones a proveedores
 *
 * Ubicación: components/marketplace/quote-request-form.tsx
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';
import { createQuoteRequestSchema, type CreateQuoteRequestInput } from '@/lib/validations/quote-validations';
import { createQuoteRequest } from '@/lib/services/quote-server-actions';
import { Button } from '@/components/ui/01-ui-button';
import { Input } from '@/components/ui/02-ui-input';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { cn } from '@/lib/utils/cn';

interface QuoteRequestFormProps {
  providerId: string;
  onSuccess?: (quoteRequestId: string) => void;
}

export function QuoteRequestForm({
  providerId,
  onSuccess,
}: QuoteRequestFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateQuoteRequestInput>({
    resolver: zodResolver(createQuoteRequestSchema),
    defaultValues: {
      providerId,
      budget: { min: 0, max: 100000 },
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Mock: En producción usar Uploadthing/Cloudinary
    const newFiles = Array.from(files).map(() =>
      'https://example.com/file-' + Math.random().toString(36).substr(2, 9)
    );

    setUploadedFiles([...uploadedFiles, ...newFiles].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CreateQuoteRequestInput) => {
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      const result = await createQuoteRequest({
        ...data,
        attachments: uploadedFiles,
      });

      if (result.success) {
        setSubmitStatus('success');
        reset();
        setUploadedFiles([]);

        setTimeout(() => {
          setSubmitStatus('idle');
          onSuccess?.(result.data?.quoteRequestId || '');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Solicitar Cotización
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Describe tu proyecto y recibe una propuesta personalizada
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título del Proyecto
            </label>
            <Input
              {...register('title')}
              placeholder="Ej: Remodelación de cocina"
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
              Descripción Detallada
            </label>
            <textarea
              {...register('description')}
              placeholder="Cuéntale al proveedor detalles sobre tu proyecto..."
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

          {/* Grid: Categoría y Presupuesto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categoría
              </label>
              <select
                {...register('category')}
                className={cn(
                  'w-full rounded-md border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-900 px-3 py-2 text-sm',
                  'text-gray-900 dark:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'disabled:opacity-50',
                  errors.category && 'border-red-500 focus:ring-red-500'
                )}
                disabled={isLoading}
              >
                <option value="">Seleccionar categoría...</option>
                <option value="construccion">Construcción</option>
                <option value="reparacion">Reparación</option>
                <option value="cleaning">Limpieza</option>
                <option value="electricidad">Electricidad</option>
                <option value="plomeria">Plomería</option>
                <option value="otros">Otros</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Presupuesto Mínimo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Presupuesto Mínimo (CLP)
              </label>
              <Input
                {...register('budget.min', { valueAsNumber: true })}
                type="number"
                placeholder="50000"
                className={cn(
                  'w-full',
                  errors.budget?.min && 'border-red-500 focus:ring-red-500'
                )}
                disabled={isLoading}
              />
              {errors.budget?.min && (
                <p className="text-sm text-red-500 mt-1">{errors.budget.min.message}</p>
              )}
            </div>
          </div>

          {/* Presupuesto Máximo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Presupuesto Máximo (CLP)
            </label>
            <Input
              {...register('budget.max', { valueAsNumber: true })}
              type="number"
              placeholder="500000"
              className={cn(
                'w-full',
                errors.budget?.max && 'border-red-500 focus:ring-red-500'
              )}
              disabled={isLoading}
            />
            {errors.budget?.max && (
              <p className="text-sm text-red-500 mt-1">{errors.budget.max.message}</p>
            )}
          </div>

          {/* Fecha Límite */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha Límite (Opcional)
            </label>
            <Input
              {...register('deadline')}
              type="datetime-local"
              className="w-full"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Fecha en que necesitas que se complete el trabajo
            </p>
          </div>

          {/* Requiere Visita Física */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('requiresPhysicalVisit')}
              id="requiresVisit"
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              disabled={isLoading}
            />
            <label
              htmlFor="requiresVisit"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Este trabajo requiere que el proveedor visite el sitio
            </label>
          </div>

          {/* Ubicación (si requiere visita) */}
          {/* Mostrar si requiresPhysicalVisit está checkeado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dirección
              </label>
              <Input
                {...register('location.address')}
                placeholder="Calle y número"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ciudad
              </label>
              <Input
                {...register('location.city')}
                placeholder="Santiago"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Región
              </label>
              <Input
                {...register('location.region')}
                placeholder="Metropolitana"
                className="w-full"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Archivos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Archivos Adjuntos (Máx 5)
            </label>

            {/* Upload Area */}
            <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 cursor-pointer transition">
              <div className="flex items-center justify-center">
                <Upload size={20} className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Haz clic para subir archivos
                </span>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                disabled={isLoading || uploadedFiles.length >= 5}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      Archivo {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                ¡Cotización solicitada! El proveedor te contactará pronto.
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
            {isLoading ? 'Enviando...' : 'Solicitar Cotización'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export type { QuoteRequestFormProps };
