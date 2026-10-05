import { useState } from "react";
import { IMAGENES } from "../data/images";

// Imagen del producto con respaldo en emoji y etiqueta "Agotado" opcional.
// Se usa en las tarjetas del catálogo y en las miniaturas del carrito.
export default function ProductImage({
  producto,
  agotado = false,
  className = "",
}) {
  const imagen = IMAGENES[producto.id];
  const [fallo, setFallo] = useState(false);
  const mostrarFoto = Boolean(imagen?.src) && !fallo;

  const clases = [
    "producto-imagen",
    className,
    agotado ? "producto-imagen--agotado" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clases}>
      {mostrarFoto ? (
        <img
          src={imagen.src}
          alt=""
          loading="lazy"
          onError={() => setFallo(true)}
        />
      ) : (
        <span className="producto-imagen__emoji" aria-hidden="true">
          {imagen?.emoji ?? "🛒"}
        </span>
      )}

      {agotado && <span className="producto-imagen__etiqueta">Agotado</span>}
    </div>
  );
}
