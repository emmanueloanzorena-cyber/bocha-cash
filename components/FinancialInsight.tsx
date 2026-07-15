import { formatoMoneda } from "@/utils/money";

type CategoriaResumen = {
  categoria: string;
  total: number;
};

type Props = {
  gastos: number;
  movimientos: number;
  categorias: CategoriaResumen[];
  medioPagoPrincipal: string;
};

export default function FinancialInsight({
  gastos,
  movimientos,
  categorias,
  medioPagoPrincipal,
}: Props) {
  const categoriaPrincipal = categorias[0];

  if (movimientos === 0) {
    return (
      <div className="rounded-3xl bg-slate-900 p-6">
        <h3 className="text-2xl font-bold">Bocha dice</h3>

        <p className="mt-4 text-slate-400">
          Todavía no hay movimientos para analizar en este período.
        </p>
      </div>
    );
  }

  const porcentajePrincipal =
    categoriaPrincipal && gastos > 0
      ? Math.round((categoriaPrincipal.total / gastos) * 100)
      : 0;

  return (
    <div className="rounded-3xl bg-slate-900 p-6">
      <h3 className="text-2xl font-bold">Bocha dice</h3>

      <div className="mt-4 space-y-3 text-slate-300">
        <p>
          Analicé <strong>{movimientos}</strong> movimientos y detecté gastos
          por <strong>{formatoMoneda(gastos)}</strong>.
        </p>

        {categoriaPrincipal && (
          <p>
            Tu categoría principal es{" "}
            <strong className="text-emerald-400">
              {categoriaPrincipal.categoria}
            </strong>
            , con {formatoMoneda(categoriaPrincipal.total)}, que representa el{" "}
            {porcentajePrincipal}% de tus gastos.
          </p>
        )}

        <p>
          El medio de pago más usado fue{" "}
          <strong className="text-sky-400">{medioPagoPrincipal}</strong>.
        </p>
      </div>
    </div>
  );
}