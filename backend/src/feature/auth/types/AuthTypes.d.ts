interface UserType {
  user_id: number;
  email: string;
  nombre: string;
  contraseña: string;
  fechaCreacion: Date;
  rol: Roles;
}

type RegisterType = Omit<UserType, "user_id" | "fechaCreacion" | "rol">;

type LoginType = Omit<UserType, "user_id" | "fechaCreacion" | "rol" | "nombre">;

type Roles = "usuario" | "admin" | "empleado";

export { UserType, Roles, RegisterType, LoginType };
