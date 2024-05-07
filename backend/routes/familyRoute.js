import express from 'express'
import { findAll, findById, createFamily, editFamily, deleteFamily } from "../controllers/familyController.js"
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

// TODO: Colocar a autenticação novamente depois do front estar funcionando
router.get("/", findAll) // authenticateUser, 
router.get("/:id", findById) // authenticateUser, 
router.post("/", createFamily) // authenticateUser, isAdmin
router.put('/:id', editFamily) // authenticateUser, isAdmin
router.delete('/:id', deleteFamily) // authenticateUser, isAdmin

export default router