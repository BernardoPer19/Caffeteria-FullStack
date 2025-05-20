import type { Roles } from "@/types/UserTypes";
import UsersLists from "../components/UsersLists";
import { Toaster } from "sonner";
import RegisterEmpleadoForm from "../../../features/auth/components/RegisterEmpleadoForm";

function AdminEmpleados() {
  const rolForFetch: Roles = "empleado";

  return (
    <main className="p-10 h-[80vh] max-w-[1280px] m-auto">
      <h2 className="text-3xl font-bold text-center text-[#6b4c3b] mb-8 tracking-wide">
        Panel de Empleados 👤
      </h2>
      <Toaster position="top-right" theme="dark" closeButton duration={2000} />
      <RegisterEmpleadoForm />
      <UsersLists rolForFetch={rolForFetch} />
    </main>
  );
}

export default AdminEmpleados;
