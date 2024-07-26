import express from "express";
import {
  findAll,
  findById,
  findByName,
  createFamily,
  editFamily,
  deleteFamily,
} from "../controllers/familyController.js";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// TODO: Se eu coloco o authenticaUser o front sempre vai entregar um erro. Provavelmente é algo simples, mas agora eu não
// estou entendendo o por que disso... Então por agora vou fazer a verificação somente no front
router.get("/", findAll);
router.get("/search", findByName);
router.get("/:id", findById);
router.post("/", authenticateUser, isAdmin, createFamily);
router.put("/:id", authenticateUser, isAdmin, editFamily);
router.delete("/:id", authenticateUser, isAdmin, deleteFamily);

export default router;
