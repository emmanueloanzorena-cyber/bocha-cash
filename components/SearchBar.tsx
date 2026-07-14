import { Search, X } from "lucide-react";

type SearchBarProps = {
  valor: string;
  onChange: (valor: string) => void;
};

export function SearchBar({ valor, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por descripción, categoría o medio de pago..."
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
      />

      {valor && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}