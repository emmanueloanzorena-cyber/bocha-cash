"use client";

import { Movimiento } from "@/types/movement";
import TransactionCard from "@/components/TransactionCard";

type Props = {
  movimientos: Movimiento[];
  onDelete: (id: number) => void;
  onEdit: (movimiento: Movimiento) => void;
};

export default function TransactionList({
  movimientos,
  onDelete,
  onEdit,
}: Props) {
  return (
    <section className="mt-8 rounded-3xl bg-slate-900 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-bold">Últimos movimientos</h3>

        <p className="text-sm text-slate-400">
          {movimientos.length} resultados
        </p>
      </div>

      {movimientos.length === 0 ? (
        <p className="mt-4 text-slate-400">
          No hay movimientos para mostrar.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          {movimientos.map((movimiento) => (
            <TransactionCard
              key={movimiento.id}
              movimiento={movimiento}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
}