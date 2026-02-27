import { useEffect, useState } from 'react'
import axios from 'axios'
import './echo'

function App() {
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState([])

  useEffect(() => {
    window.Echo.channel('chat-general')
      .listen('NuevoMensaje', (e) => {
        setMensajes(prev => [...prev, e.mensaje])
      })
  }, [])

  const enviarMensaje = async () => {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/mensaje',
      {
        departamento: 'A1',
        mensaje
      }
    )

    setMensajes(prev => [...prev, response.data])
    setMensaje('')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Condominio</h2>

      {mensajes.map((m, i) => (
        <p key={i}>
          <strong>{m.departamento}:</strong> {m.mensaje}
        </p>
      ))}

      <input
        value={mensaje}
        onChange={e => setMensaje(e.target.value)}
        placeholder="Escribe un mensaje"
      />
      <button onClick={enviarMensaje}>
        Enviar
      </button>
    </div>
  )
}

export default App