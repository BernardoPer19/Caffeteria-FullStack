import z from 'zod';


const chemaReserva = z.object({
    plan : z.string().min(1),
    fecha_inicio : z.string(),
    fecha_fin : z.string(),
    hora_cita : z.string(),
    estado : z.enum(['pendiente','aceptada','rechazada']).default('pendiente')
})

export type reservasType = z.infer<typeof chemaReserva>;

export const validateReserva = (input: unknown):reservasType =>{
    const vali = chemaReserva.safeParse(input);
    if(!vali.success){
        throw new Error("error al validar los datos");
    }
    return vali.data;
}