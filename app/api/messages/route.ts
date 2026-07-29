import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET: Obtener mensajes de una conversación
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const conversationWith = searchParams.get('conversationWith');

    if (!conversationWith) {
      return NextResponse.json({ error: 'Falta conversationWith' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: user.id, recipientId: conversationWith },
          { senderId: conversationWith, recipientId: user.id },
        ],
      },
      include: {
        sender: true,
        recipient: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 50,
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST: Enviar nuevo mensaje
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await req.json();
    const { recipientId, content } = data;

    if (!recipientId || !content) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const sender = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!sender) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        senderId: sender.id,
        recipientId,
        content,
      },
      include: {
        sender: true,
        recipient: true,
      },
    });

    // TODO: Emitir evento de Socket.io para notificar en tiempo real
    // io.to(recipientId).emit('new_message', message);

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Error al enviar mensaje' }, { status: 500 });
  }
}

// PATCH: Marcar mensaje como leído
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await req.json();
    const { messageId } = data;

    const message = await prisma.message.update({
      where: { id: messageId },
      data: { read: true },
      include: {
        sender: true,
        recipient: true,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Error al actualizar mensaje' }, { status: 500 });
  }
}
