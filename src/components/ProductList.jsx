import ProductCard from "./ProductCard";

export default function ProductList({
  productos,
  cantidadEnCarrito,
  onAdd,
  avisos,
}) {
  return (
    <section aria-labelledby="titulo-catalogo">
      <h2 id="titulo-catalogo" className="catalogo__titulo">
        Productos típicos de la región
      </h2>
      <p className="catalogo__subtitulo">
        Elige la cantidad y agrégala a tu carrito.
      </p>

      <ul className="productos">
        {productos.map((producto) => (
          <li key={producto.id}>
            <ProductCard
              producto={producto}
              enCarrito={cantidadEnCarrito(producto.id)}
              onAdd={onAdd}
              avisos={avisos}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}