export type Roles = "usuario" | "admin" | "empleado";

export interface UserType {
  user_id: number;
  email: string;
  nombre: string;
  contraseña: string;
  fechaCreacion: Date;
  rol: Roles;
}
