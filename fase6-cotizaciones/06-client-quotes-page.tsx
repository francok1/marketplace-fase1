/**
 * Client Quotes Page
 * Dashboard de cotizaciones para clientes
 *
 * Ubicación: app/(dashboard)/cliente/cotizaciones/page.tsx
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Navbar } from '@/components/common/08-common-navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/03-ui-card';
import { Button } from '@/components/ui/01-ui-button';
import { QuoteCard } from './05-quote-card';
import { getQuotes, respondToQuote } from '@/lib/services/quote-server-actions';
import { QuoteStatus } from '@/lib/validations/quote-validations';

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
  provider?: {
    name: string;
    avatar?: string;
  };
}

const TABS = ['Todas', 'Pendientes', 'Aceptadas', 'Rechazadas'] as const;

export default function ClientQuotesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [responseLoading, setResponseLoading] = useState<string | null>(null);

  useEffect(() => {
    loadQuotes();
  }, [selectedTab]);

  const loadQuotes = async () => {
    setIsLoading(true);
    try {
      // TODO: Usar clientId del usuario actual
      const result = await getQuotes({
        clientId: 'mock-client-id',
        sortBy: 'newest',
      });

      if (result.success) {
        setQuotes(result.data?.quotes || []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (quoteId: string) => {
    setResponseLoading(quoteId);
    try {
      const result = await respondToQuote({
        quoteId,
        status: 'ACCEPTED',
        message: 'Acepto tu propuesta',
      });

      if (result.success) {
        await loadQuotes();
      }
    } finally {
      setResponseLoading(null);
    }
  };

  const handleReject = async (quoteId: string) => {
    setResponseLoading(quoteId);
    try {
      const result = await respondToQuote({
        quoteId,
        status: 'REJECTED',
        message: 'He decidido no continuar con esta propuesta',
      });

      if (result.success) {
        await loadQuotes();
      }
    } finally {
      setResponseLoading(null);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    switch (selectedTab) {
      case 1:
        return quote.status === QuoteStatus.SENT || quote.status === QuoteStatus.PENDING;
      case 2:
        return quote.status === QuoteStatus.ACCEPTED;
      case 3:
        return quote.status === QuoteStatus.REJECTED;
      default:
        return true;
    }
  });

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === QuoteStatus.SENT || q.status === QuoteStatus.PENDING).length,
    accepted: quotes.filter(q => q.status === QuoteStatus.ACCEPTED).length,
    totalAmount: quotes
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mis Cotizaciones
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona las propuestas que has recibido de proveedores
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Total
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.total}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Pendientes
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                  {stats.pending}
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
                  Monto Total
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                  ${(stats.totalAmount / 1000).toFixed(0)}K
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800">
              {TABS.map((tab, idx) => (
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
          </div>

          {/* Quotes List */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Cargando cotizaciones...</p>
            </div>
          ) : filteredQuotes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedTab === 0
                    ? 'No tienes cotizaciones todavía'
                    : `No tienes cotizaciones ${TABS[selectedTab].toLowerCase()}`}
                </p>
                <Button variant="primary">
                  Buscar Proveedores
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredQuotes.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  onAccept={() => handleAccept(quote.id)}
                  onReject={() => handleReject(quote.id)}
                  isLoading={responseLoading === quote.id}
                  showActions={[QuoteStatus.SENT, QuoteStatus.PENDING].includes(quote.status)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
