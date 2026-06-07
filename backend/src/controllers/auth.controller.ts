import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);

  if (!passwordValida) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  );

  return res.json({
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  });
};

export const register = async (req: Request, res: Response) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const existe = await prisma.usuario.findUnique({ where: { email } });

  if (existe) {
    return res.status(409).json({ error: "El email ya está registrado" });
  }

  const hash = await bcrypt.hash(password, 10);

  const usuario = await prisma.usuario.create({
    data: { nombre, email, password: hash, rol: rol || "ADMIN" },
  });

  return res.status(201).json({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  });
};