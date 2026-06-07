import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", verificarToken, soloAdmin, register);

export default router;