import StatCard from "@/components/ui/StatCard";

type Props = {
  saldo: string;
  ingresos: string;
  gastos: string;
};

export default function DashboardCards({
  saldo,
  ingresos,
  gastos,
}: Props) {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      <StatCard
        icon="💰"
        title="Saldo estimado"
        value={saldo}
        subtitle="Balance del período seleccionado"
      />

      <StatCard
        icon="📈"
        title="Ingresos"
        value={ingresos}
        subtitle="Total de ingresos registrados"
      />

      <StatCard
        icon="📉"
        title="Gastos"
        value={gastos}
        subtitle="Total de gastos registrados"
      />
    </section>
  );
}