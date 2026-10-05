import { useState } from "react";
import ProductImage from "./ProductImage";
import QuantityInput from "./QuantityInput";
import { formatCOP } from "../utils/format";

export default function ProductCard({ producto, enCarrito, onAdd, avisos }) {
  const { nombre, precio, stock } = producto;

  // Stock disponible = stock total menos lo que ya está en el carrito
  const disponible = stock - enCarrito;
  const agotado = disponible <= 0;

  const [cantidad, setCantidad] = useState(1); // inicia en 1

  const handleAgregar = () => {
    onAdd(producto, cantidad);
    setCantidad(1);
  };

  return (
    <article className={`card${agotado ? " card--agotado" : ""}`}>
      <ProductImage producto={producto} agotado={agotado} />

      <div className="card__cuerpo">
        <h3 className="card__nombre">{nombre}</h3>
        <p className="card__precio">{formatCOP(precio)}</p>
        <p className="card__stock">
          {agotado ? (
            <strong>Agotado</strong>
          ) : (
            <>
              Stock disponible: <strong>{disponible}</strong>
            </>
          )}
        </p>
        {enCarrito > 0 && (
          <p className="card__encarrito">En tu carrito: {enCarrito}</p>
        )}

        <div className="card__acciones">
          <QuantityInput
            nombreProducto={nombre}
            value={cantidad}
            max={Math.max(disponible, 1)}
            disabled={agotado}
            onChange={setCantidad}
            onMax={avisos.maximo}
            onMin={avisos.minimoCatalogo}
            onInvalidPaste={avisos.pegadoInvalido}
          />

          <button
            type="button"
            className="btn btn--primario btn--bloque"
            onClick={handleAgregar}
            disabled={agotado}
            aria-label={
              agotado
                ? `${nombre}: agotado`
                : `Agregar ${nombre} al carrito`
            }
          >
            {agotado ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}