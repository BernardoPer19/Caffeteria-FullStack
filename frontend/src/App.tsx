import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { LoginForm } from "./features/auth/components/LoginForm";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./features/auth/context/AuthContext";
import Unauthorized from "./features/auth/pages/Unauthorized";
import AdminOrdenes from "./features/pedidos/pages/AdminOrdenes";
import AdminReservas from "./features/reservations/pages/AdminReservas";
import AdminUsuarios from "./features/users/pages/AdminUsuarios";
import AdminEmpleados from "./features/users/pages/AdminEmpleados";
import ProductosAdmin from "./features/products/pages/ProductosAdmin";
import Perfil from "./features/profile/page/Perfil";
import ProductsPage from "./features/products/pages/ProductsPage";
import HeaderWithCart from "./components/HeaderWithCart";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <HeaderWithCart />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/products" element={<ProductsPage />} />

            {/* Rutas protegidas para admin */}
            <Route
              element={<ProtectedRoute allowedRoles={["admin", "empleado"]} />}
            >
              <Route path="/admin/ordenes" element={<AdminOrdenes />} />
              <Route path="/admin/reservas" element={<AdminReservas />} />
              <Route path="/admin/productos" element={<ProductosAdmin />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/ordenes" element={<AdminOrdenes />} />
              <Route path="/admin/reservas" element={<AdminReservas />} />
              <Route path="/admin/usuarios" element={<AdminUsuarios />} />
              <Route path="/admin/empleados" element={<AdminEmpleados />} />
              <Route path="/admin/productos" element={<ProductosAdmin />} />
              <Route path="/admin/perfil" element={<Perfil />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["empleado"]} />}>
              <Route path="/empleado-panel" element={"<EmpleadoPanel />"} />
              <Route path="/admin/perfil" element={<Perfil />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
