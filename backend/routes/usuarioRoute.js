import express from 'express'
import { create } from "../controllers/usuarioController.js"

const router = express.Router()

router.post("/register", create)

export default router