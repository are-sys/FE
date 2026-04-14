import { useState } from "react";
import api from "../api/axios";

export default function VerifyCode() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const verify = async () => {
    await api.post("/verify-code", { email, code });
    alert("Código válido, puedes continuar");
  };

  return (
    <div>
      <h2>Verificar código</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Código" onChange={(e) => setCode(e.target.value)} />

      <button onClick={verify}>
        Verificar
      </button>
    </div>
  );
}