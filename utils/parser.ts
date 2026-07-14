export function detectarMonto(texto: string) {
  const numero = texto.replace(/\./g, "").match(/\d+/);

  return numero ? Number(numero[0]) : 0;
}

export function detectarTipo(texto: string): "gasto" | "ingreso" {
  const t = texto.toLowerCase();

  if (
    t.includes("cobre") ||
    t.includes("cobré") ||
    t.includes("sueldo") ||
    t.includes("ingreso")
  ) {
    return "ingreso";
  }

  return "gasto";
}

export function detectarCategoria(texto: string) {
  const t = texto.toLowerCase();

  if (t.includes("ypf") || t.includes("nafta") || t.includes("combustible"))
    return "Combustible";

  if (t.includes("carne") || t.includes("super") || t.includes("jumbo") || t.includes("coto"))
    return "Supermercado";
if (
  t.includes("coca") ||
  t.includes("pepsi") ||
  t.includes("pizza") ||
  t.includes("empanada") ||
  t.includes("hamburguesa") ||
  t.includes("delivery") ||
  t.includes("restaurante")
) {
  return "Comida";
}
  if (t.includes("luz") || t.includes("gas") || t.includes("agua"))
    return "Servicios";

  if (t.includes("farmacia"))
    return "Salud";

  return "Otros";
}

export function detectarMedioPago(texto: string) {
  const t = texto.toLowerCase();

  if (t.includes("mercado pago"))
    return "Mercado Pago";

  if (t.includes("visa"))
    return "Visa";

  if (t.includes("master"))
    return "Mastercard";

  if (t.includes("efectivo"))
    return "Efectivo";

  return "Sin especificar";
}