'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [minRating, setMinRating] = useState('');

  // Mock data
  const mockProviders = [
    {
      id: '1',
      name: 'Fotografía Artística Novios',
      category: 'Fotografía',
      location: 'Santiago',
      price: 'Desde $1.500.000',
      rating: 4.9,
      reviews: 245,
      image: '📸',
      verified: true,
      premium: true,
    },
    {
      id: '2',
      name: 'Catering Gourmet',
      category: 'Catering',
      location: 'Providencia',
      price: 'Desde $800.000',
      rating: 4.8,
      reviews: 189,
      image: '🍽️',
      verified: true,
      premium: true,
    },
    {
      id: '3',
      name: 'Decoración Premium',
      category: 'Decoración',
      location: 'Las Condes',
      price: 'Desde $1.200.000',
      rating: 4.9,
      reviews: 312,
      image: '💐',
      verified: true,
      premium: true,
    },
  ];

  // Leer parámetros de URL y llenar los filtros
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || '';
    const loc = searchParams.get('location') || '';
    const price = searchParams.get('price') || '';
    const rating = searchParams.get('rating') || '';

    setSearch(q);
    setCategory(cat);
    setLocation(loc);
    setPriceRange(price);
    setMinRating(rating);
  }, [searchParams]);

  // Aplicar filtros automáticamente cuando cambian
  const applyFiltersAutomatically = (q: string, cat: string, loc: string, price: string, rating: string) => {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (cat) params.append('category', cat);
    if (loc) params.append('location', loc);
    if (price) params.append('price', price);
    if (rating) params.append('rating', rating);

    const queryString = params.toString();
    router.push(`/search${queryString ? '?' + queryString : ''}`);
  };

  // Filtrar y ordenar resultados
  const filteredProviders = mockProviders
    .filter((provider) => {
      const matchesSearch = search === '' ||
        provider.name.toLowerCase().includes(search.toLowerCase()) ||
        provider.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === '' || provider.category.toLowerCase() === category.toLowerCase();
      const matchesLocation = location === '' || provider.location.toLowerCase().includes(location.toLowerCase());
      const matchesRating = minRating === '' || provider.rating >= parseFloat(minRating);

      return matchesSearch && matchesCategory && matchesLocation && matchesRating;
    })
    .sort((a, b) => {
      // Ordenar por coincidencia de búsqueda primero
      const aMatches = search !== '' && (a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()));
      const bMatches = search !== '' && (b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()));

      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;

      // Luego por rating
      return b.rating - a.rating;
    });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Buscar Proveedores</h1>
          <p className="text-gray-600 text-xl">Encuentra el proveedor perfecto para tu boda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1 animate-slide-in-left">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Filtros</h2>

              {/* Búsqueda */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  🔍 Buscar
                </label>
                <input
                  type="text"
                  placeholder="Nombre o servicio..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Categoría */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  📂 Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-200"
                >
                  <option value="">Todas</option>
                  <option value="Fotografía">Fotografía</option>
                  <option value="Catering">Catering</option>
                  <option value="Decoración">Decoración</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Vestuario">Vestuario</option>
                  <option value="Coordinación">Coordinación</option>
                </select>
              </div>

              {/* Ubicación */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  📍 Ubicación
                </label>
                <input
                  type="text"
                  placeholder="Comuna o ciudad..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Rango de Precio */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  💰 Presupuesto
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-200"
                >
                  <option value="">Cualquier precio</option>
                  <option value="bajo">Hasta $500.000</option>
                  <option value="medio">$500.000 - $1.500.000</option>
                  <option value="alto">$1.500.000+</option>
                </select>
              </div>

              {/* Rating Mínimo */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  ⭐ Rating Mínimo
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-200"
                >
                  <option value="">Cualquiera</option>
                  <option value="3">3+ Estrellas</option>
                  <option value="4">4+ Estrellas</option>
                  <option value="4.5">4.5+ Estrellas</option>
                </select>
              </div>

              {/* Botones */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (search) params.append('q', search);
                    if (category) params.append('category', category);
                    if (location) params.append('location', location);
                    if (priceRange) params.append('price', priceRange);
                    if (minRating) params.append('rating', minRating);

                    const queryString = params.toString();
                    router.push(`/search${queryString ? '?' + queryString : ''}`);
                  }}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 py-3 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                  size="md"
                >
                  ✓ Aplicar Filtros
                </Button>
                <button
                  onClick={() => {
                    setSearch('');
                    setCategory('');
                    setLocation('');
                    setPriceRange('');
                    setMinRating('');
                    router.push('/search');
                  }}
                  className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-semibold py-3 rounded-xl transition-all duration-200"
                >
                  ✕ Limpiar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <p className="text-gray-600 text-lg">
                Mostrando <span className="font-bold text-gray-900">{filteredProviders.length}</span> resultados
              </p>
            </div>

            <div className="space-y-6">
              {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-2xl transition border-0 overflow-hidden">
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    {/* Imagen */}
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 flex items-center justify-center min-w-40">
                      <div className="text-7xl">{provider.image}</div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {provider.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">{provider.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-yellow-600">{provider.price}</p>
                        </div>
                      </div>

                      {/* Ubicación y Rating */}
                      <div className="flex items-center gap-6 mb-6 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">📍</span>
                          <span className="text-gray-700">{provider.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">★★★★★</span>
                          <span className="font-bold text-gray-900">{provider.rating}</span>
                          <span className="text-gray-600 text-sm">({provider.reviews})</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex gap-3 mb-6 flex-wrap">
                        {provider.verified && <Badge variant="success">Verificado</Badge>}
                        {provider.premium && <Badge variant="success">Premium</Badge>}
                      </div>

                      {/* Botones */}
                      <div className="flex gap-4 flex-wrap">
                        <Button
                          onClick={() => router.push(`/provider/${provider.id}`)}
                          className="bg-yellow-600 text-white hover:bg-yellow-700 px-8 py-3"
                        >
                          Ver Perfil
                        </Button>
                        <Button
                          onClick={() => router.push(`/quotes?provider=${provider.id}`)}
                          className="border-2 border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3"
                        >
                          Solicitar Cotización
                        </Button>
                        <button className="text-gray-600 hover:text-yellow-600 text-2xl">❤️</button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-xl mb-4">No encontramos proveedores que coincidan con tu búsqueda.</p>
                  <p className="text-gray-500">Intenta ajustar tus filtros o buscar algo diferente.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <SearchContent />
    </Suspense>
  );
}
