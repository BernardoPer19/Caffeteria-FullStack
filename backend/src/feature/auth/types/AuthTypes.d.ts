import { UserType } from "@/types/UserType";

type RegisterType = Omit<UserType, "user_id" | "fechaCreacion" | "rol">;

type LoginType = Omit<UserType, "user_id" | "fechaCreacion" | "rol" | "nombre">;



export { RegisterType, LoginType };


