import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";

import RequireAuth from "./middleware/RequireAuth";
import RequireRole from "./middleware/RequireRole";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protegidas (sesión activa) */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        {/* solo admin */}
        <Route
          path="/admin"
          element={
            <RequireRole role="admin">
              <Admin />
            </RequireRole>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}