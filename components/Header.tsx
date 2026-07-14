export function Header() {
  return (
    <header className="mb-10 flex items-center justify-between">
      <div>
        <p className="font-bold text-emerald-400">BC</p>
        <h1 className="text-4xl font-bold">Bocha Cash</h1>
        <p className="mt-2 text-slate-400">Tu plata, clara.</p>
      </div>

      <button className="rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-slate-950">
        + Nuevo movimiento
      </button>
    </header>
  );
}