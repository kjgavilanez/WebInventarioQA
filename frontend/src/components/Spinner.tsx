export default function Spinner() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4rem",
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: "4px solid #334155",
        borderTop: "4px solid #2563EB",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}