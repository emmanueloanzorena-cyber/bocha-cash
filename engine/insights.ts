import type { FinancialAnalysis } from "@/engine/financialEngine";
import { formatoMoneda } from "@/utils/money";

export type CopilotInsight = {
  titulo: string;
  mensaje: string;
  tipo: "positivo" | "alerta" | "info";
};

export function generarInsights(
  analisis: FinancialAnalysis
): CopilotInsight[] {
  const insights: CopilotInsight[] = [];

  if (analisis.cantidadMovimientos === 0) {
    return [
      {
        titulo: "Empecemos",
        mensaje:
          "Todavía no hay movimientos para analizar. Cargá un gasto o ingreso y Bocha empieza a trabajar.",
        tipo: "info",
      },
    ];
  }

  if (analisis.saldo > 0) {
    insights.push({
      titulo: "Saldo positivo",
      mensaje: `Venís con un saldo favorable de ${formatoMoneda(
        analisis.saldo
      )}.`,
      tipo: "positivo",
    });
  }

  if (analisis.saldo < 0) {
    insights.push({
      titulo: "Atención con el saldo",
      mensaje: `Tus gastos superan tus ingresos por ${formatoMoneda(
        Math.abs(analisis.saldo)
      )}.`,
      tipo: "alerta",
    });
  }

  if (analisis.categoriaPrincipal && analisis.gastos > 0) {
    const porcentaje = Math.round(
      (analisis.categoriaPrincipal.total / analisis.gastos) * 100
    );

    insights.push({
      titulo: "Categoría principal",
      mensaje: `${analisis.categoriaPrincipal.categoria} concentra el ${porcentaje}% de tus gastos.`,
      tipo: porcentaje >= 50 ? "alerta" : "info",
    });
  }

  if (analisis.medioPagoPrincipal !== "Sin especificar") {
    insights.push({
      titulo: "Medio más usado",
      mensaje: `El medio de pago que más utilizaste fue ${analisis.medioPagoPrincipal}.`,
      tipo: "info",
    });
  }

  if (analisis.mayorGasto) {
    insights.push({
      titulo: "Mayor gasto",
      mensaje: `Tu movimiento más alto fue “${
        analisis.mayorGasto.descripcion
      }” por ${formatoMoneda(analisis.mayorGasto.monto)}.`,
      tipo: "info",
    });
  }

  if (analisis.proyeccionGastosMes > 0) {
    insights.push({
      titulo: "Proyección mensual",
      mensaje: `Si mantenés este ritmo, podrías cerrar el mes con gastos cercanos a ${formatoMoneda(
        analisis.proyeccionGastosMes
      )}.`,
      tipo:
        analisis.ingresos > 0 &&
        analisis.proyeccionGastosMes > analisis.ingresos
          ? "alerta"
          : "info",
    });
  }

  return insights.slice(0, 4);
}