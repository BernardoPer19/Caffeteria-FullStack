import React from "react";
import UsersLists from "../components/UsersLists";
import type { Roles } from "@/types/UserTypes";

function AdminUsuarios() {
  const rolForFetch: Roles = "usuario";
  return (
    <div>
      <UsersLists rolForFetch={rolForFetch} />
    </div>
  );
}

export default AdminUsuarios;
