import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productosData from "../data/productos";

function Admin() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: "", // ahora usamos imagen
    descripcion: "",
  });

  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn");
    if (logged !== "true") navigate("/login");

    const almacenados = JSON.parse(localStorage.getItem("productos"));
    setProductos(almacenados || productosData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const guardarProductos = (nuevos) => {
    localStorage.setItem("productos", JSON.stringify(nuevos));
    setProductos(nuevos);
  };

  const handleAgregarProducto = (e) => {
    e.preventDefault();

    if (modoEdicion) {
      const actualizados = productos.map((p) =>
        p.id === productoEditandoId
          ? { ...p, ...form, precio: +form.precio, stock: +form.stock }
          : p
      );
      guardarProductos(actualizados);
      setModoEdicion(false);
      setProductoEditandoId(null);
    } else {
      const nuevo = {
        id: Date.now(),
        ...form,
        precio: +form.precio,
        stock: +form.stock,
      };
      guardarProductos([...productos, nuevo]);
    }

    setForm({
      nombre: "",
      precio: "",
      stock: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    });
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setProductoEditandoId(producto.id);
    setForm(producto);
  };

  const handleEliminar = (id) => {
    const confirm = window.confirm("¿Eliminar producto?");
    if (!confirm) return;
    const actualizados = productos.filter((p) => p.id !== id);
    guardarProductos(actualizados);
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
        <div className="col-md-2">
          <input
            name="nombre"
            className="form-control"
            value={form.nombre}
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
            value={form.precio}
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
            value={form.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            name="categoria"
            className="form-control"
            value={form.categoria}
            onChange={handleInputChange}
            placeholder="Categoría"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            name="imagen"
            className="form-control"
            value={form.imagen}
            onChange={handleInputChange}
            placeholder="URL de Imagen"
            required
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100">
            {modoEdicion ? "Guardar" : "Agregar"}
          </button>
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
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditar(p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminar(p.id)}
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
