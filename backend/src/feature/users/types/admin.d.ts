enum RolesType {
  admin = "admin",
  user = "user",
  empleado = "empleado",
}

export interface AdminUserTypes {
  user_id: number;
  email: string;
  nombre: string;
  contraseña: string;
  fechaCreacion: Date;
  rol: RolesType;
}

export type PutAdminType = Omit<AdminUserTypes, "user_id">;

export type GetFiltroUserRol = Omit<AdminUserTypes , "contraseña" | "fechaCreacion">;