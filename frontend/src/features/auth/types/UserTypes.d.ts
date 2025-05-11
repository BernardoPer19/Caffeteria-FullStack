type Roles = "Usuario" | "Admin" | "Empleado";

export interface UserType {
  user_id: number;
  email: string;
  nombre: string;
  contraseña: string;
  fechaCreacion: Date;
  rol: Roles;
}

type publicRegisterType = Omit<UserType, "user_id" | "fechaCreacion" | "rol">;

type admincRegisterType = Omit<UserType, "user_id" | "fechaCreacion">;

type LoginType = Omit<UserType, "user_id" | "fechaCreacion" | "rol" | "nombre">;

export { publicRegisterType, LoginType, admincRegisterType };
