# 📝 Guía de personalización de la plantilla

Esta guía te ayudará a personalizar la plantilla fullstack para tu proyecto específico, incluyendo cómo renombrarla, agregar bases de datos y configurar variables de entorno.

## 🏷️ Renombrar la plantilla para tu proyecto

Supongamos que quieres crear un proyecto llamado `agencia-seguros`:

### 1. Cambiar nombres en Docker Compose
Edita `docker-compose.yml`:

```yaml
# Cambiar nombres de contenedores
services:
  frontend:
    container_name: agencia_seguros_frontend  # era: plantilla_frontend
  
  backend:
    container_name: agencia_seguros_backend   # era: plantilla_backend

# Cambiar nombres de red y volúmenes  
networks:
  devnet:
    name: agencia_seguros_network  # era: plantilla_network

# Si usas bases de datos, cambia también:
volumes:
  mongo_data:
    name: agencia_seguros_mongo_data  # era: plantilla_mongo_data
```

### 2. Actualizar package.json
En `frontend/package.json`:
```json
{
  "name": "agencia-seguros-frontend",  // era: "plantilla-frontend"
  "version": "0.1.0"
}
```

En `backend/package.json`:
```json
{
  "name": "agencia-seguros-backend",   // era: "plantilla-backend"  
  "description": "Backend para agencia de seguros", // personaliza descripción
  "version": "0.1.0"
}
```

### 3. Actualizar variables de entorno
En `backend/.env.example`:
```bash
# Cambiar nombres de base de datos
MONGODB_URI=mongodb://admin:admin123@mongo:27017/agencia_seguros_db
POSTGRES_URL=postgresql://user:password@postgres:5432/agencia_seguros_db
DATABASE_URL=file:./agencia_seguros.db
```

### 4. Actualizar Dev Container
En `.devcontainer/devcontainer.json`:
```json
{
  "name": "Agencia Seguros - Fullstack",  // era: "Plantilla Fullstack Multiservicio"
}
```

### 5. Actualizar títulos y mensajes
En `frontend/src/App.tsx`:
```tsx
<h1>🏢 Agencia de Seguros</h1>  {/* era: 🚀 Plantilla Fullstack */}
<p>Sistema de gestión integral</p>
```

En `backend/src/index.ts`:
```typescript
app.get('/', (req, res) => {
  res.json({
    message: '🏢 Agencia Seguros API',  // era: 🚀 Plantilla Backend API
    version: '0.1.0'
  })
})
```

---

## 🗄️ Agregar y configurar bases de datos

### 🍃 MongoDB

#### 1. Activar el servicio en Docker Compose
En `docker-compose.yml`, descomenta:
```yaml
mongo:
  image: mongo:7
  container_name: agencia_seguros_mongo
  restart: unless-stopped
  ports:
    - "27017:27017"
  environment:
    - MONGO_INITDB_ROOT_USERNAME=admin
    - MONGO_INITDB_ROOT_PASSWORD=admin123
    - MONGO_INITDB_DATABASE=agencia_seguros_db
  volumes:
    - mongo_data:/data/db
  networks:
    - devnet

# También descomenta el volumen
volumes:
  mongo_data:
    name: agencia_seguros_mongo_data
```

#### 2. Configurar variables de entorno
En `backend/.env`:
```bash
MONGODB_URI=mongodb://admin:admin123@mongo:27017/agencia_seguros_db?authSource=admin
```

#### 3. Activar la conexión
En `backend/src/db/mongo.ts`, descomenta todo el código.

#### 4. Integrar en el servidor principal
En `backend/src/index.ts`:
```typescript
import { connectMongoDB } from './db/mongo'

// Al inicio del servidor
const startServer = async () => {
  try {
    await connectMongoDB()
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor iniciado en puerto ${PORT}`)
    })
  } catch (error) {
    console.error('Error al iniciar servidor:', error)
    process.exit(1)
  }
}

startServer()
```

#### 5. Instalar dependencias
```bash
docker compose exec backend pnpm add mongodb
docker compose exec backend pnpm add -D @types/mongodb
```

### 🐘 PostgreSQL

#### 1. Activar el servicio en Docker Compose
En `docker-compose.yml`, descomenta:
```yaml
postgres:
  image: postgres:15
  container_name: agencia_seguros_postgres
  restart: unless-stopped
  ports:
    - "5432:5432"
  environment:
    - POSTGRES_DB=agencia_seguros_db
    - POSTGRES_USER=user
    - POSTGRES_PASSWORD=password
  volumes:
    - postgres_data:/var/lib/postgresql/data
  networks:
    - devnet

