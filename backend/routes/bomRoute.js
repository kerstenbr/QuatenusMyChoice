import express from "express";
import multer from 'multer';
import { authenticateUser, isAdmin, isManager } from "../middlewares/authMiddleware.js";
import { createBom, findAll, findById, findByName, editBom, deleteBom, downloadBoms, uploadBoms } from "../controllers/bomController.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/bom' });

router.get("/", authenticateUser, findAll);
router.get("/download", authenticateUser, isAdmin, downloadBoms);
router.get("/search", authenticateUser, findByName);
router.get("/:id", authenticateUser, findById);
router.post("/", authenticateUser, isAdmin, createBom);
router.post('/upload', authenticateUser, isAdmin, upload.single('file'), uploadBoms);
router.put("/:id", authenticateUser, isManager, editBom);
router.delete("/:id", authenticateUser, isAdmin, deleteBom);

export default router;
