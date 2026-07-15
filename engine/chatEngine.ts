import type { FinancialAnalysis } from "@/engine/financialEngine";
import type { Movimiento } from "@/types/movement";
import { formatoMoneda } from "@/utils/money";

type ChatContext = {
  analisis: FinancialAnalysis;
  movimientos: Movimiento[];
};

export function responderPregunta(
  pregunta: string,
  contexto: ChatContext
): string {
  const { analisis, movimientos } = contexto;
  const texto = normalizarTexto(pregunta);

  if (texto.includes("saldo")) {
    return `Tu saldo actual es ${formatoMoneda(analisis.saldo)}.`;
  }

  if (texto.includes("ingreso")) {
    return `Tus ingresos suman ${formatoMoneda(analisis.ingresos)}.`;
  }

  if (texto.includes("cuantos movimientos")) {
    return `Tenés ${analisis.cantidadMovimientos} movimientos en el período seleccionado.`;
  }

  if (texto.includes("mayor") && texto.includes("gasto")) {
    if (!analisis.mayorGasto) {
      return "Todavía no hay gastos registrados.";
    }

    return `Tu mayor gasto fue “${analisis.mayorGasto.descripcion}” por ${formatoMoneda(
      analisis.mayorGasto.monto
    )}.`;
  }

  if (
    texto.includes("categoria") ||
    texto.includes("donde gasto mas") ||
    texto.includes("en que gasto mas")
  ) {
    if (!analisis.categoriaPrincipal) {
      return "Todavía no tengo suficiente información sobre categorías.";
    }

    return `La categoría donde más gastaste es ${
      analisis.categoriaPrincipal.categoria
    }, con ${formatoMoneda(analisis.categoriaPrincipal.total)}.`;
  }

  if (texto.includes("promedio")) {
    return `Tu promedio diario de gastos es ${formatoMoneda(
      analisis.promedioDiario
    )}.`;
  }

  if (
    texto.includes("proyeccion") ||
    texto.includes("fin de mes")
  ) {
    return `Si mantenés este ritmo, podrías cerrar el mes con gastos cercanos a ${formatoMoneda(
      analisis.proyeccionGastosMes
    )}.`;
  }

  const categoriaConsultada = detectarCategoriaConsultada(
    texto,
    analisis.categorias.map((categoria) => categoria.categoria)
  );

  if (categoriaConsultada) {
    const totalCategoria =
      analisis.categorias.find(
        (categoria) =>
          normalizarTexto(categoria.categoria) === categoriaConsultada
      )?.total ?? 0;

    return `Gastaste ${formatoMoneda(
      totalCategoria
    )} en ${capitalizar(categoriaConsultada)}.`;
  }

  const medioConsultado = detectarMedioPagoConsultado(
    texto,
    movimientos
  );

  if (medioConsultado) {
    const totalMedio = movimientos
      .filter(
        (movimiento) =>
          movimiento.tipo === "gasto" &&
          normalizarTexto(
            movimiento.medioPago || "Sin especificar"
          ) === medioConsultado
      )
      .reduce(
        (acumulado, movimiento) =>
          acumulado + movimiento.monto,
        0
      );

    return `Pagaste ${formatoMoneda(
      totalMedio
    )} usando ${capitalizar(medioConsultado)}.`;
  }

  if (
    texto.includes("medio mas usado") ||
    texto.includes("medio de pago")
  ) {
    return `El medio de pago más utilizado fue ${analisis.medioPagoPrincipal}.`;
  }

  if (
    texto.includes("ahorrar") ||
    texto.includes("mejorar") ||
    texto.includes("reducir gastos")
  ) {
    if (!analisis.categoriaPrincipal) {
      return "Necesito más movimientos para recomendarte dónde ahorrar.";
    }

    const porcentaje =
      analisis.gastos > 0
        ? Math.round(
            (analisis.categoriaPrincipal.total /
              analisis.gastos) *
              100
          )
        : 0;

    return `Empezaría revisando ${analisis.categoriaPrincipal.categoria}, porque concentra el ${porcentaje}% de tus gastos.`;
  }

  if (texto.includes("gasto")) {
    return `Tus gastos suman ${formatoMoneda(analisis.gastos)}.`;
  }

  return "Todavía no sé responder esa pregunta. Probá preguntarme por saldo, gastos, ingresos, categoría, medio de pago, mayor gasto, promedio o proyección.";
}

function detectarCategoriaConsultada(
  texto: string,
  categorias: string[]
): string | null {
  const categoria = categorias.find((nombre) =>
    texto.includes(normalizarTexto(nombre))
  );

  return categoria ? normalizarTexto(categoria) : null;
}

function detectarMedioPagoConsultado(
  texto: string,
  movimientos: Movimiento[]
): string | null {
  const medios = Array.from(
    new Set(
      movimientos.map((movimiento) =>
        normalizarTexto(
          movimiento.medioPago || "Sin especificar"
        )
      )
    )
  );

  return medios.find((medio) => texto.includes(medio)) || null;
}

function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function capitalizar(texto: string): string {
  return texto
    .split(" ")
    .map(
      (palabra) =>
        palabra.charAt(0).toUpperCase() + palabra.slice(1)
    )
    .join(" ");
}