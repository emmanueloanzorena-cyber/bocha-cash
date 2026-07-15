import type { FinancialAnalysis } from "@/engine/financialEngine";
import { formatoMoneda } from "@/utils/money";

export function responderPregunta(
  pregunta: string,
  analisis: FinancialAnalysis
): string {
  const texto = pregunta.toLowerCase();

  if (
    texto.includes("saldo")
  ) {
    return `Tu saldo actual es ${formatoMoneda(
      analisis.saldo
    )}.`;
  }

  if (
    texto.includes("ingreso")
  ) {
    return `Tus ingresos suman ${formatoMoneda(
      analisis.ingresos
    )}.`;
  }

  if (
    texto.includes("gasto")
  ) {
    return `Tus gastos son ${formatoMoneda(
      analisis.gastos
    )}.`;
  }

  if (
    texto.includes("categoria")
  ) {
    if (!analisis.categoriaPrincipal)
      return "Todavía no tengo suficiente información.";

    return `La categoría donde más gastaste es ${analisis.categoriaPrincipal.categoria} con ${formatoMoneda(
      analisis.categoriaPrincipal.total
    )}.`;
  }

  if (
    texto.includes("medio")
  ) {
    return `El medio de pago más utilizado fue ${analisis.medioPagoPrincipal}.`;
  }

  if (
    texto.includes("mayor")
  ) {
    if (!analisis.mayorGasto)
      return "Todavía no hay gastos registrados.";

    return `El mayor gasto fue "${analisis.mayorGasto.descripcion}" por ${formatoMoneda(
      analisis.mayorGasto.monto
    )}.`;
  }

  if (
    texto.includes("promedio")
  ) {
    return `El promedio diario es ${formatoMoneda(
      analisis.promedioDiario
    )}.`;
  }

  return "Todavía no sé responder esa pregunta, pero estoy aprendiendo 😎";
}