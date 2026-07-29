import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET: Obtener reseñas de un proveedor
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const providerId = searchParams.get('providerId');

    if (!providerId) {
      return NextResponse.json({ error: 'Falta providerId' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { providerId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST: Crear nueva reseña
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await req.json();
    const { providerId, title, content, rating } = data;

    if (!providerId || !title || !content || !rating) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const review = await prisma.review.create({
      data: {
        providerId,
        authorId: user.id,
        title,
        content,
        rating: Math.min(5, Math.max(1, rating)),
        verified: true,
      },
      include: {
        author: true,
      },
    });

    // Actualizar rating promedio del proveedor
    const reviews = await prisma.review.findMany({
      where: { providerId },
      select: { rating: true },
    });

    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    await prisma.provider.update({
      where: { id: providerId },
      data: {
        rating: parseFloat(avgRating.toFixed(1)),
        reviewCount: reviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Error al crear reseña' }, { status: 500 });
  }
}
