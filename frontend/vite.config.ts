import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para desarrollo con Docker
// https://vitejs.dev/config/
export default defineConfig({
  // Plugin de React para soporte completo de JSX y Fast Refresh
  plugins: [react()],
  
  // Configuración del servidor de desarrollo
  server: {
    // Permite conexiones desde cualquier IP (necesario para Docker)
    host: true,
    
    // Puerto donde se ejecutará el servidor de desarrollo
    port: 5173,
    
    // Falla si el puerto está ocupado en lugar de usar uno alternativo
    strictPort: true,
    
    // Configuración de proxy para el backend
    // Redirige las peticiones /api/* al backend
    proxy: {
      '/api': {
        // URL del backend (dentro de la red de Docker)
        target: 'http://backend:3000',
        
        // Cambia el origin de la petición para evitar problemas de CORS
        changeOrigin: true,
        
        // Mantiene el prefijo /api en la petición
        rewrite: (path) => path
      }
    },
    
    // Configuración de hot reload
    hmr: {
      // Puerto para Hot Module Replacement
      port: 5173
    }
  },
  
  // Configuración de build para producción
  build: {
    // Directorio de salida
    outDir: 'dist',
    
    // Genera source maps para debugging
    sourcemap: true,
    
    // Configuración de minificación
    minify: 'esbuild',
    
    // Límite de advertencia para archivos grandes (500kb)
    chunkSizeWarningLimit: 500
  },
  
  // Configuración de preview (servidor de producción local)
  preview: {
    host: true,
    port: 5173,
    strictPort: true
  },
  
  // Variables de entorno que serán expuestas al frontend
  // Solo las que empiecen con VITE_ serán incluidas en el bundle
  define: {
    // Versión de la aplicación
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})