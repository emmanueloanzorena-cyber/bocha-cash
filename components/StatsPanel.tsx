import type { Movimiento } from "@/types/movement";
import { formatoMoneda } from "@/utils/money";

type CategoriaResumen = {
  categoria: string;
  total: number;
};

type Props = {
  movimientos: Movimiento[];
  gastos: number;
  categorias: CategoriaResumen[];
  medioPagoPrincipal: string;
};

export default function StatsPanel({
  movimientos,
  gastos,
  categorias,
  medioPagoPrincipal,
}: Props) {
  const gastosDelPeriodo = movimientos.filter(
    (movimiento) => movimiento.tipo === "gasto"
  );

  const mayorGasto = [...gastosDelPeriodo].sort(
    (a, b) => b.monto - a.monto
  )[0];

  const fechasUnicas = new Set(
    gastosDelPeriodo
      .filter((movimiento) => movimiento.fecha)
      .map((movimiento) =>
        new Date(movimiento.fecha).toLocaleDateString("es-AR")
      )
  );

  const cantidadDias = Math.max(fechasUnicas.size, 1);
  const promedioDiario = gastos / cantidadDias;
  const categoriaPrincipal = categorias[0];

  const estadisticas = [
    {
      titulo: "Mayor gasto",
      valor: mayorGasto
        ? formatoMoneda(mayorGasto.monto)
        : formatoMoneda(0),
      detalle: mayorGasto?.descripcion || "Sin movimientos",
    },
    {
      titulo: "Promedio diario",
      valor: formatoMoneda(promedioDiario),
      detalle: `${cantidadDias} día${cantidadDias === 1 ? "" : "s"} con gastos`,
    },
    {
      titulo: "Categoría principal",
      valor: categoriaPrincipal?.categoria || "Sin datos",
      detalle: categoriaPrincipal
        ? formatoMoneda(categoriaPrincipal.total)
        : "Todavía sin gastos",
    },
    {
      titulo: "Medio más usado",
      valor: medioPagoPrincipal,
      detalle: "Según los movimientos filtrados",
    },
  ];

  return (
    <section className="mt-8">
      <h3 className="mb-5 text-2xl font-bold">
        Estadísticas rápidas
      </h3>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {estadisticas.map((estadistica) => (
          <div
            key={estadistica.titulo}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">
              {estadistica.titulo}
            </p>

            <p className="mt-3 break-words text-2xl font-bold text-white">
              {estadistica.valor}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {estadistica.detalle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}