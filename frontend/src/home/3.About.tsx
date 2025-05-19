
 function About() {
  return (
    <main className="bg-[#e1d6c6] w-full h-[70vh]">


      <div className="relative max-w-[1200px] m-auto w-full h-full flex items-center justify-center">
        <div className="flex gap-5 mr-96 max-[768px]:flex-col max-[768px]:gap-4 max-[768px]:mr-0 max-[768px]:w-full max-[768px]:justify-center">
          {/* Imagen 1 */}
          <img
            src="https://images.pexels.com/photos/302890/pexels-photo-302890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Imagen 1"
            className="w-80 h-[450px] object-cover bg-blue-50 max-[768px]:w-full max-[768px]:h-[400px] max-[768px]:mb-4" // Aumentar la altura y agregar margen inferior
          />
          {/* Imagen 2 solo visible en pantallas grandes */}
          <img
            src="https://plus.unsplash.com/premium_photo-1663858367004-a79cbaa15d76?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Imagen 2"
            className="hidden max-[768px]:hidden md:block w-80 h-[450px] object-cover bg-blue-50 max-[768px]:w-full max-[768px]:h-[400px]"
          />
        </div>

        <div className="absolute right-1 bg-white w-[600px] p-6 rounded-sm shadow-xl max-[768px]:w-full max-[768px]:p-4 max-[768px]:left-1/2 max-[768px]:transform max-[768px]:-translate-x-1/2 max-[768px]:bottom-5 max-[768px]:mt-4"> {/* Agregar margen superior */}
          <h1 className={`text-2xl text-[#8c4d09] mb-4 max-[768px]:text-xl`}>
            Sobre Coffee-Events
          </h1>
          <p className={`max-[768px]:text-sm`}>
            En Cafetería 1, nos apasiona ofrecerte el mejor café y una
            experiencia única. Disfruta de nuestros granos seleccionados,
            deliciosos postres y un ambiente acogedor. 
            <br /> <br />
            Pero no solo somos una cafetería, somos un espacio donde las
            personas se encuentran, disfrutan de buena comida y se sumergen en
            momentos especiales.
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;