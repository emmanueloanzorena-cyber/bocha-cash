type Periodo = "hoy" | "semana" | "mes" | "anio" | "todo";

type PeriodFilterProps = {
  periodo: Periodo;
  onChange: (periodo: Periodo) => void;
};

const opciones: { valor: Periodo; texto: string }[] = [
  { valor: "hoy", texto: "Hoy" },
  { valor: "semana", texto: "Semana" },
  { valor: "mes", texto: "Mes" },
  { valor: "anio", texto: "Año" },
  { valor: "todo", texto: "Todo" },
];

export function PeriodFilter({
  periodo,
  onChange,
}: PeriodFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          onClick={() => onChange(opcion.valor)}
          className={
            periodo === opcion.valor
              ? "rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950"
              : "rounded-xl bg-slate-800 px-4 py-2 font-semibold text-slate-300 hover:bg-slate-700"
          }
        >
          {opcion.texto}
        </button>
      ))}
    </div>
  );
}

export type { Periodo };