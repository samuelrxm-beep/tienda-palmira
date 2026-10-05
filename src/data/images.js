// Las imágenes se guardan en src/assets/productos/ (cualquier extensión).
// Vite las detecta solas y las incluye al construir el proyecto.
// No se toca products.js: la estructura del catálogo queda exactamente como pide la guía.
const archivos = import.meta.glob(
  "../assets/productos/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

const normalizar = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .toLowerCase();

// nombre del archivo sin ruta ni extensión (normalizado) → URL de la imagen
const urlPorNombre = {};
for (const [ruta, modulo] of Object.entries(archivos)) {
  const nombre = normalizar(ruta.split("/").pop().replace(/\.[^.]+$/, ""));
  urlPorNombre[nombre] = modulo.default;
}

// Palabras que identifican a cada producto dentro del nombre del archivo
const PALABRAS_CLAVE = {
  1: ["cafe"],
  2: ["panela"],
  3: ["arepa"],
  4: ["chocolate"],
  5: ["bocadillo"],
  6: ["aguardiente"],
};

const EMOJIS = {
  1: "☕",
  2: "🍯",
  3: "🌽",
  4: "🍫",
  5: "🍬",
  6: "🥃",
};

// Busca primero un archivo llamado como el id (1.jpg) y luego por palabra clave
function buscarUrl(id) {
  if (urlPorNombre[String(id)]) return urlPorNombre[String(id)];

  const nombre = Object.keys(urlPorNombre).find((n) =>
    PALABRAS_CLAVE[id].some((palabra) => n.includes(palabra))
  );
  return nombre ? urlPorNombre[nombre] : undefined;
}

export const IMAGENES = Object.fromEntries(
  Object.keys(PALABRAS_CLAVE).map((id) => [
    Number(id),
    { src: buscarUrl(Number(id)), emoji: EMOJIS[id] },
  ])
);

// Ayuda de diagnóstico: solo se muestra en desarrollo (consola del navegador, F12)
if (import.meta.env.DEV) {
  const detectadas = Object.keys(urlPorNombre);
  console.info(
    "[Imágenes] Archivos detectados en src/assets/productos:",
    detectadas.length ? detectadas : "ninguno"
  );

  Object.entries(IMAGENES).forEach(([id, { src }]) => {
    if (!src) {
      console.warn(
        `[Imágenes] No se encontró imagen para el producto ${id}. ` +
          `El nombre del archivo debe contener: ${PALABRAS_CLAVE[id].join(", ")} (o llamarse ${id}).`
      );
    }
  });
}