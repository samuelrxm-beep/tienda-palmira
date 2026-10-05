// Teclas que nunca deben escribirse en un campo de cantidad (Punto 4)
export const TECLAS_BLOQUEADAS = ["e", "E", "+", "-", ".", ","];

// Devuelve true si la tecla debe bloquearse con preventDefault.
// Además de las teclas de la lista, bloquea cualquier carácter que no sea dígito
// (letras, espacios, símbolos), pero deja pasar atajos como Ctrl+C / Ctrl+V.
export function esTeclaBloqueada(evento) {
  const { key, ctrlKey, metaKey, altKey } = evento;
  if (typeof key !== "string") return false;
  if (ctrlKey || metaKey || altKey) return false;
  if (TECLAS_BLOQUEADAS.includes(key)) return true;
  return key.length === 1 && !/\d/.test(key);
}

// true solo si el texto está formado únicamente por dígitos (para onPaste y onChange)
export const soloDigitos = (texto) => /^\d+$/.test(texto);

// Analiza lo que el usuario escribió o pegó y dice qué hacer con ello:
//  - "vacio":    el campo quedó vacío (se permite mientras escribe)
//  - "invalido": no son solo dígitos (se ignora)
//  - "minimo":   es 0 (no se acepta, se conserva el valor anterior)
//  - "maximo":   supera el stock (se corrige al stock)
//  - "ok":       cantidad válida entre 1 y el stock
export function evaluarEntrada(texto, max) {
  if (texto === "") return { estado: "vacio" };
  if (!soloDigitos(texto)) return { estado: "invalido" };

  const n = parseInt(texto, 10);
  if (n < 1) return { estado: "minimo" };
  if (n > max) return { estado: "maximo", cantidad: max };
  return { estado: "ok", cantidad: n };
}

// Fuerza un número al rango [min, max]
export function limitarCantidad(valor, max, min = 1) {
  const n = Math.trunc(Number(valor));
  if (!Number.isFinite(n)) return min;
  return Math.min(Math.max(n, min), max);
}