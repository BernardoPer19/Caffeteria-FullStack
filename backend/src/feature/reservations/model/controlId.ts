import { RowDataPacket } from "mysql2";
import {connect} from "@config/db/db.j";

export class planTrabajo{
    static  controlIdPlan = async (nombrePlan : string) =>{
        try {
            console.log('plan',nombrePlan);
            
            const query = `SELECT plan_id FROM planes_tb WHERE nombre = ?`;
            const values = [nombrePlan];

            const [rows] = await connect.query<RowDataPacket[]>(query,values);
            if(rows.length === 0){
                throw new Error("no se encontro el id del tema "); 
            }

            return rows[0].plan_id
        } catch (error) {
            throw new Error("Error al obtener el id del tema")
        }
    }
}
