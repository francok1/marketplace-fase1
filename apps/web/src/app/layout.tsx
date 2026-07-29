import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Marketplace de Servicios',
  description: 'Plataforma para encontrar y ofertar servicios profesionales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
