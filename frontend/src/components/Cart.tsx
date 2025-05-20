import { useCart } from "../features/products/context/CartContext";

const Cart = () => {
  const { isCartOpen, removeItem, items, toggleCart } = useCart();

  if (!isCartOpen) return null;

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  return (
    <aside className="fixed right-0 top-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-[#4b2e1f]">
          🛒 Tu carrito
        </h2>
        <h1
          onClick={toggleCart}
          className="text-red-600 font-bold text-xl  cursor-pointer"
        >
          X
        </h1>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">El carrito está vacío</p>
      ) : (
        <div className="flex flex-col flex-grow overflow-y-auto space-y-4">
          {items.map((item) => (
            <div
              key={item.cafe_id}
              className="flex gap-4 border-b pb-3 items-center"
            >
              <img
                src={item.img}
                alt={item.nombre}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-[#4b2e1f]">{item.nombre}</h3>
                <p className="text-sm text-gray-600">
                  {item.quantity} x ${item.precio.toFixed(2)}
                </p>
                <p className="text-sm font-medium text-[#6b4c32]">
                  Subtotal: ${(item.precio * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.cafe_id)}
                className="text-red-500 text-sm hover:underline"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Total y botón al fondo */}
      {items.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg text-[#4b2e1f]">Total:</span>
            <span className="font-bold text-xl text-[#4b2e1f]">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            className="w-full bg-[#6f4e37] hover:bg-[#5a3f2d] text-white py-3 rounded-xl transition-colors font-semibold"
            onClick={() => {
              const phone = "59164854829"; // Código de país (591 para Bolivia) + tu número
              const message = encodeURIComponent(
                "Hola, quiero finalizar mi compra de productos de la cafetería --- la web fue hecha con amor por Agustin <3"
              );
              const url = `https://wa.me/${phone}?text=${message}`;
              window.open(url, "_blank");
            }}
          >
            Finalizar compra
          </button>
        </div>
      )}
    </aside>
  );
};

export default Cart;
