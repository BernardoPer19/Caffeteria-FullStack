import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useFetchData";

function ProductsPage() {
  const { products } = useProducts();

  if (products.isLoading)
    return <p className="text-center text-xl font-medium mt-10">Cargando...</p>;

  if (products.isError)
    return (
      <p className="text-center text-red-500 font-medium mt-10">
        Error: {products.error?.message}
      </p>
    );

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-[#f4eee7] min-h-screen font-sans">
      {products.productsData?.map((prod) => (
        
        <ProductCard key={prod.cafe_id} prods={prod} />
        
      ))}
    </main>
  );
}

export default ProductsPage;
