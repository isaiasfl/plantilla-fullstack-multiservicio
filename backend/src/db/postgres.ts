// Configuración de conexión a PostgreSQL
// Descomenta y configura este archivo cuando necesites usar PostgreSQL

/*
import { Pool, Client } from 'pg'

// Pool de conexiones de PostgreSQL
let pool: Pool

// Configuración de conexión
const dbConfig = {
  user: process.env.DATABASE_USER || 'user',
  host: process.env.DATABASE_HOST || 'postgres',
  database: process.env.DATABASE_NAME || 'plantilla_db',
  password: process.env.DATABASE_PASSWORD || 'password',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  
  // Configuraciones del pool
  max: 20, // Máximo 20 conexiones en el pool
  idleTimeoutMillis: 30000, // Cerrar conexiones inactivas después de 30 segundos
  connectionTimeoutMillis: 2000, // Timeout de conexión de 2 segundos
}

// Función para conectar a PostgreSQL
export const connectPostgreSQL = async (): Promise<void> => {
  try {
    console.log('🔄 Conectando a PostgreSQL...')
    
    // Crear pool de conexiones
    pool = new Pool(dbConfig)
    
    // Probar la conexión
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    
    console.log('✅ Conectado a PostgreSQL exitosamente')
    console.log(`📍 Base de datos: ${dbConfig.database}`)
    console.log(`🕒 Hora del servidor: ${result.rows[0].now}`)
    
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:', error)
    throw error
  }
}

// Función para desconectar de PostgreSQL
export const disconnectPostgreSQL = async (): Promise<void> => {
  try {
    if (pool) {
      await pool.end()
      console.log('✅ Desconectado de PostgreSQL')
    }
  } catch (error) {
    console.error('❌ Error al desconectar de PostgreSQL:', error)
    throw error
  }
}

// Función para obtener el pool de conexiones
export const getPool = (): Pool => {
  if (!pool) {
    throw new Error('Pool no inicializado. Llama a connectPostgreSQL() primero.')
  }
  return pool
}

// Función auxiliar para ejecutar queries
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

// Función para ejecutar transacciones
export const transaction = async (callback: (client: Client) => Promise<any>) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

// Ejemplo de tabla de usuarios
export const createUsersTable = async (): Promise<void> => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `
  
  try {
    await query(createTableQuery)
    console.log('✅ Tabla users creada/verificada exitosamente')
  } catch (error) {
    console.error('❌ Error al crear tabla users:', error)
    throw error
  }
}

// Ejemplo de modelo de usuario usando PostgreSQL
export interface User {
  id?: number
  name: string
  email: string
  created_at?: Date
  updated_at?: Date
}

// Ejemplo de funciones CRUD para usuarios
export const userModel = {
  // Crear usuario
  create: async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const insertQuery = `
      INSERT INTO users (name, email) 
      VALUES ($1, $2) 
      RETURNING *
    `
    
    const result = await query(insertQuery, [userData.name, userData.email])
    return result.rows[0] as User
  },

  // Buscar usuario por ID
  findById: async (id: number): Promise<User | null> => {
    const selectQuery = 'SELECT * FROM users WHERE id = $1'
    const result = await query(selectQuery, [id])
    return result.rows[0] || null
  },

  // Buscar usuario por email
  findByEmail: async (email: string): Promise<User | null> => {
    const selectQuery = 'SELECT * FROM users WHERE email = $1'
    const result = await query(selectQuery, [email])
    return result.rows[0] || null
  },

  // Listar todos los usuarios
  findAll: async (): Promise<User[]> => {
    const selectQuery = 'SELECT * FROM users ORDER BY created_at DESC'
    const result = await query(selectQuery)
    return result.rows as User[]
  },

  // Actualizar usuario
  update: async (id: number, updateData: Partial<User>): Promise<User | null> => {
    const fields = Object.keys(updateData).filter(key => key !== 'id')
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')
    const values = fields.map(field => updateData[field as keyof User])
    
    const updateQuery = `
      UPDATE users 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `
    
    const result = await query(updateQuery, [id, ...values])
    return result.rows[0] || null
  },

  // Eliminar usuario
  delete: async (id: number): Promise<boolean> => {
    const deleteQuery = 'DELETE FROM users WHERE id = $1'
    const result = await query(deleteQuery, [id])
    return result.rowCount > 0
  }
}

// Manejar cierre de la aplicación
process.on('SIGINT', async () => {
  await disconnectPostgreSQL()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await disconnectPostgreSQL()
  process.exit(0)
})
*/

export default {
  // Exporta un objeto vacío por ahora
  // Descomenta el código anterior cuando necesites usar PostgreSQL
}