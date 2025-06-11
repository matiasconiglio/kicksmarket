import { useState, useEffect } from "react";
import productosData from "../data/productos";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/carousel/Carousel";

function Home() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos");

  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem("productos"));
    setProductos(almacenados || productosData);
  }, []);

  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoria === "todos" || p.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });

  const categoriasUnicas = [
    "todos",
    ...new Set(productos.map((p) => p.categoria)),
  ];

  return (
    <div>
      <HeroCarousel />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="form-control w-50"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="form-select w-25"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categoriasUnicas.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          {productosFiltrados.length === 0 ? (
            <p className="text-center text-muted">
              No hay productos que coincidan con la búsqueda
            </p>
          ) : (
            productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
