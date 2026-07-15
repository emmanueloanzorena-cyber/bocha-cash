"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Movimiento } from "@/types/movement";
import { getCategoryIcon } from "@/utils/categoryIcons";
import { formatoMoneda } from "@/utils/money";

type Props = {
  movimiento: Movimiento;
  onDelete: (id: number) => void;
  onEdit: (movimiento: Movimiento) => void;
};

export default function TransactionCard({
  movimiento,
  onDelete,
  onEdit,
}: Props) {
  const categoria = movimiento.categoria || "Otros";
  const iconoCategoria = getCategoryIcon(categoria);

  const fechaValida =
    movimiento.fecha &&
    !Number.isNaN(new Date(movimiento.fecha).getTime());

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-800 p-4 transition hover:bg-slate-700">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-700 text-2xl">
          {iconoCategoria}
        </div>

        <div className="min-w-0">
          <p className="break-words font-bold">
            {movimiento.descripcion}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {categoria} • 💳{" "}
            {movimiento.medioPago || "Sin especificar"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {fechaValida
              ? `${new Date(
                  movimiento.fecha
                ).toLocaleDateString("es-AR")} • ${new Date(
                  movimiento.fecha
                ).toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "Sin fecha"}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <p
          className={
            movimiento.tipo === "ingreso"
              ? "font-bold text-emerald-400"
              : "font-bold text-red-400"
          }
        >
          {formatoMoneda(movimiento.monto)}
        </p>

        <button
          type="button"
          onClick={() => onEdit(movimiento)}
          aria-label="Editar movimiento"
          title="Editar"
          className="rounded-xl p-2 text-sky-400 transition hover:bg-sky-500/10"
        >
          <Pencil size={18} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(movimiento.id)}
          aria-label="Eliminar movimiento"
          title="Eliminar"
          className="rounded-xl p-2 text-red-400 transition hover:bg-red-500/10"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}