export type MerchantInfo = {
  nombre: string;
  categoria: string;
};

const MERCHANTS: MerchantInfo[] = [
  { nombre: "Carrefour", categoria: "Supermercado" },
  { nombre: "Jumbo", categoria: "Supermercado" },
  { nombre: "Vea", categoria: "Supermercado" },
  { nombre: "Chango Más", categoria: "Supermercado" },
  { nombre: "Walmart", categoria: "Supermercado" },

  { nombre: "YPF", categoria: "Combustible" },
  { nombre: "Shell", categoria: "Combustible" },
  { nombre: "Axion", categoria: "Combustible" },
  { nombre: "Puma", categoria: "Combustible" },

  { nombre: "McDonald's", categoria: "Comida" },
  { nombre: "Burger King", categoria: "Comida" },
  { nombre: "Mostaza", categoria: "Comida" },

  { nombre: "Farmacity", categoria: "Salud" },

  { nombre: "Mercado Libre", categoria: "Compras" },

  { nombre: "Netflix", categoria: "Entretenimiento" },
  { nombre: "Spotify", categoria: "Entretenimiento" },
];

function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .trim();
}

export function detectarComercio(
  texto: string
): MerchantInfo | null {
  const textoNormalizado = normalizarTexto(texto);

  const encontrado = MERCHANTS.find((comercio) =>
    textoNormalizado.includes(normalizarTexto(comercio.nombre))
  );

  return encontrado || null;
}

export function detectarDescripcion(texto: string): string {
  const comercio = detectarComercio(texto);

  if (comercio) {
    return comercio.nombre;
  }

  return texto.trim();
}