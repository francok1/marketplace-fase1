'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function QuotesPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('received');

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Cargando cotizaciones...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  // Mock data
  const receivedQuotes = [
    {
      id: '1',
      provider: 'Fotografía Artística Novios',
      category: 'Fotografía',
      amount: '$1.500.000',
      status: 'PENDING',
      date: '2024-07-10',
      expiresAt: '2024-07-17',
      description: 'Cobertura completa de 8 horas',
    },
    {
      id: '2',
      provider: 'Catering Gourmet',
      category: 'Catering',
      amount: '$800.000',
      status: 'ACCEPTED',
      date: '2024-07-08',
      expiresAt: '2024-07-15',
      description: 'Menú para 100 personas',
    },
    {
      id: '3',
      provider: 'Decoración Premium',
      category: 'Decoración',
      amount: '$1.200.000',
      status: 'REJECTED',
      date: '2024-07-05',
      expiresAt: '2024-07-12',
      description: 'Decoración de iglesia y salón',
    },
  ];

  const sentQuotes = [
    {
      id: '1',
      provider: 'DJ y Animación',
      category: 'Entretenimiento',
      status: 'PENDING',
      date: '2024-07-12',
      description: 'Música y animación para 8 horas',
    },
    {
      id: '2',
      provider: 'Florería Roses',
      category: 'Florería',
      status: 'PENDING',
      date: '2024-07-11',
      description: 'Ramo de novia y flores decorativas',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'EXPIRED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pendiente';
      case 'ACCEPTED':
        return 'Aceptada';
      case 'REJECTED':
        return 'Rechazada';
      case 'EXPIRED':
        return 'Expirada';
      default:
        return status;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Mis Cotizaciones</h1>
          <p className="text-gray-600 text-xl">Gestiona tus solicitudes y presupuestos</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 px-8 py-6 font-semibold text-center transition ${
                activeTab === 'received'
                  ? 'text-yellow-600 border-b-4 border-yellow-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cotizaciones Recibidas ({receivedQuotes.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex-1 px-8 py-6 font-semibold text-center transition ${
                activeTab === 'sent'
                  ? 'text-yellow-600 border-b-4 border-yellow-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Solicitudes Enviadas ({sentQuotes.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'received' && (
              <div className="space-y-6">
                {receivedQuotes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">📋</div>
                    <p className="text-gray-600 text-lg">No tienes cotizaciones recibidas</p>
                  </div>
                ) : (
                  receivedQuotes.map((quote) => (
                    <Card key={quote.id} className="border-0 hover:shadow-lg transition">
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                          {/* Proveedor */}
                          <div>
                            <p className="text-gray-600 text-sm mb-2">Proveedor</p>
                            <h3 className="font-bold text-gray-900 text-lg">{quote.provider}</h3>
                            <p className="text-gray-600 text-sm">{quote.category}</p>
                          </div>

                          {/* Descripción */}
                          <div>
                            <p className="text-gray-600 text-sm mb-2">Servicio</p>
                            <p className="font-semibold text-gray-900">{quote.description}</p>
                          </div>

                          {/* Monto */}
                          <div>
                            <p className="text-gray-600 text-sm mb-2">Presupuesto</p>
                            <p className="text-3xl font-bold text-yellow-600">{quote.amount}</p>
                          </div>

                          {/* Estado */}
                          <div>
                            <p className="text-gray-600 text-sm mb-2">Estado</p>
                            <Badge variant="success" className={getStatusColor(quote.status)}>
                              {getStatusText(quote.status)}
                            </Badge>
                            <p className="text-gray-600 text-xs mt-2">
                              Vence: {quote.expiresAt}
                            </p>
                          </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-4 flex-wrap border-t border-gray-200 pt-6">
                          {quote.status === 'PENDING' && (
                            <>
                              <Button className="bg-green-600 text-white hover:bg-green-700">
                                Aceptar
                              </Button>
                              <Button className="bg-red-600 text-white hover:bg-red-700">
                                Rechazar
                              </Button>
                            </>
                          )}
                          <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            Contactar Proveedor
                          </Button>
                          {quote.status === 'ACCEPTED' && (
                            <Button className="bg-yellow-600 text-white hover:bg-yellow-700">
                              Proceder al Pago
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'sent' && (
              <div className="space-y-6">
                {sentQuotes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">📤</div>
                    <p className="text-gray-600 text-lg">No has enviado solicitudes</p>
                    <Button className="bg-yellow-600 text-white hover:bg-yellow-700 mt-6 px-8 py-3">
                      Buscar Proveedores
                    </Button>
                  </div>
                ) : (
                  sentQuotes.map((quote) => (
                    <Card key={quote.id} className="border-0 hover:shadow-lg transition">
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                          {/* Proveedor */}
                          <div>
                            <p className="text-gray-600 text-sm mb-2">Proveedor Contactado</p>
                            <h3 className="font-bold text-gray-900 text-lg">{quote.provider}</h3>
                            <p className="text-gray-600 text-sm">{quote.category}</p>
                          </div>

                          {/* Descripción */}
                          <div>
                            <p className="text-gray-600 text-sm mb-2">Solicitud</p>
                            <p className="font-semibold text-gray-900">{quote.description}</p>
                          </div>

                          {/* Fecha */}
                          <div>
                            <p className="text-gray-600 text-sm mb-2">Fecha de Solicitud</p>
                            <p className="font-semibold text-gray-900">{quote.date}</p>
                          </div>

                          {/* Estado */}
                          <div>
                            <p className="text-gray-600 text-sm mb-2">Estado</p>
                            <Badge variant="success" className={getStatusColor(quote.status)}>
                              {getStatusText(quote.status)}
                            </Badge>
                            <p className="text-gray-600 text-xs mt-2">
                              Esperando respuesta...
                            </p>
                          </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-4 flex-wrap border-t border-gray-200 pt-6">
                          <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            Enviar Mensaje
                          </Button>
                          <button className="text-gray-600 hover:text-red-600 font-semibold">
                            Cancelar Solicitud
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <Card className="bg-yellow-50 border-2 border-yellow-200">
          <CardContent className="p-8">
            <div className="flex gap-6">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Consejo para obtener mejores cotizaciones</h3>
                <p className="text-gray-700">
                  Sé lo más específico posible en tu solicitud. Incluye detalles como fecha, cantidad de
                  personas y requisitos especiales. Los proveedores responden más rápido con información
                  clara.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
