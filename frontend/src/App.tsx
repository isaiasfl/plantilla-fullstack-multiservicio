import { useState, useEffect } from 'react'
import './App.css'

// Tipo para la respuesta del backend
interface BackendResponse {
  message: string
  timestamp?: string
}

function App() {
  // Estado para almacenar la respuesta del backend
  const [backendMessage, setBackendMessage] = useState<string>('Conectando...')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Función para conectar con el backend
  const fetchBackendMessage = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Realiza petición al endpoint del backend
      // La URL se resuelve a través del proxy configurado en vite.config.ts
      const response = await fetch('/api/hello')
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data: BackendResponse = await response.json()
      setBackendMessage(data.message)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      setBackendMessage('Error al conectar con el backend')
    } finally {
      setIsLoading(false)
    }
  }

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    fetchBackendMessage()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Plantilla Fullstack</h1>
        <p>React + TypeScript + Vite + Node.js + Express</p>
        
        <div className="connection-status">
          <h2>Estado de conexión:</h2>
          
          {isLoading && (
            <div className="loading">
              <span>⏳ Conectando con el backend...</span>
            </div>
          )}
          
          {error && (
            <div className="error">
              <span>❌ {error}</span>
              <button onClick={fetchBackendMessage} className="retry-button">
                🔄 Reintentar
              </button>
            </div>
          )}
          
          {!isLoading && !error && (
            <div className="success">
              <span>✅ {backendMessage}</span>
            </div>
          )}
        </div>

        <div className="info-cards">
          <div className="card">
            <h3>Frontend</h3>
            <p>🌐 Puerto 5173</p>
            <p>⚛️ React + TypeScript</p>
            <p>⚡ Vite + Hot Reload</p>
          </div>
          
          <div className="card">
            <h3>Backend</h3>
            <p>🔗 Puerto 3000</p>
            <p>🟢 Node.js + Express</p>
            <p>📝 TypeScript + Hot Reload</p>
          </div>
        </div>

        <div className="next-steps">
          <h3>Próximos pasos:</h3>
          <ul>
            <li>✏️ Personaliza esta aplicación</li>
            <li>🗄️ Agrega una base de datos (MongoDB/PostgreSQL)</li>
            <li>🔐 Implementa autenticación</li>
            <li>🎨 Agrega estilos con tu framework favorito</li>
            <li>📝 Consulta la documentación en <code>/docs</code></li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App