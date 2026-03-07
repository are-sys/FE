import { useEffect, useState } from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom"
import "./echo"
import "./App.css"

function Chat() {

  const [mensaje, setMensaje] = useState("")
  const [mensajes, setMensajes] = useState([])
  const [notificaciones, setNotificaciones] = useState([])
  const [mostrarNotif, setMostrarNotif] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {

    // CANAL CHAT
    window.Echo.channel("chat-general")
      .listen("NuevoMensaje", (e) => {
        setMensajes(prev => [...prev, e.mensaje])
      })

    // CANAL NOTIFICACIONES
    window.Echo.channel("notificaciones")
      .listen("NuevaNotificacion", (e) => {
        setNotificaciones(prev => [...prev, e.notificacion])
      })

  }, [])

  const enviarMensaje = async () => {

    if (!mensaje.trim()) return

    const response = await axios.post(
      "http://127.0.0.1:8000/api/mensaje",
      {
        departamento: "A1",
        mensaje
      }
    )

    setMensajes(prev => [...prev, response.data])
    setMensaje("")
  }

  const abrirNotificacion = (n) => {
    navigate(`/detalle/${n.id}`)
    setMostrarNotif(false)
  }

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">

        <h2>Condominio Chat</h2>

        <div className="notificaciones">

          <button
            className={`campana ${notificaciones.length > 0 ? "nueva" : ""}`}
            onClick={() => setMostrarNotif(!mostrarNotif)}
          >
            🔔

            {notificaciones.length > 0 && (
              <span className="badge">
                {notificaciones.length}
              </span>
            )}

          </button>

          {mostrarNotif && (
            <div className="dropdown">

              {notificaciones.length === 0 && (
                <div className="item">
                  Sin notificaciones
                </div>
              )}

              {notificaciones.map(n => (
                <div
                  key={n.id}
                  onClick={() => abrirNotificacion(n)}
                  className="item"
                >
                  <strong>{n.titulo}</strong>
                  <p>{n.mensaje}</p>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* MENSAJES */}
      <div className="chat-box">

        {mensajes.map((m, i) => (
          <div key={i} className="mensaje">
            <strong>{m.departamento}</strong>
            <p>{m.mensaje}</p>
          </div>
        ))}

      </div>

      {/* INPUT */}
      <div className="input-area">

        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
        />

        <button onClick={enviarMensaje}>
          Enviar
        </button>

      </div>

    </div>
  )
}

function DetalleNotificacion() {

  const { id } = useParams()

  return (
    <div className="detalle">
      <h2>Detalle Notificación</h2>
      <p>ID de notificación: {id}</p>
    </div>
  )
}

export default function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/detalle/:id" element={<DetalleNotificacion />} />
      </Routes>

    </BrowserRouter>
  )

}