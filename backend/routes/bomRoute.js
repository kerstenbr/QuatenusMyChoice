import express from "express";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";
import { findAll } from "../controllers/bomController.js";

const router = express.Router();

router.get("/", authenticateUser, findAll);

export default router;
