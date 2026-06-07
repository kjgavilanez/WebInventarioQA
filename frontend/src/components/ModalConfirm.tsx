interface Props {
  mensaje: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ModalConfirm({ mensaje, onConfirmar, onCancelar }: Props) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200,
      padding: "1rem",
    }}>
      <div style={{
        backgroundColor: "#1E293B",
        borderRadius: "12px",
        border: "1px solid #334155",
        padding: "2rem",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</p>
        <p style={{
          color: "#FFFFFF",
          fontSize: "1rem",
          marginBottom: "1.5rem",
          lineHeight: "1.5",
        }}>
          {mensaje}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={onCancelar}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: "8px",
              border: "1px solid #475569",
              backgroundColor: "transparent",
              color: "#94A3B8",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "bold",
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}