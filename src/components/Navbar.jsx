export default function Navbar({
  totalUnidades,
  carritoAbierto,
  onAbrirCarrito,
  botonRef,
}) {
  return (
    <nav className="navbar" aria-label="Principal">
      <div className="navbar__contenido">
        <h1 className="navbar__marca">TIENDA PALMIRA</h1>

        <button
          ref={botonRef}
          type="button"
          className="navbar__carrito"
          onClick={onAbrirCarrito}
          aria-label={`Abrir carrito, ${totalUnidades} ${
            totalUnidades === 1 ? "unidad" : "unidades"
          }`}
          aria-expanded={carritoAbierto}
          aria-controls="panel-carrito"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>

          {/* El contador se oculta cuando no hay unidades */}
          {totalUnidades > 0 && (
            <span
              key={totalUnidades}
              className="navbar__contador"
              aria-hidden="true"
            >
              {totalUnidades > 99 ? "99+" : totalUnidades}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}