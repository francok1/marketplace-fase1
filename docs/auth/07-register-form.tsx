/**
 * Register Form Component
 * Formulario de registro con validación fuerte
 *
 * Uso:
 * <RegisterForm onSuccess={() => router.push('/dashboard')} />
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/01-ui-button';
import { Input } from '@/components/ui/02-ui-input';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Badge } from '@/components/ui/04-ui-badge';

import {
  registerSchema,
  type RegisterInput,
  validatePasswordStrength,
} from './04-auth-validations';
import { UserRole } from './01-auth-types';
import { cn } from '@/lib/utils/cn';

interface RegisterFormProps {
  onSuccess?: () => void;
  defaultRole?: UserRole;
}

export function RegisterForm({
  onSuccess,
  defaultRole = UserRole.CLIENT,
}: RegisterFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    isValid: false,
    errors: [] as string[],
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: defaultRole,
    },
  });

  const password = watch('password');

  // Validar fortaleza de contraseña en tiempo real
  React.useEffect(() => {
    if (password) {
      setPasswordStrength(validatePasswordStrength(password));
    }
  }, [password]);

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // Llamar a API de registro
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message ||
            'Error al registrar. Intenta con otro email.'
        );
        return;
      }

      setSuccess(true);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        onSuccess?.();
        router.push('/login?registered=true');
      }, 2000);
    } catch (err) {
      setError('Error inesperado al registrar');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Registro exitoso!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tu cuenta ha sido creada. Redirigiendo a login...
            </p>
            <Link href="/login">
              <Button>Ir a Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Crea tu cuenta
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Únete a nuestra comunidad
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-100">
                {error}
              </p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <Input
              type="text"
              placeholder="Juan Pérez"
              label="Nombre completo"
              icon={<User size={18} />}
              {...register('name')}
              error={errors.name?.message}
              disabled={isLoading || isSubmitting}
            />

            {/* Email */}
            <Input
              type="email"
              placeholder="tu@email.com"
              label="Email"
              icon={<Mail size={18} />}
              {...register('email')}
              error={errors.email?.message}
              disabled={isLoading || isSubmitting}
            />

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ¿Qué eres?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: UserRole.CLIENT, label: 'Cliente' },
                  { value: UserRole.PROVIDER, label: 'Proveedor' },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                      'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    )}
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register('role')}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <Input
                type="password"
                placeholder="••••••••"
                label="Contraseña"
                icon={<Lock size={18} />}
                {...register('password')}
                error={errors.password?.message}
                disabled={isLoading || isSubmitting}
              />

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex-1 h-1 rounded-full',
                          i < Math.ceil((5 - passwordStrength.errors.length) / 1.25)
                            ? 'bg-green-500'
                            : 'bg-gray-300 dark:bg-gray-700'
                        )}
                      />
                    ))}
                  </div>
                  <div className="space-y-1">
                    {passwordStrength.errors.length > 0 && (
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {passwordStrength.errors.map((error) => (
                          <li key={error} className="flex items-center gap-1">
                            <span className="text-red-500">✗</span>
                            {error}
                          </li>
                        ))}
                      </ul>
                    )}
                    {passwordStrength.isValid && (
                      <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <span>✓</span>
                        Contraseña fuerte
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <Input
              type="password"
              placeholder="••••••••"
              label="Confirmar contraseña"
              icon={<Lock size={18} />}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              disabled={isLoading || isSubmitting}
            />

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                {...register('acceptTerms')}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 mt-0.5"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Acepto los{' '}
                <Link
                  href="/terms"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  términos y condiciones
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.acceptTerms.message}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading || isSubmitting}
              disabled={isLoading || isSubmitting}
            >
              Crear cuenta
            </Button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link
              href="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Inicia sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export type { RegisterFormProps };
