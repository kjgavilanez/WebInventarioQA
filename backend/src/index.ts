import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import productoRoutes from "./routes/producto.routes";
import categoriaRoutes from "./routes/categoria.routes";
import imagenRoutes from "./routes/imagen.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);


app.use("/api/imagenes", imagenRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});