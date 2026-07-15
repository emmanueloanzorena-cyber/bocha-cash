import { CopilotInsight } from "@/engine/insights";

type Props = {
  insights: CopilotInsight[];
};

export default function BochaCopilot({
  insights,
}: Props) {
  return (
    <section className="mt-8 rounded-3xl bg-slate-900 p-6">

      <h2 className="text-2xl font-bold">
        🤖 Bocha Copilot
      </h2>

      <p className="mt-2 text-slate-400">
        Análisis automático de tus movimientos.
      </p>

      <div className="mt-6 space-y-4">

        {insights.map((insight, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 border ${
              insight.tipo === "positivo"
                ? "border-emerald-500/30 bg-emerald-500/10"
                : insight.tipo === "alerta"
                ? "border-red-500/30 bg-red-500/10"
                : "border-slate-700 bg-slate-800"
            }`}
          >
            <h4 className="font-bold">
              {insight.titulo}
            </h4>

            <p className="mt-2 text-slate-300">
              {insight.mensaje}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}