import { Router } from "express";
import familiaRoute from './routes/familiasRoute.js'

const router = Router()

router.use(familiaRoute)

export default router