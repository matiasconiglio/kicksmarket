import { useEffect, useState } from "react";
import productosData from "../data/productos";
import ProductCard from "../components/ProductCard";

function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem("productos"));
    setProductos(almacenados || productosData);
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default Home;
