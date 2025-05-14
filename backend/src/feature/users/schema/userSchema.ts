import z from 'zod'

const userSchema = z.object({
     nombre: z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
      email: z
        .string()
        .min(1, { message: "El campo email es obligatorio" })
        .email({ message: "Revisa el formato del email" }),
      contraseña: z
        .string()
        .min(4, { message: "La contraseña debe tener entre 4 y 12 caracteres" })
        .max(50, { message: "La contraseña debe tener entre 4 y 12 caracteres" }),
      rol: z.enum(["usuario", "empleado", "admin"])
})

export type AdminUserType = z.infer<typeof userSchema>;

export const validateUserByAdmin = (input : unknown):AdminUserType =>{
    const result = userSchema.safeParse(input);
    if(!result.success){
        throw result.error;
    }
   return  result.data;
}  
