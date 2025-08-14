# Dockerfile para el frontend (React + Vite + TypeScript)
# Optimizado para desarrollo con hot reload

# Usa Node.js Alpine para un contenedor más ligero
FROM node:20-alpine

# Instala pnpm globalmente para gestión de paquetes más eficiente
RUN npm install -g pnpm

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de paquetes primero
# Esto aprovecha la caché de Docker para no reinstalar deps si no cambian
COPY package.json pnpm-lock.yaml* ./

# Instala las dependencias
# Si existe pnpm-lock.yaml usa --frozen-lockfile, sino instala normalmente
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usa Vite por defecto
EXPOSE 5173

# Comando por defecto para desarrollo
# El script 'dev' debe estar configurado en package.json para usar --host 0.0.0.0
CMD ["pnpm", "run", "dev"]