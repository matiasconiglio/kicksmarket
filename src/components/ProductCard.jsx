function ProductCard({ producto }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow">
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
        />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">{producto.descripcion}</p>
          <p className="fw-bold text-success">${producto.precio}</p>
          <a href={`/detalle/${producto.id}`} className="btn btn-primary">
            Ver Detalle
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
