import express from 'express'
import { findAll, findById, findByName, createFamily, editFamily, deleteFamily } from "../controllers/familyController.js"
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

// TODO: Colocar a autenticação novamente depois do front estar funcionando
router.get("/", findAll) // authenticateUser
router.get("/search", findByName) // authenticateUser, 
router.get("/:id", findById) // authenticateUser, 
router.post("/", authenticateUser, isAdmin, createFamily) // authenticateUser, isAdmin
router.put('/:id', authenticateUser, isAdmin, editFamily) // authenticateUser, isAdmin
router.delete('/:id', authenticateUser, isAdmin, deleteFamily) // authenticateUser, isAdmin

export default router