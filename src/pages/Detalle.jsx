import { useParams } from "react-router-dom";
import productosData from "../data/productos";

function Detalle() {
  const { id } = useParams();

  const productosLocal = JSON.parse(localStorage.getItem("productos"));
  const productos = productosLocal || productosData;

  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return <h2 className="text-center mt-5">Producto no encontrado 😢</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            className="img-fluid"
            alt={producto.nombre}
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p>
            <strong>Marca:</strong> {producto.marca || "No especificada"}
          </p>
          <p>
            <strong>Categoría:</strong> {producto.categoria}
          </p>
          <p>
            <strong>Precio:</strong> ${producto.precio}
          </p>
          <p>{producto.descripcion}</p>
          <p>
            <strong>Stock:</strong> {producto.stock}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detalle;
