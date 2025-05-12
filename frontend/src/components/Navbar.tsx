import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [cartCount] = useState(3); // Puedes conectar esto a Zustand, Context o React Query

  return (
    <header className="bg-[#f6f1eb] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-[#5c4033] text-2xl font-bold tracking-wide">
          CaféDelicias
        </div>

        <nav className="flex items-center space-x-6 text-[#5c4033] font-medium">
          <a href="/" className="hover:text-[#a67c52] transition">Inicio</a>
          <a href="/sobre-nosotros" className="hover:text-[#a67c52] transition">Sobre Nosotros</a>
          <a href="/reservas" className="hover:text-[#a67c52] transition">Reservas</a>
          <a href="/ordenes" className="hover:text-[#a67c52] transition">Órdenes</a>
          <a href="/cafes" className="hover:text-[#a67c52] transition">Cafés</a>

          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 hover:text-[#a67c52] transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
