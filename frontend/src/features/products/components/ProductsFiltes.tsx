import { useProductsFilter } from "../context/ProductsFilter";

export const ProductFilters = () => {
  const { filters, updateFilter, resetFilters } = useProductsFilter();

  return (
    <div className="flex flex-wrap justify-between items-start gap-4 p-10 bg-[#ffffff]  border border-gray-200 max-w-[1280px] m-auto">
      {/* Filtros izquierda */}
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap items-center">
        <select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-[#a67c52]"
        >
          <option value="">Todas las categorías</option>
          <option value="Café">Cafés</option>
          <option value="Torta">Tortas</option>
          <option value="Desayuno">Desayunos</option>
          <option value="Especial">Especiales</option>
        </select>

        {/* Sliders de precios */}
        <div className="flex flex-col items-start gap-1">
          <label className="text-sm text-gray-700">
            Precio mínimo:{" "}
            <span className="font-semibold">Bs {filters.minPrice}</span>
          </label>
          <input
            type="range"
            min={0}
            max={31}
            step={1}
            value={filters.minPrice}
            onChange={(e) => updateFilter("minPrice", Number(e.target.value))}
            className="w-40"
          />
        </div>

        <div className="flex flex-col items-start gap-1">
          <label className="text-sm text-gray-700">
            Precio máximo:{" "}
            <span className="font-semibold">Bs {filters.maxPrice}</span>
          </label>
          <input
            type="range"
            min={0}
            max={31}
            step={1}
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
            className="w-40"
          />
        </div>

        <button
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 rounded mt-2 sm:mt-0"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Buscador derecha */}
      <div className="w-full sm:w-auto mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-[#a67c52]"
        />
      </div>
    </div>
  );
};
