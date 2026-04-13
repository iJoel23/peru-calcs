const UPCOMING: { title: string; description: string }[] = [
  {
    title: "Calculadora de porcentajes",
    description:
      "Calcula porcentajes de un monto y variaciones de forma rápida, ideal para presupuestos y comparaciones.",
  },
  {
    title: "Calculadora de descuentos",
    description:
      "Aplica descuentos por porcentaje o monto fijo y ve el precio final al instante.",
  },
  {
    title: "Tipo de cambio",
    description:
      "Consulta y convierte entre soles y dólares con una herramienta pensada para el día a día.",
  },
];

export function ComingSoonSection() {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-8"
      aria-labelledby="coming-soon-heading"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="coming-soon-heading"
          className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
        >
          Próximamente
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Más herramientas para PeruCalcs
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {UPCOMING.map((item) => (
          <li
            key={item.title}
            className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-800/40"
          >
            <span className="inline-flex w-fit rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-200">
              Próximamente
            </span>
            <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
