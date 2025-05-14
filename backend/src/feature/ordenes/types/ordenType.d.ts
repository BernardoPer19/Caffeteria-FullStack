import { ProductTypes } from "@/feature/products/types/productTypes";
import { UserType } from "@/types/UserType";

 enum EstadoOrdenType {
    pendiente = 'pendiente',
    pagado = 'pagado',
    enviado = 'enviado'
 }

export interface OrdenFromDB {
  orden_id: number;
  user_id: number;
  cafe_id: number;
  total: number;
  estado: EstadoOrdenType;
  fecha_creacion: string;
  direccion_orden: string;
  cantidad_productos: number;
}


 export interface OrdenTypeFull {
  user: UserType; 
  cafe: ProductTypes; 
  total: number;
  estado: EstadoOrdenType;
  fecha_creacion: string;
  direccion_orden: string;
  cantidad_productos: number;
}


export type OrdenToCreate = Omit<OrdenFromDB, 'orden_id' | 'fecha_creacion' | 'estado'>;

export type OrdenWithoutId = Omit<OrdenFromDB, 'orden_id'>;

