'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
}

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
}

interface Provider {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  verified: boolean;
  premium: boolean;
  description: string;
  price: string;
  yearsExperience: number;
  servicesCount: number;
  responseTime: string;
  phone: string;
  email: string;
  website: string;
  portfolio: PortfolioItem[];
  services: Service[];
  reviewsList: Review[];
}

export default function ClientProviderProfile({ provider }: { provider: Provider }) {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-12 mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-10 mb-8">
            <div className="text-8xl">{provider.image}</div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <h1 className="text-4xl font-bold text-gray-900">{provider.name}</h1>
                {provider.verified && <Badge variant="success">Verificado</Badge>}
                {provider.premium && <Badge variant="success">Premium</Badge>}
              </div>
              <p className="text-gray-600 text-lg mb-6">
                {provider.category} • {provider.location}
              </p>
              <div className="flex items-center gap-6 flex-wrap mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">★★★★★</span>
                    <span className="font-bold text-gray-900 text-lg">{provider.rating}</span>
                    <span className="text-gray-600">({provider.reviews} reseñas)</span>
                  </div>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">{provider.servicesCount}+</span> bodas realizadas
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Button className="bg-yellow-600 text-white hover:bg-yellow-700 px-8 py-3">
                  Solicitar Cotización
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
                  Enviar Mensaje
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="flex border-b border-gray-200 flex-wrap">
            {['about', 'portfolio', 'services', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-8 py-6 font-semibold text-center transition min-w-40 ${
                  activeTab === tab
                    ? 'text-yellow-600 border-b-4 border-yellow-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'about' && 'Acerca de'}
                {tab === 'portfolio' && 'Portafolio'}
                {tab === 'services' && 'Servicios'}
                {tab === 'reviews' && 'Reseñas'}
              </button>
            ))}
          </div>

          <div className="p-12">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sobre nosotros</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{provider.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-gray-50 border-0">
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="text-4xl font-bold text-yellow-600 mb-2">
                        {provider.yearsExperience}+
                      </div>
                      <p className="text-gray-600">Años de experiencia</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 border-0">
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="text-4xl font-bold text-yellow-600 mb-2">
                        {provider.servicesCount}+
                      </div>
                      <p className="text-gray-600">Bodas realizadas</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 border-0">
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="text-4xl font-bold text-yellow-600 mb-2">{provider.rating}</div>
                      <p className="text-gray-600">Rating promedio</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 border-0">
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="text-2xl mb-2">📞</div>
                      <p className="text-gray-600 text-sm">{provider.responseTime}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">📞</span>
                      <a
                        href={`tel:${provider.phone}`}
                        className="text-yellow-600 hover:underline text-lg"
                      >
                        {provider.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">✉️</span>
                      <a
                        href={`mailto:${provider.email}`}
                        className="text-yellow-600 hover:underline text-lg"
                      >
                        {provider.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">🌐</span>
                      <a
                        href={`https://${provider.website}`}
                        target="_blank"
                        className="text-yellow-600 hover:underline text-lg"
                      >
                        {provider.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Nuestro Trabajo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {provider.portfolio.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-xl transition border-0">
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 h-48 flex items-center justify-center">
                        <div className="text-6xl">{item.image}</div>
                      </div>
                      <CardContent className="p-6">
                        <p className="font-semibold text-gray-900">{item.title}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Nuestros Servicios</h3>
                <div className="space-y-4">
                  {provider.services.map((service) => (
                    <Card key={service.id} className="border-0 hover:shadow-lg transition">
                      <CardContent className="p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-2">{service.name}</h4>
                          <p className="text-gray-600">{service.duration}</p>
                        </div>
                        <div className="text-right mt-4 sm:mt-0">
                          <p className="text-3xl font-bold text-yellow-600">{service.price}</p>
                          <Button className="bg-yellow-600 text-white hover:bg-yellow-700 mt-4">
                            Seleccionar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Reseñas de Clientes</h3>
                <div className="space-y-6">
                  {provider.reviewsList.map((review) => (
                    <Card key={review.id} className="border-0 hover:shadow-lg transition">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-bold text-gray-900">{review.author}</p>
                            <p className="text-gray-600 text-sm">{review.date}</p>
                          </div>
                          <div className="text-yellow-500 text-lg">
                            {'★'.repeat(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
