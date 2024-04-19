import express from 'express'
import { findAll, findById, createFamily, editFamily, deleteFamily } from "../controllers/familyController.js"
import { authenticateUser } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", findAll)

router.get("/:id", findById)

router.post("/", authenticateUser, createFamily)

router.put('/:id', authenticateUser, editFamily)

router.delete('/:id', authenticateUser, deleteFamily)

export default router