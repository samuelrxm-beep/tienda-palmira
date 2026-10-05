import { useState } from "react";
import {
  esTeclaBloqueada,
  evaluarEntrada,
  soloDigitos,
} from "../utils/validation";

// Campo de cantidad reutilizable (catálogo y carrito).
//  value: cantidad actual (número) · max: tope permitido
//  onChange(n): nueva cantidad válida
//  onMax(): se intentó superar el tope
//  onMin(): se intentó bajar de 1 (botón −, flecha ↓ o escribir 0)
//  onInvalidPaste(): se intentó pegar texto que no son solo dígitos
export default function QuantityInput({
  nombreProducto,
  value,
  max,
  onChange,
  onMax,
  onMin,
  onInvalidPaste,
  disabled = false,
}) {
  // Cantidad actual: siempre un entero >= 1, aunque el padre envíe algo inesperado
  const actual = Number.isInteger(value) && value >= 1 ? value : 1;

  // Texto que se está editando. null = no se está editando,
  // y el campo muestra directamente la cantidad actual.
  const [texto, setTexto] = useState(null);
  const mostrado = texto ?? String(actual);

  // Punto único por donde pasa todo texto nuevo (escribir o pegar)
  const aplicarTexto = (entrada) => {
    const resultado = evaluarEntrada(entrada, max);

    switch (resultado.estado) {
      case "vacio":
        setTexto(""); // permite borrar para escribir otro número
        break;
      case "invalido":
        break; // se ignora: el campo conserva lo que tenía
      case "minimo":
        setTexto(null); // no acepta 0: vuelve a mostrar el valor anterior
        onMin?.();
        break;
      case "maximo":
        setTexto(null);
        onChange(resultado.cantidad);
        onMax?.();
        break;
      default:
        setTexto(null);
        onChange(resultado.cantidad);
    }
  };

  const aumentar = () => {
    if (actual >= max) {
      onMax?.();
      return;
    }
    setTexto(null);
    onChange(actual + 1);
  };

  const disminuir = () => {
    if (actual <= 1) {
      onMin?.();
      return;
    }
    setTexto(null);
    onChange(actual - 1);
  };

  const handleKeyDown = (e) => {
    // Las flechas se comportan igual que los botones + y −
    if (e.key === "ArrowUp") {
      e.preventDefault();
      aumentar();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      disminuir();
      return;
    }
    if (esTeclaBloqueada(e)) e.preventDefault();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pegado = e.clipboardData.getData("text").trim();
    if (soloDigitos(pegado)) {
      aplicarTexto(pegado); // reemplaza el valor del campo
    } else {
      onInvalidPaste?.();
    }
  };

  // Evita que la rueda del mouse cambie el valor sin querer
  const handleWheel = (e) => e.currentTarget.blur();

  // Al salir del campo, termina la edición y vuelve a mostrar la cantidad actual
  const handleBlur = () => setTexto(null);

  return (
    <div
      className="qty"
      role="group"
      aria-label={`Cantidad de ${nombreProducto}`}
    >
      <button
        type="button"
        className="qty__boton"
        onClick={disminuir}
        disabled={disabled}
        aria-label={`Disminuir cantidad de ${nombreProducto}`}
      >
        −
      </button>

      <input
        type="number"
        className="qty__input"
        inputMode="numeric"
        min={1}
        max={max}
        step={1}
        value={mostrado}
        disabled={disabled}
        autoComplete="off"
        aria-label={`Cantidad de ${nombreProducto}`}
        onChange={(e) => aplicarTexto(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onWheel={handleWheel}
        onBlur={handleBlur}
      />

      <button
        type="button"
        className="qty__boton"
        onClick={aumentar}
        disabled={disabled}
        aria-label={`Aumentar cantidad de ${nombreProducto}`}
      >
        +
      </button>
    </div>
  );
}