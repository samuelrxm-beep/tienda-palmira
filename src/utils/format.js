// Se usa Intl.NumberFormat con useGrouping "always" para que 9800 salga como
// 9.800 (algunos navegadores no agrupan los números de 4 dígitos en es-CO).
// El símbolo "$" se antepone a mano para obtener el formato de la guía: $57.000
const formateador = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0,
  useGrouping: "always",
});

export const formatCOP = (valor) => {
  const entero = Math.round(Number(valor) || 0);
  return `${entero < 0 ? "-" : ""}$${formateador.format(Math.abs(entero))}`;
};