"use client";

import BochaChat from "@/components/BochaChat";
import BochaCopilot from "@/components/BochaCopilot";
import CategoryChart from "@/components/CategoryChart";
import EditMovementModal from "@/components/EditMovementModal";
import FinancialInsight from "@/components/FinancialInsight";
import { Header } from "@/components/Header";
import {
  PeriodFilter,
  type Periodo,
} from "@/components/PeriodFilter";
import { SearchBar } from "@/components/SearchBar";
import StatsPanel from "@/components/StatsPanel";
import { SummaryCard } from "@/components/SummaryCard";
import TransactionList from "@/components/TransactionList";
import { financialEngine } from "@/engine/financialEngine";
import { generarInsights } from "@/engine/insights";
import { useMovements } from "@/hooks/useMovements";
import type { Movimiento } from "@/types/movement";
import { formatoMoneda } from "@/utils/money";
import { useState } from "react";

export default function Home() {
  const [texto, setTexto] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [periodo, setPeriodo] = useState<Periodo>("todo");
  const [movimientoEnEdicion, setMovimientoEnEdicion] =
    useState<Movimiento | null>(null);

  const {
    movimientos,
    agregarMovimiento,
    editarMovimiento,
    eliminarMovimiento,
  } = useMovements();

  const movimientosFiltrados = movimientos.filter((movimiento) => {
    const textoBusqueda = busqueda.trim().toLowerCase();

    const coincideBusqueda =
      !textoBusqueda ||
      movimiento.descripcion.toLowerCase().includes(textoBusqueda) ||
      (movimiento.categoria || "")
        .toLowerCase()
        .includes(textoBusqueda) ||
      (movimiento.medioPago || "")
        .toLowerCase()
        .includes(textoBusqueda);

    if (!coincideBusqueda) {
      return false;
    }

    if (periodo === "todo") {
      return true;
    }

    if (!movimiento.fecha) {
      return false;
    }

    const fechaMovimiento = new Date(movimiento.fecha);
    const hoy = new Date();

    if (Number.isNaN(fechaMovimiento.getTime())) {
      return false;
    }

    if (periodo === "hoy") {
      return fechaMovimiento.toDateString() === hoy.toDateString();
    }

    if (periodo === "semana") {
      const haceSieteDias = new Date();

      haceSieteDias.setHours(0, 0, 0, 0);
      haceSieteDias.setDate(hoy.getDate() - 7);

      return (
        fechaMovimiento >= haceSieteDias &&
        fechaMovimiento <= hoy
      );
    }

    if (periodo === "mes") {
      return (
        fechaMovimiento.getMonth() === hoy.getMonth() &&
        fechaMovimiento.getFullYear() === hoy.getFullYear()
      );
    }

    if (periodo === "anio") {
      return fechaMovimiento.getFullYear() === hoy.getFullYear();
    }

    return true;
  });

  const analisis = financialEngine(movimientosFiltrados);
  const insights = generarInsights(analisis);

  function enviarMovimiento() {
    if (!texto.trim()) {
      return;
    }

    const guardado = agregarMovimiento(texto);

    if (!guardado) {
      alert(
        "No pude detectar el monto. Probá: Gasté 5500 en carne"
      );
      return;
    }

    setTexto("");
  }

  function confirmarEliminacion(id: number) {
    const confirmado = window.confirm(
      "¿Seguro que querés eliminar este movimiento?"
    );

    if (!confirmado) {
      return;
    }

    eliminarMovimiento(id);

    if (movimientoEnEdicion?.id === id) {
      setMovimientoEnEdicion(null);
    }
  }

  function guardarEdicion(
    movimientoActualizado: Movimiento
  ) {
    const { id, ...cambios } = movimientoActualizado;

    editarMovimiento(id, cambios);
    setMovimientoEnEdicion(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <Header />

        <PeriodFilter
          periodo={periodo}
          onChange={setPeriodo}
        />

        <div className="mb-6">
          <SearchBar
            valor={busqueda}
            onChange={setBusqueda}
          />
        </div>

        <section className="grid gap-5 md:grid-cols-3">
          <SummaryCard
            titulo="Saldo estimado"
            valor={formatoMoneda(analisis.saldo)}
          />

          <SummaryCard
            titulo="Ingresos"
            valor={formatoMoneda(analisis.ingresos)}
            color="text-emerald-400"
          />

          <SummaryCard
            titulo="Gastos"
            valor={formatoMoneda(analisis.gastos)}
            color="text-red-400"
          />
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-900 p-6">
            <h3 className="text-2xl font-bold">
              Cargar como WhatsApp
            </h3>

            <p className="mt-2 text-slate-400">
              Ejemplo: “Gasté 5500 en carne”
            </p>

            <div className="mt-6 flex gap-3">
              <input
                value={texto}
                onChange={(evento) =>
                  setTexto(evento.target.value)
                }
                onKeyDown={(evento) => {
                  if (evento.key === "Enter") {
                    enviarMovimiento();
                  }
                }}
                className="w-full rounded-2xl bg-slate-800 px-4 py-3 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500"
                placeholder="Escribí un gasto..."
              />

              <button
                type="button"
                onClick={enviarMovimiento}
                className="rounded-2xl bg-emerald-500 px-5 font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                Enviar
              </button>
            </div>
          </div>

          <FinancialInsight
            gastos={analisis.gastos}
            movimientos={analisis.cantidadMovimientos}
            categorias={analisis.categorias}
            medioPagoPrincipal={analisis.medioPagoPrincipal}
          />
        </section>

        <StatsPanel
          movimientos={movimientosFiltrados}
          gastos={analisis.gastos}
          categorias={analisis.categorias}
          medioPagoPrincipal={analisis.medioPagoPrincipal}
        />

        <section className="mt-8">
          <CategoryChart data={analisis.categorias} />
        </section>

        <BochaCopilot insights={insights} />

        <BochaChat analisis={analisis} />

        <section className="mt-8 rounded-3xl bg-slate-900 p-6">
          <h3 className="text-2xl font-bold">
            Consejos de Bocha
          </h3>

          {analisis.consejos.length === 0 ? (
            <p className="mt-4 text-slate-400">
              Todavía no hay consejos disponibles.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {analisis.consejos.map((consejo) => (
                <div
                  key={consejo}
                  className="rounded-2xl bg-slate-800 p-4 text-slate-300"
                >
                  {consejo}
                </div>
              ))}
            </div>
          )}
        </section>

        <TransactionList
          movimientos={movimientosFiltrados}
          onDelete={confirmarEliminacion}
          onEdit={setMovimientoEnEdicion}
        />
      </div>

      <EditMovementModal
        abierto={movimientoEnEdicion !== null}
        movimiento={movimientoEnEdicion}
        onClose={() => setMovimientoEnEdicion(null)}
        onSave={guardarEdicion}
      />
    </main>
  );
}