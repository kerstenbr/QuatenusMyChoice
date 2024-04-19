import express from 'express'
import Familia from '../models/familiaModel.js'
import { findAll, findById, createNews, editNews, deleteNews } from "../controllers/familiaController.js"

const router = express.Router()

router.get("/", findAll)

router.get("/:id", findById)

router.post("/", createNews)

router.put('/:id', editNews)

router.delete('/:id', deleteNews)

export default router