
 function Footer() {
  return (
    <footer className="bg-[#3b2a22] text-white py-8 px-4 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Sección de logo y descripción */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-[#f4d35e]">Coffee Haven</h2>
          <p className="mt-2 text-sm text-[#d1a05d]">
            Disfruta de los mejores cafés de todo el mundo, traídos a tu hogar con amor.
          </p>
        </div>

        {/* Sección de enlaces */}
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <h3 className="font-semibold text-lg text-[#f4d35e]">Enlaces</h3>
            <ul className="mt-2">
              <li>
                <a href="#" className="text-sm text-[#d1a05d] hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#d1a05d] hover:text-white">
                  Productos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#d1a05d] hover:text-white">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#d1a05d] hover:text-white">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de redes sociales */}
          <div>
            <h3 className="font-semibold text-lg text-[#f4d35e]">Síguenos</h3>
            <div className="mt-2 flex gap-4">
              <a href="#" className="text-[#d1a05d] hover:text-white">
                {/* Íconos de redes sociales */}
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-[#d1a05d] hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-[#d1a05d] hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8 text-[#d1a05d]">
        <p>© 2025 Coffee Haven. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
