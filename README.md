# 🛒 TIENDA PALMIRA – Carrito de Compras con Validaciones de Stock

Reto práctico de **Desarrollo Front-End con React** · SENA – Centro de Biotecnología Industrial (CBI Palmira)

Carrito de compras para la tienda virtual **TIENDA PALMIRA** que valida toda la información en el frontend y avisa al usuario con *toasts* (mensajes emergentes) cada vez que intenta hacer algo no permitido: superar el stock, escribir cantidades inválidas o bajar de la cantidad mínima.

---

## 📋 Datos del aprendiz

| Campo | Información |
|---|---|
| **Aprendiz** | Samuel Ramírez Perea |
| **Ficha** | 3409924 |
| **Programa** | Análisis y Desarrollo de Software (ADSO) |
| **Centro** | SENA – CBI Palmira |
| **Tecnología usada** | ☑ React  ☑ HTML + CSS + JS |
| **Repositorio público** | (https://github.com/samuelrxm-beep/tienda-palmira.git) |
| **Enlace de despliegue (opcional)** | ____________________ |
| **Fecha de entrega** | 5/10/2026 |

---

## 🧰 Tecnologías

- **React** (hooks: `useState`, `useEffect`, `useMemo`, `useRef`, `useCallback`)
- **Vite** como herramienta de desarrollo y empaquetado
- **JavaScript (ES6+)** y **CSS** puro (sin librerías de estilos ni de componentes)
- **`Intl.NumberFormat`** para el formato de moneda COP
- **`localStorage`** para la persistencia del carrito

---

## ⚙️ Instalación y ejecución

**Requisito previo:** tener instalado [Node.js](https://nodejs.org/) 18 o superior.

```bash
# 1. Clonar el repositorio
git clone <enlace-del-repositorio>

# 2. Entrar a la carpeta del proyecto
cd <carpeta-del-proyecto>

# 3. Instalar las dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abre en el navegador la dirección que muestra la terminal (normalmente `http://localhost:5173`).

Otros comandos útiles:

```bash
npm run build     # genera la versión de producción en /dist
npm run preview   # sirve localmente la versión de producción
```

---

## 🗂️ Estructura del proyecto

```
tienda-palmira/
├── index.html
├── README.md
└── src/
    ├── main.jsx                 # Punto de entrada
    ├── App.jsx                  # Integración de toda la aplicación
    ├── index.css                # Estilos globales y responsive
    ├── assets/
    │   └── productos/           # Fotos de los productos
    ├── data/
    │   ├── products.js          # Catálogo estático (array JSON)
    │   └── images.js            # Asocia cada producto con su foto
    ├── utils/
    │   ├── format.js            # Formato de moneda COP
    │   ├── validation.js        # Reglas de teclado, pegado y rangos
    │   └── messages.js          # Textos de los toasts
    ├── hooks/
    │   ├── useCart.js           # Estado y lógica del carrito
    │   └── useToast.js          # Gestión de notificaciones
    └── components/
        ├── Navbar.jsx           # Barra fija con ícono y contador
        ├── ProductList.jsx      # Grilla del catálogo
        ├── ProductCard.jsx      # Tarjeta de producto
        ├── ProductImage.jsx     # Foto con respaldo y etiqueta "Agotado"
        ├── QuantityInput.jsx    # Campo de cantidad validado (reutilizable)
        ├── Cart.jsx             # Panel lateral del carrito
        ├── CartItem.jsx         # Línea del carrito
        └── Toast.jsx            # Notificaciones emergentes
```

---

## 🖼️ Imágenes de los productos

Las fotos se guardan en `src/assets/productos/`. El proyecto las reconoce sin importar la extensión (`.jpg`, `.png`, `.webp`…) si el nombre del archivo contiene la palabra clave del producto o se llama como su `id`:

| Producto | Palabra clave en el nombre | Ejemplo de archivo |
|---|---|---|
| Café de Huila 500 g | `cafe` | `cafe-huila.jpg` |
| Panela orgánica 1 kg | `panela` | `panela.jpg` |
| Arepa de choclo x6 | `arepa` | `arepa-choclo.jpg` |
| Chocolate de mesa | `chocolate` | `chocolate-mesa.jpg` |
| Bocadillo veleño | `bocadillo` | `bocadillo-velenio.jpg` |
| Aguardiente 750 ml | `aguardiente` | `aguardiente.jpg` |

Si una foto no existe, la tarjeta muestra un emoji de respaldo y la aplicación sigue funcionando.

---

## ✅ Funcionalidades por punto del reto

| Punto | Requisito | Cómo se cumple | Archivos |
|---|---|---|---|
| **1** | Catálogo desde un array JSON | Array `PRODUCTOS` con los 6 productos exactos de la guía, sin base de datos ni API | `data/products.js` |
| **2** | Navbar e ícono del carrito | Navbar fija, nombre a la izquierda, ícono a la derecha con contador de unidades (oculto en 0); el panel del carrito abre y cierra | `Navbar.jsx`, `Cart.jsx` |
| **3** | Catálogo y botón Agregar | Nombre, precio, stock disponible, campo de cantidad desde 1 y botón Agregar; si el producto ya está en el carrito se **suma** a la línea existente; el botón se deshabilita si no queda stock | `ProductCard.jsx`, `useCart.js` |
| **4** | Validaciones del campo numérico | Bloqueo de `e`, `E`, `+`, `-`, `.`, `,` y cualquier no-dígito; pegado solo de dígitos; sin 0 ni negativos; rueda del mouse desactivada. Aplica en catálogo y carrito | `QuantityInput.jsx`, `validation.js` |
| **5** | Stock máximo con toast | La cantidad nunca supera el stock: escribiendo, con el botón `+` y al agregar de nuevo. Se corrige al máximo y aparece el toast *"Este es el máximo de producto disponible en stock"* | `QuantityInput.jsx`, `useCart.js` |
| **6** | Mínimo 1 y eliminación con toast | En el carrito, `−` o escribir `0` con cantidad 1 muestra un toast con botón **Sí, eliminar**; también existe el botón **Quitar** directo | `CartItem.jsx`, `App.jsx`, `Toast.jsx` |
| **7** | Subtotales y total | Subtotal por línea, total de la compra y total de unidades, en formato COP y actualizados al instante | `Cart.jsx`, `useCart.js`, `format.js` |
| **8** | Repositorio y evidencias | Repositorio público, este README y la carpeta `evidencias/` | — |

### Detalle de las validaciones del campo de cantidad

| Acción del usuario | Resultado |
|---|---|
| Teclear `e`, `E`, `+`, `-`, `.`, `,` o letras | La tecla no escribe nada |
| Pegar `-5`, `3e2` o `abc` | No se pega nada y aparece un aviso |
| Pegar solo dígitos (por ejemplo `4`) | Se acepta si está dentro del rango |
| Escribir `0` | No se acepta, conserva el valor anterior y muestra el toast del mínimo |
| Escribir un número mayor al stock | Se corrige al máximo y muestra el toast de stock máximo |
| Rueda del mouse sobre el campo | No cambia el valor |
| Flechas ↑ / ↓ del teclado | Se comportan igual que los botones `+` y `−` (con sus toasts) |
| Dejar el campo vacío y salir | Vuelve al último valor válido |

---

## 🧪 Casos de prueba del instructor

| # | Acción | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| 1 | Teclear `e`, `E`, `+`, `-`, `.` o `,` en cualquier campo de cantidad | La tecla no escribe nada | ✅ Cumple |
| 2 | Pegar `-5`, `3e2` o `abc` en un campo de cantidad | No se pega (solo dígitos) | ✅ Cumple |
| 3 | Escribir `0` en el campo de la tarjeta del producto | No lo acepta, conserva el valor y muestra toast de cantidad mínima | ✅ Cumple |
| 4 | Escribir `0` en el campo dentro del carrito | La cantidad no cambia y aparece el toast del mínimo con opción de eliminar | ✅ Cumple |
| 5 | Escribir `999` en un producto con stock 8 | Se corrige a 8 y aparece el toast de máximo disponible | ✅ Cumple |
| 6 | Panela (stock 3): agregar 2 y luego 2 más | Queda en 3 (no en 4) y aparece el toast de máximo | ✅ Cumple |
| 7 | En el carrito, pulsar `+` con la cantidad igual al stock | No sube y aparece el toast de máximo | ✅ Cumple |
| 8 | En el carrito, pulsar `−` con cantidad 1 | Toast de mínimo con opción de eliminar; al confirmar, el producto sale y el total se recalcula | ✅ Cumple |
| 9 | Agregar dos veces el mismo producto | Una sola línea con las cantidades sumadas | ✅ Cumple |
| 10 | Agregar Café ×2, Panela ×3 y Arepa ×1 | Subtotales $57.000, $29.400 y $12.000 · Total $98.400 | ✅ Cumple |
| 11 | Agregar todo el stock de un producto (Chocolate ×1) | El botón Agregar queda deshabilitado | ✅ Cumple |
| 12 | Agregar productos y observar la barra de navegación | El ícono está a la derecha y el contador suma las unidades | ✅ Cumple |

---

## ☑️ Verificación y entrega

| ✓ | Criterio de verificación | ¿Cumple? |
|---|---|---|
| ☑ | La aplicación corre con los comandos `npm install` y `npm run dev` | Sí |
| ☑ | El repositorio es público y se puede clonar sin pedir credenciales | Sí |
| ☑ | El catálogo sale de un array JSON con id, nombre, precio y stock | Sí |
| ☑ | El ícono del carrito está en la navbar, a la derecha, con contador de unidades | Sí |
| ☑ | Ningún campo de cantidad acepta letras (especialmente la e), signos, puntos, comas, 0 ni negativos | Sí |
| ☑ | Nunca se supera el stock y siempre aparece el toast de máximo disponible | Sí |
| ☑ | Con cantidad 1, al restar (o escribir 0) aparece el toast del mínimo con opción de eliminar | Sí |
| ☑ | Los subtotales y el total cuadran al agregar más del mismo producto, cambiar cantidades o eliminar | Sí |
| ☑ | El README incluye el enlace del repositorio, las instrucciones y las capturas de evidencia | Sí |

---

## ⭐ Valor agregado

- **Persistencia del carrito** con `localStorage`: al recargar la página el carrito se conserva. Al leerlo se valida contra el catálogo (se descartan productos inexistentes y se recortan cantidades que superen el stock).
- **Panel lateral accesible:** se cierra con la X, el fondo oscuro, el botón *Seguir comprando* o la tecla `Escape`; el foco pasa al panel al abrirlo y vuelve al ícono al cerrarlo.
- **Accesibilidad básica:** foco visible, etiquetas `aria-label` en botones y campos, y toasts anunciables por lectores de pantalla.
- **Diseño responsive:** se ve bien en computador y en celular.
- **Componentes reutilizables:** un único `QuantityInput` para catálogo y carrito, y un único sistema de toasts con acciones (confirmar eliminación y vaciado).
- **Imágenes de productos** con respaldo en emoji y estado visual de *Agotado*.
- **Animaciones sutiles** (contador, panel y toasts) que respetan `prefers-reduced-motion`.

---

## 🧠 Decisiones de diseño

- **Stock disponible = stock total − unidades en el carrito.** La tarjeta del catálogo siempre muestra lo que realmente se puede agregar todavía.
- **Una sola línea por producto.** Al agregar de nuevo un producto existente se suma la cantidad; nunca se duplican líneas.
- **Validación en dos capas.** `onKeyDown` y `onPaste` bloquean la entrada inválida, y `onChange` revalida el valor final (cubre teclados móviles, arrastrar y soltar y flechas del teclado).
- **Lógica separada de la interfaz.** Las reglas puras viven en `utils/validation.js`, el estado del carrito en `hooks/useCart.js` y los textos de los avisos en `utils/messages.js`.
- **Sin `alert()` del navegador.** Todos los avisos usan toasts que desaparecen solos y se pueden cerrar manualmente.

---

## 👤 Autor

**Samuel Ramírez Perea** · Aprendiz de Análisis y Desarrollo de Software · SENA CBI Palmira
