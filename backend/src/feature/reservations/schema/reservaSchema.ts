import z from 'zod';


const chemaReserva = z.object({
    plan_id : z.number().positive().int(),
    fecha_inicio : z.string(),
    fecha_fin : z.string(),
    estado : z.enum(['pendiente','aceptada','rechazada']).default('pendiente')
})

type reservasType = z.infer<typeof chemaReserva>;

export const validateReserva = (input: unknown):reservasType =>{
    const vali = chemaReserva.safeParse(input);
    if(!vali.success){
        throw new Error("error al validar los datos");
    }
    return vali.data;
}