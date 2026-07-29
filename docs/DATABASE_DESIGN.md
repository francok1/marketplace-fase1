# 🗄️ DISEÑO DE BASE DE DATOS - MARKETPLACE

## 📊 Arquitectura General

La base de datos está diseñada con los siguientes principios:

- **Normalización**: Eliminar redundancia manteniendo integridad referencial
- **Performance**: Índices estratégicos en campos frecuentemente consultados
- **Escalabilidad**: Relaciones optimizadas para crecimiento futuro
- **Auditoría**: Timestamps para tracking de cambios

---

## 📋 Tablas Principales

### 1. **Users** (Usuarios)
```sql
Campos:
- id (PK)
- email (UNIQUE)
- emailVerified
- password (nullable, para OAuth)
- name, phone, avatar
- role (ADMIN, PROVIDER, CLIENT)
- isActive, lastLogin
- createdAt, updatedAt

Índices:
- email (único)
- role
```

**Relaciones:**
- 1:1 → Provider (si role = PROVIDER)
- 1:N → Review (opiniones escritas)
- 1:N → Favorite (favoritos)
- 1:N → Quote (cotizaciones solicitadas)
- 1:N → Message (mensajes)

---

### 2. **Provider** (Proveedores)
```sql
Campos:
- id (PK)
- userId (FK → User) (UNIQUE)
- businessName, description, slug (UNIQUE)
- logo, coverImage
- website, whatsapp, social media
- email, phone
- cityId (FK → City)
- address, latitude, longitude
- status (PENDING_VERIFICATION, ACTIVE, INACTIVE, SUSPENDED)
- isVerified, verifiedAt
- averageRating, totalReviews
- responseRate, averageResponseTime
- plan (FREE, PREMIUM, PLUS)
- subscriptionId, isPremium, premiumUntil
- totalViews, totalFavorites, totalQuotes
- createdAt, updatedAt

Índices:
- userId (único)
- slug (único)
- cityId
- status
- isPremium
- isVerified
- createdAt (para trending)
```

**Relaciones:**
- 1:1 ← User
- 1:1 → City
- 1:1 → Schedule
- 1:N → ProviderCategory
- 1:N → Service
- 1:N → Gallery
- 1:N → Video
- 1:N → Review
- 1:N → Quote
- 1:N → Message
- 1:N → Favorite
- 1:N → Award
- 1:N → ProviderAnalytics
- 1:N → Advertisement
- 1:N → Subscription

---

### 3. **Category** (Categorías)
```sql
Campos:
- id (PK)
- name (UNIQUE)
- slug (UNIQUE)
- description, icon, image, color
- order, isActive
- createdAt

Índices:
- isActive
- slug
```

**Relaciones:**
- 1:N → ProviderCategory
- 1:N → Provider (muchos a muchos)

---

### 4. **City** (Ciudades)
```sql
Campos:
- id (PK)
- name (UNIQUE)
- slug (UNIQUE)
- communes (JSON array)
- isActive
- createdAt

Índices:
- isActive
- slug
```

**Relaciones:**
- 1:N → Provider

---

### 5. **Review** (Opiniones/Reseñas)
```sql
Campos:
- id (PK)
- providerId (FK → Provider)
- userId (FK → User)
- title, content (TEXT)
- rating (1-5)
- status (PENDING, PUBLISHED, FLAGGED, HIDDEN)
- isVerifiedCustomer
- helpful, notHelpful
- createdAt, updatedAt

Índices:
- providerId
- userId
- rating
- status
- (providerId, userId) - UNIQUE
```

**Relaciones:**
- N:1 → Provider
- N:1 → User
- 1:N → ReviewImage
- 1:1 → ProviderResponse

**Estrategia de Datos:**
- Calcula automáticamente:
  - Provider.averageRating
  - Provider.totalReviews
  - Distribución de estrellas

---

### 6. **Quote** (Cotizaciones)
```sql
Campos:
- id (PK)
- providerId (FK → Provider)
- userId (FK → User)
- name, email, phone
- serviceType, message (TEXT), budget
- eventDate
- status (PENDING, VIEWED, RESPONDED, ACCEPTED, REJECTED, EXPIRED)
- viewedAt
- createdAt, updatedAt

Índices:
- providerId
- userId
- status
```

**Relaciones:**
- N:1 → Provider
- N:1 → User
- 1:1 → QuoteResponse

---

### 7. **Message** (Mensajería)
```sql
Campos:
- id (PK)
- providerId (FK → Provider)
- userId (FK → User)
- senderType (PROVIDER | CLIENT)
- content (TEXT)
- isRead, readAt
- createdAt

Índices:
- providerId
- userId
- isRead
- createdAt (para ordenamiento)
```

**Relaciones:**
- N:1 → Provider
- N:1 → User

**Nota:** Considera pasar a una tabla separada por conversación para mejor performance:
```sql
Conversation {
  id, providerId, userId, lastMessage, updatedAt
}
```

---

### 8. **Favorite** (Favoritos)
```sql
Campos:
- id (PK)
- userId (FK → User)
- providerId (FK → Provider)
- listId (FK → FavoriteList) (nullable)
- createdAt

Índices:
- userId
- providerId
- (userId, providerId, listId) - UNIQUE
```

**Relaciones:**
- N:1 → User
- N:1 → Provider
- N:1 → FavoriteList (nullable)

---

### 9. **ProviderAnalytics** (Estadísticas)
```sql
Campos:
- id (PK)
- providerId (FK → Provider)
- date (DATE)
- views, clicks, favorites, quotes, messages, reviews (INT)
- createdAt

Índices:
- providerId
- date
- (providerId, date) - UNIQUE
```

**Estrategia:**
- Guardar stats diarias
- Generar reportes con agregación
- Considerar materializar vistas para meses/años

