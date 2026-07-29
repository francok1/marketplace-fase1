import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe, createPaymentIntent } from '@/lib/stripe';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// POST: Crear intención de pago
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await req.json();
    const { quoteId, amount } = data;

    if (!quoteId || !amount) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
    });

    if (!quote) {
      return NextResponse.json({ error: 'Cotización no encontrada' }, { status: 404 });
    }

    const paymentIntent = await createPaymentIntent(amount, {
      quoteId,
      userId: user.id,
      providerId: quote.providerId,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Error al crear intención de pago' }, { status: 500 });
  }
}

// POST: Confirmar pago y actualizar cotización
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await req.json();
    const { paymentIntentId, quoteId } = data;

    if (!paymentIntentId || !quoteId) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Pago no completado' }, { status: 400 });
    }

    const quote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        status: 'ACCEPTED',
      },
      include: {
        provider: true,
        client: true,
      },
    });

    // TODO: Enviar email de confirmación de pago

    return NextResponse.json({
      message: 'Pago completado exitosamente',
      quote,
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json({ error: 'Error al confirmar pago' }, { status: 500 });
  }
}
