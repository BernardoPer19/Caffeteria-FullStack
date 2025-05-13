import { useProducts } from "../hooks/useFetchData";

function ProductsPage() {
  const { products } = useProducts();

  if (products.isLoading)
    return <p className="text-center text-xl">Cargando...</p>;
  if (products.isError)
    return (
      <p className="text-center text-red-500">
        Error: {products.error?.message}
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-[#f8f4f1] min-h-screen">
      {products.productsData?.map((prods) => (
        <div
          key={prods.cafe_id}
          className="bg-[#fffaf4] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#e8dfd7]"
        >
          <img
            src={prods.img}
            alt={prods.nombre}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[#5e3b1d]">
              {prods.nombre}
            </h2>
            <p className="text-[#7c5c3d] text-sm mb-2 italic">
              {prods.descripcion}
            </p>

            <div className="flex flex-col gap-1 text-sm text-[#6b4c32]">
              <span>
                <strong>Origen:</strong> {prods.pais}
              </span>
              <span>
                <strong>Sabor:</strong> {prods.sabor}
              </span>
              <span>
                <strong>Categoría:</strong> {prods.categoria}
              </span>
            </div>

            <button className="mt-4 w-full py-2 rounded-xl bg-[#b77e58] text-white font-medium hover:bg-[#9c6746] transition-colors">
              Añadir al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;
