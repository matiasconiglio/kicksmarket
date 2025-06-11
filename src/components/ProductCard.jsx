import { useNavigate } from "react-router-dom";

const ProductCard = ({ producto }) => {
  const navigate = useNavigate();

  const handleDetalle = () => navigate(`/detalle/${producto.id}`);

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      const actualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      localStorage.setItem("carrito", JSON.stringify(actualizado));
    } else {
      localStorage.setItem(
        "carrito",
        JSON.stringify([...carrito, { ...producto, cantidad: 1 }])
      );
    }

    alert("🛒 Producto agregado al carrito!");
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card product-card">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="card-img-top product-img"
          onClick={handleDetalle}
        />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">Precio: ${producto.precio}</p>
          <p className="card-text">Stock: {producto.stock}</p>
          <button className="btn btn-primary w-100" onClick={agregarAlCarrito}>
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