# También descomenta el volumen
volumes:
  postgres_data:
    name: agencia_seguros_postgres_data
```

#### 2. Configurar variables de entorno
En `backend/.env`:
```bash
POSTGRES_URL=postgresql://user:password@postgres:5432/agencia_seguros_db
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=agencia_seguros_db
DATABASE_USER=user
DATABASE_PASSWORD=password
```

#### 3. Activar la conexión
En `backend/src/db/postgres.ts`, descomenta todo el código.

#### 4. Integrar en el servidor
Similar al ejemplo de MongoDB, pero usando `connectPostgreSQL()`.

#### 5. Instalar dependencias
```bash
docker compose exec backend pnpm add pg
docker compose exec backend pnpm add -D @types/pg
```

### 🗃️ SQLite

#### 1. Configurar variables de entorno
En `backend/.env`:
```bash
DATABASE_URL=file:./agencia_seguros.db
```

#### 2. Activar la conexión
En `backend/src/db/sqlite.ts`, descomenta todo el código.

#### 3. Instalar dependencias
```bash
docker compose exec backend pnpm add sqlite3 sqlite
docker compose exec backend pnpm add -D @types/sqlite3
```

---

## 🔑 Configuración de variables de entorno

### Variables esenciales para personalizar

```bash
# === CONFIGURACIÓN BÁSICA ===
NODE_ENV=development
PORT=3000

# === URLs Y CORS ===
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,https://tu-dominio.com

# === SEGURIDAD === 
# Genera claves seguras para producción
JWT_SECRET=tu-jwt-secret-super-seguro-de-32-caracteres-minimo
API_KEY=tu-api-key-unica-y-segura
ENCRYPTION_KEY=clave-de-cifrado-de-32-caracteres

# === BASE DE DATOS (elige una) ===

# MongoDB
MONGODB_URI=mongodb://admin:admin123@mongo:27017/tu_proyecto_db?authSource=admin

# PostgreSQL  
POSTGRES_URL=postgresql://user:password@postgres:5432/tu_proyecto_db
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=tu_proyecto_db
DATABASE_USER=user
DATABASE_PASSWORD=password

# SQLite
DATABASE_URL=file:./tu_proyecto.db

# === SERVICIOS EXTERNOS ===
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password

REDIS_URL=redis://redis:6379

# === LOGS Y MONITOREO ===
LOG_LEVEL=info
SENTRY_DSN=tu-sentry-dsn-si-usas

# === ALMACENAMIENTO ===
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
S3_BUCKET_NAME=tu-bucket
```

### Generar claves seguras
```bash
# Para JWT_SECRET (32+ caracteres)
openssl rand -base64 32

# Para API_KEY (16+ caracteres)
openssl rand -hex 16

# Para ENCRYPTION_KEY (32 caracteres exactos)
openssl rand -base64 32 | head -c 32
```

---

## 🎨 Personalizar estilos y componentes

### Frontend - Agregar tu marca
En `frontend/src/App.css`, personaliza colores:
```css
:root {
  /* Colores de tu marca */
  --primary-color: #2563eb;    /* Azul corporativo */
  --secondary-color: #7c3aed;  /* Púrpura de acento */
  --success-color: #10b981;    /* Verde éxito */
  --warning-color: #f59e0b;    /* Amarillo advertencia */
  --error-color: #ef4444;      /* Rojo error */
  
  /* Colores de fondo */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-dark: #1e293b;
}
```

### Backend - Personalizar respuestas
En `backend/src/controllers/helloController.ts`:
```typescript
getHello: (req: Request, res: Response) => {
  const response = {
    message: '¡Bienvenido a Agencia de Seguros! 🏢',
    services: ['Seguros de auto', 'Seguros de vida', 'Seguros de hogar'],
    contact: '555-0123'
  }
  res.status(200).json(response)
}
```

---

## 🚀 Scripts de automatización

Puedes crear un script para automatizar la personalización:

### `scripts/personalize.sh`
```bash
#!/bin/bash

