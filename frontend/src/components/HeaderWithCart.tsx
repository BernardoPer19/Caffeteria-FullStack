import Cart from "./Cart"; // tu componente del carrito
import { Navbar } from "./Navbar";

function HeaderWithCart() {
  return (
    <>
      <Navbar />
      <Cart /> {/* Se muestra o no según isCartOpen */}
    </>
  );
}

export default HeaderWithCart;
