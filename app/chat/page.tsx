'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Cargando mensajes...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  // Mock data
  const conversations = [
    {
      id: '1',
      name: 'Fotografía Artística Novios',
      lastMessage: 'Perfecto, te confirmo la fecha...',
      timestamp: '2024-07-15 14:30',
      unread: 2,
      avatar: '📸',
    },
    {
      id: '2',
      name: 'Catering Gourmet',
      lastMessage: 'Claro, podemos hacer el menú personalizado',
      timestamp: '2024-07-15 10:15',
      unread: 0,
      avatar: '🍽️',
    },
    {
      id: '3',
      name: 'Decoración Premium',
      lastMessage: 'Mira estas opciones de flores',
      timestamp: '2024-07-14 16:45',
      unread: 1,
      avatar: '💐',
    },
  ];

  const messages = [
    {
      id: '1',
      sender: 'provider',
      name: 'Fotografía Artística Novios',
      content: 'Hola! Gracias por tu solicitud. Me encantaría fotografiar tu boda.',
      timestamp: '2024-07-15 09:00',
    },
    {
      id: '2',
      sender: 'user',
      name: 'Tú',
      content:
        'Hola! Claro, nos gustaría saber más sobre tus paquetes y disponibilidad.',
      timestamp: '2024-07-15 09:15',
    },
    {
      id: '3',
      sender: 'provider',
      name: 'Fotografía Artística Novios',
      content:
        'Tengo tres opciones: cobertura de 4 horas, 8 horas o full day. Cuál te interesa?',
      timestamp: '2024-07-15 09:30',
    },
    {
      id: '4',
      sender: 'user',
      name: 'Tú',
      content: 'La de 8 horas nos vendría bien. Para el 20 de septiembre estarías disponible?',
      timestamp: '2024-07-15 10:00',
    },
    {
      id: '5',
      sender: 'provider',
      name: 'Fotografía Artística Novios',
      content: 'Perfecto, te confirmo la fecha para ese día. Te envío el cotización formal.',
      timestamp: '2024-07-15 14:30',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      console.log('Mensaje enviado:', messageText);
      setMessageText('');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Mensajes</h1>
          <p className="text-gray-600 text-xl">Comunícate directamente con los proveedores</p>
        </div>

        {/* Chat Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[600px]">
          {/* Conversaciones */}
          <Card className="lg:col-span-1 border-0 overflow-hidden">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="font-bold text-gray-900 text-lg">Conversaciones</h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full text-left p-4 border-b border-gray-200 transition ${
                      selectedConversation === conv.id
                        ? 'bg-yellow-50 border-l-4 border-l-yellow-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{conv.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{conv.name}</p>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-1">{conv.timestamp}</p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="lg:col-span-3 border-0 overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-white">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {conversations.find((c) => c.id === selectedConversation)?.name}
                  </h3>
                </div>

                {/* Messages */}
                <CardContent className="flex-1 p-6 overflow-y-auto bg-gray-50">
                  <div className="space-y-6">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-sm p-4 rounded-2xl ${
                            msg.sender === 'user'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm mb-2">{msg.content}</p>
                          <p className={`text-xs ${msg.sender === 'user' ? 'text-yellow-100' : 'text-gray-500'}`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full focus:border-yellow-600 focus:outline-none"
                    />
                    <Button
                      type="submit"
                      className="bg-yellow-600 text-white hover:bg-yellow-700 rounded-full px-6 py-3"
                    >
                      Enviar
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <div className="text-center">
                  <div className="text-5xl mb-4">💬</div>
                  <p className="text-gray-600">Selecciona una conversación</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
