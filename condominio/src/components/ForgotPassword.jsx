import { useState } from "react";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendCode = async () => {
    await api.post("/forgot-password", { email });
    alert("Código enviado a tu correo");
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={sendCode}>
        Enviar código
      </button>
    </div>
  );
}