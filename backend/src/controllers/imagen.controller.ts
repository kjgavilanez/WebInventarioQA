import { Request, Response } from "express";

export const uploadImagen = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se envió ninguna imagen" });
    }

    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    return res.json({ url });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Error al subir imagen" });
  }
};
