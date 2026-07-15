"use client";

import { Bot, Home, List, Target } from "lucide-react";

export type Pestana =
  | "inicio"
  | "movimientos"
  | "objetivos"
  | "bocha";

type Props = {
  activa: Pestana;
  onChange: (pestana: Pestana) => void;
};

const items: {
  id: Pestana;
  label: string;
  icono: React.ReactNode;
}[] = [
  {
    id: "inicio",
    label: "Inicio",
    icono: <Home size={20} />,
  },
  {
    id: "movimientos",
    label: "Movimientos",
    icono: <List size={20} />,
  },
  {
    id: "objetivos",
    label: "Objetivos",
    icono: <Target size={20} />,
  },
  {
    id: "bocha",
    label: "Bocha",
    icono: <Bot size={20} />,
  },
];

export default function MobileNavigation({
  activa,
  onChange,
}: Props) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 px-3 py-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
        {items.map((item) => {
          const seleccionada = item.id === activa;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-semibold transition ${
                seleccionada
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icono}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}