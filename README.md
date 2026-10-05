# TIENDA PALMIRA – Carrito de Compras con Validaciones de Stock

Reto práctico de Desarrollo Front-End con React · SENA CBI Palmira

- **Aprendiz:** Samuel Ramírez Perea
- **Ficha:** 3409924
- **Repositorio público:** ____________________
- **Tecnología usada:** React (Vite) · JavaScript · CSS

## Cómo instalar y ejecutar

```bash
git clone <enlace-del-repositorio>
cd <carpeta-del-proyecto>
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Funcionalidades

- **Catálogo** desde un array JSON estático (`src/data/products.js`).
- **Navbar fija** con el nombre de la tienda a la izquierda e ícono del carrito a la derecha, con contador de unidades (se oculta si es 0).
- **Panel lateral del carrito** que se abre y se cierra (X, fondo oscuro o tecla Escape).
- **Agregar sin duplicar:** si el producto ya está en el carrito, se suma a la línea existente.
- **Campo de cantidad validado** (catálogo y carrito): bloquea `e`, `E`, `+`, `-`, `.`, `,`, letras, 0 y negativos; al pegar solo acepta dígitos; la rueda del mouse no cambia el valor.
- **Stock máximo con toast:** al escribir, al pulsar `+` o al agregar de nuevo, se corrige al máximo y aparece el aviso.
- **Mínimo 1 con confirmación:** en el carrito, `−` o escribir `0` muestra un toast con botón para eliminar el producto. También existe el botón **Quitar**.
- **Subtotales, total de la compra y total de unidades** con formato COP.
- **Valor agregado:** persistencia del carrito en `localStorage`, toasts accesibles, foco visible y diseño responsive.

## Estructura

```
src/
├── components/   Navbar, ProductList, ProductCard, QuantityInput, Cart, CartItem, Toast
├── hooks/        useCart, useToast
├── utils/        format, validation, messages
├── data/         products
├── App.jsx
├── main.jsx
└── index.css
```

## Evidencias

| # | Funcionalidad | Captura | ¿Funciona? |
|---|---|---|---|
| 1 | Navbar e ícono con contador | evidencias/01-navbar-contador.png | Sí |
| 2 | Agregar producto desde el catálogo | evidencias/02-agregar-producto.png | Sí |
| 3 | Bloqueo de la tecla "e" y de negativos / 0 | evidencias/03-bloqueo-teclas.png | Sí |
| 4 | Toast de stock máximo | evidencias/04-toast-maximo.png | Sí |
| 5 | Toast de cantidad mínima con opción de eliminar | evidencias/05-toast-minimo.png | Sí |
| 6 | Subtotales y total con varios productos | evidencias/06-subtotales-total.png | Sí |
| 7 | Producto eliminado y total recalculado | evidencias/07-eliminado-recalculado.png | Sí |