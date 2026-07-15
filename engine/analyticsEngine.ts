import type { Movimiento } from "@/types/movement";

export type Analytics = {
  ticketPromedio: number;
  mayorDia: {
    fecha: string;
    total: number;
  } | null;
  menorDia: {
    fecha: string;
    total: number;
  } | null;
  diasConMovimientos: number;
};

export function analyticsEngine(
  movimientos: Movimiento[]
): Analytics {

  const gastos = movimientos.filter(
    (m) => m.tipo === "gasto"
  );

  const ticketPromedio =
    gastos.length === 0
      ? 0
      : gastos.reduce(
          (acc, m) => acc + m.monto,
          0
        ) / gastos.length;

  const dias: Record<string, number> = {};

  gastos.forEach((movimiento) => {
    if (!movimiento.fecha) return;

    const fecha = new Date(
      movimiento.fecha
    ).toLocaleDateString("es-AR");

    dias[fecha] =
      (dias[fecha] || 0) + movimiento.monto;
  });

  const listaDias = Object.entries(dias).map(
    ([fecha, total]) => ({
      fecha,
      total,
    })
  );

  const mayorDia =
    listaDias.length > 0
      ? [...listaDias].sort(
          (a, b) => b.total - a.total
        )[0]
      : null;

  const menorDia =
    listaDias.length > 0
      ? [...listaDias].sort(
          (a, b) => a.total - b.total
        )[0]
      : null;

  return {
    ticketPromedio,
    mayorDia,
    menorDia,
    diasConMovimientos: listaDias.length,
  };
}