# 🚀 Plantilla Fullstack Multiservicio

Una plantilla completa para desarrollo fullstack con **React + TypeScript + Vite** en el frontend y **Node.js + Express + TypeScript** en el backend, completamente dockerizada y lista para desarrollo con **Dev Containers** o **Docker Compose**.

## 🎯 Características principales

- ✅ **Frontend**: React 18 + TypeScript + Vite con hot reload
- ✅ **Backend**: Node.js + Express + TypeScript con hot reload  
- ✅ **Docker**: Completamente containerizado
- ✅ **Dev Containers**: Listo para VS Code con configuración automática
- ✅ **Bases de datos**: Configuraciones preparadas para MongoDB, PostgreSQL y SQLite
- ✅ **Hot Reload**: Tanto frontend como backend se actualizan automáticamente
- ✅ **TypeScript**: Tipado fuerte en toda la aplicación
- ✅ **CORS**: Configurado para desarrollo y producción
- ✅ **Documentación**: Completamente documentado con ejemplos

## 📦 Estructura del proyecto

```
plantilla-fullstack/
├── 📁 frontend/                 # Aplicación React + Vite + TypeScript
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # Servicios para API calls
│   │   ├── types/             # Definiciones de tipos TypeScript
│   │   ├── utils/             # Utilidades y helpers
│   │   ├── App.tsx            # Componente principal
│   │   └── main.tsx           # Punto de entrada
│   ├── Dockerfile             # Imagen Docker del frontend
│   ├── vite.config.ts         # Configuración de Vite
│   └── package.json           # Dependencias del frontend
├── 📁 backend/                  # API Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/       # Controladores de las rutas
│   │   ├── middleware/        # Middlewares personalizados
│   │   ├── models/            # Modelos de datos
│   │   ├── routes/            # Definición de rutas
│   │   ├── services/          # Lógica de negocio
│   │   ├── db/               # Configuraciones de bases de datos
│   │   ├── utils/            # Utilidades del backend
│   │   └── index.ts          # Servidor Express principal
│   ├── Dockerfile            # Imagen Docker del backend
│   ├── .env.example          # Variables de entorno de ejemplo
│   └── package.json          # Dependencias del backend
├── 📁 .devcontainer/           # Configuración para Dev Containers
│   └── devcontainer.json     # Configuración de VS Code Dev Containers
├── 📁 docs/                    # Documentación adicional
│   ├── README-personalizacion.md  # Guía de personalización
│   └── devcontainers-vs-docker.md # Cuándo usar cada opción
├── docker-compose.yml        # Orquestación de servicios
├── Makefile                  # Comandos simplificados
├── .gitignore               # Archivos ignorados por Git
└── README.md                # Este archivo
```

---

## 🚀 Inicio rápido

### 📋 Prerrequisitos

Elige **UNA** de estas opciones:

