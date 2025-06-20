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
import UserReservas from "./features/reservations/pages/UserReservas";
import HomePage from "./home/HomePage";
import Footer from "./home/Footer";
import { ProductsFilterProvider } from "./features/products/context/ProductsFilter";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <section className="min-h-screen flex flex-col">
            <HeaderWithCart />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginForm />} />

                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route path="/perfil" element={<Perfil />} />
                <Route
                  path="/products"
                  element={
                    <ProductsFilterProvider>
                      <ProductsPage />
                    </ProductsFilterProvider>
                  }
                />
                <Route path="/reservas" element={<UserReservas />} />

                {/* Rutas protegidas para admin */}
                <Route
                  element={
                    <ProtectedRoute allowedRoles={["admin", "empleado"]} />
                  }
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
            </main>
            <Footer />
          </section>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
