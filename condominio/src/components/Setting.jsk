import { useState } from "react";
import api from "../api/axios";

export default function Settings() {
  const [password, setPassword] = useState("");

  const changePassword = async () => {
    await api.post("/change-password", { password });

    localStorage.removeItem("token");

    alert("Contraseña cambiada. Se cerraron todas las sesiones.");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Cambiar contraseña</h2>

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nueva contraseña"
      />

      <button onClick={changePassword}>
        Cambiar
      </button>
    </div>
  );
}