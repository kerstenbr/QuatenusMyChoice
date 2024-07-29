import express from "express";
import { findAll, createRole } from "../controllers/roleController.js";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";
import { validId } from "../middlewares/globalMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, validId, isAdmin, createRole);
router.get("/", authenticateUser, validId, isAdmin, findAll);

export default router;
