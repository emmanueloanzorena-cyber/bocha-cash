export function getCategoryIcon(categoria: string): string {
  const nombre = categoria.toLowerCase();

  if (
    nombre.includes("comida") ||
    nombre.includes("delivery") ||
    nombre.includes("restaurante")
  ) {
    return "🍔";
  }

  if (
    nombre.includes("supermercado") ||
    nombre.includes("compras")
  ) {
    return "🛒";
  }

  if (
    nombre.includes("combustible") ||
    nombre.includes("nafta")
  ) {
    return "⛽";
  }

  if (
    nombre.includes("servicios") ||
    nombre.includes("luz") ||
    nombre.includes("gas") ||
    nombre.includes("agua")
  ) {
    return "💡";
  }

  if (
    nombre.includes("salud") ||
    nombre.includes("farmacia")
  ) {
    return "💊";
  }

  if (
    nombre.includes("ocio") ||
    nombre.includes("entretenimiento") ||
    nombre.includes("juegos")
  ) {
    return "🎮";
  }

  if (
    nombre.includes("transporte") ||
    nombre.includes("taxi") ||
    nombre.includes("uber")
  ) {
    return "🚗";
  }

  if (
    nombre.includes("ropa") ||
    nombre.includes("indumentaria")
  ) {
    return "👕";
  }

  if (
    nombre.includes("hogar") ||
    nombre.includes("casa")
  ) {
    return "🏠";
  }

  if (
    nombre.includes("educacion") ||
    nombre.includes("colegio")
  ) {
    return "📚";
  }

  return "📦";
}