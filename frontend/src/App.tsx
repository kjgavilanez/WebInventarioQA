import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Catalogo from "./pages/Catalogo";
import NotFound from "./pages/NotFound";
import RutaProtegida from "./components/RutaProtegida";
import DetalleProducto from "./pages/DetalleProducto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <RutaProtegida soloAdmin>
            <Dashboard />
          </RutaProtegida>
        } />
        <Route path="/catalogo" element={
          <RutaProtegida soloCliente>
            <Catalogo />
          </RutaProtegida>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/producto/:id" element={
          <RutaProtegida>
            <DetalleProducto />
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;