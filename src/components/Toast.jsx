export default function ToastContainer({ toasts, onClose }) {
  return (
    <div
      className="toast-container"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.tipo}`}
          role={toast.tipo === "advertencia" ? "alert" : "status"}
        >
          <p className="toast__mensaje">{toast.mensaje}</p>

          {toast.accion && (
            <button
              type="button"
              className="toast__accion"
              onClick={() => {
                toast.accion.onClick();
                onClose(toast.id);
              }}
            >
              {toast.accion.etiqueta}
            </button>
          )}

          <button
            type="button"
            className="toast__cerrar"
            onClick={() => onClose(toast.id)}
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}