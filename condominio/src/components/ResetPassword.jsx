import { useState } from "react";
import api from "../api/axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const reset = async () => {
    await api.post("/reset-password", {
      email,
      code,
      password
    });

    alert("Contraseña actualizada");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Nueva contraseña</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Código" onChange={(e) => setCode(e.target.value)} />
      <input type="password" placeholder="Nueva contraseña" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={reset}>
        Cambiar contraseña
      </button>
    </div>
  );
}