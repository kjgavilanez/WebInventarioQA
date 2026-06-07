import { Router } from "express";
import { listarUsuarios, eliminarUsuario, cambiarRol } from "../controllers/auth.controller";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verificarToken, soloAdmin, listarUsuarios);
router.delete("/:id", verificarToken, soloAdmin, eliminarUsuario);
router.patch("/:id/rol", verificarToken, soloAdmin, cambiarRol);

export default router;