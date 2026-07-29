/**
 * Login Form Component
 * Formulario de login con email/password y OAuth
 *
 * Uso:
 * <LoginForm onSuccess={() => router.push('/dashboard')} />
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Loader } from 'lucide-react';

import { Button } from '@/components/ui/01-ui-button';
import { Input } from '@/components/ui/02-ui-input';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Badge } from '@/components/ui/04-ui-badge';

import { loginSchema, type LoginInput } from './04-auth-validations';
import { cn } from '@/lib/utils/cn';

interface LoginFormProps {
  onSuccess?: () => void;
  callbackUrl?: string;
}

export function LoginForm({
  onSuccess,
  callbackUrl = '/dashboard',
}: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // Login con credenciales
  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result?.ok) {
        setError(
          result?.error === 'CredentialsSignin'
            ? 'Email o contraseña incorrectos'
            : 'Error al iniciar sesión'
        );
        return;
      }

      onSuccess?.();
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError('Error inesperado al iniciar sesión');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // OAuth login handlers
  const handleOAuthSignIn = async (provider: 'google' | 'facebook' | 'apple') => {
    setOauthLoading(provider);
    setError(null);

    try {
      await signIn(provider, {
        callbackUrl,
        redirect: true,
      });
    } catch (err) {
      setError(`Error al conectar con ${provider}`);
      console.error(err);
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bienvenido
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Inicia sesión en tu cuenta
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-100">
                {error}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="tu@email.com"
                label="Email"
                icon={<Mail size={18} />}
                {...register('email')}
                error={errors.email?.message}
                disabled={isLoading || isSubmitting}
              />
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
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Recuérdame
              </span>
            </label>

            {/* Forgot password */}
            <Link href="/forgot-password">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-sm justify-start"
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Link>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading || isSubmitting}
              disabled={isLoading || isSubmitting}
            >
              Iniciar sesión
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                O continúa con
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {/* Google */}
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('google')}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2"
            >
              {oauthLoading === 'google' ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <span>Google</span>
              )}
            </Button>

            {/* Facebook */}
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('facebook')}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2"
            >
              {oauthLoading === 'facebook' ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <span>Facebook</span>
              )}
            </Button>

            {/* Apple */}
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('apple')}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2"
            >
              {oauthLoading === 'apple' ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <span>Apple</span>
              )}
            </Button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Regístrate aquí
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export type { LoginFormProps };
