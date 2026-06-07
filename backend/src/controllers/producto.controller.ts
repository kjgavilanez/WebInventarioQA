import { Request, Response } from "express";
import * as ProductoService from "../services/producto.service";

export const listarProductos = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoService.obtenerProductos();
    res.json(productos);
  } catch {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const obtenerProducto = async (req: Request, res: Response) => {
  try {
    const producto = await ProductoService.obtenerProductoPorId(Number(req.params.id));
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch {
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, precio, stock, descripcion, imagenUrl, categoriaId } = req.body;

    if (!nombre || precio === undefined || stock === undefined || !categoriaId) {
      return res.status(400).json({ error: "Nombre, precio, stock y categoría son requeridos" });
    }

    if (precio < 0) return res.status(400).json({ error: "El precio no puede ser negativo" });
    if (stock < 0) return res.status(400).json({ error: "El stock no puede ser negativo" });

    const producto = await ProductoService.crearProducto({
      nombre,
      precio,
      stock,
      descripcion,
      imagenUrl,
      categoriaId: Number(categoriaId),
      usuarioId: req.usuario!.id,
    });

    res.status(201).json(producto);
  } catch {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, precio, stock, descripcion, imagenUrl, categoriaId } = req.body;

    if (precio !== undefined && precio < 0)
      return res.status(400).json({ error: "El precio no puede ser negativo" });
    if (stock !== undefined && stock < 0)
      return res.status(400).json({ error: "El stock no puede ser negativo" });

    const producto = await ProductoService.actualizarProducto(Number(req.params.id), {
      nombre, precio, stock, descripcion, imagenUrl,
      categoriaId: categoriaId ? Number(categoriaId) : undefined,
    });

    res.json(producto);
  } catch {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    await ProductoService.eliminarProducto(Number(req.params.id));
    res.json({ message: "Producto eliminado correctamente" });
  } catch {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};