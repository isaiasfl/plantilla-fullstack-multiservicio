// Configuración de conexión a SQLite
// Descomenta y configura este archivo cuando necesites usar SQLite

/*
import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from 'path'

// Base de datos SQLite
let db: Database<sqlite3.Database, sqlite3.Statement>

// Ruta de la base de datos
const DB_PATH = process.env.DATABASE_URL?.replace('file:', '') || path.join(__dirname, '../../dev.db')

// Función para conectar a SQLite
export const connectSQLite = async (): Promise<void> => {
  try {
    console.log('🔄 Conectando a SQLite...')
    
    // Abrir base de datos SQLite
    db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database
    })
    
    // Habilitar claves foráneas
    await db.exec('PRAGMA foreign_keys = ON')
    
    console.log('✅ Conectado a SQLite exitosamente')
    console.log(`📍 Archivo de base de datos: ${DB_PATH}`)
    
  } catch (error) {
    console.error('❌ Error al conectar a SQLite:', error)
    throw error
  }
}

// Función para desconectar de SQLite
export const disconnectSQLite = async (): Promise<void> => {
  try {
    if (db) {
      await db.close()
      console.log('✅ Desconectado de SQLite')
    }
  } catch (error) {
    console.error('❌ Error al desconectar de SQLite:', error)
    throw error
  }
}

// Función para obtener la base de datos
export const getDatabase = (): Database<sqlite3.Database, sqlite3.Statement> => {
  if (!db) {
    throw new Error('Base de datos no inicializada. Llama a connectSQLite() primero.')
  }
  return db
}

// Función para ejecutar transacciones
export const transaction = async (callback: (db: Database<sqlite3.Database, sqlite3.Statement>) => Promise<any>) => {
  const database = getDatabase()
  try {
    await database.exec('BEGIN TRANSACTION')
    const result = await callback(database)
    await database.exec('COMMIT')
    return result
  } catch (error) {
    await database.exec('ROLLBACK')
    throw error
  }
}

// Ejemplo de tabla de usuarios
export const createUsersTable = async (): Promise<void> => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `
  
  try {
    await db.exec(createTableQuery)
    console.log('✅ Tabla users creada/verificada exitosamente')
  } catch (error) {
    console.error('❌ Error al crear tabla users:', error)
    throw error
  }
}

// Trigger para actualizar updated_at automáticamente
export const createUpdateTrigger = async (): Promise<void> => {
  const createTriggerQuery = `
    CREATE TRIGGER IF NOT EXISTS update_users_updated_at 
    AFTER UPDATE ON users
    FOR EACH ROW 
    BEGIN
      UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `
  
  try {
    await db.exec(createTriggerQuery)
    console.log('✅ Trigger de actualización creado exitosamente')
  } catch (error) {
    console.error('❌ Error al crear trigger:', error)
    throw error
  }
}

// Ejemplo de modelo de usuario usando SQLite
export interface User {
  id?: number
  name: string
  email: string
  created_at?: string
  updated_at?: string
}

// Ejemplo de funciones CRUD para usuarios
export const userModel = {
  // Crear usuario
  create: async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const insertQuery = `
      INSERT INTO users (name, email) 
      VALUES (?, ?) 
    `
    
    const result = await db.run(insertQuery, [userData.name, userData.email])
    
    // Obtener el usuario creado
    const createdUser = await db.get('SELECT * FROM users WHERE id = ?', result.lastID)
    return createdUser as User
  },

  // Buscar usuario por ID
  findById: async (id: number): Promise<User | null> => {
    const selectQuery = 'SELECT * FROM users WHERE id = ?'
    const user = await db.get(selectQuery, id)
    return user as User | null
  },

  // Buscar usuario por email
  findByEmail: async (email: string): Promise<User | null> => {
    const selectQuery = 'SELECT * FROM users WHERE email = ?'
    const user = await db.get(selectQuery, email)
    return user as User | null
  },

  // Listar todos los usuarios
  findAll: async (): Promise<User[]> => {
    const selectQuery = 'SELECT * FROM users ORDER BY created_at DESC'
    const users = await db.all(selectQuery)
    return users as User[]
  },

  // Actualizar usuario
  update: async (id: number, updateData: Partial<User>): Promise<User | null> => {
    const fields = Object.keys(updateData).filter(key => key !== 'id')
    const setClause = fields.map(field => `${field} = ?`).join(', ')
    const values = fields.map(field => updateData[field as keyof User])
    
    const updateQuery = `
      UPDATE users 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `
    
    await db.run(updateQuery, [...values, id])
    
    // Retornar el usuario actualizado
    return await userModel.findById(id)
  },

  // Eliminar usuario
  delete: async (id: number): Promise<boolean> => {
    const deleteQuery = 'DELETE FROM users WHERE id = ?'
    const result = await db.run(deleteQuery, id)
    return (result.changes || 0) > 0
  },

  // Contar usuarios
  count: async (): Promise<number> => {
    const countQuery = 'SELECT COUNT(*) as count FROM users'
    const result = await db.get(countQuery)
    return result.count
  }
}

// Función para inicializar la base de datos con tablas
export const initializeDatabase = async (): Promise<void> => {
  try {
    await createUsersTable()
    await createUpdateTrigger()
    console.log('✅ Base de datos inicializada correctamente')
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error)
    throw error
  }
}

// Manejar cierre de la aplicación
process.on('SIGINT', async () => {
  await disconnectSQLite()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await disconnectSQLite()
  process.exit(0)
})
*/

export default {
  // Exporta un objeto vacío por ahora
  // Descomenta el código anterior cuando necesites usar SQLite
}