import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Detalle from "./pages/Detalle";
import NavbarC from "./components/layout/Navbar";
import "./styles/theme.css";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route
          path="*"
          element={
            <h2 className="text-center mt-5">Página no encontrada 🥲</h2>
          }
        />
      </Routes>
    </>
  );
}

export default App;
