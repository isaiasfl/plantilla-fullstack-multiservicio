// Configuración de conexión a MongoDB
// Descomenta y configura este archivo cuando necesites usar MongoDB

/*
import { MongoClient, Db } from 'mongodb'

// Cliente de MongoDB
let client: MongoClient
let database: Db

// Configuración de conexión
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@mongo:27017/plantilla_db?authSource=admin'
const DATABASE_NAME = process.env.DATABASE_NAME || 'plantilla_db'

// Función para conectar a MongoDB
export const connectMongoDB = async (): Promise<void> => {
  try {
    console.log('🔄 Conectando a MongoDB...')
    
    // Crear cliente de MongoDB
    client = new MongoClient(MONGODB_URI, {
      // Configuraciones de conexión
      maxPoolSize: 10, // Máximo 10 conexiones en el pool
      serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
      socketTimeoutMS: 45000, // Timeout de socket de 45 segundos
      bufferMaxEntries: 0, // Deshabilitar buffering
      bufferCommands: false, // No buffer de comandos
    })

    // Conectar al cliente
    await client.connect()
    
    // Seleccionar base de datos
    database = client.db(DATABASE_NAME)
    
    // Probar la conexión
    await database.admin().ping()
    
    console.log('✅ Conectado a MongoDB exitosamente')
    console.log(`📍 Base de datos: ${DATABASE_NAME}`)
    
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error)
    throw error
  }
}

// Función para desconectar de MongoDB
export const disconnectMongoDB = async (): Promise<void> => {
  try {
    if (client) {
      await client.close()
      console.log('✅ Desconectado de MongoDB')
    }
  } catch (error) {
    console.error('❌ Error al desconectar de MongoDB:', error)
    throw error
  }
}

// Función para obtener la base de datos
export const getDatabase = (): Db => {
  if (!database) {
    throw new Error('Base de datos no inicializada. Llama a connectMongoDB() primero.')
  }
  return database
}

// Función para obtener una colección
export const getCollection = (collectionName: string) => {
  const db = getDatabase()
  return db.collection(collectionName)
}

// Ejemplo de modelo de usuario usando MongoDB
export interface User {
  _id?: string
  name: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

// Ejemplo de funciones CRUD para usuarios
export const userModel = {
  // Crear usuario
  create: async (userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const collection = getCollection('users')
    const now = new Date()
    
    const user: User = {
      ...userData,
      createdAt: now,
      updatedAt: now
    }
    
    const result = await collection.insertOne(user)
    return { ...user, _id: result.insertedId.toString() }
  },

  // Buscar usuario por ID
  findById: async (id: string): Promise<User | null> => {
    const collection = getCollection('users')
    const user = await collection.findOne({ _id: id })
    return user as User | null
  },

  // Buscar usuario por email
  findByEmail: async (email: string): Promise<User | null> => {
    const collection = getCollection('users')
    const user = await collection.findOne({ email })
    return user as User | null
  },

  // Listar todos los usuarios
  findAll: async (): Promise<User[]> => {
    const collection = getCollection('users')
    const users = await collection.find({}).toArray()
    return users as User[]
  },

  // Actualizar usuario
  update: async (id: string, updateData: Partial<User>): Promise<User | null> => {
    const collection = getCollection('users')
    
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    )
    
    return result.value as User | null
  },

  // Eliminar usuario
  delete: async (id: string): Promise<boolean> => {
    const collection = getCollection('users')
    const result = await collection.deleteOne({ _id: id })
    return result.deletedCount > 0
  }
}

// Manejar cierre de la aplicación
process.on('SIGINT', async () => {
  await disconnectMongoDB()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await disconnectMongoDB()
  process.exit(0)
})
*/

export default {
  // Exporta un objeto vacío por ahora
  // Descomenta el código anterior cuando necesites usar MongoDB
}