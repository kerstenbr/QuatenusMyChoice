import express from "express";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";
import { createBom, findAll, findById, findByName, editBom, deleteBom } from "../controllers/bomController.js";

const router = express.Router();

// Se houver problema no front, lembrar de tirar o authenticateUser de algumas rotas
router.get("/", authenticateUser, findAll);
// download aqui
router.get("/search", authenticateUser, findByName);
router.get("/:id", authenticateUser, findById);
router.post("/", authenticateUser, isAdmin, createBom);
// uploud aqui
router.put("/:id", authenticateUser, isAdmin, editBom);
router.delete("/:id", authenticateUser, isAdmin, deleteBom);

export default router;
