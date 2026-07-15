import type { ReactNode } from "react";

type Props = {
  titulo: string;
  descripcion?: string;
  accion?: ReactNode;
};

export default function SectionHeader({
  titulo,
  descripcion,
  accion,
}: Props) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white">
          {titulo}
        </h2>

        {descripcion && (
          <p className="mt-1 text-sm text-slate-400">
            {descripcion}
          </p>
        )}
      </div>

      {accion && (
        <div className="shrink-0">
          {accion}
        </div>
      )}
    </div>
  );
}