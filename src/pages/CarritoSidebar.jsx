import { useEffect, useState } from "react";
import "./CarritoSidebar.css";

const CarritoSidebar = ({ abierto, cerrar }) => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, [abierto]);

  const eliminarItem = (id) => {
    const actualizado = carrito.filter((item) => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
    setCarrito(actualizado);
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const finalizarCompra = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
    setMostrarModal(true);
  };

  return (
    <>
      <div className={`sidebar-carrito ${abierto ? "abierto" : ""}`}>
        <div className="sidebar-header">
          <h4>🛒 Mi Carrito</h4>
          <button onClick={cerrar}>X</button>
        </div>

        {carrito.length === 0 ? (
          <p className="text-center">Tu carrito está vacío 😢</p>
        ) : (
          <div className="contenido">
            {carrito.map((item) => (
              <div key={item.id} className="producto-carrito">
                <img src={item.imagen} alt={item.nombre} />
                <div>
                  <strong>{item.nombre}</strong>
                  <p>
                    ${item.precio} x {item.cantidad}
                  </p>
                  <button onClick={() => eliminarItem(item.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <h5 className="mt-3">Total: ${total}</h5>
            <button
              className="btn btn-success w-100 mt-2"
              onClick={finalizarCompra}
            >
              Finalizar compra
            </button>
          </div>
        )}
      </div>

      {mostrarModal && (
        <div className="modal-gracias">
          <div className="modal-contenido">
            <h4>✅ ¡Gracias por tu compra!</h4>
            <p>Te enviaremos los productos a la dirección registrada.</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                setMostrarModal(false);
                cerrar();
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CarritoSidebar;
