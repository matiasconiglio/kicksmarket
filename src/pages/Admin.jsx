import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productosData from "../data/productos";

function Admin() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: "",
    descripcion: "",
  });

  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn");
    if (logged !== "true") {
      navigate("/login");
    }

    const almacenados = JSON.parse(localStorage.getItem("productos"));
    setProductos(almacenados || productosData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleAgregarProducto = (e) => {
    e.preventDefault();

    // Validar imagen opcional (solo si querés evitar errores de render)
    if (!nuevoProducto.imagen.startsWith("http")) {
      alert("Por favor, ingresá una URL de imagen válida");
      return;
    }

    const id = Date.now();
    const nuevo = {
      id,
      ...nuevoProducto,
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock),
    };

    const actualizados = [...productos, nuevo];
    setProductos(actualizados);
    localStorage.setItem("productos", JSON.stringify(actualizados));

    setNuevoProducto({
      nombre: "",
      precio: "",
      stock: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    });
  };

  const handleEliminarProducto = (id) => {
    const confirmacion = window.confirm(
      "¿Seguro que querés eliminar este producto?"
    );
    if (!confirmacion) return;

    const filtrados = productos.filter((p) => p.id !== id);
    setProductos(filtrados);
    localStorage.setItem("productos", JSON.stringify(filtrados));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Panel de Administración</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={handleAgregarProducto} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            name="nombre"
            className="form-control"
            value={nuevoProducto.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            name="precio"
            type="number"
            className="form-control"
            value={nuevoProducto.precio}
            onChange={handleInputChange}
            placeholder="Precio"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            name="stock"
            type="number"
            className="form-control"
            value={nuevoProducto.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            name="categoria"
            className="form-control"
            value={nuevoProducto.categoria}
            onChange={handleInputChange}
            placeholder="Categoría"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            name="imagen"
            className="form-control"
            value={nuevoProducto.imagen}
            onChange={handleInputChange}
            placeholder="URL de imagen"
            required
          />
        </div>
        <div className="col-md-8">
          <input
            name="descripcion"
            className="form-control"
            value={nuevoProducto.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
            required
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100">Agregar</button>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>{p.categoria}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Editar</button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminarProducto(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