#### Opción A: Dev Containers (Recomendado)
- [VS Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Extensión Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Opción B: Solo Docker
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Make](https://www.gnu.org/software/make/) (opcional, para comandos simplificados)

---

## 🎯 Plan A: Uso con VS Code + Dev Containers

### 1. Clonar y abrir el proyecto
```bash
git clone <tu-repo>
cd plantilla-fullstack
code .
```

### 2. Abrir en Dev Container
1. VS Code mostrará una notificación: **"Reopen in Container"** → Click **"Reopen in Container"**
2. O usa `Ctrl+Shift+P` → **"Dev Containers: Reopen in Container"**
3. Espera a que se construyan los contenedores (primera vez puede tardar 5-10 minutos)

### 3. ¡Listo! 🎉
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **Health check**: http://localhost:3000/health

Los cambios en el código se reflejarán automáticamente (hot reload activo).

---

## 🎯 Plan B: Uso solo con Docker y CLI

### 1. Clonar el proyecto
```bash
git clone <tu-repo>
cd plantilla-fullstack
```

### 2. Preparar el entorno
```bash
# Con Make (recomendado)
make bootstrap

# O manualmente con Docker Compose
docker compose build
docker compose run --rm frontend pnpm install
docker compose run --rm backend pnpm install
```

### 3. Iniciar los servicios
```bash
# Con Make
make dev

# O manualmente con Docker Compose
docker compose up
```

### 4. ¡Listo! 🎉
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000/api/hello
- **Health check**: http://localhost:3000/health

---

## 🛠️ Comandos disponibles

### Con Makefile (recomendado)
```bash
make help          # Ver todos los comandos disponibles
make bootstrap     # Preparar proyecto (primera vez)
make dev          # Levantar servicios
make stop         # Parar servicios
make clean        # Limpiar contenedores y volúmenes
make logs         # Ver logs de todos los servicios
make shell-frontend   # Acceder al contenedor del frontend
make shell-backend    # Acceder al contenedor del backend
```

### Con Docker Compose directamente
```bash
docker compose up              # Levantar servicios
docker compose down            # Parar servicios
docker compose build           # Construir imágenes
docker compose logs -f         # Ver logs en vivo
docker compose exec frontend sh   # Shell del frontend
docker compose exec backend sh    # Shell del backend
```

---

## 🔧 Desarrollo y personalización

### Estructura del frontend
- `src/App.tsx`: Componente principal con ejemplo de conexión al backend
- `src/services/api.ts`: Cliente HTTP configurado con manejo de errores
- `vite.config.ts`: Configuración de proxy para desarrollo

### Estructura del backend  
- `src/index.ts`: Servidor Express con middlewares configurados
- `src/routes/hello.ts`: Rutas de ejemplo
- `src/controllers/helloController.ts`: Controladores con TypeScript
- `src/db/`: Configuraciones listas para MongoDB, PostgreSQL y SQLite

### Agregar nuevas dependencias
```bash
# Frontend
docker compose exec frontend pnpm add nombre-paquete

# Backend  
docker compose exec backend pnpm add nombre-paquete
```

### Variables de entorno
Copia `.env.example` a `.env` y ajusta las variables:
```bash
cp backend/.env.example backend/.env
```

---

## 🗄️ Bases de datos

La plantilla incluye configuraciones preparadas para:

### MongoDB
1. Descomenta el servicio `mongo` en `docker-compose.yml`
2. Descomenta las variables de entorno relacionadas con MongoDB
3. Descomenta el código en `backend/src/db/mongo.ts`

### PostgreSQL
1. Descomenta el servicio `postgres` en `docker-compose.yml`  
2. Descomenta las variables de entorno relacionadas con PostgreSQL
3. Descomenta el código en `backend/src/db/postgres.ts`

### SQLite
1. Descomenta las variables de entorno en `docker-compose.yml`
2. Descomenta el código en `backend/src/db/sqlite.ts`
3. SQLite no requiere servicio Docker adicional

**📖 Ver guía detallada**: [docs/README-personalizacion.md](docs/README-personalizacion.md)

---

## 🔍 Endpoints disponibles

### Backend API
- `GET /` - Información de la API
- `GET /health` - Health check del servicio
- `GET /api/hello` - Endpoint de prueba básico  
- `GET /api/hello/time` - Endpoint con timestamp
- `POST /api/hello` - Endpoint que recibe datos

### Ejemplos de uso
```bash
# Health check
curl http://localhost:3000/health

# Endpoint básico
curl http://localhost:3000/api/hello

# Endpoint POST con datos
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","message":"Hola desde curl"}'
```

---

## 🔧 Configuración avanzada

### Hot reload
- ✅ **Frontend**: Configurado con Vite (automático)
- ✅ **Backend**: Configurado con ts-node-dev (automático)

### TypeScript
- Configuración estricta habilitada
- Path aliases configurados (`@/` para src/)
- Source maps habilitados para debugging

### CORS
Configurado para permitir peticiones desde:
- `http://localhost:5173` (frontend de desarrollo)
- URLs adicionales via variable `ALLOWED_ORIGINS`

### Seguridad
- Helmet.js configurado para headers de seguridad
- CORS restrictivo por defecto
- Variables de entorno para secrets

---

## 🚨 Solución de problemas

### Los servicios no inician
```bash
# Limpia y reconstruye
make clean
make bootstrap
```

### Cambios no se reflejan
```bash
# Verifica que los volúmenes estén montados
docker compose ps
docker compose logs frontend
docker compose logs backend
```

### Error de permisos
```bash
# En Linux/Mac, ajusta permisos
sudo chown -R $USER:$USER .
```

### Puerto ocupado
```bash
# Verifica qué proceso usa el puerto
lsof -i :3000  # Backend
lsof -i :5173  # Frontend
```

---

## 📚 Documentación adicional

- **[Personalización del proyecto](docs/README-personalizacion.md)**: Cómo renombrar y adaptar la plantilla
- **[Dev Containers vs Docker](docs/devcontainers-vs-docker.md)**: Cuándo usar cada opción

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## ⭐ ¿Te gustó esta plantilla?

Si esta plantilla te fue útil, considera:
- ⭐ Darle una estrella al repositorio
- 🍴 Hacer un fork para tus proyectos
- 📢 Compartirla con otros desarrolladores
- 🐛 Reportar bugs o sugerir mejoras

---

## 👨‍💻 Autor

<div align="center">

**Desarrollado con ❤️ por**

[![GitHub](https://img.shields.io/badge/GitHub-isaiasfl-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/isaiasfl)

**Isaías Fernández** | *Profesor de Desarrollo de Aplicaciones*

[![Email](https://img.shields.io/badge/Email-ifernandez@ieshlanz.es-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ifernandez@ieshlanz.es)

</div>

---

<div align="center">

**🚀 ¡Que disfrutes desarrollando!**

*Esta plantilla ha sido creada para facilitar el aprendizaje y desarrollo de aplicaciones fullstack modernas.*

</div>