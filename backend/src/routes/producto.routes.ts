import { Router } from "express";
import { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } from "../controllers/producto.controller";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", listarProductos);
router.get("/:id", obtenerProducto);
router.post("/", verificarToken, soloAdmin, crearProducto);
router.put("/:id", verificarToken, soloAdmin, actualizarProducto);
router.delete("/:id", verificarToken, soloAdmin, eliminarProducto);

export default router;