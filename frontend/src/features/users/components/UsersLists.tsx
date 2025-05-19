import { useState } from "react";
import dayjs from "dayjs";
import { useUserManagement } from "../hooks/useUsersManagement";
import type { Roles, UserType } from "@/types/UserTypes";

interface Props {
  rolForFetch: Roles;
}

function UsersLists({ rolForFetch }: Props) {
  const {
    data: usersData,
    isLoading,
    isError,
    error,
    actions,
    mutations,
  } = useUserManagement(rolForFetch);

  const [editUser, setEditUser] = useState<Record<number, Partial<UserType>>>(
    {}
  );

  const handleInputChange = (
    id: number,
    field: keyof UserType,
    value: string
  ) => {
    setEditUser((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = (userId: number) => {
    const dataToUpdate = editUser[userId];
    if (!dataToUpdate) return;

    actions.updateUser({ userId, data: dataToUpdate });

    // Limpiar estado si se hace con éxito (también podés hacer esto en onSuccess del hook si preferís)
    setEditUser((prev) => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
  };

  const handleDelete = (userId: number) => {
    actions.deleteUser(userId);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#5c3d2e]">
        Usuarios Registrados
      </h2>

      {isLoading && (
        <div className="text-center text-[#5c3d2e] font-semibold">
          Cargando usuarios...
        </div>
      )}

      {isError && (
        <div className="text-center text-red-600 font-semibold">
          Ocurrió un error: {error?.message}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-[#f5efe6] border border-[#d2b48c] text-left">
            <thead className="bg-[#c7a17a] text-white">
              <tr>
                <th className="py-3 px-4 border-b border-[#d2b48c]">Nombre</th>
                <th className="py-3 px-4 border-b border-[#d2b48c]">Email</th>
                <th className="py-3 px-4 border-b border-[#d2b48c]">Fecha</th>
                <th className="py-3 px-4 border-b border-[#d2b48c]">Rol</th>
                <th className="py-3 px-4 border-b border-[#d2b48c]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(usersData) && usersData.length > 0 ? (
                usersData.map((user) => {
                  const isEditing = !!editUser[user.user_id];
                  const edited = editUser[user.user_id] || {};
                  return (
                    <tr
                      key={user.user_id}
                      className="hover:bg-[#eaddcf] transition-colors"
                    >
                      <td className="py-2 px-4 border-b border-[#d2b48c]">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full bg-white border border-[#d2b48c] rounded px-2 py-1"
                            value={edited.nombre ?? user.nombre}
                            onChange={(e) =>
                              handleInputChange(
                                user.user_id,
                                "nombre",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          user.nombre
                        )}
                      </td>
                      <td className="py-2 px-4 border-b border-[#d2b48c]">
                        {isEditing ? (
                          <input
                            type="email"
                            className="w-full bg-white border border-[#d2b48c] rounded px-2 py-1"
                            value={edited.email ?? user.email}
                            onChange={(e) =>
                              handleInputChange(
                                user.user_id,
                                "email",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="py-2 px-4 border-b border-[#d2b48c]">
                        {dayjs(user.fechaCreacion).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className="py-2 px-4 border-b border-[#d2b48c] capitalize">
                        {isEditing ? (
                          <select
                            className="w-full bg-white border border-[#d2b48c] rounded px-2 py-1"
                            value={edited.rol ?? user.rol}
                            onChange={(e) =>
                              handleInputChange(
                                user.user_id,
                                "rol",
                                e.target.value
                              )
                            }
                          >
                            <option value="usuario">Usuario</option>
                            <option value="empleado">Empleado</option>
                          </select>
                        ) : (
                          user.rol
                        )}
                      </td>

                      <td className="py-2 px-4 border-b border-[#d2b48c] space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(user.user_id)}
                              className="bg-green-500 text-white px-3 py-1 rounded"
                              disabled={mutations.update.isPending}
                            >
                              {mutations.update.isPending
                                ? "Guardando..."
                                : "Guardar"}
                            </button>
                            <button
                              onClick={() =>
                                setEditUser((prev) => {
                                  const updated = { ...prev };
                                  delete updated[user.user_id];
                                  return updated;
                                })
                              }
                              className="bg-gray-500 text-white px-3 py-1 rounded"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                setEditUser((prev) => ({
                                  ...prev,
                                  [user.user_id]: {},
                                }))
                              }
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(user.user_id)}
                              className="bg-red-500 text-white px-3 py-1 rounded"
                              disabled={mutations.delete.isPending}
                            >
                              {mutations.delete.isPending
                                ? "Eliminando..."
                                : "Eliminar"}
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-[#5c3d2e]">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersLists;
