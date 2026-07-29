'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProviders = [
    {
      id: '1',
      name: 'Fotografía Artística Novios',
      location: 'Santiago, Metropolitana',
      rating: 4.9,
      reviewCount: 245,
      logo: '📸',
      badges: ['Verificado', 'Premium'],
      category: 'Fotografía',
      description: 'Capturamos los momentos más hermosos de tu boda'
    },
    {
      id: '2',
      name: 'Catering Gourmet Bodas',
      location: 'Providencia, Metropolitana',
      rating: 4.8,
      reviewCount: 189,
      logo: '🍽️',
      badges: ['Verificado', 'Premium'],
      category: 'Catering',
      description: 'Menús personalizados para tu celebración'
    },
    {
      id: '3',
      name: 'Decoración & Flores Premium',
      location: 'Las Condes, Metropolitana',
      rating: 4.9,
      reviewCount: 312,
      logo: '💐',
      badges: ['Verificado', 'Premium'],
      category: 'Decoración',
      description: 'Ambientes únicos y personalizados'
    },
    {
      id: '4',
      name: 'DJ y Animación Matrimonial',
      location: 'Santiago, Metropolitana',
      rating: 4.7,
      reviewCount: 156,
      logo: '🎵',
      badges: ['Verificado'],
      category: 'Entretenimiento',
      description: 'Música y diversión para tu evento'
    },
    {
      id: '5',
      name: 'Vestidos de Novia Couture',
      location: 'Vitacura, Metropolitana',
      rating: 4.8,
      reviewCount: 203,
      logo: '👰',
      badges: ['Verificado', 'Premium'],
      category: 'Vestuario',
      description: 'Diseños exclusivos y personalizados'
    },
    {
      id: '6',
      name: 'Coordinación de Eventos',
      location: 'Ñuñoa, Metropolitana',
      rating: 4.9,
      reviewCount: 178,
      logo: '📋',
      badges: ['Verificado', 'Premium'],
      category: 'Coordinación',
      description: 'Realizamos tu boda de ensueño'
    },
  ];

  const categories = [
    { name: 'Fotografía', count: 156, icon: '📸' },
    { name: 'Catering', count: 98, icon: '🍽️' },
    { name: 'Decoración', count: 243, icon: '💐' },
    { name: 'Entretenimiento', count: 87, icon: '🎵' },
    { name: 'Vestuario', count: 132, icon: '👰' },
    { name: 'Coordinación', count: 64, icon: '📋' },
    { name: 'Florería', count: 78, icon: '🌹' },
    { name: 'Pastelería', count: 112, icon: '🎂' },
  ];

  // Funciones
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/search?category=${encodeURIComponent(category)}`);
  };

  const handleProviderClick = (providerId: string) => {
    router.push(`/provider/${providerId}`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Premium */}
      <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 text-white py-48 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 opacity-5 text-9xl animate-pulse">💍</div>
        <div className="absolute bottom-10 right-10 opacity-5 text-9xl animate-pulse" style={{animationDelay: '1s'}}>💍</div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 animate-fade-in">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">Tu Boda de Ensueño Comienza Aquí</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-16 font-light max-w-3xl mx-auto leading-relaxed">Conecta con los mejores proveedores premium para tu evento especial</p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3 justify-center flex-col sm:flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busca proveedores, categorías..."
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-yellow-300 text-lg transition-all"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white hover:bg-gray-950 px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Categorías Premium */}
      <section className="py-48 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-28 animate-fade-in">
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Servicios para tu Boda</h2>
            <p className="text-gray-600 text-xl">Encuentra todo lo que necesitas para que tu evento sea perfecto</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className="group animate-slide-in-up"
                style={{animationDelay: `${idx * 50}ms`}}
              >
                <Card hoverable className="h-full border-0 bg-white group-hover:border-yellow-200">
                  <CardContent className="pt-12 pb-12 text-center">
                    <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
                    <h3 className="font-bold text-gray-900 text-lg mb-3">{cat.name}</h3>
                    <p className="text-sm text-gray-500">{cat.count} proveedores</p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Proveedores Destacados */}
      <section className="py-48 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-28 animate-fade-in">
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Proveedores Premium Destacados</h2>
            <p className="text-gray-600 text-xl">Los mejores profesionales para tu boda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProviders.map((provider, idx) => (
              <div key={provider.id} className="animate-slide-in-up" style={{animationDelay: `${idx * 100}ms`}}>
                <Card hoverable className="h-full border-0 overflow-hidden cursor-pointer group flex flex-col" onClick={() => handleProviderClick(provider.id)}>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-12 text-center group-hover:from-yellow-100 group-hover:to-yellow-200 transition-colors duration-300">
                    <div className="text-8xl mb-4 group-hover:scale-110 transition-transform duration-300">{provider.logo}</div>
                  </div>
                  <CardContent className="pt-10 pb-10 px-8 flex-1">
                    <h3 className="font-bold text-gray-900 text-xl mb-3">{provider.name}</h3>
                    <p className="text-sm font-medium text-yellow-600 mb-4">{provider.category}</p>
                    <p className="text-sm text-gray-500 mb-7">📍 {provider.location}</p>
                    <p className="text-gray-700 text-sm mb-8 leading-relaxed">{provider.description}</p>

                    <div className="flex gap-2 mb-8 flex-wrap">
                      {provider.badges.map((badge, bidx) => (
                        <Badge key={bidx} variant={badge === 'Premium' ? 'premium' : 'verified'} size="sm">
                          {badge === 'Premium' ? '✓ Premium' : '✓ Verificado'}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                      <span className="text-yellow-500 text-lg">★★★★★</span>
                      <span className="font-bold text-gray-900">{provider.rating}</span>
                      <span className="text-sm text-gray-600">({provider.reviewCount})</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProviderClick(provider.id);
                      }}
                      className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-lg mt-auto"
                    >
                      Ver Perfil
                    </button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-48 bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 text-9xl">💍</div>
          <div className="absolute bottom-0 right-1/4 text-9xl">💍</div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { stat: '850+', label: 'Proveedores Verificados', icon: '✓' },
              { stat: '3,200+', label: 'Bodas Realizadas', icon: '💒' },
              { stat: '15,430', label: 'Parejas Conectadas', icon: '👥' },
              { stat: '4.8/5', label: 'Rating Promedio', icon: '⭐' },
            ].map((item, idx) => (
              <div key={idx} className="animate-scale-in" style={{animationDelay: `${idx * 150}ms`}}>
                <p className="text-5xl mb-2">{item.icon}</p>
                <p className="text-7xl font-bold mb-4 text-yellow-400">{item.stat}</p>
                <p className="text-gray-300 text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="py-48 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32 animate-fade-in">
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Cómo Funciona</h2>
            <p className="text-gray-600 text-xl">Tu boda perfecta en 3 simples pasos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Línea conectora */}
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 -z-10"></div>

            {[
              {
                step: '1',
                title: 'Busca & Filtra',
                description: 'Explora miles de proveedores certificados según tus necesidades y presupuesto',
              },
              {
                step: '2',
                title: 'Solicita Presupuesto',
                description: 'Contacta directamente con los profesionales y obtén propuestas personalizadas',
              },
              {
                step: '3',
                title: 'Contrata & Celebra',
                description: 'Selecciona tu opción favorita y disfruta tu boda con total tranquilidad',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center animate-slide-in-up" style={{animationDelay: `${idx * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 text-white text-5xl font-bold mb-8 shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-48 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-6xl font-bold text-gray-900 mb-6">¿Eres Proveedor de Bodas?</h2>
          <p className="text-gray-600 text-xl mb-14 max-w-3xl mx-auto leading-relaxed">
            Únete a nuestra comunidad de profesionales premium y conecta con parejas que buscan servicios de excelencia
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => router.push('/auth/signup')}
              className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/30"
            >
              Registrate como Proveedor
            </button>
            <button
              onClick={() => router.push('/search')}
              className="border-2 border-gray-300 text-gray-900 hover:bg-gray-100 hover:border-gray-400 px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              Explorar Plataforma
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div>
              <button
                onClick={() => router.push('/')}
                className="font-bold text-2xl mb-10 text-yellow-500 hover:text-yellow-400 transition"
              >
                💍 clubnovios
              </button>
              <ul className="space-y-5 text-gray-400">
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Inicio</button></li>
                <li><button onClick={() => router.push('/search')} className="hover:text-white transition text-lg">Cómo Funciona</button></li>
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Sobre Nosotros</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-10">Para Novios</h3>
              <ul className="space-y-5 text-gray-400">
                <li><button onClick={() => router.push('/search')} className="hover:text-white transition text-lg">Buscar Proveedores</button></li>
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Verificación</button></li>
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Reseñas</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-10">Para Proveedores</h3>
              <ul className="space-y-5 text-gray-400">
                <li><button onClick={() => router.push('/auth/signup')} className="hover:text-white transition text-lg">Registrarse</button></li>
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Centro de Ayuda</button></li>
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Planes</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-10">Legal</h3>
              <ul className="space-y-5 text-gray-400">
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Términos</button></li>
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Privacidad</button></li>
                <li><button onClick={() => router.push('/')} className="hover:text-white transition text-lg">Contacto</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-16 text-center text-gray-400 text-lg">
            <p>&copy; 2026 clubnovios. El lugar para encontrar los mejores proveedores para tu boda.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
