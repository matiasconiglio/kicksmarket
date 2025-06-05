import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import Home from "./pages/Home";
import Detalle from "./pages/Detalle";

function App() {
  return (
    <>
      <header className="bg-dark text-white text-center p-3">
        <h1>KicksMarket 👟</h1>
        <p>Las mejores zapatillas deportivas del mercado</p>
        <a href="/login" className="btn btn-outline-light mt-2">
          Admin Login
        </a>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/admin" element={<Admin />} />
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
