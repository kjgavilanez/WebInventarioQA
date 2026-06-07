import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  soloAdmin?: boolean;
  soloCliente?: boolean;
}

export default function RutaProtegida({ children, soloAdmin, soloCliente }: Props) {
  const token = localStorage.getItem("token");
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!token || !usuarioGuardado) return <Navigate to="/login" />;

  const { rol } = JSON.parse(usuarioGuardado);

  if (soloAdmin && rol !== "ADMIN") return <Navigate to="/catalogo" />;
  if (soloCliente && rol !== "CLIENTE") return <Navigate to="/dashboard" />;

  return <>{children}</>;
}