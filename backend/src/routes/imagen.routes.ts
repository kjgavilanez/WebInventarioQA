import { Router } from "express";
import { uploadImagen } from "../controllers/imagen.controller";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware";
import { upload } from "../services/cloudinary.service";

const router = Router();

router.post("/", verificarToken, soloAdmin, upload.single("imagen"), uploadImagen);

export default router;