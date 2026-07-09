import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes";
import productoRoutes from "./routes/producto.routes";
import categoriaRoutes from "./routes/categoria.routes";
import imagenRoutes from "./routes/imagen.routes";
import usuarioRoutes from "./routes/usuario.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.use("/api/imagenes", imagenRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});