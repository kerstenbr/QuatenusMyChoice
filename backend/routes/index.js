import { Router } from "express";
import familiaRoute from './familiasRoute.js'
import usuariosRoute from './usuariosRoute.js'

const router = Router()

router.use('/familias', familiaRoute)
router.use('/usuarios', usuariosRoute)

export default router