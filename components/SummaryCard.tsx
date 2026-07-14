type SummaryCardProps = {
  titulo: string;
  valor: string;
  color?: string;
};

export function SummaryCard({
  titulo,
  valor,
  color = "text-white",
}: SummaryCardProps) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6">
      <p className="text-slate-400">{titulo}</p>
      <h2 className={`mt-3 text-3xl font-bold ${color}`}>{valor}</h2>
    </div>
  );
}