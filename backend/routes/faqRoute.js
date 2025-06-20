import express from "express";
import { authenticateUser, isAdmin, isManager } from "../middlewares/authMiddleware.js";
import { createFaq, findAll, findById, editFaq, deleteFaq } from "../controllers/faqController.js";

const router = express.Router();

router.get("/", authenticateUser, findAll);
router.get("/:id", authenticateUser, findById);
router.post("/", authenticateUser, isAdmin, createFaq);
router.put("/:id", authenticateUser, isManager, editFaq);
router.delete("/:id", authenticateUser, isAdmin, deleteFaq);

export default router;
