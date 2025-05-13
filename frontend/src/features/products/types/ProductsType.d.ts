export interface ProductTypes {
  cafe_id: number;
  nombre: string;
  descripcion: string;
  sabor: string;
  categoria: Categoriasproductos;
  img: string;
  pais: string;
  precio: number;
}

export type PostAdmin = Omit<ProductTypes, "cafe_id">;
export type ProdUser = Omit<ProductTypes, "cafe_id">;
export type Categoriasproductos = "Café" | "Torta" | "Desayuno" | "Especial";
