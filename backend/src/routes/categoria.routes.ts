import { Router } from "express";
import { listarCategorias, crearCategoria, eliminarCategoria } from "../controllers/categoria.controller";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", listarCategorias);
router.post("/", verificarToken, soloAdmin, crearCategoria);
router.delete("/:id", verificarToken, soloAdmin, eliminarCategoria);

export default router;