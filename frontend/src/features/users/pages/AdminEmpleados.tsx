import type { Roles } from "@/types/UserTypes";
import UsersLists from "../components/UsersLists";

function AdminEmpleados() {
  const rolForFetch: Roles = "empleado";
  return (
    <div>
      <UsersLists rolForFetch={rolForFetch} />
    </div>
  );
}

export default AdminEmpleados;
