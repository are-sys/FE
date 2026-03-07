import { useEffect, useState } from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom"
import "./echo"
import "./App.css"

import { CSSTransition } from "react-transition-group"

function Chat() {

  const [mensaje, setMensaje] = useState("")
  const [mensajes, setMensajes] = useState([])
  const [notificaciones, setNotificaciones] = useState([])
  const [mostrarNotif, setMostrarNotif] = useState(false)

  const [loading, setLoading] = useState(false)
  const [alerta, setAlerta] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {

    window.Echo.channel("chat-general")
      .listen("NuevoMensaje", (e) => {
        setMensajes(prev => [...prev, e.mensaje])
      })

    window.Echo.channel("notificaciones")
      .listen("NuevaNotificacion", (e) => {
        setNotificaciones(prev => [...prev, e.notificacion])
      })

  }, [])

  const enviarMensaje = async () => {

    if (!mensaje.trim()) return

    setLoading(true)

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/mensaje",
        {
          departamento: "A1",
          mensaje
        }
      )

      setMensajes(prev => [...prev, response.data])
      setMensaje("")
      setAlerta("Mensaje enviado correctamente")

    } catch (error) {

      setAlerta("Error al enviar el mensaje")

    }

    setLoading(false)

    setTimeout(() => {
      setAlerta(null)
    }, 3000)
  }

  const abrirNotificacion = (n) => {
    navigate(`/detalle/${n.id}`)
    setMostrarNotif(false)
  }

  return (
    <div className="container">

      {/* ALERTA CON TRANSICION */}
      <CSSTransition
        in={alerta !== null}
        timeout={300}
        classNames="alerta"
        unmountOnExit
      >
        <div className="alerta-box">
          {alerta}
        </div>
      </CSSTransition>

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

        <button onClick={enviarMensaje} disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

      </div>

      {/* LOADING CON TRANSICION */}
      <CSSTransition
        in={loading}
        timeout={300}
        classNames="loading"
        unmountOnExit
      >
        <div className="loading-box">
          Cargando...
        </div>
      </CSSTransition>

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
.alerta-enter {
  opacity: 0;
  transform: translateY(-10px);
}

.alerta-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 300ms;
}

.alerta-exit {
  opacity: 1;
}

.alerta-exit-active {
  opacity: 0;
  transition: all 300ms;
}

.alerta-box{
  position: fixed;
  top: 20px;
  right: 20px;
  background: green;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
}

.loading-enter{
  opacity:0;
}

.loading-enter-active{
  opacity:1;
  transition: opacity 300ms;
}

.loading-exit{
  opacity:1;
}

.loading-exit-active{
  opacity:0;
  transition: opacity 300ms;
}

.loading-box{
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
}