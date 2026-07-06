"use client";

import { useEffect, useState } from "react";

type Movimiento = {
  id: number;
  descripcion: string;
  monto: number;
  tipo: "gasto" | "ingreso";
};

export default function Home() {
  const [texto, setTexto] = useState("");
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
useEffect(() => {
  const guardados = localStorage.getItem("bocha-cash-movimientos");

  if (guardados) {
    setMovimientos(JSON.parse(guardados));
  }
}, []);

useEffect(() => {
  localStorage.setItem("bocha-cash-movimientos", JSON.stringify(movimientos));
}, [movimientos]);
  const ingresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, m) => acc + m.monto, 0);

  const gastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, m) => acc + m.monto, 0);

  const saldo = ingresos - gastos;

  function detectarMonto(texto: string) {
    const numero = texto.replace(/\./g, "").match(/\d+/);
    return numero ? Number(numero[0]) : 0;
  }

  function agregarMovimiento() {
    if (!texto.trim()) return;

    const monto = detectarMonto(texto);
    if (monto === 0) {
      alert("No pude detectar el monto. Probá: Gasté 5500 en carne");
      return;
    }

    const esIngreso =
      texto.toLowerCase().includes("cobre") ||
      texto.toLowerCase().includes("cobré") ||
      texto.toLowerCase().includes("sueldo") ||
      texto.toLowerCase().includes("ingreso");

    const nuevo: Movimiento = {
      id: Date.now(),
      descripcion: texto,
      monto,
      tipo: esIngreso ? "ingreso" : "gasto",
    };

    setMovimientos([nuevo, ...movimientos]);
    setTexto("");
  }

  function formato(n: number) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-emerald-400 font-bold">BC</p>
            <h1 className="text-4xl font-bold">Bocha Cash</h1>
            <p className="text-slate-400 mt-2">Tu plata, clara.</p>
          </div>

          <button className="rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-slate-950">
            + Nuevo movimiento
          </button>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <Card titulo="Saldo estimado" valor={formato(saldo)} />
          <Card titulo="Ingresos" valor={formato(ingresos)} color="text-emerald-400" />
          <Card titulo="Gastos" valor={formato(gastos)} color="text-red-400" />
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-900 p-6">
            <h3 className="text-2xl font-bold">Cargar como WhatsApp</h3>
            <p className="mt-2 text-slate-400">Ejemplo: “Gasté 5500 en carne”</p>

            <div className="mt-6 flex gap-3">
              <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") agregarMovimiento();
                }}
                className="w-full rounded-2xl bg-slate-800 px-4 py-3 outline-none"
                placeholder="Escribí un gasto..."
              />

              <button
                onClick={agregarMovimiento}
                className="rounded-2xl bg-emerald-500 px-5 font-bold text-slate-950"
              >
                Enviar
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6">
            <h3 className="text-2xl font-bold">Lectura inteligente</h3>
            <p className="mt-4 text-slate-400">
              {movimientos.length === 0
                ? "Todavía no hay movimientos."
                : `Ya cargaste ${movimientos.length} movimientos. Tus gastos van en ${formato(gastos)}.`}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-slate-900 p-6">
          <h3 className="text-2xl font-bold">Últimos movimientos</h3>

          {movimientos.length === 0 ? (
            <p className="mt-4 text-slate-400">No hay movimientos cargados.</p>
          ) : (
            <div className="mt-5 space-y-3">
              {movimientos.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-800 p-4"
                >
                  <div>
                    <p className="font-bold">{m.descripcion}</p>
                    <p className="text-sm text-slate-400">{m.tipo}</p>
                  </div>
                  <p className={m.tipo === "ingreso" ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                    {formato(m.monto)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Card({
  titulo,
  valor,
  color = "text-white",
}: {
  titulo: string;
  valor: string;
  color?: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6">
      <p className="text-slate-400">{titulo}</p>
      <h2 className={`mt-3 text-3xl font-bold ${color}`}>{valor}</h2>
    </div>
  );
}