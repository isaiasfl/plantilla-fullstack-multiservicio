import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Importar rutas
import helloRoutes from './routes/hello'

// Cargar variables de entorno
dotenv.config()

// Crear aplicación Express
const app = express()

// Puerto del servidor (por defecto 3000)
const PORT = process.env.PORT || 3000

// Configuración de CORS
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// Middlewares de seguridad y utilidad
app.use(helmet()) // Seguridad HTTP headers
app.use(cors(corsOptions)) // CORS configurado
app.use(morgan('combined')) // Logs de peticiones HTTP
app.use(express.json()) // Parser de JSON
app.use(express.urlencoded({ extended: true })) // Parser de URL encoded

// Middleware para logging personalizado
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Rutas de la API
app.use('/api', helloRoutes)

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Plantilla Backend API',
    version: '0.1.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api',
      hello: '/api/hello'
    },
    documentation: 'Ver README.md para más información'
  })
})

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.originalUrl} no existe`,
    availableEndpoints: {
      root: 'GET /',
      health: 'GET /health',
      hello: 'GET /api/hello'
    }
  })
})

// Middleware global de manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message)
  console.error('Stack:', err.stack)
  
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal',
    timestamp: new Date().toISOString()
  })
})

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 Servidor backend iniciado correctamente!
📍 Entorno: ${process.env.NODE_ENV || 'development'}
🌐 Puerto: ${PORT}
🔗 URL: http://localhost:${PORT}
⚡ Hot reload: Activo
📋 Health check: http://localhost:${PORT}/health
🎯 API endpoints: http://localhost:${PORT}/api
  `)
})

export default app