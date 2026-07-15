import type { Movimiento } from "@/types/movement";

export type Goal = {
  categoria: string;
  limite: number;
};

export type GoalProgress = {
  categoria: string;
  gastado: number;
  limite: number;
  porcentaje: number;
  restante: number;
};

export function calcularObjetivos(
  movimientos: Movimiento[],
  objetivos: Goal[]
): GoalProgress[] {
  return objetivos.map((objetivo) => {
    const gastado = movimientos
      .filter(
        (movimiento) =>
          movimiento.tipo === "gasto" &&
          movimiento.categoria === objetivo.categoria
      )
      .reduce(
        (acumulado, movimiento) =>
          acumulado + movimiento.monto,
        0
      );

    const porcentaje =
      objetivo.limite > 0
        ? Math.min(
            (gastado / objetivo.limite) * 100,
            100
          )
        : 0;

    return {
      categoria: objetivo.categoria,
      gastado,
      limite: objetivo.limite,
      porcentaje,
      restante: Math.max(
        objetivo.limite - gastado,
        0
      ),
    };
  });
}