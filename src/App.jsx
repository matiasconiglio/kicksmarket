import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Detalle from "./pages/Detalle";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import CarritoSidebar from "./pages/CarritoSidebar";
import Register from "./pages/Register";

function App() {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  return (
    <>
      <Navbar onAbrirCarrito={() => setMostrarCarrito(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/register" element={<Register />} />

        {/* RUTA PROTEGIDA */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <h2 className="text-center mt-5">Página no encontrada 🥲</h2>
          }
        />
      </Routes>

      <CarritoSidebar
        abierto={mostrarCarrito}
        cerrar={() => setMostrarCarrito(false)}
      />
    </>
  );
}

export default App;
