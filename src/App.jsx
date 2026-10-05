import { useCallback, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ToastContainer from "./components/Toast";
import { PRODUCTOS } from "./data/products";
import { useToast } from "./hooks/useToast";
import { useCart } from "./hooks/useCart";
import { MENSAJES } from "./utils/messages";

export default function App() {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const botonCarritoRef = useRef(null);

  const { toasts, mostrar, cerrar } = useToast();

  // ---------- Avisos ----------
  const avisarMaximo = useCallback(
    () => mostrar(MENSAJES.stockMaximo, { tipo: "advertencia" }),
    [mostrar]
  );

  const carrito = useCart({ productos: PRODUCTOS, onMaxStock: avisarMaximo });

  // ---------- Panel del carrito ----------
  const abrirCarrito = () => setCarritoAbierto(true);

  const cerrarCarrito = useCallback(() => {
    setCarritoAbierto(false);
    botonCarritoRef.current?.focus(); // devuelve el foco al ícono del carrito
  }, []);

  // ---------- Acciones ----------
  const agregarProducto = (producto, cantidad) => {
    const { agregadas, limitado } = carrito.agregar(producto, cantidad);
    // Si hubo límite de stock, ya se mostró el toast de máximo
    if (agregadas > 0 && !limitado) {
      mostrar(MENSAJES.productoAgregado(producto.nombre, agregadas), {
        tipo: "exito",
      });
    }
  };

  const quitarProducto = (producto) => {
    carrito.quitar(producto.id);
    mostrar(MENSAJES.productoEliminado(producto.nombre), { tipo: "exito" });
  };

  // Punto 6: con cantidad 1, "−" o escribir 0 → toast con botón para confirmar
  const pedirEliminar = (producto) =>
    mostrar(MENSAJES.minimoEliminar(producto.nombre), {
      tipo: "advertencia",
      duracion: 8000,
      accion: {
        etiqueta: "Sí, eliminar",
        onClick: () => quitarProducto(producto),
      },
    });

  const vaciarCarrito = () => {
    carrito.vaciar();
    mostrar(MENSAJES.carritoVaciado, { tipo: "exito" });
  };

  const pedirVaciar = () =>
    mostrar(MENSAJES.confirmarVaciar, {
      tipo: "advertencia",
      duracion: 8000,
      accion: { etiqueta: "Sí, vaciar", onClick: vaciarCarrito },
    });

  // Avisos que usan los campos de cantidad
  const avisos = {
    maximo: avisarMaximo,
    minimoCatalogo: () =>
      mostrar(MENSAJES.cantidadMinima, { tipo: "advertencia" }),
    minimoCarrito: pedirEliminar,
    pegadoInvalido: () =>
      mostrar(MENSAJES.pegadoInvalido, { tipo: "advertencia" }),
  };

  return (
    <>
      <Navbar
        totalUnidades={carrito.totalUnidades}
        carritoAbierto={carritoAbierto}
        onAbrirCarrito={abrirCarrito}
        botonRef={botonCarritoRef}
      />

      <main className="contenedor">
        <ProductList
          productos={PRODUCTOS}
          cantidadEnCarrito={carrito.cantidadEnCarrito}
          onAdd={agregarProducto}
          avisos={avisos}
        />
      </main>

      <Cart
        abierto={carritoAbierto}
        lineas={carrito.lineas}
        totalUnidades={carrito.totalUnidades}
        total={carrito.total}
        onCambiarCantidad={carrito.cambiarCantidad}
        onQuitar={quitarProducto}
        onVaciar={pedirVaciar}
        onCerrar={cerrarCarrito}
        avisos={avisos}
      />

      {/* Va después del panel para que sus botones sean alcanzables con Tab */}
      <ToastContainer toasts={toasts} onClose={cerrar} />
    </>
  );
}