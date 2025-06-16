import express from "express";
import multer from 'multer';
import { findAll, findById, createFamily, editFamily, deleteFamily, downloadFamilies, uploadFamilies } from "../controllers/familyController.js";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/families' });

router.get("/", authenticateUser, findAll);
router.get("/download", authenticateUser, isAdmin, downloadFamilies);
// router.get("/search", authenticateUser, findByName);
router.get("/:id", authenticateUser, findById);
router.post("/", authenticateUser, isAdmin, createFamily);
router.post('/upload', authenticateUser, isAdmin, upload.single('file'), uploadFamilies);
router.put("/:id", authenticateUser, isAdmin, editFamily);
router.delete("/:id", authenticateUser, isAdmin, deleteFamily);

export default router;
