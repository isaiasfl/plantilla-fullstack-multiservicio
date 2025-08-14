import { Router } from 'express'
import { helloController } from '../controllers/helloController'

// Router para las rutas de hello
const router = Router()

// GET /api/hello - Endpoint de prueba básico
router.get('/hello', helloController.getHello)

// GET /api/hello/time - Endpoint con timestamp
router.get('/hello/time', helloController.getHelloWithTime)

// POST /api/hello - Endpoint que recibe datos
router.post('/hello', helloController.postHello)

export default router