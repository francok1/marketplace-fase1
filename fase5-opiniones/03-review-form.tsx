/**
 * Review Form Component
 * Formulario para crear/editar opiniones
 *
 * Uso:
 * <ReviewForm providerId="..." onSuccess={handleSuccess} />
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star, Upload, X, AlertCircle, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/01-ui-button';
import { Input } from '@/components/ui/02-ui-input';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Rating } from '@/components/ui/05-ui-rating';
import { cn } from '@/lib/utils/cn';

import {
  createReviewSchema,
  type CreateReviewInput,
} from './01-review-validations';
import { createReview } from './02-review-server-actions';

interface ReviewFormProps {
  providerId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ providerId, onSuccess }: ReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<CreateReviewInput>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      providerId,
      rating: 0,
      images: [],
    },
  });

  const onSubmit = async (data: CreateReviewInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createReview({
        ...data,
        rating,
        images: uploadedImages,
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        router.refresh();
      }, 2000);
    } catch (err) {
      setError('Error al publicar opinión');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      // TODO: Implementar upload real con UploadThing o Cloudinary
      // Por ahora, mock de URLs
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prev) => [...prev, ...newImages].slice(0, 5));
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6 pb-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            ¡Opinión publicada!
          </h3>
          <p className="text-sm text-green-800 dark:text-green-200">
            Gracias por compartir tu experiencia
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comparte tu experiencia
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Tu opinión ayuda a otros clientes a tomar mejores decisiones
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-100">{error}</p>
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              ¿Cuál es tu calificación?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    rating >= star
                      ? 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  <Star size={24} fill="currentColor" />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {rating > 0 ? `${rating} de 5 estrellas` : 'Selecciona tu calificación'}
            </p>
            {!rating && errors.root && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                Debes seleccionar una calificación
              </p>
            )}
          </div>

          {/* Title */}
          <Input
            type="text"
            placeholder="Título de tu opinión"
            label="Título"
            {...register('title')}
            error={errors.title?.message}
            disabled={isFormSubmitting}
          />

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tu opinión
            </label>
            <textarea
              placeholder="Cuéntanos sobre tu experiencia..."
              rows={5}
              {...register('content')}
              className={cn(
                'w-full rounded-md border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-900 px-3 py-2 text-base',
                'text-gray-900 dark:text-white',
                'placeholder:text-gray-500 dark:placeholder:text-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2',
                'disabled:opacity-50',
                errors.content && 'border-red-500'
              )}
              disabled={isFormSubmitting}
            />
            {errors.content && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Agregar fotos (opcional - máximo 5)
            </label>

            {/* Upload Area */}
            <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Haz click para subir imágenes
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading || uploadedImages.length >= 5}
                className="hidden"
              />
            </label>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                {uploadedImages.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200"
                  >
                    <img
                      src={image}
                      alt={`Upload ${idx}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImages((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={isSubmitting || isFormSubmitting}
            disabled={isSubmitting || isFormSubmitting || rating === 0}
          >
            Publicar opinión
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Al publicar, aceptas nuestras políticas de opiniones
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export type { ReviewFormProps };
