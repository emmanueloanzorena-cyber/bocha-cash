import { formatoMoneda } from "@/utils/money";
import { GoalProgress } from "@/engine/goalEngine";

type Props = {
  goals: GoalProgress[];
};

export default function Goals({
  goals,
}: Props) {
  return (
    <section className="mt-8 rounded-3xl bg-slate-900 p-6">

      <h2 className="text-2xl font-bold">
        🎯 Objetivos
      </h2>

      <div className="mt-6 space-y-6">

        {goals.map((goal) => (
          <div key={goal.categoria}>

            <div className="flex justify-between">

              <span className="font-semibold">
                {goal.categoria}
              </span>

              <span className="text-slate-400">
                {Math.round(goal.porcentaje)}%
              </span>

            </div>

            <div className="mt-2 h-3 rounded-full bg-slate-800">

              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  goal.porcentaje >= 100
                    ? "bg-red-500"
                    : goal.porcentaje >= 80
                    ? "bg-yellow-500"
                    : "bg-emerald-500"
                }`}
                style={{
                  width: `${goal.porcentaje}%`,
                }}
              />

            </div>

            <div className="mt-2 flex justify-between text-sm text-slate-400">

              <span>
                {formatoMoneda(goal.gastado)}
              </span>

              <span>
                {formatoMoneda(goal.limite)}
              </span>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}