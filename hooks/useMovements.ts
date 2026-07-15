import { useEffect, useState } from "react";
import type { Movimiento } from "@/types/movement";
import { detectarDescripcion } from "@/utils/merchantDetector";
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

      const movimientosNormalizados: Movimiento[] = datos.map(
        (movimiento) => ({
          ...movimiento,
          categoria: movimiento.categoria || "Otros",
          medioPago:
            movimiento.medioPago || "No especificado",
          fecha:
            movimiento.fecha ||
            new Date(
              movimiento.id || Date.now()
            ).toISOString(),
        })
      );

      setMovimientos(movimientosNormalizados);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setMovimientos([]);
    } finally {
      setCargado(true);
    }
  }, []);

  useEffect(() => {
    if (!cargado) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(movimientos)
    );
  }, [movimientos, cargado]);

  function agregarMovimiento(texto: string) {
    const monto = detectarMonto(texto);

    if (monto === 0) {
      return false;
    }

    const nuevo: Movimiento = {
      id: Date.now(),
      descripcion: detectarDescripcion(texto),
      monto,
      tipo: detectarTipo(texto),
      categoria: detectarCategoria(texto),
      medioPago: detectarMedioPago(texto),
      fecha: new Date().toISOString(),
    };

    setMovimientos((anteriores) => [
      nuevo,
      ...anteriores,
    ]);

    return true;
  }

  function editarMovimiento(
    id: number,
    cambios: Partial<Omit<Movimiento, "id">>
  ) {
    setMovimientos((anteriores) =>
      anteriores.map((movimiento) =>
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
    setMovimientos((anteriores) =>
      anteriores.filter(
        (movimiento) => movimiento.id !== id
      )
    );
  }

  const ingresos = movimientos
    .filter((movimiento) => movimiento.tipo === "ingreso")
    .reduce(
      (acumulado, movimiento) =>
        acumulado + movimiento.monto,
      0
    );

  const gastos = movimientos
    .filter((movimiento) => movimiento.tipo === "gasto")
    .reduce(
      (acumulado, movimiento) =>
        acumulado + movimiento.monto,
      0
    );

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