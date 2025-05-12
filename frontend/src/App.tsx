import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { LoginForm } from "./features/auth/components/LoginForm";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./features/auth/context/AuthContext";
import Unauthorized from "./features/auth/pages/Unauthorized";
import AdminOrdenes from "./features/pedidos/pages/AdminOrdenes";
import AdminReservas from "./features/reservations/pages/AdminReservas";
import AdminUsuarios from "./features/users/pages/AdminUsuarios";
import AdminEmpleados from "./features/users/pages/AdminEmpleados";
import ProductosAdmin from "./features/products/pages/ProductosAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Rutas protegidas para admin */}
            <Route
              element={<ProtectedRoute allowedRoles={["admin", "empleado"]} />}
            >
              <Route path="/admin-ordenes" element={<AdminOrdenes />} />
              <Route path="/admin-reservas" element={<AdminReservas />} />
              <Route path="/admin-usuarios" element={<AdminUsuarios />} />
              <Route path="/admin-empleados" element={<AdminEmpleados />} />
              <Route path="/admin-productos" element={<ProductosAdmin />} />
            </Route>

            {/* Rutas protegidas para empleados o clientes */}
            <Route element={<ProtectedRoute allowedRoles={["empleado"]} />}>
              <Route path="/empleado-panel" element={"<EmpleadoPanel />"} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
