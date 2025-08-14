import { Request, Response, NextFunction } from 'express'

// Interfaz para errores customizados
export interface CustomError extends Error {
  statusCode?: number
  isOperational?: boolean
}

// Middleware para crear errores HTTP
export const createError = (
  statusCode: number,
  message: string,
  isOperational = true
): CustomError => {
  const error = new Error(message) as CustomError
  error.statusCode = statusCode
  error.isOperational = isOperational
  return error
}

// Middleware de manejo de errores 404
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = createError(404, `Endpoint ${req.method} ${req.originalUrl} no encontrado`)
  next(error)
}

// Middleware global de manejo de errores
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode = 500, message } = err

  // Si es un error de desarrollo, mostramos más detalles
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Error capturado:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    })
  } else {
    console.error('🚨 Error en producción:', err.message)
  }

  // Si no es un error operacional, no exponemos detalles
  if (!err.isOperational) {
    statusCode = 500
    message = 'Error interno del servidor'
  }

  res.status(statusCode).json({
    error: true,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
    // Solo incluir stack trace en desarrollo
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack 
    })
  })
}

// Middleware para validar JSON
export const validateJSON = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: true,
      message: 'JSON inválido en el cuerpo de la petición',
      statusCode: 400,
      timestamp: new Date().toISOString()
    })
  }
  next(err)
}