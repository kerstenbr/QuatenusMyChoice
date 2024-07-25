import express from 'express'
import { findAll, findById, findByName, createFamily, editFamily, deleteFamily } from "../controllers/familyController.js"
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", findAll)
router.get("/search", findByName)
router.get("/:id", findById)
router.post("/", authenticateUser, isAdmin, createFamily)
router.put('/:id', authenticateUser, isAdmin, editFamily)
router.delete('/:id', authenticateUser, isAdmin, deleteFamily)

export default router