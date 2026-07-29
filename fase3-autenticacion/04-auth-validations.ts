/**
 * Auth Validations
 * Esquemas Zod para validar credenciales y registro
 */

import { z } from 'zod';
import { UserRole } from './01-auth-types';

// ============================================================================
// LOGIN
// ============================================================================
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email es requerido')
    .email('Email inválido')
    .toLowerCase(),

  password: z
    .string()
    .min(1, 'Contraseña es requerida')
    .min(6, 'Contraseña muy corta'),

  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ============================================================================
// REGISTER
// ============================================================================
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Nombre muy corto')
      .max(100, 'Nombre muy largo')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Nombre debe contener solo letras'),

    email: z
      .string()
      .min(1, 'Email es requerido')
      .email('Email inválido')
      .toLowerCase(),

    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener mayúscula')
      .regex(/[a-z]/, 'Debe contener minúscula')
      .regex(/[0-9]/, 'Debe contener número')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Debe contener carácter especial'
      ),

    confirmPassword: z
      .string()
      .min(1, 'Confirmación requerida'),

    role: z.nativeEnum(UserRole).default(UserRole.CLIENT),

    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Debes aceptar los términos y condiciones',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// ============================================================================
// FORGOT PASSWORD
// ============================================================================
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email es requerido')
    .email('Email inválido')
    .toLowerCase(),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ============================================================================
// RESET PASSWORD
// ============================================================================
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener mayúscula')
      .regex(/[a-z]/, 'Debe contener minúscula')
      .regex(/[0-9]/, 'Debe contener número')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Debe contener carácter especial'
      ),

    confirmPassword: z
      .string()
      .min(1, 'Confirmación requerida'),

    token: z.string().min(1, 'Token requerido'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ============================================================================
// VERIFY EMAIL
// ============================================================================
export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Token requerido'),
  email: z
    .string()
    .email('Email inválido')
    .toLowerCase(),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

// ============================================================================
// UPDATE PROFILE
// ============================================================================
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Nombre muy corto')
    .max(100, 'Nombre muy largo')
    .optional(),

  email: z
    .string()
    .email('Email inválido')
    .toLowerCase()
    .optional(),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Teléfono inválido')
    .optional()
    .or(z.literal('')),

  avatar: z
    .string()
    .url('URL de avatar inválida')
    .optional()
    .or(z.literal('')),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// ============================================================================
// CHANGE PASSWORD
// ============================================================================
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Contraseña actual requerida'),

    newPassword: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener mayúscula')
      .regex(/[a-z]/, 'Debe contener minúscula')
      .regex(/[0-9]/, 'Debe contener número')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Debe contener carácter especial'
      ),

    confirmPassword: z
      .string()
      .min(1, 'Confirmación requerida'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Nueva contraseña debe ser diferente',
    path: ['newPassword'],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
