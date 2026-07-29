import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ClientProviderProfile from '@/components/provider/ClientProviderProfile';

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mock data
  const provider = {
    id,
    name: 'Fotografía Artística Novios',
    category: 'Fotografía',
    location: 'Santiago, Metropolitana',
    rating: 4.9,
    reviews: 245,
    image: '📸',
    verified: true,
    premium: true,
    description:
      'Somos especialistas en fotografía de bodas con más de 10 años de experiencia. Capturamos cada momento especial de tu día.',
    price: 'Desde $1.500.000',
    yearsExperience: 10,
    servicesCount: 1250,
    responseTime: 'Responde en 2 horas',
    phone: '+56 9 1234 5678',
    email: 'contacto@fotografianovios.cl',
    website: 'www.fotografianovios.cl',
    portfolio: [
      { id: 1, image: '📸', title: 'Boda María & Juan' },
      { id: 2, image: '📸', title: 'Matrimonio Sofia & Pedro' },
      { id: 3, image: '📸', title: 'Ceremonia Daniela & Luis' },
      { id: 4, image: '📸', title: 'Boda Catalina & Roberto' },
      { id: 5, image: '📸', title: 'Matrimonio Isabel & Carlos' },
      { id: 6, image: '📸', title: 'Ceremonia Valentina & Andrés' },
    ],
    services: [
      { id: 1, name: 'Sesión Pre Boda', price: '$300.000', duration: '2 horas' },
      {
        id: 2,
        name: 'Cobertura Completa',
        price: '$1.500.000',
        duration: '8 horas',
      },
      { id: 3, name: 'Álbum Premium', price: '$500.000', duration: 'Digital' },
      {
        id: 4,
        name: 'Video Profesional',
        price: '$800.000',
        duration: 'Edición incluida',
      },
    ],
    reviewsList: [
      {
        id: 1,
        author: 'María García',
        rating: 5,
        date: '2024-06-15',
        comment:
          'Excelente trabajo, muy profesionales y atentos. Nuestras fotos quedaron hermosas!',
      },
      {
        id: 2,
        author: 'Sofía López',
        rating: 5,
        date: '2024-05-20',
        comment:
          'Las mejores fotos de mi vida. No puedo estar más satisfecha con el resultado.',
      },
    ],
  };

  return <ClientProviderProfile provider={provider} />;
}
