import { useEffect, useState } from "react";
import "./Carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

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
    <div className="carrito-container">
      <h2 className="carrito-title">Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="carrito-tabla-wrapper">
            <table className="carrito-tabla">
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
                    <td>${item.precio.toLocaleString()}</td>
                    <td>{item.cantidad}</td>
                    <td>${(item.precio * item.cantidad).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarProducto(item.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="carrito-footer">
            <h4>Total: ${total.toLocaleString()}</h4>
            <button className="btn-vaciar" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
