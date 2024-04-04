import { Router } from "express";
import familiaRoute from './familiasRoute.js'

const router = Router()

router.use('/familias', familiaRoute)

export default router