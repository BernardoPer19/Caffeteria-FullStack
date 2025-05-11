import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { LoginForm } from "./features/auth/components/LoginForm";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Rutas protegidas para admin */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/admin-ordenes" element={"<AdminOrdenes />"} />
            <Route path="/admin-reservas" element={"<AdminReservas />"} />
            <Route path="/admin-usuarios" element={"<AdminUsuarios />"} />
            <Route path="/admin-empleados" element={"<AdminEmpleados />"} />
            <Route path="/productos" element={"<ProductosCRUD />"} />
          </Route>

          {/* Rutas protegidas para empleados o clientes */}
          <Route element={<ProtectedRoute requiredRole="empleado" />}>
            <Route path="/empleado-panel" element={"<EmpleadoPanel />"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
