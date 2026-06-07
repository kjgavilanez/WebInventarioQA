import { useEffect } from "react";

interface Props {
  mensaje: string;
  tipo?: "exito" | "error";
  onClose: () => void;
}

export default function Toast({ mensaje, tipo = "exito", onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const color = tipo === "exito" ? "#16A34A" : "#DC2626";
  const icono = tipo === "exito" ? "✅" : "❌";

  return (
    <div style={{
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
      backgroundColor: "#1E293B",
      border: `1px solid ${color}`,
      borderLeft: `4px solid ${color}`,
      borderRadius: "8px",
      padding: "1rem 1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      zIndex: 999,
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      animation: "slideIn 0.3s ease",
      maxWidth: "320px",
    }}>
      <span style={{ fontSize: "1.2rem" }}>{icono}</span>
      <span style={{ color: "#FFFFFF", fontSize: "0.9rem" }}>{mensaje}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#64748B",
          cursor: "pointer",
          marginLeft: "auto",
          fontSize: "1rem",
        }}
      >✕</button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}