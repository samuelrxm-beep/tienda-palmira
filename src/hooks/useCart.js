import { useEffect, useMemo, useState } from "react";
import { limitarCantidad } from "../utils/validation";

const CLAVE_STORAGE = "tienda-palmira:carrito";

// Lee el carrito guardado y lo valida contra el catálogo actual:
// descarta productos que no existen y recorta cantidades que superen el stock.
function cargarItemsGuardados(productos) {
  try {
    const crudo = localStorage.getItem(CLAVE_STORAGE);
    if (!crudo) return [];

    const guardado = JSON.parse(crudo);
    if (!Array.isArray(guardado)) return [];

    const items = [];
    for (const { id, cantidad } of guardado) {
      const producto = productos.find((p) => p.id === id);
      const valida = Number.isInteger(cantidad) && cantidad >= 1;
      const repetido = items.some((i) => i.id === id);

      if (producto && valida && !repetido) {
        items.push({ id, cantidad: Math.min(cantidad, producto.stock) });
      }
    }
    return items;
  } catch {
    return []; // JSON dañado o localStorage no disponible
  }
}

// Estado interno: items = [{ id, cantidad }]
// Estado derivado: lineas = [{ producto, cantidad, subtotal }]
export function useCart({ productos, onMaxStock } = {}) {
  const [items, setItems] = useState(() => cargarItemsGuardados(productos));

  // Persistencia (valor agregado)
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch {
      // Si no hay almacenamiento disponible, el carrito sigue funcionando en memoria
    }
  }, [items]);

  const lineas = useMemo(
    () =>
      items.flatMap(({ id, cantidad }) => {
        const producto = productos.find((p) => p.id === id);
        return producto
          ? [{ producto, cantidad, subtotal: producto.precio * cantidad }]
          : [];
      }),
    [items, productos]
  );

  const totalUnidades = lineas.reduce((suma, l) => suma + l.cantidad, 0);
  const total = lineas.reduce((suma, l) => suma + l.subtotal, 0);

  const cantidadEnCarrito = (id) =>
    items.find((i) => i.id === id)?.cantidad ?? 0;

  // Agrega SUMANDO a la línea existente (nunca duplica líneas).
  // Si lo pedido supera lo que queda en stock, agrega solo lo que queda y avisa.
  // Devuelve { agregadas, limitado }.
  const agregar = (producto, cantidad) => {
    const pedida = Number.isInteger(cantidad) && cantidad >= 1 ? cantidad : 1;
    const disponible = producto.stock - cantidadEnCarrito(producto.id);

    if (disponible <= 0) {
      onMaxStock?.(producto);
      return { agregadas: 0, limitado: true };
    }

    const agregadas = Math.min(pedida, disponible);
    const limitado = pedida > disponible;
    if (limitado) onMaxStock?.(producto);

    setItems((prev) =>
      prev.some((i) => i.id === producto.id)
        ? prev.map((i) =>
            i.id === producto.id
              ? { ...i, cantidad: i.cantidad + agregadas }
              : i
          )
        : [...prev, { id: producto.id, cantidad: agregadas }]
    );

    return { agregadas, limitado };
  };

  // Fija la cantidad de una línea (el input ya validó y avisó; aquí solo se asegura el rango)
  const cambiarCantidad = (id, cantidad) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    const valida = limitarCantidad(cantidad, producto.stock);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad: valida } : i))
    );
  };

  const quitar = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const vaciar = () => setItems([]);

  return {
    lineas,
    totalUnidades,
    total,
    cantidadEnCarrito,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
  };
}