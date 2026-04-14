import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/profile").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {user && (
        <>
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
}