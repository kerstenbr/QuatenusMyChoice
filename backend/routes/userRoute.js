import express from "express";
import { findAll, register, login, findUser, editUser, deleteUser } from "../controllers/userController.js";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";
import { validId } from "../middlewares/globalMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticateUser, validId, isAdmin, findAll);
router.get("/findUser/:id?", authenticateUser, validId, findUser);
router.put("/:id?", authenticateUser, validId, isAdmin, editUser);
router.delete('/:id', authenticateUser, isAdmin, deleteUser)

export default router;
