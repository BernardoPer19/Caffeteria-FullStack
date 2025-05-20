export type Roles = "usuario" | "admin" | "empleado";

export interface UserType {
  user_id: number;
  email: string;
  nombre: string;
  contraseña?: string;
  fechaCreacion: Date;
  rol: Roles;
}

export type PUTUserType = Partial<
  Omit<UserType, "user_id" | "contraseña" | "fechaCreacion">
>;

type publicRegisterType = Omit<UserType, "user_id" | "fechaCreacion" | "rol">;

type admincRegisterType = Omit<UserType, "user_id" | "fechaCreacion">;

type LoginType = Omit<UserType, "user_id" | "fechaCreacion" | "rol" | "nombre">;

export type RegisterSuccessResponse = {
  message: string;
  bienvenida: string;
};

export { publicRegisterType, LoginType, admincRegisterType };
