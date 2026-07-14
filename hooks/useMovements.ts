import { useEffect, useState } from "react";
import { Movimiento } from "@/types/movement";
import {
  detectarMonto,
  detectarTipo,
  detectarCategoria,
  detectarMedioPago,
} from "@/utils/parser";

const STORAGE_KEY = "bocha-cash-movimientos";

export function useMovements() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const guardados = localStorage.getItem(STORAGE_KEY);

    if (!guardados) {
      setMovimientos([]);
      setCargado(true);
      return;
    }

    try {
      const datos = JSON.parse(guardados);

      if (!Array.isArray(datos)) {
        throw new Error("Formato inválido");
      }

      const movimientosNormalizados: Movimiento[] = datos.map((m) => ({
        ...m,
        categoria: m.categoria || "Otros",
        medioPago: m.medioPago || "Sin especificar",
        fecha: m.fecha || new Date(m.id || Date.now()).toISOString(),
      }));

      setMovimientos(movimientosNormalizados);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setMovimientos([]);
    } finally {
      setCargado(true);
    }
  }, []);

  useEffect(() => {
    if (!cargado) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(movimientos));
  }, [movimientos, cargado]);

  function agregarMovimiento(texto: string) {
    const monto = detectarMonto(texto);

    if (monto === 0) return false;

    const nuevo: Movimiento = {
      id: Date.now(),
      descripcion: texto,
      monto,
      tipo: detectarTipo(texto),
      categoria: detectarCategoria(texto),
      medioPago: detectarMedioPago(texto),
      fecha: new Date().toISOString(),
    };

    setMovimientos((prev) => [nuevo, ...prev]);

    return true;
  }

  function editarMovimiento(
    id: number,
    cambios: Partial<Omit<Movimiento, "id">>
  ) {
    setMovimientos((prev) =>
      prev.map((movimiento) =>
        movimiento.id === id
          ? {
              ...movimiento,
              ...cambios,
            }
          : movimiento
      )
    );
  }

  function eliminarMovimiento(id: number) {
    setMovimientos((prev) =>
      prev.filter((movimiento) => movimiento.id !== id)
    );
  }

  const ingresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, m) => acc + m.monto, 0);

  const gastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, m) => acc + m.monto, 0);

  const saldo = ingresos - gastos;

  return {
    movimientos,
    agregarMovimiento,
    editarMovimiento,
    eliminarMovimiento,
    ingresos,
    gastos,
    saldo,
  };
}