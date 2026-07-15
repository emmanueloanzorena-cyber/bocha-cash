import FinancialInsight from "@/components/FinancialInsight";
import MovementInput from "@/components/MovementInput";
import type { CategoriaResumen } from "@/engine/financialEngine";

type Props = {
  texto: string;
  onTextoChange: (texto: string) => void;
  onEnviar: () => void;
  gastos: number;
  cantidadMovimientos: number;
  categorias: CategoriaResumen[];
  medioPagoPrincipal: string;
};

export default function Dashboard({
  texto,
  onTextoChange,
  onEnviar,
  gastos,
  cantidadMovimientos,
  categorias,
  medioPagoPrincipal,
}: Props) {
  return (
    <section className="mt-8 grid gap-5 md:grid-cols-2">
      <MovementInput
        texto={texto}
        onTextoChange={onTextoChange}
        onEnviar={onEnviar}
      />

      <FinancialInsight
        gastos={gastos}
        movimientos={cantidadMovimientos}
        categorias={categorias}
        medioPagoPrincipal={medioPagoPrincipal}
      />
    </section>
  );
}