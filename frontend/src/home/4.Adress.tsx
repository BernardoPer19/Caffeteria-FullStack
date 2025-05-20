
const LocationSection =  () => {
  return (
    <main className="bg-[#e1d6c6] h-[70vh] flex justify-center items-center">
      <div className="flex flex-col md:flex-row  items-center gap-8 justify-between p-8 max-w-7xl mx-auto">
        {/* Text section */}
        <div className="flex flex-col items-start w-full md:w-1/2 pr-8 mb-8 md:mb-0">
          <h2 className="text-3xl font-semibold text-brown-800 mb-4">
            Visítanos en Toc Toc Café Gourmet
          </h2>
          <p className="text-brown-600 text-lg mb-6">
            ¡Nos encantaría recibirte! Ven y disfruta de un ambiente acogedor y
            relajante, ideal para disfrutar de una buena taza de café. Nuestra
            cafetería está ubicada en el corazón de la ciudad, ofreciendo la
            mejor experiencia gourmet con un toque único.
          </p>
          <p className="text-brown-600 text-lg mb-6">
            Ya sea para trabajar, relajarte o pasar un buen rato con amigos,
            ¡estamos esperando por ti! ☕
          </p>
          <a
            href="https://www.google.com/maps/place/Toc+Toc+Caf%C3%A9+Gourmet/@-17.3835158,-66.1672982,17z/data=!3m1!4b1!4m8!3m7!1s0x93e37409679a7a8f:0xf4adf70e570bf4e6!5m2!4m1!1i2!8m2!3d-17.3835158!4d-66.1651095"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5a432a] text-white py-3 px-6 rounded-xl hover:bg-brown-700 transition duration-300 shadow-md"
          >
            ¡Encuentra la mejor ruta para llegar!
          </a>
        </div>

        {/* Map section */}
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15230.35460355607!2d-66.16729821735477!3d-17.3835158330315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37409679a7a8f%3A0xf4adf70e570bf4e6!2sToc%20Toc%20Caf%C3%A9%20Gourmet!5e0!3m2!1ses!2sbo!4v1738018197044!5m2!1ses!2sbo"
            width="100%"
            height="100%"
            className="rounded-lg size-96"
            style={{ border: "0" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default LocationSection;
;
