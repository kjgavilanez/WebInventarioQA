import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setCargando(true);
    try {
      await api.post("/auth/register", {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al registrar usuario");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Crear Cuenta</h1>
        <p style={styles.subtitulo}>Sistema de Gestión de Inventario</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.campo}>
            <label style={styles.label}>Nombre completo</label>
            <input
              type="text"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              style={styles.input}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={styles.input}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div style={styles.campo}>
            <label style={styles.label}>Confirmar contraseña</label>
            <input
              type="password"
              value={form.confirmar}
              onChange={e => setForm({ ...form, confirmar: e.target.value })}
              style={styles.input}
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            style={{
              ...styles.boton,
              opacity: cargando ? 0.6 : 1,
              cursor: cargando ? "not-allowed" : "pointer",
            }}
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <p style={styles.link}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={{ color: "#2563EB" }}>
            Inicia sesión
          </Link>
        </p>
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
    maxWidth: "420px",
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
    marginTop: "0.5rem",
  },
  link: {
    color: "#64748B",
    textAlign: "center",
    marginTop: "1.5rem",
    fontSize: "0.9rem",
  },
};