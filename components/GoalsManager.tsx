"use client";

import type { Goal } from "@/engine/goalEngine";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  objetivos: Goal[];
  onAgregar: (categoria: string, limite: number) => boolean;
  onEditar: (
    categoriaOriginal: string,
    categoriaNueva: string,
    limiteNuevo: number
  ) => boolean;
  onEliminar: (categoria: string) => void;
};

export default function GoalsManager({
  objetivos,
  onAgregar,
  onEditar,
  onEliminar,
}: Props) {
  const [categoria, setCategoria] = useState("");
  const [limite, setLimite] = useState("");
  const [categoriaEnEdicion, setCategoriaEnEdicion] =
    useState<string | null>(null);
  const [error, setError] = useState("");

  function limpiarFormulario() {
    setCategoria("");
    setLimite("");
    setCategoriaEnEdicion(null);
    setError("");
  }

  function guardarObjetivo() {
    const limiteNumerico = Number(limite);

    if (!categoria.trim() || limiteNumerico <= 0) {
      setError("Ingresá una categoría y un monto válido.");
      return;
    }

    const guardado = categoriaEnEdicion
      ? onEditar(
          categoriaEnEdicion,
          categoria.trim(),
          limiteNumerico
        )
      : onAgregar(categoria.trim(), limiteNumerico);

    if (!guardado) {
      setError(
        "No se pudo guardar. Revisá que la categoría no esté repetida."
      );
      return;
    }

    limpiarFormulario();
  }

  function comenzarEdicion(objetivo: Goal) {
    setCategoriaEnEdicion(objetivo.categoria);
    setCategoria(objetivo.categoria);
    setLimite(String(objetivo.limite));
    setError("");
  }

  return (
    <Card className="mt-8">
      <SectionHeader
        titulo="Administrar objetivos"
        descripcion="Definí límites mensuales por categoría."
        accion={
          categoriaEnEdicion ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={limpiarFormulario}
            >
              <X size={16} />
              Cancelar edición
            </Button>
          ) : null
        }
      />

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
        <Input
          value={categoria}
          onChange={(evento) =>
            setCategoria(evento.target.value)
          }
          placeholder="Categoría, por ejemplo Ocio"
        />

        <Input
          type="number"
          min="1"
          value={limite}
          onChange={(evento) =>
            setLimite(evento.target.value)
          }
          placeholder="Límite mensual"
        />

        <Button onClick={guardarObjetivo}>
          {categoriaEnEdicion ? (
            <>
              <Pencil size={18} />
              Guardar
            </>
          ) : (
            <>
              <Plus size={18} />
              Agregar
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {objetivos.length === 0 ? (
          <p className="text-slate-400">
            Todavía no hay objetivos configurados.
          </p>
        ) : (
          objetivos.map((objetivo) => (
            <div
              key={objetivo.categoria}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-4"
            >
              <div>
                <p className="font-semibold text-white">
                  {objetivo.categoria}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Límite: $
                  {objetivo.limite.toLocaleString("es-AR")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    comenzarEdicion(objetivo)
                  }
                  aria-label={`Editar objetivo ${objetivo.categoria}`}
                >
                  <Pencil size={18} />
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    const confirmado = window.confirm(
                      `¿Eliminar el objetivo ${objetivo.categoria}?`
                    );

                    if (!confirmado) {
                      return;
                    }

                    onEliminar(objetivo.categoria);

                    if (
                      categoriaEnEdicion ===
                      objetivo.categoria
                    ) {
                      limpiarFormulario();
                    }
                  }}
                  aria-label={`Eliminar objetivo ${objetivo.categoria}`}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}