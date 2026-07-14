"use client";

import type { Movimiento } from "@/types/movement";
import { useEffect, useState } from "react";

type Props = {
  abierto: boolean;
  movimiento: Movimiento | null;
  onClose: () => void;
  onSave: (movimiento: Movimiento) => void;
};

export default function EditMovementModal({
  abierto,
  movimiento,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<Movimiento | null>(movimiento);

  useEffect(() => {
    setForm(movimiento);
  }, [movimiento]);

  if (!abierto || !form) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 p-6 text-white shadow-2xl">
        <h2 className="text-2xl font-bold">Editar movimiento</h2>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">
              Descripción
            </span>

            <input
              value={form.descripcion}
              onChange={(evento) =>
                setForm({
                  ...form,
                  descripcion: evento.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">
              Monto
            </span>

            <input
              type="number"
              min="0"
              value={form.monto}
              onChange={(evento) =>
                setForm({
                  ...form,
                  monto: Number(evento.target.value),
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">
              Tipo
            </span>

            <select
              value={form.tipo}
              onChange={(evento) =>
                setForm({
                  ...form,
                  tipo: evento.target.value as "gasto" | "ingreso",
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">
              Categoría
            </span>

            <input
              value={form.categoria}
              onChange={(evento) =>
                setForm({
                  ...form,
                  categoria: evento.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">
              Medio de pago
            </span>

            <input
              value={form.medioPago}
              onChange={(evento) =>
                setForm({
                  ...form,
                  medioPago: evento.target.value,
                })
              }
              className="w-full rounded-xl bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-5 py-3 font-semibold transition hover:bg-slate-600"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => {
              if (!form.descripcion.trim() || form.monto <= 0) {
                alert("Completá una descripción y un monto válido.");
                return;
              }

              onSave(form);
            }}
            className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}