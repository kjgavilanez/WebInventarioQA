import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  rol: string;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: TokenPayload;
    }
  }
}

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const soloAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.usuario?.rol !== "ADMIN") {
    return res.status(403).json({ error: "Acceso denegado: se requiere rol ADMIN" });
  }
  next();
};