import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useProducts } from "../hooks/useFetchData";
import { productSchema, type ProductSchema } from "../schema/schemProds";

export const ProductForm = () => {
  const { createProduct } = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductSchema) => {
    const productWithCafeId = {
      ...data,
      cafe_id: 1,
      sabor: data.sabor ?? "",
    };
    createProduct.mutate(productWithCafeId, {
      onSuccess: () => {
        toast.success("¡Producto añadido!");
        reset();
      },
      onError: () => {
        toast.error("Error al añadir producto");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto bg-[#fdfaf7] p-10 rounded-3xl shadow-2xl border border-[#e7d9ca] space-y-8"
    >
      <h2 className="text-4xl font-extrabold text-[#5c3824] text-center mb-4">
        Añadir nuevo producto 🍩☕
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Nombre */}
        <div>
          <label className="block mb-2 text-[#5c3824] font-semibold">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre")}
            className={
              "w-full px-4 py-2 rounded-xl border bg-white shadow-sm text-[#3b2616] focus:outline-none focus:ring-2 focus:ring-[#c29f84] " +
              (errors.nombre ? "border-red-400" : "border-[#d8c2ae]")
            }
          />
          {errors.nombre && (
            <p className="mt-1 text-red-500 text-sm">{errors.nombre.message}</p>
          )}
        </div>

        {/* Sabor */}
        <div>
          <label className="block mb-2 text-[#5c3824] font-semibold">
            Sabor
          </label>
          <input
            type="text"
            {...register("sabor")}
            className={
              "w-full px-4 py-2 rounded-xl border bg-white shadow-sm text-[#3b2616] focus:outline-none focus:ring-2 focus:ring-[#c29f84] " +
              (errors.sabor ? "border-red-400" : "border-[#d8c2ae]")
            }
          />
          {errors.sabor && (
            <p className="mt-1 text-red-500 text-sm">{errors.sabor.message}</p>
          )}
        </div>

        {/* Descripción - ocupa 2 columnas */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-[#5c3824] font-semibold">
            Descripción
          </label>
          <textarea
            rows={3}
            {...register("descripcion")}
            className={
              "w-full px-4 py-2 rounded-xl border bg-white shadow-sm text-[#3b2616] focus:outline-none focus:ring-2 focus:ring-[#c29f84] " +
              (errors.descripcion ? "border-red-400" : "border-[#d8c2ae]")
            }
          />
          {errors.descripcion && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.descripcion.message}
            </p>
          )}
        </div>

        {/* País */}
        <div>
          <label className="block mb-2 text-[#5c3824] font-semibold">
            País
          </label>
          <input
            type="text"
            {...register("pais")}
            className={
              "w-full px-4 py-2 rounded-xl border bg-white shadow-sm text-[#3b2616] focus:outline-none focus:ring-2 focus:ring-[#c29f84] " +
              (errors.pais ? "border-red-400" : "border-[#d8c2ae]")
            }
          />
          {errors.pais && (
            <p className="mt-1 text-red-500 text-sm">{errors.pais.message}</p>
          )}
        </div>

        {/* Precio */}
        <div>
          <label className="block mb-2 text-[#5c3824] font-semibold">
            Precio (Bs)
          </label>
          <input
            type="number"
            step="0.1"
            {...register("precio", { valueAsNumber: true })}
            className={
              "w-full px-4 py-2 rounded-xl border bg-white shadow-sm text-[#3b2616] focus:outline-none focus:ring-2 focus:ring-[#c29f84] " +
              (errors.precio ? "border-red-400" : "border-[#d8c2ae]")
            }
          />
          {errors.precio && (
            <p className="mt-1 text-red-500 text-sm">{errors.precio.message}</p>
          )}
        </div>

        {/* Imagen */}
        <div>
          <label className="block mb-2 text-[#5c3824] font-semibold">
            Imagen (URL)
          </label>
          <input
            type="url"
            {...register("img")}
            className={
              "w-full px-4 py-2 rounded-xl border bg-white shadow-sm text-[#3b2616] focus:outline-none focus:ring-2 focus:ring-[#c29f84] " +
              (errors.img ? "border-red-400" : "border-[#d8c2ae]")
            }
          />
          {errors.img && (
            <p className="mt-1 text-red-500 text-sm">{errors.img.message}</p>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label className="block mb-2 text-[#5c3824] font-semibold">
            Categoría
          </label>
          <select
            {...register("categoria")}
            className={
              "w-full px-4 py-2 rounded-xl border bg-white shadow-sm text-[#3b2616] focus:outline-none focus:ring-2 focus:ring-[#c29f84] " +
              (errors.categoria ? "border-red-400" : "border-[#d8c2ae]")
            }
          >
            <option value="">Selecciona una categoría</option>
            <option value="Café">Café</option>
            <option value="Torta">Torta</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Especial">Especial</option>
          </select>
          {errors.categoria && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.categoria.message}
            </p>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-[#6b4226] hover:bg-[#4b2f1d] text-white font-bold text-lg py-2 px-10 rounded-2xl transition-all shadow-md"
        >
          Añadir Producto
        </button>
      </div>
    </form>
  );
};
