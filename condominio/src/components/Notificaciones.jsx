import { useEffect, useState } from "react";
import { echo } from "../websocket";
import { useNavigate } from "react-router-dom";

export default function Notificaciones({ departamentoId }) {

    const [notificaciones, setNotificaciones] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (!departamentoId) return;

        const canal = echo.channel(`departamento.${departamentoId}`)
            .listen("NuevaNotificacion", (e) => {

                setNotificaciones(prev => [
                    ...prev,
                    {
                        ...e.notificacion,
                        leida: false
                    }
                ]);

            });

        return () => {
            echo.leave(`departamento.${departamentoId}`);
        };

    }, [departamentoId]);

    const nuevas = notificaciones.filter(n => !n.leida).length;

    const abrirNotificacion = (noti) => {

        setNotificaciones(prev =>
            prev.map(n =>
                n.id === noti.id ? { ...n, leida: true } : n
            )
        );

        navigate(`/detalle/${noti.id}`);
    };

    return (
        <div style={{ position: "relative" }}>

            <button
                onClick={() => setMostrar(!mostrar)}
                style={{
                    backgroundColor: nuevas > 0 ? "red" : "gray",
                    color: "white",
                    padding: "10px",
                    borderRadius: "50%",
                    fontSize: "18px",
                    cursor: "pointer",
                    position: "relative"
                }}
            >
                🔔

                {nuevas > 0 && (
                    <span style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        background: "yellow",
                        color: "black",
                        borderRadius: "50%",
                        padding: "3px 6px",
                        fontSize: "12px"
                    }}>
                        {nuevas}
                    </span>
                )}

            </button>

            {mostrar && (
                <div style={{
                    position: "absolute",
                    top: "45px",
                    right: 0,
                    width: "250px",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                }}>

                    {notificaciones.length === 0 && (
                        <div style={{ padding: "10px" }}>
                            No hay notificaciones
                        </div>
                    )}

                    {notificaciones.map(n => (
                        <div
                            key={n.id}
                            onClick={() => abrirNotificacion(n)}
                            style={{
                                padding: "10px",
                                borderBottom: "1px solid #eee",
                                cursor: "pointer",
                                backgroundColor: n.leida ? "#fff" : "#f5f5f5"
                            }}
                        >
                            <strong>{n.titulo}</strong>
                            <p style={{ margin: 0, fontSize: "13px" }}>
                                {n.mensaje}
                            </p>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}