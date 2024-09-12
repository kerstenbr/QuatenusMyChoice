import express from "express";
import multer from 'multer';
import { findAll, findById, findByName, createFamily, editFamily, deleteFamily, downloadFamilies, uploadFamilies } from "../controllers/familyController.js";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Diretório temporário para armazenar o arquivo

// TODO: Se eu coloco o authenticateUser o front sempre vai entregar um erro. Provavelmente é algo simples, mas agora eu não
// estou entendendo o por que disso... Então por agora vou fazer a verificação somente no front
router.get("/", findAll);
router.get("/download", authenticateUser, isAdmin, downloadFamilies);
router.get("/search", findByName);
router.get("/:id", findById);
router.post("/", authenticateUser, isAdmin, createFamily);
router.post('/upload', authenticateUser, isAdmin, upload.single('file'), uploadFamilies);
router.put("/:id", authenticateUser, isAdmin, editFamily);
router.delete("/:id", authenticateUser, isAdmin, deleteFamily);

export default router;
