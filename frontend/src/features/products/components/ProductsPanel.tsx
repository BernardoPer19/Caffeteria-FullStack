import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";
import { useProducts } from "../hooks/useFetchData";

export const ProductPanel = () => {
  const { products, isLoading, isError, error, deleteProduct } = useProducts();

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      deleteProduct.mutate(id, {
        onSuccess: () => toast.success("Producto eliminado 🗑️"),
        onError: () => toast.error("Error al eliminar producto ❌"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-3 py-12 text-[#6b4226] text-lg font-semibold">
        <Loader className="animate-spin text-[#a67c52]" size={28} />
        Cargando productos...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-semibold py-12 text-lg">
        Error: {error?.message || "No se pudieron cargar los productos."}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-6 md:px-12 py-6 bg-[#fefcf9] rounded-3xl shadow-lg max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-[#6b4226] mb-8 text-center tracking-wide drop-shadow-md">
        Panel de Productos 🍩
      </h2>

      <table className="w-full min-w-[700px] border-collapse rounded-xl overflow-hidden shadow-xl bg-white">
        <thead className="bg-[#f8f2eb] text-[#7a5333] sticky top-0 z-10">
          <tr>
            <th className="text-left px-6 py-4 font-semibold text-lg select-none border-b border-[#ecdac4]">
              Nombre
            </th>
            <th className="text-left px-6 py-4 font-semibold text-lg select-none border-b border-[#ecdac4]">
              Categoría
            </th>
            <th className="text-left px-6 py-4 font-semibold text-lg select-none border-b border-[#ecdac4]">
              Precio
            </th>
            <th className="text-left px-6 py-4 font-semibold text-lg select-none border-b border-[#ecdac4]">
              País
            </th>
            <th className="px-6 py-4 font-semibold text-lg select-none border-b border-[#ecdac4] text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-10 text-gray-400 italic select-none"
              >
                No hay productos disponibles
              </td>
            </tr>
          )}

          {products?.map((prod) => (
            <tr
              key={prod.cafe_id}
              className="transition-colors duration-300 hover:bg-[#fff7ec] cursor-pointer even:bg-white odd:bg-[#f7eee4]"
            >
              <td className="px-6 py-4 text-[#4c361c] font-medium">
                {prod.nombre}
              </td>
              <td className="px-6 py-4 text-[#5e422a]">{prod.categoria}</td>
              <td className="px-6 py-4 font-semibold text-[#7a5333]">
                {prod.precio.toFixed(2)} Bs
              </td>
              <td className="px-6 py-4 text-[#5e422a]">{prod.pais}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleDelete(prod.cafe_id)}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 text-white px-4 py-2 text-sm font-semibold shadow-md transition"
                  aria-label={`Eliminar producto ${prod.nombre}`}
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
