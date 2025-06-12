import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [adminActivo, setAdminActivo] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
      setCantidadCarrito(total);

      const logged = sessionStorage.getItem("adminLoggedIn") === "true";
      setAdminActivo(logged);
    }, 300);

    return () => clearInterval(intervalo);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar-main">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src="/img/logo.png" alt="Logo" />
          <span>KicksMarket</span>
        </div>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" className="nav-item">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-item">
              Sobre Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink to="/carrito" className="nav-item">
              🛍️ Carrito ({cantidadCarrito})
            </NavLink>
          </li>
          {!adminActivo ? (
            <li>
              <NavLink to="/login" className="nav-item">
                Admin
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/admin" className="nav-item">
                  Panel Admin
                </NavLink>
              </li>
              <li>
                <button className="btn-cerrar-sesion" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
