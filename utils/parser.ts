import { detectarComercio } from "@/utils/merchantDetector";

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

export function detectarCategoria(texto: string): string {
  // Primero intenta detectar un comercio conocido
  const comercio = detectarComercio(texto);

  if (comercio) {
    return comercio.categoria;
  }

  const t = texto.toLowerCase();

  // Comida
  if (
    t.includes("pizza") ||
    t.includes("hamburguesa") ||
    t.includes("empanada") ||
    t.includes("delivery") ||
    t.includes("restaurante") ||
    t.includes("almuerzo") ||
    t.includes("cena") ||
    t.includes("desayuno") ||
    t.includes("carne")
  ) {
    return "Comida";
  }

  // Supermercado
  if (
    t.includes("super") ||
    t.includes("supermercado") ||
    t.includes("compras")
  ) {
    return "Supermercado";
  }

  // Combustible
  if (
    t.includes("nafta") ||
    t.includes("combustible") ||
    t.includes("gasoil")
  ) {
    return "Combustible";
  }

  // Servicios
  if (
    t.includes("luz") ||
    t.includes("agua") ||
    t.includes("gas") ||
    t.includes("internet") ||
    t.includes("telefono")
  ) {
    return "Servicios";
  }

  // Salud
  if (
    t.includes("farmacia") ||
    t.includes("medicamento") ||
    t.includes("doctor")
  ) {
    return "Salud";
  }

  // Entretenimiento
  if (
    t.includes("cine") ||
    t.includes("steam") ||
    t.includes("playstation") ||
    t.includes("juego")
  ) {
    return "Entretenimiento";
  }

  // Transporte
  if (
    t.includes("uber") ||
    t.includes("taxi") ||
    t.includes("colectivo") ||
    t.includes("micro")
  ) {
    return "Transporte";
  }

  return "Otros";
}

export function detectarMedioPago(texto: string): string {
  const t = texto.toLowerCase();

  if (t.includes("mercado pago")) return "Mercado Pago";
  if (t.includes("uala")) return "Ualá";
  if (t.includes("naranja")) return "Naranja";
  if (t.includes("visa")) return "Visa";
  if (t.includes("master")) return "Mastercard";
  if (t.includes("efectivo")) return "Efectivo";
  if (t.includes("debito")) return "Débito";
  if (t.includes("credito")) return "Crédito";

  return "No especificado";
}