import express from 'express'
import { findAll, findById, createFamily, editFamily, deleteFamily } from "../controllers/familyController.js"

const router = express.Router()

router.get("/", findAll)

router.get("/:id", findById)

router.post("/", createFamily)

router.put('/:id', editFamily)

router.delete('/:id', deleteFamily)

export default router