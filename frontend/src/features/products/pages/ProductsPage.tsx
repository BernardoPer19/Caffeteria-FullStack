import ProductCard from "../components/ProductCard";
import { ProductFilters } from "../components/ProductsFiltes";
import { useProductsFilter } from "../context/ProductsFilter";
import { useProducts } from "../hooks/useFetchData";

function ProductsPage() {
  const { filteredProducts } = useProductsFilter();

  const { isLoading, isError, error } = useProducts();

  if (isLoading)
    return <p className="text-center text-xl font-medium mt-10">Cargando...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 font-medium mt-10">
        Error: {error?.message}
      </p>
    );

  return (
    <section
      className="
     bg-[#f4eee7] min-h-screen font-sans"
    >
      <div className="pt-10">
        <ProductFilters />
      </div>
      <main className="max-w-[1280px] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10">
        {filteredProducts?.map((prod) => (
          <ProductCard key={prod.cafe_id} prods={prod} />
        ))}
      </main>
    </section>
  );
}

export default ProductsPage;
