"use client";

import AnalyticsPanel from "@/components/AnalyticsPanel";
import BochaChat from "@/components/BochaChat";
import BochaCopilot from "@/components/BochaCopilot";
import CategoryChart from "@/components/CategoryChart";
import Dashboard from "@/components/Dashboard";
import DashboardCards from "@/components/DashboardCards";
import EditMovementModal from "@/components/EditMovementModal";
import Goals from "@/components/Goals";
import GoalsManager from "@/components/GoalsManager";
import { Header } from "@/components/Header";
import MobileNavigation, {
  type Pestana,
} from "@/components/MobileNavigation";
import {
  PeriodFilter,
  type Periodo,
} from "@/components/PeriodFilter";
import { SearchBar } from "@/components/SearchBar";
import StatsPanel from "@/components/StatsPanel";
import TransactionList from "@/components/TransactionList";
import { analyticsEngine } from "@/engine/analyticsEngine";
import { financialEngine } from "@/engine/financialEngine";
import { calcularObjetivos } from "@/engine/goalEngine";
import { generarInsights } from "@/engine/insights";
import { useGoals } from "@/hooks/useGoals";
import { useMovements } from "@/hooks/useMovements";
import type { Movimiento } from "@/types/movement";
import { formatoMoneda } from "@/utils/money";
import { useState } from "react";

