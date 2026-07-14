"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Movimiento } from "@/types/movement";
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
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-800 p-4 hover:bg-slate-700 transition">

      <div className="flex-1 min-w-0">
        <p className="font-bold break-words">
          {movimiento.descripcion}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          🏷️ {movimiento.categoria || "Otros"} • 💳{" "}
          {movimiento.medioPago || "Sin especificar"}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {movimiento.fecha
            ? `${new Date(movimiento.fecha).toLocaleDateString("es-AR")} • ${new Date(
                movimiento.fecha
              ).toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "Sin fecha"}
        </p>
      </div>

      <div className="flex items-center gap-3">

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
          onClick={() => onEdit(movimiento)}
          className="rounded-lg p-2 text-sky-400 hover:bg-sky-500/10 transition"
          title="Editar"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(movimiento.id)}
          className="rounded-lg p-2 text-red-400 hover:bg-red-500/10 transition"
          title="Eliminar"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div>
  );
}