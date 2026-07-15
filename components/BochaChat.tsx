"use client";

import { responderPregunta } from "@/engine/chatEngine";
import type { FinancialAnalysis } from "@/engine/financialEngine";
import type { Movimiento } from "@/types/movement";
import { Bot, Send } from "lucide-react";
import { useState } from "react";

type Mensaje = {
  id: number;
  autor: "usuario" | "bocha";
  texto: string;
};

type Props = {
  analisis: FinancialAnalysis;
  movimientos: Movimiento[];
};

export default function BochaChat({
  analisis,
  movimientos,
}: Props) {
  const [pregunta, setPregunta] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: 1,
      autor: "bocha",
      texto:
        "Hola Emma 👋 Preguntame por tu saldo, gastos, categorías, medios de pago, mayor gasto o dónde podrías ahorrar.",
    },
  ]);

  function enviarPregunta() {
    const texto = pregunta.trim();

    if (!texto) {
      return;
    }

    const mensajeUsuario: Mensaje = {
      id: Date.now(),
      autor: "usuario",
      texto,
    };

    const respuesta = responderPregunta(texto, {
  analisis,
  movimientos,
});

    const mensajeBocha: Mensaje = {
      id: Date.now() + 1,
      autor: "bocha",
      texto: respuesta,
    };

    setMensajes((anteriores) => [
      ...anteriores,
      mensajeUsuario,
      mensajeBocha,
    ]);

    setPregunta("");
  }

  return (
    <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
          <Bot size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Preguntale a Bocha
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Consultá tus movimientos usando lenguaje natural.
          </p>
        </div>
      </div>

      <div className="mt-6 max-h-96 space-y-4 overflow-y-auto rounded-2xl bg-slate-950 p-4">
        {mensajes.map((mensaje) => (
          <div
            key={mensaje.id}
            className={
              mensaje.autor === "usuario"
                ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-500 p-4 text-slate-950"
                : "max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-800 p-4 text-slate-200"
            }
          >
            <p className="text-sm font-semibold">
              {mensaje.autor === "usuario"
                ? "Vos"
                : "Bocha"}
            </p>

            <p className="mt-1">{mensaje.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <input
          value={pregunta}
          onChange={(evento) =>
            setPregunta(evento.target.value)
          }
          onKeyDown={(evento) => {
            if (evento.key === "Enter") {
              enviarPregunta();
            }
          }}
          placeholder="Ejemplo: ¿Cuánto gasté en servicios?"
          className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="button"
          onClick={enviarPregunta}
          aria-label="Enviar pregunta"
          className="flex items-center justify-center rounded-2xl bg-emerald-500 px-5 font-bold text-slate-950 transition hover:bg-emerald-400"
        >
          <Send size={20} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "¿Cuánto gasté en Servicios?",
          "¿Cuánto pagué con Mercado Pago?",
          "¿Dónde puedo ahorrar?",
          "¿Cuál fue mi mayor gasto?",
        ].map((ejemplo) => (
          <button
            key={ejemplo}
            type="button"
            onClick={() => setPregunta(ejemplo)}
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            {ejemplo}
          </button>
        ))}
      </div>
    </section>
  );
}