PROJECT_NAME=${1:-mi-proyecto}
PROJECT_TITLE=${2:-"Mi Proyecto"}
DB_NAME=${3:-"${PROJECT_NAME//-/_}_db"}

echo "🔧 Personalizando plantilla para: $PROJECT_TITLE"

# Reemplazar en docker-compose.yml
sed -i "s/plantilla_/$PROJECT_NAME/g" docker-compose.yml
sed -i "s/plantilla-/$PROJECT_NAME-/g" docker-compose.yml

# Reemplazar en package.json
sed -i "s/plantilla-frontend/$PROJECT_NAME-frontend/g" frontend/package.json
sed -i "s/plantilla-backend/$PROJECT_NAME-backend/g" backend/package.json

# Reemplazar títulos en frontend
sed -i "s/🚀 Plantilla Fullstack/$PROJECT_TITLE/g" frontend/src/App.tsx

# Actualizar README
sed -i "s/Plantilla Fullstack/$PROJECT_TITLE/g" README.md

echo "✅ Personalización completada!"
echo "📝 No olvides actualizar las variables de entorno en backend/.env"
```

Uso:
```bash
chmod +x scripts/personalize.sh
./scripts/personalize.sh agencia-seguros "Agencia de Seguros" agencia_seguros_db
```

---

## 🏗️ Agregar nuevas funcionalidades

### Nuevo endpoint en el backend

1. **Crear controlador** (`backend/src/controllers/usuariosController.ts`):
```typescript
export const usuariosController = {
  getAll: async (req: Request, res: Response) => {
    // Lógica para obtener usuarios
  },
  create: async (req: Request, res: Response) => {
    // Lógica para crear usuario
  }
}
```

2. **Crear rutas** (`backend/src/routes/usuarios.ts`):
```typescript
import { Router } from 'express'
import { usuariosController } from '../controllers/usuariosController'

const router = Router()

router.get('/usuarios', usuariosController.getAll)
router.post('/usuarios', usuariosController.create)

export default router
```

3. **Registrar rutas** (en `backend/src/index.ts`):
```typescript
import usuariosRoutes from './routes/usuarios'

app.use('/api', usuariosRoutes)
```

### Nueva página en el frontend

1. **Crear componente** (`frontend/src/components/Usuarios.tsx`):
```tsx
import { useState, useEffect } from 'react'

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  
  useEffect(() => {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
  }, [])

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      {/* Tu UI aquí */}
    </div>
  )
}
```

2. **Agregar routing** (instalar React Router si es necesario):
```bash
docker compose exec frontend pnpm add react-router-dom
```

---

## ✅ Checklist de personalización

- [ ] **Nombres actualizados** en docker-compose.yml, package.json y devcontainer.json
- [ ] **Variables de entorno** configuradas en .env
- [ ] **Base de datos** elegida y configurada (MongoDB/PostgreSQL/SQLite)
- [ ] **Títulos y textos** actualizados en frontend y backend
- [ ] **Colores y estilos** personalizados para tu marca
- [ ] **README.md** actualizado con información de tu proyecto
- [ ] **Dependencias específicas** instaladas según tus necesidades
- [ ] **Endpoints básicos** funcionando correctamente
- [ ] **Conexión frontend-backend** verificada
- [ ] **Hot reload** funcionando en desarrollo

---

## 🆘 Solución de problemas comunes

### La base de datos no conecta
1. Verifica que el servicio esté descomentado en docker-compose.yml
2. Revisa las variables de entorno en .env
3. Asegúrate de que las dependencias estén instaladas
4. Verifica los logs: `docker compose logs mongo` (o postgres)

### Cambios no se reflejan
1. Reinicia los servicios: `make stop && make dev`
2. Limpia y reconstruye: `make clean && make bootstrap`
3. Verifica que los archivos estén guardados

### Error de puertos ocupados
1. Cambia los puertos en docker-compose.yml:
```yaml
ports:
  - "5174:5173"  # Frontend
  - "3001:3000"  # Backend
```
2. Actualiza las URLs en vite.config.ts y variables de entorno

---

**¡Con esta guía deberías poder personalizar completamente la plantilla para cualquier proyecto!** 🚀