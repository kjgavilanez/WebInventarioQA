import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario");
  const rol = usuario ? JSON.parse(usuario).rol : null;

  const irInicio = () => {
    if (!rol) navigate("/login");
    else if (rol === "ADMIN") navigate("/dashboard");
    else navigate("/catalogo");
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0F172A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
      textAlign: "center",
      padding: "2rem",
    }}>
      <p style={{ fontSize: "5rem" }}>📦</p>
      <h1 style={{ color: "#FFFFFF", fontSize: "4rem", fontWeight: "bold", margin: 0 }}>404</h1>
      <p style={{ color: "#64748B", fontSize: "1.1rem" }}>
        Esta página no existe o fue movida.
      </p>
      <button
        onClick={irInicio}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 2rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2563EB",
          color: "#FFFFFF",
          fontSize: "1rem",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Volver al inicio
      </button>
    </div>
  );
}