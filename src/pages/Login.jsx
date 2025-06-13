import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminUser = {
    email: "admin@kicks.com",
    password: "admin123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === adminUser.email && password === adminUser.password) {
      sessionStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
      return;
    }

    // Buscar usuario común
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      alert(`Bienvenido ${usuario.nombre}`);
      navigate("/");
    } else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-dark w-100" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
