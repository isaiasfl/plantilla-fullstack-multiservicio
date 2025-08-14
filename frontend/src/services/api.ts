// Servicio centralizado para peticiones a la API
// Incluye configuración base y manejo de errores

// URL base de la API
// En desarrollo usa el proxy de Vite, en producción debe ser la URL real
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Configuración por defecto para fetch
const DEFAULT_CONFIG: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Clase personalizada para errores de API
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Función auxiliar para manejar respuestas HTTP
async function handleResponse<T>(response: Response): Promise<T> {
  // Si la respuesta no es exitosa, lanza un error
  if (!response.ok) {
    const errorMessage = `Error ${response.status}: ${response.statusText}`
    throw new ApiError(errorMessage, response.status, response)
  }

  // Intenta parsear como JSON
  try {
    return await response.json()
  } catch (error) {
    throw new ApiError('Respuesta inválida del servidor', response.status, response)
  }
}

// Función para realizar peticiones GET
export async function apiGet<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...DEFAULT_CONFIG,
      method: 'GET',
    })
    
    return handleResponse<T>(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Error de conexión', 0)
  }
}

// Función para realizar peticiones POST
export async function apiPost<T>(endpoint: string, data?: unknown): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...DEFAULT_CONFIG,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
    
    return handleResponse<T>(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Error de conexión', 0)
  }
}

// Función para realizar peticiones PUT
export async function apiPut<T>(endpoint: string, data?: unknown): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...DEFAULT_CONFIG,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
    
    return handleResponse<T>(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Error de conexión', 0)
  }
}

// Función para realizar peticiones DELETE
export async function apiDelete<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...DEFAULT_CONFIG,
      method: 'DELETE',
    })
    
    return handleResponse<T>(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Error de conexión', 0)
  }
}

// Ejemplo de servicio específico para el endpoint hello
export interface HelloResponse {
  message: string
  timestamp?: string
}

export const helloService = {
  // Obtiene el mensaje de saludo del backend
  getHello: (): Promise<HelloResponse> => {
    return apiGet<HelloResponse>('/hello')
  }
}