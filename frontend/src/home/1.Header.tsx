import { Link } from "react-router-dom";

  function Header() {
  return (
      <header
        className="relative w-full h-[80vh] bg-cover bg-center bg-fixed "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Contenido del Header */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Bienvenidos a nuestra Cafetería
          </h1>
          <p className="text-lg sm:text-xl mb-6 max-w-lg">
            Disfruta de eventos únicos, una excelente variedad de cafés y
            deliciosas opciones para acompañar tu día. ¡Ven y vive la
            experiencia!
          </p>

          {/* Botón de llamada a la acción */}
          <Link
            to=""
            className="bg-yellow-500 text-black py-3 px-8 rounded-full text-lg font-semibold transition duration-300 hover:bg-yellow-400"
          >
            Descubre Nuestro Menú
          </Link>
        </div>
      </header>
  );
}

export default Header;
