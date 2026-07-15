"use client";

type Props = {
  texto: string;
  onTextoChange: (texto: string) => void;
  onEnviar: () => void;
};

export default function MovementInput({
  texto,
  onTextoChange,
  onEnviar,
}: Props) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6">
      <h3 className="text-2xl font-bold">
        Cargar como WhatsApp
      </h3>

      <p className="mt-2 text-slate-400">
        Ejemplo: “Gasté 5500 en carne”
      </p>

      <div className="mt-6 flex gap-3">
        <input
          value={texto}
          onChange={(evento) =>
            onTextoChange(evento.target.value)
          }
          onKeyDown={(evento) => {
            if (evento.key === "Enter") {
              onEnviar();
            }
          }}
          className="w-full rounded-2xl bg-slate-800 px-4 py-3 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500"
          placeholder="Escribí un gasto..."
        />

        <button
          type="button"
          onClick={onEnviar}
          className="rounded-2xl bg-emerald-500 px-5 font-bold text-slate-950 transition hover:bg-emerald-400"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}