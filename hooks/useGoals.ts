"use client";

import type { Goal } from "@/engine/goalEngine";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bocha-cash-objetivos";

const OBJETIVOS_INICIALES: Goal[] = [
  {
    categoria: "Comida",
    limite: 250000,
  },
  {
    categoria: "Combustible",
    limite: 150000,
  },
  {
    categoria: "Servicios",
    limite: 200000,
  },
];

export function useGoals() {
  const [objetivos, setObjetivos] =
    useState<Goal[]>(OBJETIVOS_INICIALES);

  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const guardados = localStorage.getItem(STORAGE_KEY);

    if (!guardados) {
      setObjetivos(OBJETIVOS_INICIALES);
      setCargado(true);
      return;
    }

    try {
      const datos = JSON.parse(guardados);

      if (!Array.isArray(datos)) {
        throw new Error("Formato inválido");
      }

      const objetivosValidos: Goal[] = datos
        .filter(
          (objetivo) =>
            typeof objetivo?.categoria === "string" &&
            typeof objetivo?.limite === "number"
        )
        .map((objetivo) => ({
          categoria: objetivo.categoria.trim(),
          limite: objetivo.limite,
        }))
        .filter(
          (objetivo) =>
            objetivo.categoria.length > 0 &&
            objetivo.limite > 0
        );

      setObjetivos(
        objetivosValidos.length > 0
          ? objetivosValidos
          : OBJETIVOS_INICIALES
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setObjetivos(OBJETIVOS_INICIALES);
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
      JSON.stringify(objetivos)
    );
  }, [objetivos, cargado]);

  function agregarObjetivo(
    categoria: string,
    limite: number
  ): boolean {
    const categoriaLimpia = categoria.trim();

    if (!categoriaLimpia || limite <= 0) {
      return false;
    }

    const yaExiste = objetivos.some(
      (objetivo) =>
        objetivo.categoria.toLowerCase() ===
        categoriaLimpia.toLowerCase()
    );

    if (yaExiste) {
      return false;
    }

    setObjetivos((anteriores) => [
      ...anteriores,
      {
        categoria: categoriaLimpia,
        limite,
      },
    ]);

    return true;
  }

  function editarObjetivo(
    categoriaOriginal: string,
    categoriaNueva: string,
    limiteNuevo: number
  ): boolean {
    const categoriaLimpia = categoriaNueva.trim();

    if (!categoriaLimpia || limiteNuevo <= 0) {
      return false;
    }

    const categoriaDuplicada = objetivos.some(
      (objetivo) =>
        objetivo.categoria.toLowerCase() ===
          categoriaLimpia.toLowerCase() &&
        objetivo.categoria !== categoriaOriginal
    );

    if (categoriaDuplicada) {
      return false;
    }

    setObjetivos((anteriores) =>
      anteriores.map((objetivo) =>
        objetivo.categoria === categoriaOriginal
          ? {
              categoria: categoriaLimpia,
              limite: limiteNuevo,
            }
          : objetivo
      )
    );

    return true;
  }

  function eliminarObjetivo(categoria: string) {
    setObjetivos((anteriores) =>
      anteriores.filter(
        (objetivo) => objetivo.categoria !== categoria
      )
    );
  }

  return {
    objetivos,
    agregarObjetivo,
    editarObjetivo,
    eliminarObjetivo,
  };
}