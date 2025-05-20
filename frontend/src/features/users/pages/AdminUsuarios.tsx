import UsersLists from "../components/UsersLists";
import type { Roles } from "@/types/UserTypes";
import { Toaster } from "sonner";

function AdminUsuarios() {
  const rolForFetch: Roles = "usuario";
  return (
    <main className="p-10 h-[80vh]">
      <h2 className="text-3xl font-bold text-center text-[#6b4c3b] mb-8 tracking-wide">
        Panel de Usuarios👥
      </h2>
      <Toaster position="top-right" theme="dark" closeButton duration={2000} />
      <UsersLists rolForFetch={rolForFetch} />
    </main>
  );
}

export default AdminUsuarios;
