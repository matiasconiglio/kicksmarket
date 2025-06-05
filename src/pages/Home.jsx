import productos from "../data/productos";
import ProductCard from "../components/ProductCard";

function Home() {
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
