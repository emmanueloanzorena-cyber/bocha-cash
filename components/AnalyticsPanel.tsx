import type { Analytics } from "@/engine/analyticsEngine";
import { formatoMoneda } from "@/utils/money";

type Props = {
  analytics: Analytics;
};

export default function AnalyticsPanel({
  analytics,
}: Props) {
  const tarjetas = [
    {
      titulo: "Ticket promedio",
      valor: formatoMoneda(analytics.ticketPromedio),
      detalle: "Promedio por gasto registrado",
    },
    {
      titulo: "Día de mayor gasto",
      valor: analytics.mayorDia
        ? formatoMoneda(analytics.mayorDia.total)
        : formatoMoneda(0),
      detalle: analytics.mayorDia?.fecha || "Sin datos",
    },
    {
      titulo: "Día de menor gasto",
      valor: analytics.menorDia
        ? formatoMoneda(analytics.menorDia.total)
        : formatoMoneda(0),
      detalle: analytics.menorDia?.fecha || "Sin datos",
    },
    {
      titulo: "Días con movimientos",
      valor: String(analytics.diasConMovimientos),
      detalle: "Días distintos con gastos",
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Analíticas del período
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Patrones detectados en tus movimientos filtrados.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {tarjetas.map((tarjeta) => (
          <div
            key={tarjeta.titulo}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">
              {tarjeta.titulo}
            </p>

            <p className="mt-3 break-words text-2xl font-bold text-white">
              {tarjeta.valor}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {tarjeta.detalle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}