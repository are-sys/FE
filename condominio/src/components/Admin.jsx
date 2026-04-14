import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/admin")
      .then((res) => setMessage(res.data))
      .catch(() => setMessage("No autorizado"));
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>{message}</p>
    </div>
  );
}