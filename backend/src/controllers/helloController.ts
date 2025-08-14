import { Request, Response } from 'express'

// Tipos para las respuestas
interface HelloResponse {
  message: string
  timestamp?: string
  data?: unknown
}

// Controlador para el endpoint /api/hello
export const helloController = {
  // GET /api/hello - Saludo básico
  getHello: (req: Request, res: Response) => {
    const response: HelloResponse = {
      message: '¡Hola desde el backend! 🎉 La conexión funciona correctamente.'
    }
    
    console.log('✅ Petición GET /api/hello recibida')
    res.status(200).json(response)
  },

  // GET /api/hello/time - Saludo con timestamp
  getHelloWithTime: (req: Request, res: Response) => {
    const response: HelloResponse = {
      message: '¡Hola desde el backend con timestamp!',
      timestamp: new Date().toISOString()
    }
    
    console.log('✅ Petición GET /api/hello/time recibida')
    res.status(200).json(response)
  },

  // POST /api/hello - Saludo con datos enviados
  postHello: (req: Request, res: Response) => {
    const { name, message: clientMessage } = req.body
    
    const response: HelloResponse = {
      message: name 
        ? `¡Hola ${name}! Mensaje recibido desde el backend.`
        : '¡Hola! Mensaje recibido desde el backend.',
      timestamp: new Date().toISOString(),
      data: {
        receivedMessage: clientMessage,
        receivedName: name,
        serverResponse: 'Datos procesados correctamente'
      }
    }
    
    console.log('✅ Petición POST /api/hello recibida:', { name, clientMessage })
    res.status(201).json(response)
  }
}