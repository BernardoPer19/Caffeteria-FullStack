import { FaCoffee, FaTruck, FaCreditCard } from "react-icons/fa";

 function CardsHeader() {
  return (
    <main className="h-auto p-6 bg-[#e1d6c6]">
      <div className="flex justify-center gap-4 p-4">
      <div className="flex items-center p-3 bg-coffee-light gap-2 rounded-lg shadow-sm text-center bg-[#eddfc9]">
        <FaCoffee className="text-lg text-coffee-dark mr-2"  size={25}/>
        <div className="flex flex-col text-left">
          <h2 className="text-xs font-bold text-coffee-dark mb-1">Café 100% Orgánico</h2>
          <p className="text-xs text-coffee-text">
            Sabor único, directo a tu taza.
          </p>
        </div>
      </div>
      <div className="flex items-center p-3 bg-coffee-light rounded-lg shadow-sm text-center gap-2  bg-[#eddfc9]" >
        <FaTruck className="text-lg text-coffee-dark mr-2"  size={25}/>
        <div className="flex flex-col text-left">
          <h2 className="text-xs font-bold text-coffee-dark mb-1">Envíos rápidos</h2>
          <p className="text-xs text-coffee-text">
            Llega a tu puerta sin demora.
          </p>
        </div>
      </div>
      <div className="flex items-center p-3 bg-coffee-light rounded-lg shadow-sm text-center gap-2  bg-[#eddfc9]">
        <FaCreditCard className="text-lg text-coffee-dark mr-2"  size={25}/>
        <div className="flex flex-col text-left">
          <h2 className="text-xs font-bold text-coffee-dark mb-1">Pago seguro</h2>
          <p className="text-xs text-coffee-text">
            Compra fácil y sin preocupaciones.
          </p>
        </div>
      </div>
    </div>
    </main>
  );
}

export default CardsHeader;
