import { useCallback, useEffect, useRef, useState } from "react";

const DURACION_POR_DEFECTO = 4000;
const MAXIMO_VISIBLES = 4;

// mostrar(mensaje, { tipo, duracion, accion })
//  - tipo: "info" | "exito" | "advertencia"
//  - duracion: milisegundos antes de desaparecer solo
//  - accion: { etiqueta, onClick } para toasts con botón (por ejemplo, confirmar)
export function useToast() {
  const [toasts, setToasts] = useState([]);
  const contador = useRef(0);
  const temporizadores = useRef(new Map());

  const cerrar = useCallback((id) => {
    clearTimeout(temporizadores.current.get(id));
    temporizadores.current.delete(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const mostrar = useCallback(
    (
      mensaje,
      { tipo = "info", duracion = DURACION_POR_DEFECTO, accion = null } = {}
    ) => {
      const id = ++contador.current;

      setToasts((prev) => {
        // Evita apilar avisos idénticos (por ejemplo, al mantener pulsado "+")
        const sinRepetidos = prev.filter((t) => t.mensaje !== mensaje);
        return [...sinRepetidos, { id, mensaje, tipo, accion }].slice(
          -MAXIMO_VISIBLES
        );
      });

      // Autocierre
      temporizadores.current.set(
        id,
        setTimeout(() => cerrar(id), duracion)
      );
      return id;
    },
    [cerrar]
  );

  // Limpia los temporizadores pendientes al desmontar
  useEffect(() => {
    const mapa = temporizadores.current;
    return () => {
      mapa.forEach((temporizador) => clearTimeout(temporizador));
      mapa.clear();
    };
  }, []);

  return { toasts, mostrar, cerrar };
}