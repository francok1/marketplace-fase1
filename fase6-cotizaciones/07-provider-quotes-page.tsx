/**
 * Provider Quotes Page
 * Dashboard de cotizaciones para proveedores
 *
 * Ubicación: app/(dashboard)/proveedor/cotizaciones/page.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Navbar } from '@/components/common/08-common-navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Button } from '@/components/ui/01-ui-button';
import { Badge } from '@/components/ui/04-ui-badge';
import { QuoteCard } from './05-quote-card';
import { getQuotes, getPendingQuoteRequests } from '@/lib/services/quote-server-actions';
import { QuoteStatus } from '@/lib/validations/quote-validations';
import { AlertCircle } from 'lucide-react';

interface Quote {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  taxIncluded: boolean;
  validUntil: Date;
  status: QuoteStatus;
  estimatedDuration?: {
    value: number;
    unit: string;
  };
  deliverables: any[];
  paymentTerms: string;
  createdAt: Date;
  client?: {
    name: string;
    avatar?: string;
  };
}

interface QuoteRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  budget?: {
    min: number;
    max: number;
  };
  deadline?: Date;
  createdAt: Date;
  client: {
    name: string;
    avatar?: string;
  };
}

const QUOTE_TABS = ['Enviadas', 'Aceptadas', 'Rechazadas'] as const;

export default function ProviderQuotesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeSection, setActiveSection] = useState<'requests' | 'quotes'>('requests');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // TODO: Usar providerId del usuario actual
      const providerId = 'mock-provider-id';

      const [quotesResult, requestsResult] = await Promise.all([
        getQuotes({
          providerId,
          sortBy: 'newest',
        }),
        getPendingQuoteRequests(providerId),
      ]);

      if (quotesResult.success) {
        setQuotes(quotesResult.data?.quotes || []);
      }

      if (requestsResult.success) {
        setRequests(requestsResult.data?.requests || []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    switch (selectedTab) {
      case 0:
        return quote.status === QuoteStatus.SENT;
      case 1:
        return quote.status === QuoteStatus.ACCEPTED;
      case 2:
        return quote.status === QuoteStatus.REJECTED;
      default:
        return true;
    }
  });

  const stats = {
    pending: requests.length,
    sent: quotes.filter(q => q.status === QuoteStatus.SENT).length,
    accepted: quotes.filter(q => q.status === QuoteStatus.ACCEPTED).length,
    totalValue: quotes
      .filter(q => q.status === QuoteStatus.ACCEPTED)
      .reduce((sum, q) => sum + q.amount, 0),
  };

  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cotizaciones
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona solicitudes y envía propuestas
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className={stats.pending > 0 ? 'ring-2 ring-orange-500' : ''}>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Por Responder
                </p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {stats.pending}
                  </p>
                  {stats.pending > 0 && (
                    <AlertCircle size={16} className="text-orange-500" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Enviadas
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {stats.sent}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Aceptadas
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {stats.accepted}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Valor Total
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                  ${(stats.totalValue / 1000).toFixed(0)}K
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setActiveSection('requests')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeSection === 'requests'
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                Solicitudes ({requests.length})
              </button>
              <button
                onClick={() => setActiveSection('quotes')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeSection === 'quotes'
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                Mis Cotizaciones ({quotes.length})
              </button>
            </div>
          </div>

          {/* Solicitudes Section */}
          {activeSection === 'requests' && (
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">Cargando solicitudes...</p>
                </div>
              ) : requests.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-400">
                      No hay solicitudes de cotización en este momento
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {request.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {request.client.name}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                              {request.description}
                            </p>

                            {request.budget && (
                              <div className="flex items-center gap-4 mt-3">
                                <Badge variant="default">
                                  ${request.budget.min.toLocaleString()} - ${request.budget.max.toLocaleString()}
                                </Badge>
                                <Badge variant="default">
                                  {request.category}
                                </Badge>
                              </div>
                            )}
                          </div>

                          <Button
                            variant="primary"
                            className="whitespace-nowrap"
                          >
                            Cotizar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Cotizaciones Section */}
          {activeSection === 'quotes' && (
            <div className="space-y-6">
              {/* Quote Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800">
                {QUOTE_TABS.map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTab(idx)}
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                      selectedTab === idx
                        ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Quotes List */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">Cargando cotizaciones...</p>
                </div>
              ) : filteredQuotes.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-400">
                      No tienes cotizaciones en esta categoría
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredQuotes.map((quote) => (
                    <QuoteCard
                      key={quote.id}
                      quote={quote}
                      showActions={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
