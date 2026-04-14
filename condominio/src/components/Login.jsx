import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  localStorage.setItem("token", res.data.token);

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Entrar</button>
    </div>
  );
}