import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { ProductTypes } from "../types/ProductsType";

type Props = {
  prods: ProductTypes;
};

const ProductCard = ({ prods }: Props) => {
  const { addItem } = useCart();
  return (
    <div
      className="bg-[#fffaf4] rounded-3xl shadow-md hover:shadow-2xl transition duration-300 border border-[#e8dfd7] overflow-hidden flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={prods.img}
          alt={prods.nombre}
          className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-2xl font-semibold text-[#4b2e1f] mb-1">
            {prods.nombre}
          </h2>
          <p className="text-[#6b4c32] text-sm mb-3 italic">
            {prods.descripcion}
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-[#7d5a44] mb-4">
            <span className="bg-[#e8dfd7] px-2 py-1 rounded-full hover:bg-amber-950 hover:text-[#e8dfd7] transition-colors cursor-pointer">
              Origen: {prods.pais}
            </span>
            <span className="bg-[#e8dfd7] px-2 py-1 rounded-full hover:bg-amber-950 hover:text-[#e8dfd7] transition-colors cursor-pointer">
              Sabor: {prods.sabor}
            </span>
            <span className="bg-[#e8dfd7] px-2 py-1 rounded-full hover:bg-amber-950 hover:text-[#e8dfd7] transition-colors cursor-pointer">
              {prods.categoria}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[#4b2e1f] text-lg font-bold">
            {prods.precio} Bs.
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => addItem(prods)}
            title="Añadir al carrito"
            className="flex items-center justify-center gap-1 px-2 py-2 bg-[#6f4e37] hover:bg-[#5a3f2d] text-white rounded-xl text-sm transition-colors"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Carrito</span>
          </button>

          <button
            title="Ver más detalles"
            className="flex items-center justify-center gap-1 px-2 py-2 bg-[#d7c0a5] hover:bg-[#c6a98d] text-[#4b2e1f] rounded-xl text-sm transition-colors"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Ver más</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
