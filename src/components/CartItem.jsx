import ProductImage from "./ProductImage";
import QuantityInput from "./QuantityInput";
import { formatCOP } from "../utils/format";

export default function CartItem({
  linea,
  onCambiarCantidad,
  onQuitar,
  avisos,
}) {
  const { producto, cantidad, subtotal } = linea;

  return (
    <li className="cart-item">
      <div className="cart-item__cabecera">
        <ProductImage producto={producto} className="producto-imagen--mini" />

        <div className="cart-item__info">
          <h3 className="cart-item__nombre">{producto.nombre}</h3>
          <p className="cart-item__unitario">
            {formatCOP(producto.precio)} c/u · Stock: {producto.stock}
          </p>
        </div>
      </div>

      <QuantityInput
        nombreProducto={producto.nombre}
        value={cantidad}
        max={producto.stock}
        onChange={(n) => onCambiarCantidad(producto.id, n)}
        onMax={avisos.maximo}
        onMin={() => avisos.minimoCarrito(producto)}
        onInvalidPaste={avisos.pegadoInvalido}
      />

      <p className="cart-item__subtotal">
        <span className="cart-item__formula">
          {formatCOP(producto.precio)} × {cantidad}
        </span>
        <strong>{formatCOP(subtotal)}</strong>
      </p>

      <button
        type="button"
        className="btn btn--peligro btn--pequeno cart-item__quitar"
        onClick={() => onQuitar(producto)}
        aria-label={`Quitar ${producto.nombre} del carrito`}
      >
        Quitar
      </button>
    </li>
  );
}