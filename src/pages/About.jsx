function About() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Acerca de Nosotros</h2>
      <p className="lead text-center">
        Somos un equipo apasionado por el diseño y desarrollo web, enfocados en
        ofrecer la mejor experiencia de ecommerce para zapatillas deportivas.
      </p>

      <div className="row mt-5">
        {/* Integrante 1 */}
        <div className="col-md-4 text-center">
          <img
            src="https://via.placeholder.com/150"
            className="rounded-circle mb-3"
            alt="Integrante 1"
          />
          <h5>Matías Coniglio</h5>
          <p>Desarrollador</p>
        </div>
      </div>
    </div>
  );
}

export default About;
