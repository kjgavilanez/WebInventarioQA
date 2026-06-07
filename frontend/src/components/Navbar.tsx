import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">📦 Inventario QA</div>
      <div className="navbar-usuario">
        <span className="navbar-nombre">{usuario?.nombre}</span>
        <span className="navbar-rol">{usuario?.rol}</span>
        <button onClick={logout} className="navbar-boton-salir">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}