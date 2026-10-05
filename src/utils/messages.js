export const MENSAJES = {
  stockMaximo: "Este es el máximo de producto disponible en stock",
  cantidadMinima: "La cantidad mínima es 1.",
  pegadoInvalido: "Solo se permiten números enteros positivos (únicamente dígitos).",
  minimoEliminar: (nombre) =>
    `Esta es la cantidad mínima (1) de "${nombre}". ¿Desea eliminar el producto del carrito?`,
  productoAgregado: (nombre, cantidad) =>
    `Se agregó al carrito: ${nombre} (×${cantidad}).`,
  productoEliminado: (nombre) => `"${nombre}" se eliminó del carrito.`,
  confirmarVaciar: "¿Desea vaciar todo el carrito?",
  carritoVaciado: "El carrito quedó vacío.",
};