export default function Home() {
  const [texto, setTexto] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [periodo, setPeriodo] =
    useState<Periodo>("todo");

  const [pestanaActiva, setPestanaActiva] =
    useState<Pestana>("inicio");

  const [
    movimientoEnEdicion,
    setMovimientoEnEdicion,
  ] = useState<Movimiento | null>(null);

  const {
    movimientos,
    agregarMovimiento,
    editarMovimiento,
    eliminarMovimiento,
  } = useMovements();

  const {
    objetivos,
    agregarObjetivo,
    editarObjetivo,
    eliminarObjetivo,
  } = useGoals();

  const movimientosFiltrados = movimientos.filter(
    (movimiento) => {
      const textoBusqueda = busqueda
        .trim()
        .toLowerCase();

      const coincideBusqueda =
        !textoBusqueda ||
        movimiento.descripcion
          .toLowerCase()
          .includes(textoBusqueda) ||
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

      const fechaMovimiento = new Date(
        movimiento.fecha
      );

      const hoy = new Date();

      if (
        Number.isNaN(fechaMovimiento.getTime())
      ) {
        return false;
      }

      if (periodo === "hoy") {
        return (
          fechaMovimiento.toDateString() ===
          hoy.toDateString()
        );
      }

      if (periodo === "semana") {
        const haceSieteDias = new Date();

        haceSieteDias.setHours(0, 0, 0, 0);
        haceSieteDias.setDate(
          hoy.getDate() - 7
        );

        return (
          fechaMovimiento >= haceSieteDias &&
          fechaMovimiento <= hoy
        );
      }

      if (periodo === "mes") {
        return (
          fechaMovimiento.getMonth() ===
            hoy.getMonth() &&
          fechaMovimiento.getFullYear() ===
            hoy.getFullYear()
        );
      }

      if (periodo === "anio") {
        return (
          fechaMovimiento.getFullYear() ===
          hoy.getFullYear()
        );
      }

      return true;
    }
  );

  const analisis = financialEngine(
    movimientosFiltrados
  );

  const analytics = analyticsEngine(
    movimientosFiltrados
  );

  const insights = generarInsights(analisis);

  const progresoObjetivos =
    calcularObjetivos(
      movimientosFiltrados,
      objetivos
    );

  function enviarMovimiento() {
    if (!texto.trim()) {
      return;
    }

    const guardado =
      agregarMovimiento(texto);

    if (!guardado) {
      alert(
        "No pude detectar el monto. Probá: Gasté 5500 en carne"
      );

      return;
    }

    setTexto("");
  }

  function confirmarEliminacion(
    id: number
  ) {
    const confirmado = window.confirm(
      "¿Seguro que querés eliminar este movimiento?"
    );

    if (!confirmado) {
      return;
    }

    eliminarMovimiento(id);

    if (
      movimientoEnEdicion?.id === id
    ) {
      setMovimientoEnEdicion(null);
    }
  }

  function guardarEdicion(
    movimientoActualizado: Movimiento
  ) {
    const { id, ...cambios } =
      movimientoActualizado;

    editarMovimiento(id, cambios);
    setMovimientoEnEdicion(null);
  }

  function irAPestana(
    nuevaPestana: Pestana
  ) {
    setPestanaActiva(nuevaPestana);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function renderizarContenido() {
    if (pestanaActiva === "movimientos") {
      return (
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              Movimientos
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Buscá, filtrá, editá o eliminá tus registros.
            </p>
          </div>

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

          <TransactionList
            movimientos={
              movimientosFiltrados
            }
            onDelete={
              confirmarEliminacion
            }
            onEdit={
              setMovimientoEnEdicion
            }
          />
        </section>
      );
    }

    if (pestanaActiva === "objetivos") {
      return (
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              Objetivos
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Controlá tus límites mensuales por categoría.
            </p>
          </div>

          <Goals
            goals={progresoObjetivos}
          />

          <GoalsManager
            objetivos={objetivos}
            onAgregar={agregarObjetivo}
            onEditar={editarObjetivo}
            onEliminar={eliminarObjetivo}
          />
        </section>
      );
    }

    if (pestanaActiva === "bocha") {
      return (
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              Bocha
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Tu asistente financiero personal.
            </p>
          </div>

          <BochaCopilot
            insights={insights}
          />

          <BochaChat
            analisis={analisis}
            movimientos={
              movimientosFiltrados
            }
          />

          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-2xl font-bold">
              Consejos de Bocha
            </h3>

            {analisis.consejos.length ===
            0 ? (
              <p className="mt-4 text-slate-400">
                Todavía no hay consejos disponibles.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {analisis.consejos.map(
                  (consejo) => (
                    <div
                      key={consejo}
                      className="rounded-2xl bg-slate-800 p-4 text-slate-300"
                    >
                      {consejo}
                    </div>
                  )
                )}
              </div>
            )}
          </section>
        </section>
      );
    }

    return (
      <section>
        <DashboardCards
          saldo={formatoMoneda(
            analisis.saldo
          )}
          ingresos={formatoMoneda(
            analisis.ingresos
          )}
          gastos={formatoMoneda(
            analisis.gastos
          )}
        />

        <Dashboard
          texto={texto}
          onTextoChange={setTexto}
          onEnviar={enviarMovimiento}
          gastos={analisis.gastos}
          cantidadMovimientos={
            analisis.cantidadMovimientos
          }
          categorias={
            analisis.categorias
          }
          medioPagoPrincipal={
            analisis.medioPagoPrincipal
          }
        />

        <StatsPanel
          movimientos={
            movimientosFiltrados
          }
          gastos={analisis.gastos}
          categorias={
            analisis.categorias
          }
          medioPagoPrincipal={
            analisis.medioPagoPrincipal
          }
        />

        <AnalyticsPanel
          analytics={analytics}
        />

        <section className="mt-8">
          <CategoryChart
            data={analisis.categorias}
          />
        </section>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 pb-28 text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <Header />

        <div className="mt-8">
          {renderizarContenido()}
        </div>
      </div>

      <MobileNavigation
        activa={pestanaActiva}
        onChange={irAPestana}
      />

      <EditMovementModal
        abierto={
          movimientoEnEdicion !== null
        }
        movimiento={
          movimientoEnEdicion
        }
        onClose={() =>
          setMovimientoEnEdicion(null)
        }
        onSave={guardarEdicion}
      />
    </main>
  );
}