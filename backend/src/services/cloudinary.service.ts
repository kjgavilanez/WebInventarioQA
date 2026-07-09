import { Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOADS_DIR = path.join(__dirname, "../../uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, unique + ext);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req: Request, file, cb) => {
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes JPG, PNG o WEBP"));
    }
  },
});

export const subirImagen = (buffer: Buffer): Promise<string> => {
  return Promise.reject(new Error("Cloudinary no está configurado"));
};
