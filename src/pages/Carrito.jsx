import { useEffect, useState } from "react";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Leer carrito desde localStorage al montar el componente
  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(guardado);
    calcularTotal(guardado);
  }, []);

  const calcularTotal = (items) => {
    const t = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(t);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    calcularTotal(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
    setTotal(0);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-muted">Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precio * item.cantidad}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ${total}</h4>
            <button className="btn btn-outline-light" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
