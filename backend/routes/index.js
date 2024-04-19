import { Router } from "express";
import familiaRoute from './familiaRoute.js'
import usuariosRoute from './usuarioRoute.js'

const router = Router()

router.use('/familias', familiaRoute)
router.use('/usuarios', usuariosRoute)

export default router