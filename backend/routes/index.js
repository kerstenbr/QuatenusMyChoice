import { Router } from "express";
import familyRoute from './familyRoute.js'
import userRoute from './userRoute.js'

const router = Router()

router.use('/families', familyRoute)
router.use('/user', userRoute)

export default router