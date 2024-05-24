import express from 'express'
import { register, login, findUser } from "../controllers/userController.js"
import { authenticateUser } from '../middlewares/authMiddleware.js'
import { validId } from '../middlewares/globalMiddleware.js'

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/findUser/:id?", authenticateUser, validId, findUser)

export default router
