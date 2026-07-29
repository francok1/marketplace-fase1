/**
 * Register API Route
 * Endpoint: POST /api/auth/register
 * Maneja el registro de nuevos usuarios
 *
 * Ubicación: app/api/auth/register/route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { registerSchema } from '@/lib/validations/auth';
import { hashPassword } from '@/lib/auth/password';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // 1. Parsear y validar datos
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const { name, email, password, role } = validatedData;

    // 2. Verificar si email ya existe
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Este email ya está registrado' },
        { status: 409 }
      );
    }

    // 3. Hashear contraseña
    const hashedPassword = await hashPassword(password);

    // 4. Crear usuario en BD
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        emailVerified: null, // Sin verificar al inicio (opcional)
      },
    });

    // 5. Enviar email de bienvenida (opcional)
    // await sendWelcomeEmail(user.email, user.name);

    // 6. Responder exitosamente
    return NextResponse.json(
      {
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Manejar errores de validación
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Datos inválidos',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // Manejar otros errores
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}

// Método GET devuelve 405 Not Allowed
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
