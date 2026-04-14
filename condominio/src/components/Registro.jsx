import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await api.post("/register", {
      name,
      email,
      password,
    });

    alert("Revisa tu correo para verificar tu cuenta");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Registro</h2>

      <input placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={register}>Registrar</button>
    </div>
  );
}