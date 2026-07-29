# Plan de Desarrollo - clubnovios

## FASE 6: Autenticación (NextAuth.js)
- [ ] Configurar NextAuth.js con Google, Facebook, Apple
- [ ] Crear modelos de usuario en Prisma
- [ ] Pagina de login/registro
- [ ] Middleware de autenticación
- [ ] Rutas protegidas

## FASE 7: Búsqueda y Filtrado
- [ ] Página de búsqueda avanzada
- [ ] Filtros por categoría
- [ ] Filtros por ubicación
- [ ] Filtros por presupuesto
- [ ] Búsqueda por nombre
- [ ] API de búsqueda

## FASE 8: Perfiles de Proveedores
- [ ] Página de perfil completo
- [ ] Galería de fotos/portafolio
- [ ] Información de servicios
- [ ] Horarios y disponibilidad
- [ ] Botón de contacto
- [ ] Mapa de ubicación

## FASE 9: Sistema de Cotizaciones
- [ ] Formulario de solicitud de cotización
- [ ] API para crear cotizaciones
- [ ] Dashboard de cotizaciones
- [ ] Estados: Pendiente, Aceptada, Rechazada
- [ ] Historial de cotizaciones

## FASE 10: Mensajería en Tiempo Real
- [ ] Chat entre novios y proveedores
- [ ] Notificaciones en tiempo real
- [ ] Historial de conversaciones
- [ ] Indicador de último mensaje

## FASE 11: Reseñas y Ratings
- [ ] Sistema de calificación (1-5 estrellas)
- [ ] Comentarios y reseñas
- [ ] Módulo de reseñas en perfil
- [ ] Verificación de compra

## FASE 12: Pagos con Stripe
- [ ] Integración de Stripe
- [ ] Procesamiento de pagos
- [ ] Historial de transacciones
- [ ] Seguridad PCI

## FASE 13: Panel de Admin
- [ ] Dashboard de administración
- [ ] Gestión de usuarios
- [ ] Gestión de proveedores
- [ ] Estadísticas y reportes
- [ ] Moderación de contenido

## FASE 14: Deployment
- [ ] Configurar CI/CD con GitHub Actions
- [ ] Deploy en Vercel/Railway
- [ ] Configurar variables de entorno
- [ ] Monitoreo y logs
- [ ] Dominio personalizado

---

## Dependencias Necesarias
- NextAuth.js: ✅ Instalado (4.24.0)
- Prisma: ✅ Instalado (5.7.0)
- React Hook Form: ✅ Instalado (7.48.0)
- Zod: ✅ Instalado (3.22.4)
- date-fns: ✅ Instalado (2.30.0)

## Dependencias a Instalar
- Socket.io para mensajería en tiempo real
- Stripe para pagos
- Email service (nodemailer o similar)

---

## Status: INICIANDO FASE 6 ⏳
