import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find((u) => u.email === form.email);
    if (existe) {
      alert("❌ El correo ya está registrado");
      return;
    }

    usuarios.push(form);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ ¡Registro exitoso!");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Registro de Usuario</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="form-control mb-3"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-control mb-4"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-100">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