---

## 🔑 Relaciones Críticas

### Many-to-Many: Provider ↔ Category
```
ProviderCategory {
  id, providerId (FK), categoryId (FK)
  UNIQUE(providerId, categoryId)
}
```

### One-to-One: Provider ↔ Schedule
```
Schedule {
  id, providerId (FK UNIQUE)
  (horarios de cada día)
}
```

### One-to-Many: Review ↔ ReviewImage
```
ReviewImage {
  id, reviewId (FK)
  url, order
}
```

---

## 🚀 Optimizaciones por Caso de Uso

### Búsqueda de Proveedores
```sql
SELECT p.* FROM Provider p
WHERE p.cityId = $1
  AND EXISTS (
    SELECT 1 FROM ProviderCategory pc
    JOIN Category c ON c.id = pc.categoryId
    WHERE pc.providerId = p.id AND c.slug = $2
  )
  AND p.isVerified = true
ORDER BY p.averageRating DESC
LIMIT 20;

Índices necesarios:
- Provider(cityId, isVerified)
- ProviderCategory(providerId, categoryId)
```

### Obtener Opiniones de un Proveedor
```sql
SELECT r.*, u.name, u.avatar
FROM Review r
JOIN User u ON u.id = r.userId
WHERE r.providerId = $1
  AND r.status = 'PUBLISHED'
ORDER BY r.createdAt DESC
LIMIT 10;

Índices necesarios:
- Review(providerId, status, createdAt DESC)
```

### Calcular Rating Promedio
```sql
SELECT 
  AVG(rating) as averageRating,
  COUNT(*) as totalReviews,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_stars,
  COUNT(CASE WHEN rating = 4 THEN 1 END) as four_stars,
  -- etc
FROM Review
WHERE providerId = $1
  AND status = 'PUBLISHED';

Índices: Review(providerId, status)
```

### Timeline de Mensajes
```sql
SELECT * FROM Message
WHERE (providerId = $1 AND userId = $2)
  OR (providerId = $2 AND userId = $1)
ORDER BY createdAt DESC
LIMIT 50;

Índices: Message(providerId, userId, createdAt DESC)
```

---

## 📈 Índices Completos

```sql
-- Users
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_role ON users(role);

-- Provider
CREATE INDEX idx_provider_userid ON provider(userId);
CREATE INDEX idx_provider_slug ON provider(slug);
CREATE INDEX idx_provider_cityid ON provider(cityId);
CREATE INDEX idx_provider_status ON provider(status);
CREATE INDEX idx_provider_ispremium ON provider(isPremium);
CREATE INDEX idx_provider_isverified ON provider(isVerified);
CREATE INDEX idx_provider_createdat ON provider(createdAt DESC);

-- Category
CREATE INDEX idx_category_slug ON category(slug);
CREATE INDEX idx_category_isactive ON category(isActive);

-- City
CREATE INDEX idx_city_slug ON city(slug);

-- Review
CREATE INDEX idx_review_providerid_status_createdat ON review(providerId, status, createdAt DESC);
CREATE INDEX idx_review_userid ON review(userId);
CREATE INDEX idx_review_rating ON review(rating);
CREATE UNIQUE INDEX idx_review_provider_user ON review(providerId, userId);

-- Quote
CREATE INDEX idx_quote_providerid_status ON quote(providerId, status);
CREATE INDEX idx_quote_userid ON quote(userId);

-- Message
CREATE INDEX idx_message_provider_user_createdat ON message(providerId, userId, createdAt DESC);
CREATE INDEX idx_message_isread ON message(isRead);

-- Favorite
CREATE INDEX idx_favorite_userid ON favorite(userId);
CREATE INDEX idx_favorite_providerid ON favorite(providerId);
CREATE UNIQUE INDEX idx_favorite_user_provider_list ON favorite(userId, providerId, listId);

-- ProviderAnalytics
CREATE UNIQUE INDEX idx_provider_analytics_date ON provider_analytics(providerId, date);

-- ProviderCategory
CREATE UNIQUE INDEX idx_provider_category ON provider_category(providerId, categoryId);
```

---

## 🔒 Seguridad

1. **Contraseñas**: Hasheadas con bcryptjs (mín. 12 caracteres)
2. **Emails**: Verificación requerida para ciertas acciones
3. **Row Level Security**: Considerar en producción
4. **Datos Sensibles**: PII encriptado en reposo

---

## 📊 Datos de Ejemplo

### Categorías Iniciales
```json
[
  { "name": "Fotógrafos", "slug": "fotografos" },
  { "name": "Videógrafos", "slug": "videografos" },
  { "name": "Centros de Eventos", "slug": "centros-eventos" },
  { "name": "DJ", "slug": "dj" },
  { "name": "Banquetería", "slug": "banqueteria" },
  { "name": "Decoración", "slug": "decoracion" },
  { "name": "Pastelería", "slug": "pasteleria" },
  { "name": "Floristas", "slug": "floristas" },
  { "name": "Maquillaje", "slug": "maquillaje" },
  { "name": "Vestidos", "slug": "vestidos" }
]
```

### Ciudades Iniciales (Chile)
```json
[
  { "name": "Santiago", "slug": "santiago", "communes": ["Providencia", "Ñuñoa", "Las Condes", ...] },
  { "name": "Valparaíso", "slug": "valparaiso", "communes": [...] },
  { "name": "Concepción", "slug": "concepcion", "communes": [...] },
  ...
]
```

---

## 🎯 Migration Strategy

1. Crear schema inicial
2. Seed de categorías y ciudades
3. Agregar índices gradualmente según performance
4. Monitorear queries lentas
5. Considerar particionamiento para tablas grandes

