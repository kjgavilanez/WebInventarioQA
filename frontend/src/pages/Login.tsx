import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");
    if (token && usuario) {
      const { rol } = JSON.parse(usuario);
      navigate(rol === "ADMIN" ? "/dashboard" : "/catalogo");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.usuario);
      const rol = res.data.usuario.rol;
      navigate(rol === "ADMIN" ? "/dashboard" : "/catalogo");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Inventario QA</h1>
        <p style={styles.subtitulo}>Sistema de Gestión</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.campo}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="admin@inventario.com"
              required
            />
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button 
            type="submit" style={{
              ...styles.boton,
              opacity: cargando ? 0.6 : 1,
              cursor: cargando ? "not-allowed" : "pointer",
            }}
            disabled={cargando}>
            {cargando ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F172A",
  },
  card: {
    backgroundColor: "#1E293B",
    padding: "2.5rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: "1.8rem",
    fontWeight: "bold",
    margin: "0 0 0.25rem 0",
    textAlign: "center",
  },
  subtitulo: {
    color: "#64748B",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "0.9rem",
  },
  form: { display: "flex", flexDirection: "column", gap: "1.2rem" },
  campo: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { color: "#94A3B8", fontSize: "0.875rem" },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0F172A",
    color: "#FFFFFF",
    fontSize: "1rem",
    outline: "none",
  },
  error: {
    color: "#EF4444",
    fontSize: "0.875rem",
    textAlign: "center",
    margin: 0,
  },
  boton: {
    padding: "0.85rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
};