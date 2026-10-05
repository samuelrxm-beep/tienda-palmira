import { useEffect, useRef } from "react";
import CartItem from "./CartItem";
import { formatCOP } from "../utils/format";

// Panel lateral del carrito. Se abre desde el Navbar y se cierra con la X,
// el fondo oscuro, el botón "Seguir comprando" o la tecla Escape.
export default function Cart({
  abierto,
  lineas,
  totalUnidades,
  total,
  onCambiarCantidad,
  onQuitar,
  onVaciar,
  onCerrar,
  avisos,
}) {
  const botonCerrarRef = useRef(null);

  // Al abrir, el foco pasa al panel (accesibilidad con teclado)
  useEffect(() => {
    if (abierto) botonCerrarRef.current?.focus();
  }, [abierto]);

  // Escape cierra el panel y se bloquea el scroll de la página mientras está abierto
  useEffect(() => {
    if (!abierto) return undefined;

    const alPresionarTecla = (e) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", alPresionarTecla);

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", alPresionarTecla);
      document.body.style.overflow = overflowPrevio;
    };
  }, [abierto, onCerrar]);

  return (
    <>
      <div
        className={`overlay${abierto ? " overlay--visible" : ""}`}
        onClick={onCerrar}
        aria-hidden="true"
      />

      <aside
        id="panel-carrito"
        className={`cart-panel${abierto ? " cart-panel--abierto" : ""}`}
        role="dialog"
        aria-labelledby="titulo-carrito"
      >
        <div className="cart-panel__encabezado">
          <h2 id="titulo-carrito">Tu carrito ({totalUnidades})</h2>
          <button
            ref={botonCerrarRef}
            type="button"
            className="cart-panel__cerrar"
            onClick={onCerrar}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        <div className="cart-panel__cuerpo">
          {lineas.length === 0 ? (
            <div className="cart-vacio">
              <p>Tu carrito está vacío.</p>
              <button
                type="button"
                className="btn btn--primario"
                onClick={onCerrar}
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <ul className="cart-list">
              {lineas.map((linea) => (
                <CartItem
                  key={linea.producto.id}
                  linea={linea}
                  onCambiarCantidad={onCambiarCantidad}
                  onQuitar={onQuitar}
                  avisos={avisos}
                />
              ))}
            </ul>
          )}
        </div>

        {lineas.length > 0 && (
          <div className="cart-panel__pie">
            <dl className="cart-resumen">
              <div className="cart-resumen__fila">
                <dt>Total de unidades</dt>
                <dd>{totalUnidades}</dd>
              </div>
              <div className="cart-resumen__fila cart-resumen__fila--total">
                <dt>Total de la compra</dt>
                <dd>{formatCOP(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="btn btn--bloque"
              onClick={onVaciar}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}