import type { Movimiento } from "@/types/movement";

export type CategoriaResumen = {
  categoria: string;
  total: number;
};

export type FinancialAnalysis = {
  cantidadMovimientos: number;
  ingresos: number;
  gastos: number;
  saldo: number;
  gastoPromedio: number;
  promedioDiario: number;
  mayorGasto: Movimiento | null;
  categorias: CategoriaResumen[];
  categoriaPrincipal: CategoriaResumen | null;
  medioPagoPrincipal: string;
  proyeccionGastosMes: number;
  diasConGastos: number;
  consejos: string[];
};

export function financialEngine(
  movimientos: Movimiento[]
): FinancialAnalysis {
  const ingresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, m) => acc + m.monto, 0);

  const gastosMov = movimientos.filter(
    (m) => m.tipo === "gasto"
  );

  const gastos = gastosMov.reduce(
    (acc, m) => acc + m.monto,
    0
  );

  const saldo = ingresos - gastos;

  const gastoPromedio =
    gastosMov.length > 0
      ? gastos / gastosMov.length
      : 0;

  const dias = new Set(
    gastosMov
      .filter((m) => m.fecha)
      .map((m) =>
        new Date(m.fecha).toLocaleDateString("es-AR")
      )
  );

  const diasConGastos = dias.size;

  const promedioDiario =
    gastos / Math.max(diasConGastos, 1);

  const hoy = new Date();

  const ultimoDiaMes = new Date(
    hoy.getFullYear(),
    hoy.getMonth() + 1,
    0
  ).getDate();

  const proyeccionGastosMes =
    promedioDiario * ultimoDiaMes;

  const mayorGasto =
    gastosMov.length > 0
      ? [...gastosMov].sort(
          (a, b) => b.monto - a.monto
        )[0]
      : null;

  const categorias = Object.values(
    gastosMov.reduce((acc, mov) => {
      const categoria =
        mov.categoria || "Otros";

      if (!acc[categoria]) {
        acc[categoria] = {
          categoria,
          total: 0,
        };
      }

      acc[categoria].total += mov.monto;

      return acc;
    }, {} as Record<string, CategoriaResumen>)
  ).sort((a, b) => b.total - a.total);

  const categoriaPrincipal =
    categorias[0] || null;

  const medios = gastosMov.reduce(
    (acc, mov) => {
      const medio =
        mov.medioPago || "Sin especificar";

      acc[medio] = (acc[medio] || 0) + 1;

      return acc;
    },
    {} as Record<string, number>
  );

  const medioPagoPrincipal =
    Object.entries(medios).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "Sin especificar";

  const consejos: string[] = [];

  if (movimientos.length === 0) {
    consejos.push(
      "Todavía no hay movimientos para analizar."
    );
  }

  if (gastos > ingresos && ingresos > 0) {
    consejos.push(
      "Tus gastos superan tus ingresos."
    );
  }

  if (categoriaPrincipal) {
    const porcentaje = Math.round(
      (categoriaPrincipal.total / gastos) * 100
    );

    consejos.push(
      `${categoriaPrincipal.categoria} representa el ${porcentaje}% de tus gastos.`
    );
  }

  if (
    medioPagoPrincipal !== "Sin especificar"
  ) {
    consejos.push(
      `El medio más utilizado fue ${medioPagoPrincipal}.`
    );
  }

  if (gastosMov.length > 0) {
    consejos.push(
      `Si seguís con este ritmo terminarías el mes con aproximadamente $${Math.round(
        proyeccionGastosMes
      ).toLocaleString("es-AR")}.`
    );
  }

  if (saldo > 0) {
    consejos.push(
      "Terminás el período con saldo positivo."
    );
  }

  if (saldo < 0) {
    consejos.push(
      "Terminás el período con saldo negativo."
    );
  }

  return {
    cantidadMovimientos: movimientos.length,
    ingresos,
    gastos,
    saldo,
    gastoPromedio,
    promedioDiario,
    mayorGasto,
    categorias,
    categoriaPrincipal,
    medioPagoPrincipal,
    proyeccionGastosMes,
    diasConGastos,
    consejos,
  };
}